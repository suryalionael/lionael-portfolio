export const site = {
  // Update this to the custom domain if one is attached after deployment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lionaelsurya.vercel.app",
  name: "Lionael Surya",
  title: "Lionael Surya — Built like production",
  description:
    "Data science student at Seneca Polytechnic building data systems the way real teams do — tested, documented, reproducible, and shipped. Data engineering, analytics engineering, ML, and software.",
  email: "suryalionael@gmail.com",
  github: "https://github.com/suryalionael",
  linkedin: "https://www.linkedin.com/in/lionael-dwitama/",
} as const;
