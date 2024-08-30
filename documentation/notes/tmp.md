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
