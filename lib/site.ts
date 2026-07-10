export const site = {
  // Update this to the custom domain if one is attached after deployment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lionaelsurya.vercel.app",
  name: "Lionael Surya",
  title: "Lionael Surya — Building systems people can depend on",
  description:
    "I build production-ready data platforms, internal software, and AI-powered systems while studying Data Science at Seneca Polytechnic. My focus is reliable architecture, reproducible pipelines, and software people can actually trust.",
  email: "suryalionael@gmail.com",
  github: "https://github.com/suryalionael",
  linkedin: "https://www.linkedin.com/in/lionael-dwitama/",
} as const;
