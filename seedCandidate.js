import { pool } from "./db.js";
import { faker } from "@faker-js/faker";
const schools = [
  "Delhi Public School",
  "St. Xavier’s High School",
  "Kendriya Vidyalaya",
  "DAV Public School",
  "Ryan International School",
  "Modern School",
  "La Martiniere",
  "Loyola High School",
  "St. Mary’s Convent",
  "Springdale Public School",
  "Mount Carmel School",
  "Army Public School",
  "St. Joseph’s Academy",
  "National Public School",
  "Heritage International",
  "Blue Bells Model School",
  "Bal Bharati Public School",
  "Sardar Patel Vidyalaya",
  "Amity International School",
  "Tagore International",
  "Scottish High International",
  "Mother’s International School",
  "Carmel Convent School",
  "The Frank Anthony Public School",
  "Cambridge School",
  "Apeejay School",
  "Vivekananda Mission School",
  "Don Bosco High School",
  "Sacred Heart School",
  "St. Paul’s High School",
  "St. Francis De Sales School",
  "Oakridge International School",
  "Global Indian International School",
  "Podar International School",
  "Birla Vidya Niketan",
  "Greenwood High",
  "Billabong High International",
  "Silver Oaks International",
  "Mayo College",
  "Sherwood College",
  "Vardhman Academy Meerut",
];
const colleges = [
  "IIT Delhi",
  "IIT Bombay",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Indore",
  "IIT BHU",
  "IIT Ropar",
  "NIT Trichy",
  "NIT Surathkal",
  "NIT Warangal",
  "NIT Calicut",
  "NIT Kurukshetra",
  "IIIT Hyderabad",
  "IIIT Bangalore",
  "IIIT Allahabad",
  "IIIT Delhi",
  "BITS Pilani",
  "BITS Goa",
  "VIT Vellore",
  "SRM University",
  "Amity University",
  "Lovely Professional University",
  "Manipal University",
  "Christ University",
  "Delhi University",
  "Jadavpur University",
  "Anna University",
  "Banaras Hindu University",
  "Osmania University",
  "Pune University",
  "Symbiosis International University",
  "Shiv Nadar University",
  "Ashoka University",
  "Jamia Millia Islamia",
  "Aligarh Muslim University",
  "University of Mumbai",
  "Chandigarh University",
  "NIT ALLAHABAD",
];

const candidates = Array.from({ length: 10000 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number("##########"),
  experience_years: faker.number.int({ min: 0, max: 10 }),
  education_level: faker.helpers.arrayElement([
    "B.Tech",
    "M.Tech",
    "B.Sc",
    "MCA",
    "MBA",
  ]),
  college: faker.helpers.arrayElement(colleges),
  school: faker.helpers.arrayElement(schools),
  created_at: faker.date.past(),
}));
const generateCandidates = (count = 10000) =>
  Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("##########"),
    age: faker.number.int({ min: 18, max: 40 }),
    school: faker.helpers.arrayElement(schools),
    college: faker.helpers.arrayElement(colleges),
  }));
const insertCandidates = async () => {
  try {
    // const values = candidates
    //   .map(
    //     (c) =>
    //       `('${c.name}', '${c.email}', '${c.phone}', ${c.experience_years}, '${
    //         c.education_level
    //       }', '${c.college}', '${c.school}', '${c.created_at.toISOString()}')`
    //   )
    //   .join(", ");

    // const query = `
    //   INSERT INTO candidates (name, email, phone, experience_years, education_level, college, school, created_at)
    //   VALUES ${values};
    // `;

    // i need to create job , job skill table thn all done
    const candidates = await pool.query("SELECT id FROM candidate");
    const skills = await pool.query("SELECT id FROM skills");

    for (const candidate of candidates.rows) {
      // pick 3–8 random skills for this candidate
      const skillCount = faker.number.int({ min: 3, max: 8 });
      const randomSkills = faker.helpers.arrayElements(skills.rows, skillCount);

      for (const skill of randomSkills) {
        const experience = `${faker.number.int({ min: 1, max: 8 })} yrs`;
        const proficiency = faker.helpers.arrayElement([
          "Beginner",
          "Intermediate",
          "Advanced",
        ]);

        await pool.query(
          "INSERT INTO candidate_skill (candidate_id, skill_id, experience, proficiency) VALUES ($1, $2, $3, $4)",
          [candidate.id, skill.id, experience, proficiency]
        );
      }
    }

    // await pool.query(query);
    console.log(`✅ Inserted ${candidates.length} candidates successfully`);
  } catch (err) {
    console.error("❌ Error seeding candidates:", err);
  }
};

await insertCandidates();

// const alterCandidateTable = async () => {
//   try {
//     await pool.query(`
//       ALTER TABLE candidate
//       ALTER COLUMN phone TYPE VARCHAR(50);
//     `);
//     console.log("✅ Candidate phone column updated successfully!");
//   } catch (err) {
//     console.error("❌ Error updating schema:", err);
//   } finally {
//     pool.end();
//   }
// };

// alterCandidateTable();
