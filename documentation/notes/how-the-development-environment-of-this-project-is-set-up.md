# How the Development Environment of This Project Is Set Up

## pnpm, a node.js package manager

### Installation

#### With Brew (Mac)

`brew install pnpm`

#### With NPM

`npm install -g pnpm`

### Command alias

It creates an alias for `pnpm`, which allows you to run `pnpm` with just `pn`.

`echo -e "\n# pnpm\nalias pn=pnpm" >> ~/.bash_profile`

### Init

It generates an initial `package.json` file.
`pnpm init`

https://github.com/pnpm/pnpm/issues/3505
