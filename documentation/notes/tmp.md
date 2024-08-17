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
