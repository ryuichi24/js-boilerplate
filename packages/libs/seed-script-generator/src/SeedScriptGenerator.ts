import fs from "fs";
import path from "path";

export class SeedScriptGenerator<TRow> {
  private _table: string;
  private _columns: (keyof TRow)[];
  private _rows: TRow[] = [];
  private _outputDir: string;

  constructor(props: { table: string; columns: (keyof TRow)[]; outputDir?: string }) {
    const { table, columns, outputDir = "." } = props;
    this._table = table;
    this._columns = columns;
    this._outputDir = outputDir;
  }

  public addRow(row: TRow) {
    this._rows.push(row);
  }

  public addRows(rows: TRow[]) {
    this._rows = this._rows.concat(rows);
  }

  private _buildRows() {
    const rowBuffer = [];
    for (let rowIndex = 0; rowIndex < this._rows.length; rowIndex++) {
      const rowData = this._rows[rowIndex];
      const columnBuffer = [];
      for (let columnIndex = 0; columnIndex < this._columns.length; columnIndex++) {
        const columnItem = this._columns[columnIndex];
        const columnData = rowData[columnItem];
        if (typeof columnData === "string" && columnData !== "") {
          columnBuffer.push(`'${columnData}'`);
        }

        if (typeof columnData === "number") {
          columnBuffer.push(`${columnData}`);
        }

        if (columnData === "" || columnData === null || typeof columnData === "undefined") {
          columnBuffer.push(`NULL`);
        }

        if (typeof columnData === "boolean") {
          columnBuffer.push(`${columnData ? 1 : 0}`);
        }
      }

      rowBuffer.push(`(${columnBuffer.join(", ")})`);
    }

    const rawQuery = rowBuffer.join(", ");
    return rawQuery;
  }

  public saveAsString() {
    const starter = `INSERT INTO "${this._table}"`;
    const columnsPart = `(${this._columns.map((c) => `"${c.toString()}"`).join(", ")})`;
    const rows = this._buildRows();
    const valuesPart = `VALUES ${rows};`;
    return starter + " " + columnsPart + " " + valuesPart;
  }

  public saveAsFile(file?: string) {
    const output = file ?? path.join(this._outputDir, `${this._table}.sql`);
    const rawQUery = this.saveAsString();
    fs.writeFileSync(output, rawQUery, { encoding: "utf8" });
  }

  public get table() {
    return this._table;
  }

  public get columns() {
    return this._columns;
  }

  public get rows() {
    return this._rows;
  }

  public get rowCount() {
    return this._rows.length;
  }

  public hasRows() {
    return 0 < this.rowCount;
  }
}
