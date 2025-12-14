import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";
import { initTables } from "./modals/initTables.js";
import { seedSkills } from "./seedSkills.js";
import route from "../MatchCore/routes/userRoutes.js";
dotenv.config();

const app = express();
console.log("🔍 Loaded PGPASSWORD:", typeof process.env.DB_PASS);
app.use(express.json());

(async () => {
  try {
    await pool.query(`Select Now()`);
    await initTables();
    // await seedSkills();

    console.log(" db connected sucessfully");
  } catch (error) {
    console.log(error);
  }
})();
app.use("/", route);

app.listen(3000, () => {
  console.log("app start al localhost 3000");
});
