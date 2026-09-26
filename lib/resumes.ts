export type Resume = {
  slug: string;
  title: string;
  summary: string;
  /** Clean public filename, e.g. /resumes/data-analyst.pdf */
  file: string;
  /** Clean filename the browser saves on download. */
  downloadName: string;
  /** First page render used as the card preview. */
  preview: { src: string; width: number; height: number };
  category: string;
};

const CATEGORIES = [
  "Data",
  "Business",
  "AI",
  "Software",
  "Other",
] as const;

const resume = (
  category: (typeof CATEGORIES)[number],
  slug: string,
  title: string,
  summary: string,
  downloadName: string,
): Resume => ({
  slug,
  title,
  summary,
  category,
  file: `/resumes/${slug}.pdf`,
  downloadName,
  preview: { src: `/resumes/preview/${slug}.webp`, width: 816, height: 1056 },
});

export const resumes: Resume[] = [
  resume(
    "Data",
    "data-analyst",
    "Data Analyst",
    "Data analytics, SQL, Python, dbt, forecasting, and applied analytics.",
    "Lionael_Surya_Data_Analyst_Resume.pdf",
  ),
  resume(
    "Data",
    "data-analytics-bi",
    "Data Analytics / BI",
    "BI, Power BI, dashboards, data modeling, and business-facing analytics.",
    "Lionael_Surya_Data_Analytics_BI_Resume.pdf",
  ),
  resume(
    "Data",
    "data-engineer",
    "Data Engineer",
    "ETL, streaming, Spark, Kafka, Airflow, dbt, and cloud-oriented data systems.",
    "Lionael_Surya_Data_Engineer_Resume.pdf",
  ),
  resume(
    "Data",
    "data-scientist",
    "Data Scientist",
    "Machine learning, forecasting, modeling, and decision-focused analytics.",
    "Lionael_Surya_Data_Scientist_Resume.pdf",
  ),
  resume(
    "Business",
    "business-analyst",
    "Business Analyst",
    "Requirements, stakeholder communication, roadmaps, and analytics-driven decisions.",
    "Lionael_Surya_Business_Analyst_Resume.pdf",
  ),
  resume(
    "AI",
    "ai-ml-engineering",
    "AI / ML Engineering",
    "AI development, LLM applications, machine learning, and intelligent systems.",
    "Lionael_Surya_AI_ML_Engineering_Resume.pdf",
  ),
  resume(
    "AI",
    "ai-training-evaluation",
    "AI Training & Evaluation",
    "AI training, evaluation, annotation, and model quality.",
    "Lionael_Surya_AI_Training_Evaluation_Resume.pdf",
  ),
  resume(
    "AI",
    "ai-automation",
    "AI Automation",
    "AI automation, workflow automation, and digital transformation.",
    "Lionael_Surya_AI_Automation_Resume.pdf",
  ),
  resume(
    "Software",
    "software-backend",
    "Software — Backend",
    "Backend systems, APIs, databases, and application development.",
    "Lionael_Surya_Software_Backend_Resume.pdf",
  ),
  resume(
    "Software",
    "software-web-fullstack",
    "Software — Web / Full Stack",
    "Frontend, web, and full-stack development.",
    "Lionael_Surya_Software_Web_Full_Stack_Resume.pdf",
  ),
  resume(
    "Other",
    "quantitative-analyst",
    "Quantitative Analyst",
    "Quantitative analysis, derivatives modelling, and financial mathematics.",
    "Lionael_Surya_Quantitative_Analyst_Resume.pdf",
  ),
  resume(
    "Other",
    "investment-analyst",
    "Investment Analyst",
    "Investment, markets, financial analysis, and research.",
    "Lionael_Surya_Investment_Analyst_Resume.pdf",
  ),
  resume(
    "Other",
    "data-analytics-consulting",
    "Data & Analytics Consulting",
    "Consulting-oriented data and analytics work.",
    "Lionael_Surya_Data_Analytics_Consulting_Resume.pdf",
  ),
  resume(
    "Other",
    "client-solutions",
    "Client Solutions",
    "Client-facing analytics, reporting, and solutions.",
    "Lionael_Surya_Client_Solutions_Resume.pdf",
  ),
  resume(
    "Other",
    "cloud-devops-it",
    "Cloud / DevOps / IT",
    "Cloud, infrastructure, DevOps, AWS, Terraform, and IT.",
    "Lionael_Surya_Cloud_DevOps_IT_Resume.pdf",
  ),
  resume(
    "Other",
    "data-coordinator",
    "Data Coordinator",
    "Data coordination, validation, administration, and operations.",
    "Lionael_Surya_Data_Coordinator_Resume.pdf",
  ),
  resume(
    "Other",
    "member-services",
    "Member Services",
    "Customer/member services and campus-oriented work.",
    "Lionael_Surya_Member_Services_Resume.pdf",
  ),
];

export const resumesByCategory = CATEGORIES.map((category) => ({
  category,
  resumes: resumes.filter((r) => r.category === category),
})).filter((group) => group.resumes.length > 0);
