import { SKILL_ALIAS_MAP } from "../constants/skill_allias.js";
import { pool } from "../db.js";
import askGroq from "../groqTest.js";

function getCleanSkills(inputSkillsArray) {
  return inputSkillsArray.map((skill) => {
    // 1. Normalize input (lowercase and remove extra spaces)
    const normalizedInput = skill.toLowerCase().trim();

    // 2. Check if it's an alias. If yes, return the canonical name.
    // If no, capitalize the first letter as a fallback.
    return SKILL_ALIAS_MAP[normalizedInput] || skill;
  });
}
export const getJobDataFromText = async (req, res) => {
  const { text } = req.body;
  console.log(req.body);

  try {
    const getFilterObj = await askGroq(text);
    //   {
    //   "job_title": "backend developer",
    //   "skills": [],
    //   "location": "blr",
    //   "experience": "",
    //   "salary": "",
    //   "other_keywords": []
    // }
    const response = getFilterObj.choices[0].message.content;
    const filterObj = JSON.parse(response);
    // console.log(filterObj);
    const raw_skills = filterObj.skills;
    console.log(getFilterObj, "rawskilss");

    if (!raw_skills) return res.status(404).json({ message: "cannto found" });
    const skills = getCleanSkills(raw_skills);
    console.log(skills);

    const skillIdResult = await pool.query(
      `
  SELECT id, skill_name
  FROM skills
  WHERE LOWER(skill_name) = ANY($1)
  `,
      [skills.map((s) => s.toLowerCase())]
    );

    const skillIds = skillIdResult.rows.map((r) => r.id);
    const query = `
  SELECT
    j.id,j.max_pay,min_pay,pay_type,j.body,j.type,
    COUNT(js.skill_id) AS matched_skill_count
  FROM job_skill js
  JOIN jobs j ON j.id = js.job_id
  WHERE js.skill_id = ANY($1)
  GROUP BY j.id
  ORDER BY matched_skill_count DESC
  LIMIT 20;
`;

    const result = await pool.query(query, [skillIds]);
    console.log(result);

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "soe dfnfjaknsdf" });
  }
};
