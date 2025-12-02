// initTables.js
import { pool } from "../db.js";

export const initTables = async () => {
  try {
    console.log("🚀 Starting database setup...");

    // ENUM for job_type
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_type') THEN
          CREATE TYPE job_type AS ENUM ('Fulltime', 'PartTime', 'Contractual', 'Internship');
        END IF;
      END $$;
    `);
    console.log("✅ Enum 'job_type' created or already exists.");

    // Candidate table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidate (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        profile_pic VARCHAR(255),
        age INT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Table 'candidate' ready.");

    // Education table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidate(id) ON DELETE CASCADE,
        school VARCHAR(255),
        college VARCHAR(255)
      );
    `);
    console.log("✅ Table 'education' ready.");

    // Skills table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        skill_name VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    console.log("✅ Table 'skills' ready.");

    // Candidate Skill table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidate_skill (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidate(id) ON DELETE CASCADE,
        skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
        experience VARCHAR(50),
        proficiency VARCHAR(50)
      );
    `);
    console.log("✅ Table 'candidate_skill' ready.");

    // Jobs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        min_pay INT,
        max_pay INT,
        pay_type VARCHAR(50),
        body TEXT,
        type job_type,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Table 'jobs' ready.");

    // Job Skill table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_skill (
        id SERIAL PRIMARY KEY,
        job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
        skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
        experience VARCHAR(50),
        proficiency VARCHAR(50)
      );
    `);
    console.log("✅ Table 'job_skill' ready.");

    console.log("🎉 All tables created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    // pool.end(); // close connection
  }
};

// initTables();
