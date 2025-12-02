import { pool } from "./db.js";

const skills = [
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

export const seedSkills = async () => {
  console.log("🚀 Seeding skills...");

  try {
    // Convert skill names into value strings for SQL
    // const values = skills.map((skill) => `('${skill}')`).join(", ");
    // const query = `
    //   INSERT INTO skills (skill_name)
    //   VALUES ${values}
    //   ON CONFLICT (skill_name) DO NOTHING;
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

    await pool.query(query);
    console.log(`✅ Inserted ${skills.length} skills successfully`);
  } catch (err) {
    console.error("❌ Error seeding skills:", err);
  }
};
