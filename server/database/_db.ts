import { Priority, WorkOrder } from "../types.js";
import sqlite3 from "sqlite3";
import fs from "fs";
import util from "util";

export const workOrders: WorkOrder[] = [];
const filepath = "./workforce.db";
let _db = null;
export const createDbConnection = async (): Promise<sqlite3.Database> => {
  if (_db) return;
  _db = await _createDbConnection();
};

export const getAll = async (query: string) => {
  if (!_db) await createDbConnection();
  const dbEachPromisify = util.promisify(_db.all).bind(_db);
  return await dbEachPromisify(query);
};

export const insertData = async (query: string, params: any[]) => {
  if (!_db) await createDbConnection();
  const run = util.promisify(_db.run).bind(_db);
  const get = util.promisify(_db.get).bind(_db);

  await run(query, params);
  const { id } = await get("SELECT last_insert_rowid() as id");
  return id;
};

const _createDbConnection = async () => {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath);
    await createTableDefault(db);
    await insertDataDefault(db);
    return db;
  }
};

const createTableDefault = async (db: sqlite3.Database) => {
  const exec = util.promisify(db.exec).bind(db);
  await exec(`
    CREATE TABLE work_order
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT NOT NULL,
      priority INTEGER
    );
  `);
};

const insertDataDefault = async (db: sqlite3.Database) => {
  const run = util.promisify(db.run).bind(db);

  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 1",
      "Fixing the broken machine",
      "2024-05-07T00:00:00.000Z",
      Priority.LOW,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 2",
      "Cleaning the office space",
      "2024-05-11T00:00:00.000Z",
      Priority.HIGH,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 3",
      "Updating software installations",
      "2024-05-05T00:00:00.000Z",
      Priority.MEDIUM,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 4",
      "Replacing old equipment",
      "2024-05-08T00:00:00.000Z",
      Priority.LOW,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 5",
      "Testing new product prototypes",
      "2024-05-15T00:00:00.000Z",
      Priority.MEDIUM,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 6",
      "Training new employees",
      "2024-05-13T00:00:00.000Z",
      Priority.HIGH,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 7",
      "Conducting market research",
      "2024-05-08T00:00:00.000Z",
      Priority.MEDIUM,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 8",
      "Organizing company events",
      "2024-05-17T00:00:00.000Z",
      Priority.HIGH,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 9",
      "Optimizing supply chain processes",
      "2024-05-22T00:00:00.000Z",
      Priority.LOW,
    ]
  );
  await run(
    `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [
      "Task 10",
      "Developing new marketing strategies",
      "2024-05-10T00:00:00.000Z",
      Priority.CRITICAL,
    ]
  );
};
