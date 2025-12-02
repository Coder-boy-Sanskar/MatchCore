import { faker } from "@faker-js/faker";
import { pool } from "./db.js"; // your pg pool

export const seedJobSkill = async () => {
  try {
    // console.log("🚀 Seeding jobs...");
    // const jobs = await pool.query("SELECT id FROM jobs");
    // const skills = await pool.query("SELECT id FROM skills");

    // for (const job of jobs.rows) {
    //   const skillCount = faker.number.int({ min: 3, max: 8 });
    //   const randomSkills = faker.helpers.arrayElements(skills.rows, skillCount);
    //   for (const skill of randomSkills) {
    //     const experience = `${faker.number.int({ min: 1, max: 10 })} yrs`;
    //     const proficiency = faker.helpers.arrayElements([
    //       "Beginner",
    //       "Intermediate",
    //       "Advanced",
    //     ]);

    //     await pool.query("SELECT COUNT(*) FROM job_skills");
    //   }
    // }

    // for (let b = 0; b < batches; b++) {
    //   const rows = [];

    //   for (let i = 0; i < batchSize; i++) {
    //     const minPay = faker.number.int({ min: 10000, max: 60000 });
    //     const maxPay = minPay + faker.number.int({ min: 5000, max: 100000 });
    //     const payType = faker.helpers.arrayElement(payTypes);
    //     const body = faker.helpers.arrayElement(jobBodies);
    //     const type = faker.helpers.arrayElement(jobTypes);

    //     rows.push(
    //       `(${minPay}, ${maxPay}, '${payType}', '${body.replace(
    //         /'/g,
    //         "''"
    //       )}', '${type}')`
    //     );
    //   }

    //   const query = `
    //     INSERT INTO jobs (min_pay, max_pay, pay_type, body, type)
    //     VALUES ${rows.join(", ")};
    //   `;

    //   await pool.query(query);

    //   console.log(`Batch ${b + 1}/${batches} inserted`);
    // }
    const query = `
    SELECT n_live_tup AS approximate_count
    FROM pg_stat_user_tables
    WHERE relname = 'job_skill';
  `;

    const result = await pool.query(query);
    console.log("Approx count:", result.rows[0].approximate_count);
  } catch (err) {
    console.error("❌ Error seeding jobs:", err);
  }
};
await seedJobSkill();
