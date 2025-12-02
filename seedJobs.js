import { faker } from "@faker-js/faker";
import { pool } from "./db.js"; // your pg pool

const jobTypes = ["Fulltime", "PartTime", "Contractual", "Internship"];

const payTypes = ["Monthly", "Yearly", "Hourly"];
const jobBodies = [
  "We are looking for a passionate developer to join our team.",
  "Your role will include building scalable APIs and microservices.",
  "Work on real-world distributed systems and performance optimization.",
  "Contribute to frontend UI and UX improvements.",
  "Join a fast-growing startup environment with flexible work culture.",
];
export const seedJobs = async (total = 100000, batchSize = 1000) => {
  try {
    console.log("🚀 Seeding jobs...");

    const batches = Math.ceil(total / batchSize);

    for (let b = 0; b < batches; b++) {
      const rows = [];

      for (let i = 0; i < batchSize; i++) {
        const minPay = faker.number.int({ min: 10000, max: 60000 });
        const maxPay = minPay + faker.number.int({ min: 5000, max: 100000 });
        const payType = faker.helpers.arrayElement(payTypes);
        const body = faker.helpers.arrayElement(jobBodies);
        const type = faker.helpers.arrayElement(jobTypes);

        rows.push(
          `(${minPay}, ${maxPay}, '${payType}', '${body.replace(
            /'/g,
            "''"
          )}', '${type}')`
        );
      }

      const query = `
        INSERT INTO jobs (min_pay, max_pay, pay_type, body, type)
        VALUES ${rows.join(", ")};
      `;

      await pool.query(query);

      console.log(`Batch ${b + 1}/${batches} inserted`);
    }

    console.log(`🎉 Inserted ${total} jobs successfully`);
  } catch (err) {
    console.error("❌ Error seeding jobs:", err);
  }
};
await seedJobs();
