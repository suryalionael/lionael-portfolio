export type ArchNode = {
  id: string;
  label: string;
  tech: string;
  detail: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  group?: string;
  discipline: Discipline;
  year: string;
  live: boolean;
  featured?: boolean;
  summary: string;
  tags: string[];
  links: { github?: string; demo?: string };
  metrics: { value: string; label: string }[];
  architecture: { nodes: ArchNode[]; foundation: string[] };
  sections: { heading: string; body: string[] }[];
  images?: ProjectImage[];
};

export const disciplines = [
  "Data Engineering",
  "Data Science & ML",
  "Full Stack",
  "Automation",
  "Research & Simulation",
] as const;

export type Discipline = (typeof disciplines)[number];

export const projects: Project[] = [
  {
    slug: "nutrition-priority-index",
    title: "Nutrition Priority Index",
    category: "Policy analytics",
    group: "Featured Systems",
    discipline: "Data Science & ML",
    year: "2026",
    live: true,
    featured: true,
    summary:
      "A transparent, evidence-backed index ranking Indonesia's 38 provinces for child-nutrition intervention — built on real government data only, validated before published.",
    tags: ["Python", "GeoPandas", "PySAL", "Streamlit", "pytest"],
    links: {
      github: "https://github.com/suryalionael/nutrition-analytics-indonesia",
      demo: "https://nutrition-analytics-indonesia.streamlit.app",
    },
    metrics: [
      { value: "67", label: "passing tests" },
      { value: "0.74", label: "outcome correlation (Spearman)" },
      { value: "38/38", label: "provinces covered" },
    ],
    architecture: {
      nodes: [
        {
          id: "sources",
          label: "Government sources",
          tech: "BPS · Kemenkes · BIG",
          detail:
            "Seven datasets from Statistics Indonesia's WebAPI, health-ministry exports, and official province boundaries. Every file is traceable to a real government source — zero synthetic values anywhere in the pipeline.",
        },
        {
          id: "ingest",
          label: "Ingestion & validation",
          tech: "Python · pandas",
          detail:
            "Scripted ingestion with provenance — source URLs, publication dates, checksums — generated from real runs, never hand-written. Publication gaps (two series cover 34 of 38 provinces) are surfaced and documented, not patched over.",
        },
        {
          id: "index",
          label: "Priority index engine",
          tech: "weighted index · PCA benchmark",
          detail:
            "Combines socioeconomic vulnerability and education access into one ranking. The vulnerability input was decided empirically: a single expenditure indicator beat a PCA composite in head-to-head validation and was promoted. Stunting stays outcome context, never a weighted input.",
        },
        {
          id: "spatial",
          label: "Spatial statistics",
          tech: "Moran's I · LISA",
          detail:
            "Global Moran's I of 0.622 (p = 0.001) confirms need clusters geographically. LISA finds six significant local clusters, including one contiguous high-high cluster spanning the Papua region.",
        },
        {
          id: "dashboard",
          label: "Public dashboard",
          tech: "Streamlit",
          detail:
            "A six-page dashboard where a policymaker — or a skeptical analyst — can explore rankings, maps, and the full methodology, then audit every decision end to end. Deployed and public.",
        },
      ],
      foundation: [
        "pytest — 67 tests",
        "GitHub Actions CI",
        "every methodology decision documented",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Indonesia funds child-nutrition interventions — like the national Makan Bergizi Gratis school-feeding program — across 38 provinces with very different needs and a limited budget. Which provinces come first, and on what basis?",
          "A ranking a policymaker can't audit is a ranking they can't defend. That constraint shaped the whole system: every dataset traceable, every methodological choice tested against an alternative, every limitation documented in plain language.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A Nutrition Priority Index built exclusively from real government data, combining socioeconomic vulnerability with education access. The ranking was validated before it was published: against real outcomes (Spearman r = 0.74), against weighting perturbation (rank order stable at r > 0.99 across ±20%), and against an alternative methodology.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "The defining decision: the sophisticated method lost. A PCA composite of three collinear indicators had the textbook rationale, but a single expenditure-per-capita signal predicted outcomes slightly better (r = 0.74 vs 0.72), needs no fitted parameters, and explains itself in one sentence. It won a scored decision matrix 23–13 and was promoted; PCA is retained as a documented sensitivity benchmark, not deleted.",
          "Stunting prevalence is reported as outcome context but never used as a weighted input — that would validate the index against the thing it was built from.",
        ],
      },
      {
        heading: "Challenges & trade-offs",
        body: [
          "No scriptable source exists for stunting data; six alternatives were investigated before settling on a documented manual export. The standard boundary dataset was missing four current provinces, and the commonly-suggested workaround — duplicating parent polygons — was rejected after testing showed it would distort the spatial statistics specifically. A distinct-geometry source was found and substituted.",
          "Honesty over headline numbers: the outcome correlation is 0.74 across all 38 provinces, but 0.67 with partial-coverage provinces excluded — both are reported. Hosting on Streamlit's free tier trades a ~30-second cold start for zero cost.",
        ],
      },
      {
        heading: "Results",
        body: [
          "A live, public decision-support dashboard backed by 67 passing tests. The analysis surfaced a 2.5× disparity in mean priority between Eastern and Western Indonesia (ANOVA p = 2.8×10⁻⁸) and a contiguous high-need cluster across Papua — findings a funding allocation could act on.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Evidence beats elegance: the more sophisticated method isn't the better method until it wins on data. And documentation isn't overhead — it's what makes an analysis auditable, which is what makes it usable.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/nutrition-home.png",
        alt: "Nutrition Priority Index dashboard home page with national overview",
        caption: "Live six-page dashboard — overview, priority map, and ranking explorer",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/nutrition-map.png",
        alt: "Choropleth map of Indonesia showing provincial nutrition priority tiers",
        caption: "Live six-page dashboard — overview, priority map, and ranking explorer",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/nutrition-ranking.png",
        alt: "Ranking explorer table listing provinces by Nutrition Priority Index score",
        caption: "Live six-page dashboard — overview, priority map, and ranking explorer",
        width: 1440,
        height: 1200,
      },
    ],
  },
  {
    slug: "streaming-clickstream-pipeline",
    title: "Streaming Clickstream Pipeline",
    category: "Real-time data",
    group: "Featured Systems",
    discipline: "Data Engineering",
    year: "2026",
    live: false,
    featured: true,
    summary:
      "A real-time lakehouse for e-commerce clickstream — Kafka to Spark to Delta Lake to a live dashboard. Seven services, one command, exactly-once semantics.",
    tags: ["Kafka", "Spark", "Delta Lake", "DuckDB", "Docker"],
    links: {
      github: "https://github.com/suryalionael/streaming-clickstream-pipeline",
    },
    metrics: [
      { value: "~50/s", label: "events ingested" },
      { value: "10 s", label: "micro-batch cadence" },
      { value: "7", label: "services, one command" },
    ],
    architecture: {
      nodes: [
        {
          id: "generator",
          label: "Event generator",
          tech: "Python",
          detail:
            "Synthesizes ~50 clickstream events per second — page views, searches, cart actions, purchases — including deliberately invalid messages to exercise the dead-letter path.",
        },
        {
          id: "kafka",
          label: "Kafka",
          tech: "6 partitions",
          detail:
            "Durable, partitioned, replayable event log with an idempotent producer. Unparseable messages are captured in a dead-letter queue with failure metadata for offline reprocessing.",
        },
        {
          id: "spark",
          label: "Spark Structured Streaming",
          tech: "event time · watermarks",
          detail:
            "Ten-second micro-batches with event-time processing. A 10-minute watermark absorbs late-arriving events; a single foreachBatch writes all three lake layers so checkpointing stays simple.",
        },
        {
          id: "delta",
          label: "Delta lakehouse",
          tech: "Bronze → Silver → Gold on MinIO",
          detail:
            "Medallion layers with ACID transactions: raw events with ingestion metadata, then validated and deduplicated records, then aggregated business metrics — funnels, product performance, traffic.",
        },
        {
          id: "duckdb",
          label: "DuckDB",
          tech: "serving layer",
          detail:
            "Zero-config embedded OLAP that reads Delta directly — a serving layer without standing up a warehouse. The right size for the job, deliberately.",
        },
        {
          id: "dashboard",
          label: "Live dashboard",
          tech: "Streamlit",
          detail:
            "Six pages of real-time analytics: sparklines, conversion funnels, geographic heatmaps, and pipeline health monitoring.",
        },
      ],
      foundation: [
        "Docker Compose — 7 services with health checks",
        "GitHub Actions — lint · types · tests · build",
        "dead-letter queue for invalid events",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Batch pipelines answer yesterday's questions. E-commerce platforms emit a continuous stream of behavioral events, and understanding conversion funnels or product performance in real time means ingesting, processing, and serving those events with minimal latency — without losing any when things restart.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "An event-driven pipeline that moves a click from the browser to an analytics dashboard in under a minute: Kafka for durable ingestion, Spark Structured Streaming for processing, a Delta Lake medallion architecture on S3-compatible storage, DuckDB for serving, and Streamlit for the live view. The whole stack starts with one command.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Delta Lake over raw Parquet: ACID transactions and schema evolution are worth the metadata overhead. DuckDB over a warehouse: zero-config and fast, accepting no multi-user concurrency — right-sized for the workload. One foreachBatch query for all three layers: simpler checkpoint management, at the cost of a shared processing cadence. MinIO over cloud S3: fully reproducible local development, one config change away from AWS.",
        ],
      },
      {
        heading: "Challenges & trade-offs",
        body: [
          "The hard part of streaming is failure, not throughput. The pipeline achieves effectively-exactly-once semantics through idempotent Delta writes plus Kafka offset tracking, recovers from restarts via checkpointing and consumer-group rebalancing, and handles out-of-order events with watermarking — while a 7-day range filter drops stale replays.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Sub-minute latency from raw event to dashboard, with invalid events quarantined instead of crashing the stream. A fresh clone runs the entire seven-service stack — with health checks — from a single command, and CI verifies lint, types, tests, and the Docker build on every push.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Streaming guarantees are earned in failure modes, not happy paths. Designing for the restart — checkpoints, idempotence, dead letters — is what separates a demo from a pipeline.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/streaming-clickstream.png",
        alt: "Streaming Clickstream Pipeline GitHub repository with architecture documentation",
        caption: "Architecture documented in the repo — Kafka, Spark, Delta Lake, DuckDB, Streamlit",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: "aspen-os",
    title: "Aspen OS",
    category: "Internal software",
    group: "Featured Systems",
    discipline: "Full Stack",
    year: "2026",
    live: true,
    featured: true,
    summary:
      "The project operating system a nonprofit team actually runs on — tasks, kanban, documentation, and collaboration in one place. Built solo, in production at QuickRN.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    links: {
      github: "https://github.com/suryalionael/aspen-os",
      demo: "https://aspen-os.vercel.app",
    },
    metrics: [
      { value: "in production", label: "daily use at QuickRN" },
      { value: "1", label: "hub for tasks, docs, kanban" },
      { value: "solo", label: "designed, built, and shipped" },
    ],
    architecture: {
      nodes: [
        {
          id: "ui",
          label: "Next.js app",
          tech: "App Router · TypeScript",
          detail:
            "Server-first React with the App Router: shadcn/ui components over Tailwind, client interactivity only where the kanban and editors need it.",
        },
        {
          id: "data",
          label: "Supabase",
          tech: "Postgres · auth",
          detail:
            "Postgres with SQL migrations under version control, plus Supabase auth — a real relational schema for projects, tasks, and documents rather than a document soup.",
        },
        {
          id: "workflows",
          label: "Project workflows",
          tech: "kanban · tasks · docs",
          detail:
            "Kanban boards, task tracking, and documentation live in one tool with one source of truth — replacing the spreadsheet-and-chat sprawl the team had before.",
        },
        {
          id: "deploy",
          label: "Deployment",
          tech: "Vercel",
          detail:
            "Continuously deployed on Vercel; the sprint planning that drives development is documented in the repo itself.",
        },
      ],
      foundation: [
        "TypeScript strict",
        "SQL migrations in version control",
        "built for and with the team using it",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "QuickRN's project coordination lived across spreadsheets, chats, and memory — the default state of most small nonprofits. The team needed one place for tasks, boards, and documentation, simple enough that non-technical members would actually use it.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "Aspen OS: an internal project operating system built on Next.js and Supabase, covering task management, kanban workflows, project tracking, documentation, and collaboration — designed with the people who use it daily.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Server Components by default with client code only where interaction demands it — the same discipline as this portfolio. A relational Postgres schema with versioned migrations instead of a schemaless store, because project data has real relationships and real integrity constraints. And 'simplest tool that the team enjoys' as the explicit product bar, which cut more features than it added.",
        ],
      },
      {
        heading: "Results",
        body: [
          "The platform is the team's daily hub at QuickRN — the strongest kind of result a portfolio project can have: real users who chose to keep using it. Built end-to-end solo, from requirements gathering with non-technical stakeholders to deployment and maintenance.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Products for real teams are shaped by adoption, not features: every design decision had to survive contact with people who don't care how it's built. Maintenance — the part after shipping — is where most of the engineering lessons lived.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/aspen-os.png",
        alt: "Aspen OS application showing the project dashboard",
        caption: "Live application — internal project operating system in daily use at QuickRN",
        width: 1440,
        height: 1000,
      },
    ],
  },
  {
    slug: "idx-stock-scanner",
    title: "IDX Stock Scanner",
    category: "AI engineering",
    group: "Featured Systems",
    discipline: "Automation",
    year: "2026",
    live: true,
    featured: true,
    summary:
      "A daily decision-support agent for Indonesian equities with a three-layer architecture: rules filter, ML ranks, and an LLM explains — each layer doing what it's best at.",
    tags: ["Python", "XGBoost", "Claude API", "yfinance", "Parquet"],
    links: {
      github:
        "https://github.com/suryalionael/Lionael-Surya/tree/main/machine-learning/idx-stock-signal-scanner",
    },
    metrics: [
      { value: "3", label: "layers — rules → ML → LLM" },
      { value: "24", label: "engineered indicators" },
      { value: "daily", label: "scan cadence" },
    ],
    architecture: {
      nodes: [
        {
          id: "fetch",
          label: "Data fetcher",
          tech: "yfinance · Parquet",
          detail:
            "Daily OHLCV for IDX-listed stocks behind an abstract fetcher contract, with incremental updates persisted to Parquet — providers can change without touching the pipeline.",
        },
        {
          id: "validate",
          label: "Validator & features",
          tech: "24 indicators",
          detail:
            "Data quality checks and gap handling, then a feature engine computing 24 technical indicators per ticker.",
        },
        {
          id: "rules",
          label: "Rule engine",
          tech: "guardrails first",
          detail:
            "Deterministic rules reject unsuitable stocks before any model sees them — liquidity, data quality, structural filters. The ML layer only ranks candidates that already passed judgment.",
        },
        {
          id: "ml",
          label: "ML ranker",
          tech: "XGBoost",
          detail:
            "Probabilistic ranking of how likely each candidate is to exceed a return threshold within a horizon — ordering, not oracle.",
        },
        {
          id: "llm",
          label: "LLM explainer",
          tech: "Claude",
          detail:
            "A short narrative per ticker: why this signal fired and what to watch — the layer that turns a score into something a human can interrogate.",
        },
      ],
      foundation: [
        "explicitly decision-support, not profit guarantee",
        "source private — architecture documented",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Screening hundreds of IDX tickers daily by hand doesn't scale, but neither does trusting a single opaque model with a ranked list. The design problem is trust: every recommendation needs to be filterable, rankable, and explainable.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A three-layer pipeline where each layer does what it's structurally best at: deterministic rules provide guardrails, gradient-boosted ranking provides prioritization, and an LLM provides per-ticker narrative explanation. No layer is asked to do another's job.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Rules run before ML deliberately — guardrails should be auditable, and a rejected stock should have a stateable reason. The LLM sits last and only explains; it never picks. And the whole system is framed as decision support with that caveat written into the README, because overstating a financial tool's promise is the fastest way to make it harmful.",
        ],
      },
      {
        heading: "Results",
        body: [
          "A daily scanner producing ranked, explained candidates from IDX market data — the most heavily iterated project in the portfolio, with 100+ commits of pipeline hardening. The source is private given the domain; the architecture is documented publicly.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Hybrid systems beat monoliths when each layer's failure mode is different: rules fail loudly, models fail statistically, LLMs fail plausibly. Keeping them separate keeps each failure diagnosable.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/idx-stock-scanner.png",
        alt: "IDX Stock Scanner dashboard showing daily market analysis",
        caption: "Daily decision-support dashboard — rules filter, ML ranker, and LLM explainer layers",
        width: 1440,
        height: 900,
      },
    ],
  },

  /* ── Data Engineering ── */

  {
    slug: "retail-sales-etl-pipeline",
    title: "Retail Sales ETL Pipeline",
    category: "Data engineering",
    group: "Data Engineering",
    discipline: "Data Engineering",
    year: "2026",
    live: false,
    summary:
      "Production-style batch ETL for a real retail dataset: validation, a star-schema warehouse, Airflow orchestration, and reruns that are safe by design.",
    tags: ["Python", "Airflow", "PostgreSQL", "Docker", "pytest"],
    links: {
      github: "https://github.com/suryalionael/retail-sales-etl-pipeline",
    },
    metrics: [
      { value: "idempotent", label: "incremental re-runs by design" },
      { value: "star", label: "schema warehouse model" },
      { value: "CI", label: "lint + tests on every push" },
    ],
    architecture: {
      nodes: [
        {
          id: "extract",
          label: "Extract",
          tech: "UCI Online Retail",
          detail:
            "Ingests a real public retail transaction dataset — raw exports with the mess left in: cancelled orders, missing customers, inconsistent codes.",
        },
        {
          id: "validate",
          label: "Data quality",
          tech: "validation rules",
          detail:
            "Explicit validation before anything loads: schema checks and quality rules so bad records are caught at the boundary instead of discovered in a dashboard.",
        },
        {
          id: "transform",
          label: "Transform",
          tech: "star schema",
          detail:
            "Shapes transactions into a dimensional model — facts and dimensions for time, product category, and market — so BI questions about revenue and merchandising have one consistent answer.",
        },
        {
          id: "load",
          label: "Warehouse",
          tech: "PostgreSQL",
          detail:
            "Loads PostgreSQL incrementally and idempotently: the same run executed twice produces the same warehouse, which is what makes retries and backfills safe.",
        },
        {
          id: "orchestrate",
          label: "Orchestration",
          tech: "Airflow · Docker Compose",
          detail:
            "An Airflow DAG coordinates the pipeline inside a Docker Compose stack; a fresh clone can install, test, start the stack, and trigger the DAG end to end.",
        },
      ],
      foundation: [
        "pytest + GitHub Actions CI",
        "Docker Compose stack",
        "Power BI connection guide",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Retail leaders need reliable reporting across time, product category, and market — but raw transaction exports are inconsistent and unsafe to report on directly. The goal: turn them into a governed warehouse model that BI dashboards can trust.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A batch ETL pipeline with an explicit definition of done: a fresh clone can install dependencies, pass tests, start the Docker stack, trigger the Airflow DAG, and load the warehouse — with incremental reruns that never double-count.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Idempotence was treated as a requirement, not a nice-to-have: pipelines fail, and a pipeline you can't safely re-run is a pipeline you can't operate. Validation runs before load so data quality problems surface at the boundary. The star schema trades storage for query clarity — the right trade for a reporting warehouse.",
        ],
      },
      {
        heading: "Results",
        body: [
          "A reproducible warehouse stack with CI running lint and pytest on every push, ready for Power BI on top. The pipeline patterns here — validation gates, incremental loads, safe retries — are the same ones the streaming pipeline later applied in real time.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Batch ETL is where pipeline discipline is learned: if reruns aren't safe and quality isn't checked at the boundary, everything downstream inherits the problem.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/retail-sales-etl.png",
        alt: "Retail Sales ETL Pipeline GitHub repository with pipeline architecture",
        caption: "GitHub repository — Airflow-orchestrated batch ETL with star-schema warehouse",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: "dbt-ecommerce-analytics-mart",
    title: "dbt E-Commerce Analytics Mart",
    category: "Analytics engineering",
    group: "Data Engineering",
    discipline: "Data Engineering",
    year: "2026",
    live: false,
    summary:
      "A tested dbt project turning the real Olist e-commerce dataset into a single source of truth for revenue, customers, and product performance.",
    tags: ["dbt", "PostgreSQL", "SQL", "Docker", "Power BI"],
    links: {
      github: "https://github.com/suryalionael/dbt-ecommerce-analytics-mart",
    },
    metrics: [
      { value: "14", label: "models, staging → marts" },
      { value: "1", label: "revenue definition everywhere" },
      { value: "100%", label: "real Olist data — no synthetic" },
    ],
    architecture: {
      nodes: [
        {
          id: "raw",
          label: "Raw sources",
          tech: "Olist dataset · Postgres",
          detail:
            "The real Brazilian e-commerce dataset from Olist — orders, items, payments, products, customers — loaded as raw sources with dbt source definitions and freshness context.",
        },
        {
          id: "staging",
          label: "Staging",
          tech: "stg_ models",
          detail:
            "One staging model per source table: rename, cast, standardize. Nothing downstream ever touches raw tables directly.",
        },
        {
          id: "intermediate",
          label: "Intermediate",
          tech: "int_ models",
          detail:
            "Enrichment happens once, in one place — order items joined to products and payments, customer lifetimes computed — so marts stay thin and consistent.",
        },
        {
          id: "marts",
          label: "Marts",
          tech: "facts & dimensions",
          detail:
            "Consumer-facing models at explicit grains: fct_orders at order-line grain, dim_products and dim_customers with rollups, fct_revenue_monthly for finance — all deriving revenue from one macro.",
        },
        {
          id: "bi",
          label: "BI layer",
          tech: "exposures · Power BI",
          detail:
            "dbt exposures declare what the dashboard depends on, so lineage runs from raw table to business chart.",
        },
      ],
      foundation: [
        "singular data tests — revenue consistency, no negatives",
        "GitHub Actions CI against real data",
        "Docker — one-command Postgres + dbt",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Every team that computes revenue slightly differently eventually has three dashboards with three answers. The point of an analytics mart is one tested definition of the business — this project builds that for a real e-commerce dataset.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A dbt project with a disciplined staging → intermediate → marts flow: 14 models, a single revenue macro used everywhere, explicit fact grains, and consumer marts for core, customer, and finance questions — tested end-to-end against real data in CI.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Revenue lives in one macro, not in every model that needs it — change it once, every mart agrees. Singular tests encode business invariants (customer spend must reconcile across marts; revenue is never negative) rather than just column-level checks. And the whole project runs against the real Olist data in CI, because models that only pass on toy data haven't been tested.",
        ],
      },
      {
        heading: "Results",
        body: [
          "A warehouse where the order-line fact, the customer dimension, and the monthly revenue series all provably agree — with lineage from raw source to Power BI exposure, and CI that would catch a definition drifting.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Analytics engineering is API design for data: the grain, the definitions, and the tests are the contract. dbt's real value isn't SQL templating — it's making that contract enforceable.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/dbt-ecommerce.png",
        alt: "dbt E-Commerce Analytics Mart GitHub repository with model documentation",
        caption: "GitHub repository — 14 dbt models with staging, intermediate, and marts layers",
        width: 1440,
        height: 900,
      },
    ],
  },

  /* ── Machine Learning & Data Science ── */

  {
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    category: "Machine learning",
    group: "Machine Learning & Data Science",
    discipline: "Data Science & ML",
    year: "2026",
    live: false,
    summary:
      "An end-to-end churn system for telecom: calibrated XGBoost, SHAP explanations, ROI-optimized thresholds, and FastAPI + Streamlit serving with drift monitoring.",
    tags: ["XGBoost", "SHAP", "Optuna", "FastAPI", "Streamlit"],
    links: {
      github:
        "https://github.com/suryalionael/Customer-Churn-Prediction",
    },
    metrics: [
      { value: "0.847", label: "ROC-AUC on holdout" },
      { value: "86.5%", label: "simulated campaign ROI" },
      { value: "0.657", label: "PR-AUC under class imbalance" },
    ],
    architecture: {
      nodes: [
        {
          id: "data",
          label: "Data & validation",
          tech: "schema + quality checks",
          detail:
            "Raw telecom data is downloaded by script and passed through schema and quality validation, with a generated validation report — the pipeline starts by proving its inputs.",
        },
        {
          id: "features",
          label: "Feature engineering",
          tech: "custom transformers",
          detail:
            "Robust preprocessing and custom feature engineering, built to run identically in training and inference.",
        },
        {
          id: "training",
          label: "Training & tuning",
          tech: "4 models · Optuna",
          detail:
            "Logistic regression, random forest, LightGBM, and XGBoost compared under cross-validation, then Optuna hyperparameter search on the winner.",
        },
        {
          id: "calibration",
          label: "Calibration & ROI",
          tech: "threshold optimization",
          detail:
            "Probabilities are calibrated, then the decision threshold is tuned to maximize simulated dollars saved — accounting for incentive costs — rather than an abstract metric.",
        },
        {
          id: "explain",
          label: "Explainability",
          tech: "SHAP",
          detail:
            "Global and per-customer SHAP attributions, so the retention team sees why a customer is flagged, not just that they are.",
        },
        {
          id: "serving",
          label: "Serving",
          tech: "FastAPI · Streamlit · drift",
          detail:
            "A REST API with /predict and /drift endpoints plus a stakeholder dashboard, with a serialized drift reference profile for production monitoring.",
        },
      ],
      foundation: [
        "GitHub Actions CI",
        "Docker",
        "drift reference profiling",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Acquiring a telecom customer costs several times more than retaining one, but blanket retention discounts burn budget on customers who were never leaving. The useful question isn't who might churn — it's which interventions are worth their cost.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A complete ML system, not a notebook: validated data in, compared and tuned models, calibrated probabilities, a threshold optimized for net savings, SHAP explanations per customer, and a served API + dashboard with drift monitoring for life after deployment.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "PR-AUC is treated as the primary comparison metric because churn is imbalanced and ROC-AUC flatters weak minority-class performance. Calibration comes before thresholding — an uncalibrated probability can't be converted to dollars. And the final threshold maximizes simulated business savings including incentive cannibalization, which is the number a retention team actually optimizes.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Calibrated XGBoost at 0.847 ROC-AUC and 0.657 PR-AUC on holdout, with a simulated net saving of about $20,000 and 86.5% campaign ROI against a do-nothing baseline. The standalone source repository is private; the full write-up and structure are documented in the portfolio monorepo.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "A model's job ends at a probability; a system's job ends at a decision. Calibration, thresholds, explanations, and drift monitoring are what turn the first into the second.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/customer-churn.png",
        alt: "Customer Churn Prediction GitHub repository with system architecture",
        caption: "GitHub repository — end-to-end churn prediction system with XGBoost and SHAP",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: "retail-demand-forecasting",
    title: "Retail Demand Forecasting",
    category: "Forecasting",
    group: "Machine Learning & Data Science",
    discipline: "Data Science & ML",
    year: "2026",
    live: false,
    summary:
      "SKU-level demand forecasting with honest evaluation: walk-forward validation across naive seasonal, Prophet, and XGBoost — beating the baseline before claiming anything.",
    tags: ["Prophet", "XGBoost", "pandas", "Docker", "pytest"],
    links: {
      github: "https://github.com/suryalionael/Retail-Demand-Forecasting",
    },
    metrics: [
      { value: "−74%", label: "MAE vs naive baseline (top SKU)" },
      { value: "3", label: "models compared per SKU" },
      { value: "walk-forward", label: "validation — no leakage" },
    ],
    architecture: {
      nodes: [
        {
          id: "data",
          label: "Transactions",
          tech: "UCI Online Retail II",
          detail:
            "Real retail transactions cleaned and aggregated to SKU-level demand series — the messy step most forecasting demos skip.",
        },
        {
          id: "backtest",
          label: "Backtesting framework",
          tech: "walk-forward",
          detail:
            "Every model is evaluated with walk-forward validation: train on the past, predict the next window, roll forward. No future information ever leaks into a forecast.",
        },
        {
          id: "baseline",
          label: "Naive seasonal baseline",
          tech: "the bar to beat",
          detail:
            "A seasonal-naive forecast is the honest baseline — if a sophisticated model can't beat last season's pattern, it doesn't deserve to ship.",
        },
        {
          id: "models",
          label: "Candidate models",
          tech: "Prophet · XGBoost",
          detail:
            "Prophet for interpretable trend/seasonality decomposition; XGBoost with engineered lag features. On the top SKU, Prophet cut MAE from 702 to 181 versus the baseline, with XGBoost the strongest overall.",
        },
        {
          id: "eval",
          label: "Evaluation",
          tech: "MAE · WAPE · bias",
          detail:
            "Multiple error metrics reported side by side — including bias, which tells an inventory planner whether the model systematically over- or under-orders.",
        },
      ],
      foundation: [
        "GitHub Actions CI",
        "ruff + black",
        "Docker-ready",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Inventory planning lives and dies on demand forecasts: order too little and you stock out, too much and capital sits on shelves. The question for any forecasting system is whether it actually beats the naive approach a planner would use anyway.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A forecasting system built around a backtesting framework rather than a single model: naive seasonal, Prophet, and XGBoost compete per SKU under walk-forward validation, and the winner is chosen on out-of-sample error, not preference.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "The baseline comes first — a model only earns complexity by beating seasonal-naive out of sample. Walk-forward validation over a single train/test split, because retail demand drifts and a one-split score is a lucky draw. And bias is reported alongside MAE, because a symmetric error metric hides the asymmetric costs of over- and under-stocking.",
        ],
      },
      {
        heading: "Results",
        body: [
          "On the highest-volume SKU, Prophet reduced MAE from 702 to 181 against the naive seasonal baseline — a 74% reduction — with XGBoost performing best overall across the evaluation suite. Every number comes from walk-forward backtests, reproducible in CI.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Forecast accuracy claims are only as good as the validation that produced them. The baseline and the backtest are the product; the model is an implementation detail.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/retail-demand.png",
        alt: "Retail Demand Forecasting GitHub repository with backtesting framework",
        caption: "GitHub repository — walk-forward validation with Prophet, XGBoost, and naive seasonal baselines",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: "floodcast-jakarta",
    title: "FloodCast Jakarta",
    category: "Machine learning",
    group: "Machine Learning & Data Science",
    discipline: "Data Science & ML",
    year: "2026",
    live: false,
    summary:
      "Hyperlocal flood-risk early warning for 15 Jakarta neighbourhoods: calibrated multi-horizon XGBoost with SHAP explanations in Bahasa Indonesia and an offline map dashboard.",
    tags: ["XGBoost", "Optuna", "SHAP", "Leaflet", "Python"],
    links: {
      github:
        "https://github.com/suryalionael/Lionael-Surya/tree/main/case-studies/flood-risk-datathon-2026",
    },
    metrics: [
      { value: "3", label: "forecast horizons — 6/12/24 h" },
      { value: "15", label: "pilot neighbourhoods" },
      { value: "≥70%", label: "recall constraint on alerts" },
    ],
    architecture: {
      nodes: [
        {
          id: "sources",
          label: "Data sources",
          tech: "BMKG · floodgates · DEM",
          detail:
            "Three real-world sources fused: BMKG rainfall, Jakarta floodgate telemetry, and digital elevation terrain data for the Ciliwung corridor.",
        },
        {
          id: "features",
          label: "Feature pipeline",
          tech: "modular Python package",
          detail:
            "A layered flood_risk package with separate modules for ingestion, feature engineering, evaluation, and explainability — competition code structured like a system.",
        },
        {
          id: "model",
          label: "Multi-horizon models",
          tech: "XGBoost · Optuna",
          detail:
            "Separate calibrated XGBoost models for 6, 12, and 24-hour horizons, tuned with 30–50 Optuna trials each and early stopping.",
        },
        {
          id: "explain",
          label: "Explainability",
          tech: "SHAP · Bahasa Indonesia",
          detail:
            "Per-prediction SHAP attributions rendered as plain-language advisories in Bahasa Indonesia — for residents and emergency responders, not data scientists.",
        },
        {
          id: "dashboard",
          label: "Map dashboard",
          tech: "Leaflet · offline",
          detail:
            "An interactive dark-mode map with horizon toggles, per-neighbourhood detail, and audience-specific advisories — deployable fully offline with one command, because disaster tooling can't assume connectivity.",
        },
      ],
      foundation: [
        "Azure Functions endpoints — predict · advisory · health",
        "threshold sweep with recall floor",
        "class imbalance handled explicitly",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Jakarta floods every rainy season, and the Ciliwung corridor is among the hardest hit — yet early warning is district-level and often too late for neighbourhood evacuation. Responders need probabilities per kelurahan, hours ahead.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A multi-horizon prediction system that outputs calibrated flood probabilities at 6, 12, and 24 hours for 15 pilot neighbourhoods, classifies them into the four operational alert levels responders already use (Aman → Awas), and explains every prediction in plain Bahasa Indonesia.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Flood events occur in only ~2–8% of hours, so imbalance is handled explicitly: weighted training plus a threshold sweep that maximizes F1 subject to a minimum 70% recall — because in early warning, a missed flood costs more than a false alarm. The dashboard runs fully offline by design; infrastructure that fails during the disaster it predicts is decoration.",
        ],
      },
      {
        heading: "Results",
        body: [
          "An end-to-end system built under datathon constraints: real messy data from three sources, calibrated multi-horizon models, SHAP-backed advisories for three audiences, and a map dashboard that runs from a single local command.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Model metrics have operational meaning: choosing a recall floor is a policy decision expressed in code. Competition deadlines don't excuse unstructured code — the modular package made every late-stage change cheaper.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/floodcast-jakarta.png",
        alt: "FloodCast Jakarta GitHub repository with flood risk prediction documentation",
        caption: "GitHub repository — calibrated multi-horizon XGBoost with SHAP in Bahasa Indonesia",
        width: 1440,
        height: 900,
      },
    ],
  },

  /* ── Client Software & Websites ── */

  {
    slug: "aspen-training-centre",
    title: "Aspen Training Centre",
    category: "Client website",
    group: "Client Software & Websites",
    discipline: "Full Stack",
    year: "2025",
    live: true,
    summary:
      "Responsive marketing website for a Canadian vocational training centre — built with HTML, CSS, and JavaScript. No framework, no build step, no unnecessary complexity.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    links: {
      demo: "https://aspentrainingcentre.ca",
    },
    metrics: [
      { value: "Live", label: "in production" },
      { value: "1", label: "responsive site" },
      { value: "2025", label: "launched" },
    ],
    architecture: {
      nodes: [
        {
          id: "site",
          label: "Static site",
          tech: "HTML · CSS · JavaScript",
          detail:
            "Hand-coded responsive marketing website with semantic HTML, modern CSS layout (flexbox and grid), and vanilla JavaScript for navigation and form handling. No framework — the right tool for a content-focused brochure site.",
        },
        {
          id: "hosting",
          label: "Hosting",
          tech: "Netlify",
          detail:
            "Deployed on Netlify with a custom domain, automated SSL, and serverless form handling for admissions inquiries.",
        },
      ],
      foundation: [
        "Semantic HTML",
        "Responsive design",
        "Mobile-first",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Aspen Training Centre needed a professional web presence to showcase their vocational programs, communicate their educational philosophy, and make it easy for prospective students to find course information.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A clean, typography-driven marketing site built from scratch with HTML, CSS, and JavaScript. The design prioritises content clarity and fast load times over unnecessary complexity. Pages are structured around the training centre's core content — programs, courses, and admissions — with clear navigation and mobile-first responsive layout.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A production website serving as the training centre's primary online presence. The site has received positive client feedback on its improved mobile experience and clearer information architecture.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/aspen-training-centre.png",
        alt: "Aspen Training Centre homepage showing hero section and program overview",
        caption: "Production website — responsive marketing site for a vocational training centre",
        width: 1440,
        height: 1000,
      },
    ],
  },
  {
    slug: "delta-harvest-festival",
    title: "Delta Harvest Festival",
    category: "Client website",
    group: "Client Software & Websites",
    discipline: "Full Stack",
    year: "2026",
    live: true,
    summary:
      "Heritage festival website for the Delta Mill Society — a two-day event site with programme details, venue histories, and ticketing. Built with HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Event Website"],
    links: {
      demo: "https://deltaharvestfestival.ca",
    },
    metrics: [
      { value: "Live", label: "in production" },
      { value: "2", label: "historic venues featured" },
      { value: "2026", label: "launched" },
    ],
    architecture: {
      nodes: [
        {
          id: "site",
          label: "Static site",
          tech: "HTML · CSS · JavaScript",
          detail:
            "A multi-section festival website with scroll-based narrative layout, embedded maps, countdown timer, and performance schedule. Built with plain HTML, CSS, and JavaScript — a content-rich event site that doesn't need a framework.",
        },
        {
          id: "hosting",
          label: "Hosting",
          tech: "Netlify",
          detail:
            "Deployed on Netlify with a custom domain and automated SSL. Served statically with no backend dependencies.",
        },
      ],
      foundation: [
        "Semantic HTML",
        "Responsive design",
        "SEO optimization",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "The Delta Mill Society needed a website to promote their annual Harvest Festival — a two-day heritage event at the Old Stone Mill and Old Town Hall in Delta, Ontario. The site needed to communicate the weekend programme, venue details, and ticket information clearly while reflecting the heritage character of the event.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A single-page multi-section website that guides visitors through the weekend programme, musical performances, venue histories, and ticketing information. The design uses scroll-driven storytelling, large typography, and historical imagery to convey the festival's heritage atmosphere.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A production website serving as the festival's primary information source and promotional tool, with downloadable schedules and integrated venue maps.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/delta-harvest-festival.png",
        alt: "Delta Harvest Festival homepage showing the weekend event and venue information",
        caption: "Production website — heritage festival site for the Delta Mill Society",
        width: 1440,
        height: 1000,
      },
    ],
  },
  {
    slug: "nel-coloma-moya-portfolio",
    title: "Nel Coloma-Moya Portfolio",
    category: "Client website",
    group: "Client Software & Websites",
    discipline: "Full Stack",
    year: "2026",
    live: true,
    summary:
      "Academic portfolio for a human geographer and educator — a comprehensive personal site with biography, teaching experience, research, events, and publications. Built with HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Academic Portfolio"],
    links: {
      demo: "https://nelcoloma-moya.ca",
    },
    metrics: [
      { value: "Live", label: "in production" },
      { value: "9", label: "content sections" },
      { value: "2026", label: "launched" },
    ],
    architecture: {
      nodes: [
        {
          id: "site",
          label: "Static site",
          tech: "HTML · CSS · JavaScript",
          detail:
            "A multi-section academic portfolio with tabbed navigation, interactive timeline, and content modules. Built with vanilla HTML, CSS, and JavaScript — a content-rich site that doesn't need a JavaScript framework.",
        },
        {
          id: "hosting",
          label: "Hosting",
          tech: "Netlify",
          detail:
            "Deployed on Netlify with a custom domain and automated SSL. All content is statically served.",
        },
      ],
      foundation: [
        "Semantic HTML",
        "Responsive design",
        "Accessible navigation",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Professor Nel Coloma-Moya needed a professional academic portfolio to consolidate her biography, teaching experience, research, community events, and publications in one place. The site needed to serve multiple audiences — students, colleagues, conference organizers, and collaborators — while reflecting the depth of decades of work.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A comprehensive academic portfolio with nine content sections, an interactive educational journey timeline, detailed teaching history, community events archive, and integrated contact. The design prioritises content hierarchy and readability across devices, making decades of work navigable without overwhelming the visitor.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A production website serving as the professor's primary academic presence online, consolidating teaching, research, community-building, and publications into one accessible, well-organized digital format.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/nel-coloma-moya.png",
        alt: "Nel Coloma-Moya portfolio homepage showing biography and navigation",
        caption: "Production website — academic portfolio for a human geographer and educator",
        width: 1440,
        height: 1000,
      },
    ],
  },

  /* ── Automation & Productivity ── */

  {
    slug: "cv-generator",
    title: "Employee CV Generator",
    category: "Automation",
    group: "Automation & Productivity",
    discipline: "Automation",
    year: "2025",
    live: false,
    summary:
      "Deterministic CV generation for a real HR team: pulls employee data from Drive and Sheets, fills a branded template, and exports PDF + DOCX — no code required by the user.",
    tags: ["Google Apps Script", "Drive API", "Docs API", "Sheets"],
    links: {
      github:
        "https://github.com/suryalionael/Lionael-Surya/tree/main/software-products/cv-generator-gas",
    },
    metrics: [
      { value: "0", label: "AI or external APIs — deterministic" },
      { value: "2", label: "formats per employee — PDF + DOCX" },
      { value: "per-field", label: "source prioritization" },
    ],
    architecture: {
      nodes: [
        {
          id: "sources",
          label: "Sources",
          tech: "Drive · Form responses",
          detail:
            "Employee documents in Drive folders and project experience in a Google Form responses sheet — the data as HR actually keeps it.",
        },
        {
          id: "repos",
          label: "Repositories",
          tech: "data access layer",
          detail:
            "Dedicated repository classes parse Drive folders, spreadsheets, and the control panel — the only code that knows where data lives.",
        },
        {
          id: "aggregate",
          label: "Aggregation",
          tech: "per-field priority",
          detail:
            "Each CV field resolves through a priority chain — form answer, then project spreadsheet, then existing CV, then default — per field, not per document, so partial sources still produce complete CVs.",
        },
        {
          id: "template",
          label: "Template engine",
          tech: "placeholder + block cloning",
          detail:
            "Populates a branded template copy with placeholder substitution and repeating-block cloning for variable-length sections like project history.",
        },
        {
          id: "export",
          label: "Export",
          tech: "PDF + DOCX",
          detail:
            "Both formats generated per employee into organized Drive folders, triggered from a Sheets menu — HR never opens the script editor.",
        },
      ],
      foundation: [
        "layered architecture — controllers · services · repositories",
        "runAllTests() per-module test suite",
        "in real use at PT Magna Solusi Indonesia",
      ],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "HR at PT Magna Solusi Indonesia assembled employee CVs by hand from scattered sources — Drive documents, form responses, old CVs — a slow, error-prone process repeated for every request.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A Google Apps Script system that generates every CV from a Sheets menu: data flows from repositories through per-field prioritization into a branded template, and out as PDF and DOCX per employee. Deliberately no AI and no external APIs — the output must be deterministic and auditable, because it's a legal-adjacent HR document.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Apps Script is usually written as one long function; this is a layered architecture — controllers, services, repositories, a template engine, and utilities — with a per-module test suite, because the person maintaining it next won't be the person who wrote it. Per-field source prioritization (rather than per-document) means one missing form answer doesn't block a CV.",
        ],
      },
      {
        heading: "Results",
        body: [
          "A tool in real use by a real HR team, operated entirely from a spreadsheet menu with idempotent setup, logging, and error handling. My first shipped software with users who weren't me.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Constraints are design inputs: 'no code access for the user' and 'must be auditable' shaped better architecture than freedom would have. Boring, deterministic technology was the correct choice — the craft is in the structure.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/cv-generator.png",
        alt: "Employee CV Generator GitHub repository with layered architecture documentation",
        caption: "GitHub repository — Google Apps Script with controllers, services, and repositories",
        width: 1440,
        height: 900,
      },
    ],
  },
  /* ── Research & Simulation ── */

  {
    slug: "elevator-simulation",
    title: "Elevator Simulation",
    category: "Simulation",
    group: "Research & Simulation",
    discipline: "Research & Simulation",
    year: "2026",
    live: false,
    summary:
      "A discrete-event simulation answering a real capital question: how many elevators does a five-floor commercial building actually need — one, two, or three?",
    tags: ["Python", "SimPy", "NumPy", "matplotlib"],
    links: {
      github:
        "https://github.com/suryalionael/BDA450-Elevator-Simulation-Cost-vs-Waiting-Time",
    },
    metrics: [
      { value: "1–3", label: "elevator configurations compared" },
      { value: "P95", label: "waiting-time percentiles, not just means" },
      { value: "NHPP", label: "realistic time-varying demand" },
    ],
    architecture: {
      nodes: [
        {
          id: "demand",
          label: "Passenger demand",
          tech: "non-homogeneous Poisson",
          detail:
            "Arrivals follow a non-homogeneous Poisson process — morning rush, lunch spikes, evening exodus — because uniform demand would make every configuration look fine.",
        },
        {
          id: "engine",
          label: "Simulation engine",
          tech: "SimPy DES",
          detail:
            "A discrete-event simulation advancing through passenger arrivals, boarding, travel, and departure events rather than fixed time steps.",
        },
        {
          id: "policy",
          label: "Elevator policy",
          tech: "cooperative SCAN",
          detail:
            "Elevators run a cooperative SCAN algorithm — the disk-scheduling classic applied to floors — coordinating so they don't all chase the same call.",
        },
        {
          id: "metrics",
          label: "Service metrics",
          tech: "wait · trip · fairness",
          detail:
            "Queue-to-board waiting time, full trip time, extreme delays, and fairness across floors — reported as distributions and percentiles, not just averages.",
        },
        {
          id: "decision",
          label: "Cost vs service",
          tech: "the actual question",
          detail:
            "Each added elevator is capital cost; each removed one is passenger time. The simulation quantifies the trade so the decision is a judgment about numbers, not a guess.",
        },
      ],
      foundation: ["SimPy 4", "course project — BDA450, Seneca"],
    },
    sections: [
      {
        heading: "Problem",
        body: [
          "Elevator capacity is a one-time capital decision with a permanent service consequence. Undersize and tenants wait every day; oversize and the building paid for steel it didn't need. Intuition can't answer this — queueing dynamics are famously counterintuitive.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A SimPy discrete-event simulation of a five-floor commercial building under realistic time-varying demand, comparing one, two, and three elevators under a cooperative SCAN policy, and reporting the full waiting-time distribution for each.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Demand is non-homogeneous on purpose — peak-hour behavior is what sizing decisions are about, and uniform arrivals would hide it. Percentiles and extreme delays are first-class outputs, because a mean wait of 40 seconds is meaningless to the person who waited six minutes.",
        ],
      },
      {
        heading: "Results",
        body: [
          "A quantified cost-versus-service frontier for the building: how much waiting time each additional elevator buys, including its effect on worst-case delays and cross-floor fairness.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Simulation is judgment infrastructure: it doesn't make the decision, it makes the trade-offs visible. And distributions beat averages every time someone's experience lives in the tail.",
        ],
      },
    ],
    images: [
      {
        src: "/projects/elevator-simulation.png",
        alt: "Elevator Simulation GitHub repository with discrete-event simulation documentation",
        caption: "GitHub repository — SimPy discrete-event simulation comparing elevator configurations",
        width: 1440,
        height: 900,
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categories = [
  "Data Engineering",
  "Machine Learning & Data Science",
  "Client Software & Websites",
  "Automation & Productivity",
  "Research & Simulation",
] as const;

export type Category = (typeof categories)[number];

export const projectsByCategory = categories.map((category) => ({
  category,
  projects: projects.filter((p) => p.group === category),
}));
