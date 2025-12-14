import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const askGroq = async (text) => {
  const prompt = `
### Task: Job Filter Extraction

You are a strict data extraction engine. Your task is to analyze the user's input text and extract job filter parameters based exclusively on the provided canonical skill list.

### Canonical Skill List (Relevant Subset):
[
  // --- Backend & Server ---
  "Node.js",
  "Express",
  "Nest.js",
  "Fastify",
  "Hapi.js",
  "Koa",
  "Spring Boot",
  "Django",
  "Flask",
  "FastAPI",
  "Laravel",
  "Ruby on Rails",
  "Golang",
  "Rust",
  "Java",
  "C#",
  "C++",
  "Python",
  "PHP",
  "Scala",
  "Kotlin",
  "Elixir",
  "GraphQL",
  "REST APIs",
  "gRPC",
  "Microservices",
  "WebSockets",
  "API Design",
  "Authentication",
  "Authorization",
  "Caching",
  "Load Balancing",
  "Serverless",
  "Socket.io",
  "Message Queues",
  "Kafka",
  "RabbitMQ",
  "NATS",

  // --- Frontend ---
  "React",
  "Redux",
  "Next.js",
  "Remix",
  "Angular",
  "Vue",
  "Nuxt.js",
  "Svelte",
  "SvelteKit",
  "Backbone.js",
  "jQuery",
  "Lit",
  "SolidJS",
  "Preact",
  "Tailwind CSS",
  "Bootstrap",
  "Chakra UI",
  "Material UI",
  "Styled Components",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "SASS",
  "LESS",
  "Webpack",
  "Vite",
  "Parcel",
  "Rollup",
  "Babel",
  "Storybook",
  "Three.js",
  "WebGL",

  // --- Databases ---
  "PostgreSQL",
  "MySQL",
  "MariaDB",
  "SQLite",
  "MongoDB",
  "Redis",
  "Cassandra",
  "Elasticsearch",
  "Firebase",
  "Supabase",
  "DynamoDB",
  "CouchDB",
  "Neo4j",
  "ClickHouse",
  "InfluxDB",
  "TimescaleDB",
  "Snowflake",
  "BigQuery",

  // --- DevOps / Cloud ---
  "Docker",
  "Kubernetes",
  "Helm",
  "Terraform",
  "Ansible",
  "Jenkins",
  "GitLab CI/CD",
  "GitHub Actions",
  "AWS",
  "GCP",
  "Azure",
  "DigitalOcean",
  "Vercel",
  "Netlify",
  "Heroku",
  "Nginx",
  "Apache",
  "Linux",
  "Ubuntu",
  "CentOS",
  "Systemd",
  "CI/CD",
  "Monitoring",
  "Prometheus",
  "Grafana",
  "CloudFormation",
  "Load Testing",
  "Logging",
  "Elastic Stack (ELK)",
  "Kibana",
  "Loki",
  "Sentry",
  "New Relic",
  "PagerDuty",
  "Cloudflare",
  "ArgoCD",
  "Istio",
  "OpenShift",
  "Vault",
  "Consul",

  // --- Data & ML ---
  "Machine Learning",
  "Deep Learning",
  "AI",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Keras",
  "XGBoost",
  "LightGBM",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "Data Analysis",
  "Data Visualization",
  "NLP",
  "Computer Vision",
  "Data Engineering",
  "ETL",
  "Airflow",
  "DBT",
  "Hadoop",
  "Spark",
  "Kafka Streams",
  "Feature Engineering",
  "MLOps",
  "Model Deployment",
  "Jupyter",
  "Colab",
  "OpenAI API",
  "LangChain",

  // --- Security ---
  "Penetration Testing",
  "OWASP",
  "JWT",
  "OAuth2",
  "SAML",
  "Encryption",
  "SSL/TLS",
  "Firewall",
  "Vulnerability Scanning",
  "Threat Modeling",
  "Identity Management",
  "Zero Trust",
  "SIEM",
  "SOC",
  "Cybersecurity",

  // --- Mobile Development ---
  "React Native",
  "Flutter",
  "Swift",
  "Objective-C",
  "Kotlin Multiplatform",
  "Android",
  "iOS",
  "Xcode",
  "Android Studio",
  "Jetpack Compose",
  "Capacitor",
  "Ionic",
  "Cordova",
  "Expo",
  "Firebase Cloud Messaging",

  // --- Testing / QA ---
  "Jest",
  "Mocha",
  "Chai",
  "Cypress",
  "Playwright",
  "Selenium",
  "Puppeteer",
  "Vitest",
  "Postman",
  "Newman",
  "Load Testing",
  "JUnit",
  "PyTest",
  "Integration Testing",
  "Unit Testing",
  "End-to-End Testing",
  "QA Automation",

  // --- System Design / Architecture ---
  "System Design",
  "Scalability",
  "High Availability",
  "Fault Tolerance",
  "Distributed Systems",
  "Event-Driven Architecture",
  "CQRS",
  "Event Sourcing",
  "API Gateway",
  "Reverse Proxy",
  "Rate Limiting",
  "Circuit Breaker Pattern",

  // --- Analytics / Product ---
  "Google Analytics",
  "Mixpanel",
  "Amplitude",
  "A/B Testing",
  "Conversion Optimization",
  "Product Strategy",
  "User Research",

  // --- Tools / Version Control ---
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "VS Code",
  "IntelliJ IDEA",
  "JIRA",
  "Confluence",
  "Slack",
  "Trello",
  "Linear",
  "Figma",
  "Notion",

  // --- Soft Skills / General Tech ---
  "Agile",
  "Scrum",
  "Kanban",
  "DevOps Culture",
  "Technical Writing",
  "Documentation",
  "Mentorship",
  "Code Review",
  "Team Leadership",
  "Problem Solving",
  "Critical Thinking",
  "Communication",
];

### Output Format (STRICT JSON SCHEMA):

You MUST return a JSON object that strictly adheres to the following structure. 
DO NOT include any markdown formatting (e.g., \`\`\`json), explanations, or comments.
The output MUST start with '{' and end with '}'.

{
  "skills": ["<canonical skill name 1>", "<canonical skill name 2>"],
  "experience": "<extracted experience requirement, e.g., '5+ years' or 'Mid-level'>",
  "salary": "<extracted salary/pay range, e.g., '10LPA+' or '$120k'>"
}

### Mapping Instructions:
1. Skills are the top priority. Map any variation or misspelling in the Input Text to the **exact canonical name** from the list above.
2. If a skill is not in the list, omit it from the "skills" array.
3. If a value cannot be extracted for "experience" or "salary", use an empty string ("").

### Input Text:
"${text}"
`;
  // console.log(prompt);

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ⚡ extremely fast
      messages: [
        {
          role: "user",
          content: `${prompt}
`,
        },
      ],
    });
    console.log(response);

    return response;
  } catch (error) {
    return {};
  }
};

// async function askGroq() {
//   const response = await groq.chat.completions.create({
//     model: "llama-3.1-8b-instant", // ⚡ extremely fast
//     messages: [
//       {
//         role: "user",
//         content: `
// Extract structured job filters from this text.
// Correct spelling automatically.

// Text: "Jobs for backnd developr in blr"

// Return **only JSON**. Do not write any explanations, functions, or code blocks. The JSON keys must be:
// {
//   "job_title": "",
//   "skills": [],
//   "location": "",
//   "experience": "",
//   "salary": "",
//   "other_keywords": []
// }
// `,
//       },
//     ],
//   });

//   console.log(response.choices[0].message.content);
// }

// askGroq();
export default askGroq;
