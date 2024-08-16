# workspace in pnpm

## package.json file

You need to specify a workspace project module version as following:

```json
{
  "@js-boilerplate/tsconfig": "workspace:*"
}
```

`workspace:${version}` is a specific format to let the pnpm know the dependency is a workspace project one. Without the `workspace:` part, pnpm would try to fetch the module from a public NPM repository, which mostly likely fails.
