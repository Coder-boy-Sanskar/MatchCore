import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";
import { initTables } from "./modals/initTables.js";

dotenv.config();

const app = express();
console.log("🔍 Loaded PGPASSWORD:", typeof process.env.DB_PASS);

(async () => {
  try {
    await pool.query(`Select Now()`);
    await initTables();
    console.log(" db connected sucessfully");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(3000, () => {
  console.log("app start al localhost 3000");
});
