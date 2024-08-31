# workspace in pnpm

## package.json file

### Add a private workspace module as a dependency to workspace project

You need to specify a workspace project module version as following:

```json
{
  "@js-boilerplate/tsconfig": "workspace:*"
}
```

`workspace:${version}` is a specific format to let the pnpm know the dependency is a workspace project one. Without the `workspace:` part, pnpm would try to fetch the module from a public NPM repository, which mostly likely fails.

### Add a dependency to workspace root package.json

Adding a dependency to a workspace root project requires a `--workspace-root` flag.

```bash
pnpm add <dependency name> --workspace-root # or pnpm add <dependency name> -w
```

# Support both ESM and CommonJS

```json
{
  // omitted...
  "scripts": {
    "build": "pnpm build:esm & pnpm build:cjs",
    "build:esm": "tsc -p tsconfig.json && fjs make ./dist/esm/package.json -c '{\"type\":\"module\"}'",
    "build:cjs": "tsc -p tsconfig.cjs.json && fjs make ./dist/cjs/package.json -c '{\"type\":\"commonjs\"}'"
  },
  "devDependencies": {
    "@js-boilerplate/tsconfig": "workspace:*",
    "@js-boilerplate/fjs": "workspace:*",
    "typescript": "^5.4.5"
  },
  // need to set the following properties for multiple module systems.
  "main": "./dist/cjs/index.js",
  //
  "exports": {
    ".": {
      "import": {
        "types": "./dist/esm/index.d.ts",
        "default": "./dist/esm/index.js"
      },
      "require": {
        "types": "./dist/cjs/index.d.ts",
        "default": "./dist/cjs/index.js"
      }
    }
  }
}
```

# Support multiple long-running tasks

With Turborepo, we want to configure it so that it can start both a development server of the renderer process and the main process at the same time.

- https://github.com/vercel/turborepo/issues/1497
- https://github.com/vercel/turborepo/issues/986

## turborepo filter

Using a `--filter` options in turbo CLI, you can specify specific projects/modules to run the command.

```json
{
  "scripts": {
    "dev:desktop": "turbo run dev --filter=\\{\"./apps/desktop/**/*\"\\}"
  }
}
```

# What is "task" in turborepo

"task" in turborepo refers to a command in the `scripts` section of the `package.json` file. So it does not seem we can make our own task in the configuration file.

# ESM in electron

## preload

The preload script can ESM imports if 'nodeIntegration' or 'sandbox" is set to true.

In an Electron environment, the preload script typically runs in the context of the renderer process but has special privileges to access Node.js APIs, depending on the settings. Here’s a breakdown of how ESM imports work in relation to the nodeIntegration and sandbox options:

nodeIntegration: true:

When nodeIntegration is set to true, the preload script can access Node.js modules directly. This means you can use CommonJS-style require() statements as well as ESM-style import statements (if your environment supports it). However, enabling nodeIntegration can expose security risks, as it allows for greater access to Node.js APIs, which could potentially be exploited.
sandbox: true:

When sandbox is enabled, the preload script runs in a more isolated environment. By default, sandboxing restricts access to Node.js APIs, meaning that neither require() nor ESM imports will work unless specific permissions or configurations are set up to allow them.
To use ESM imports in a sandboxed preload script, you’d typically need to bundle the preload script with a tool like Webpack or Rollup, which can transpile and bundle ESM modules into a format that the Electron renderer process can execute.
Combining nodeIntegration and sandbox:

If both nodeIntegration and sandbox are set to true, the preload script will have access to Node.js APIs, but it will still be constrained by the sandbox, depending on how strict the sandbox environment is configured.
In practice, it's generally recommended to avoid enabling nodeIntegration unless absolutely necessary due to the security implications. If you need ESM imports in a preload script, consider bundling your script and managing imports carefully to maintain a secure environment.

- https://developer.mamezou-tech.com/blogs/2023/12/06/electron-esm-support-available/
- https://www.electronjs.org/docs/latest/tutorial/esm#preload-scripts
