export namespace PackageJSON {
  export type Props = {
    name: string;
    version: `${number}.${number}.${number}`;
    description: string;
    scripts: Record<string, string>;
    private: boolean;
    author: string;
    license: "MIT";
    type: "module" | "commonjs";
    main: string;
    exports: Record<
      "." | `./${string}`,
      Record<"import" | "require", Record<"types" | "default", string>>
    >;
  };
}

export class PackageJSON {
  private _props: PackageJSON.Props = {
    name: "",
    version: "1.0.0",
    author: "",
    description: "",
    exports: {
      ".": {
        import: {
          types: "./dist/esm/index.d.ts",
          default: "./dist/esm/index.js",
        },
        require: {
          types: "./dist/cjs/index.d.ts",
          default: "./dist/cjs/index.js",
        },
      },
    },
    license: "MIT",
    main: "./dist/cjs/index.js",
    private: true,
    scripts: {
      build: "pnpm build:esm & pnpm build:cjs",
      "build:esm":
        'tsc -p tsconfig.json && fjs make ./dist/esm/package.json -c \'{"type":"module"}\'',
      "build:cjs":
        'tsc -p tsconfig.cjs.json && fjs make ./dist/cjs/package.json -c \'{"type":"commonjs"}\'',
    },
    type: "module",
  };

  constructor(props: Partial<PackageJSON.Props>) {
    this._props = { ...this._props, ...props };
  }

  public toObj(): PackageJSON.Props {
    return this._props;
  }

  public toJson(): string {
    const json = JSON.stringify(this.toObj(), null, 2);
    return json;
  }
}
