# JS Boilerplate Project Structure

## Monorepo with Turbo

In `turbo.json` file, you can define tasks. A Task can have other tasks as its dependencies in `dependsOn` property, which is useful for a build step that depends on other build steps.

### persistent task

In tasks, there is a special task called `persistent task` that is a long running process not exiting such as a dev server task. For the type of task, you should add `persistent: true` in the json file as below:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [],
  "tasks": {
    "@ts-template/playground-node#dev": {
      "cache": false,
      "persistent": true, // <= need to be added!
      "dependsOn": []
    }
  }
}
```

#### References

- https://github.com/vercel/turbo/issues/7279#issuecomment-1930454699
- https://turbo.build/repo/docs/reference/configuration#persistent

## Root Package JSON file

### scripts

#### add-module

It generates a new module project folder with a new package.json file.
`pnpm add-module <path/to/new/module/folder>`
