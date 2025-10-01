import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);
const currentDateTime = new Date().toLocaleString("pt-br");

export class Database {
  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #database = {};

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }
}
