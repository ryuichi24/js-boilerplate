import path from "path";
import { program } from "commander";
import builder from "electron-builder";
import {
  cpDirIfExist,
  makeDirIfExist,
  makeFile,
} from "@ts-template/file-system";
import {
  PackageJSON,
  readPackageJsonFile,
  isNativeModule,
} from "@ts-template/util/package-json";
import { buildESMHelpers } from "@ts-template/esm-helper";

const { require } = buildESMHelpers(import.meta.url);
const isMac = process.platform === "darwin";
const isWindows = process.platform === "win32";
const isLinux = process.platform === "linux";

program
  .option("-p, --publish", "If set, this will publish the build.", false)
  .action((options) => {
    const appPath = path.join("release", "app");
    const appPackageJsonPath = path.join(appPath, "package.json");
    const outputPath = path.join("release", "out");
    makeDirIfExist(appPath);

    // make app package.json file
    const rootPackageJsonPath = path.resolve("..", "..", "..", "package.json");
    const rootPackageJson = readPackageJsonFile(rootPackageJsonPath);

    const appPackageJson = new PackageJSON({
      name: process.env.DESKTOP_APP_NAME ?? `${rootPackageJson.name}-desktop`,
      author: rootPackageJson.author,
      type: "module",
      version: rootPackageJson.version,
      main: `dist/@${rootPackageJson.name}/desktop-main/index.js`,
      description: rootPackageJson.description,
      license: rootPackageJson.license,
      dependencies: {},
      publishMeta: rootPackageJson.publishMeta,
    });

    const builderPackageJsonPath = path.resolve("package.json");
    const builderPackageJson = readPackageJsonFile(builderPackageJsonPath);
    const subModuleNames = Object.keys(builderPackageJson.dependencies);

    subModuleNames.forEach((subModuleName) => {
      aggregateArtifacts(subModuleName);
      const subModulePath = path.join("node_modules", subModuleName);
      const subModulePackageJsonPath = path.join(subModulePath, "package.json");
      const subModulePackageJson = readPackageJsonFile(
        subModulePackageJsonPath
      );
      const subModuleDependencies = Object.entries(
        subModulePackageJson.dependencies ?? {}
      );
      const subModuleNode_modulesPath = path.join(
        subModulePath,
        "node_modules"
      );

      const nativeModuleDependency = subModuleDependencies.find(
        ([subModuleDependency]) => {
          const subModuleDependencyPath = path.join(
            subModuleNode_modulesPath,
            subModuleDependency
          );
          const subModuleDependencyPackageJsonPath = path.join(
            subModuleDependencyPath,
            "package.json"
          );
          const parsedSubModuleDependencyPackageJsonData = readPackageJsonFile(
            subModuleDependencyPackageJsonPath
          );
          return isNativeModule(parsedSubModuleDependencyPackageJsonData);
        }
      );

      if (!nativeModuleDependency) {
        return;
      }

      appPackageJson.addDependency(
        nativeModuleDependency[0],
        nativeModuleDependency[1]
      );
    });

    makeFile(appPackageJsonPath, { content: appPackageJson.toJson() });

    const mainProcessModulePackageJsonPath = require.resolve(
      `@${rootPackageJson.name}/desktop-main/package.json`
    );

    const mainProcessModulePackageJson = readPackageJsonFile(
      mainProcessModulePackageJsonPath
    );

    let builderConfig: builder.Configuration = {
      appId: appPackageJson.publishMeta?.appId,
      productName: appPackageJson.publishMeta?.appName,
      copyright: appPackageJson.publishMeta?.copyright,
      asar: true,
      files: ["dist", "node_modules", "package.json"],
      electronVersion:
        mainProcessModulePackageJson.devDependencies.electron.replace("^", ""),
      publish: [
        {
          provider: "github",
          owner: appPackageJson.publishMeta?.provider.github.owner,
          repo: appPackageJson.publishMeta?.provider.github.repositoryName,
          // to use private repository
          private: appPackageJson.publishMeta?.provider.github.private,
          // to publish it to private repsotiry and make it auto updater work as well
          token: process.env.GH_TOKEN,
        },
      ],
      directories: {
        app: appPath,
        output: outputPath,
      },
    };

    if (isMac) {
      builderConfig = {
        ...builderConfig,
        ...buildMacConfig(),
      };
    }

    if (isWindows) {
      builderConfig = {
        ...builderConfig,
        ...buildWindowsConfig(),
      };
    }

    if (isLinux) {
      builderConfig = {
        ...builderConfig,
        ...buildLinuxConfig(),
      };
    }

    builder.build({
      publish: options.publish ? "always" : "never",
      config: builderConfig,
    });
  });

function buildMacConfig(): builder.Configuration {
  return {
    mac: {
      // icon: path.join(logoAssetPath, "logo.icns"),
      target: ["dmg", "zip"],
    },
    pkg: {
      scripts: "build_resources/mac/pkg-scripts",
      installLocation: "/Applications",
      allowAnywhere: false,
      allowCurrentUserHome: true,
      allowRootDirectory: true,
      overwriteAction: "upgrade",
    },
    dmg: {
      contents: [
        {
          x: 130,
          y: 220,
        },
        // {
        //   x: 130,
        //   y: 90,
        //   name: "NayaFlow Uninstaller",
        //   type: "file",
        //   path: path.join(
        //     extraResourcesDir,
        //     "mac",
        //     "executables",
        //     "NayaFlow Uninstaller"
        //   ),
        // },
        {
          x: 410,
          y: 220,
          type: "link",
          path: "/Applications",
        },
      ],
    },
  };
}

function buildLinuxConfig(): builder.Configuration {
  return {
    linux: {
      // icon: path.join(logoAssetPath, "logo.png"),
      target: ["AppImage"],
    },
    appImage: {},
    deb: {},
    rpm: {},
    snap: {},
  };
}

function buildWindowsConfig(): builder.Configuration {
  return {
    win: {
      // icon: path.join(logoAssetPath, "logo.ico"),
      target: ["nsis"],
    },
    nsis: {
      oneClick: true,
      // installerHeaderIcon: path.join(logoAssetPath, "logo.ico"),
      // uninstallerIcon: path.join(logoAssetPath, "logo.ico"),
      uninstallDisplayName: "NayaFlow Uninstaller",
      allowToChangeInstallationDirectory: false,
      deleteAppDataOnUninstall: true,
    },
  };
}

function aggregateArtifacts(subModuleName: string) {
  const subModuleDistPath = path.join("node_modules", subModuleName, "dist");
  const distPath = path.join("release", "app", "dist");
  const destPath = path.join(distPath, subModuleName);
  cpDirIfExist(subModuleDistPath, destPath);
}

program.parse(process.argv);
