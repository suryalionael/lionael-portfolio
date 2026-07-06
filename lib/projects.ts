export type ArchNode = {
  id: string;
  label: string;
  tech: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  live: boolean;
  summary: string;
  tags: string[];
  links: { github?: string; demo?: string };
  metrics: { value: string; label: string }[];
  architecture: { nodes: ArchNode[]; foundation: string[] };
  sections: { heading: string; body: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "nutrition-priority-index",
    title: "Nutrition Priority Index",
    category: "Policy analytics",
    year: "2026",
    live: true,
    summary:
      "A transparent, evidence-backed index ranking Indonesia's 38 provinces for child-nutrition intervention — built on real government data only, validated before published.",
    tags: ["Python", "GeoPandas", "PySAL", "Streamlit", "pytest"],
    links: {
      github:
        "https://github.com/suryalionael/nutrition-analytics-indonesia",
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
  },
  {
    slug: "streaming-clickstream-pipeline",
    title: "Streaming Clickstream Pipeline",
    category: "Data engineering",
    year: "2026",
    live: false,
    summary:
      "A real-time lakehouse for e-commerce clickstream — Kafka to Spark to Delta Lake to a live dashboard. Seven services, one command, exactly-once semantics.",
    tags: ["Kafka", "Spark", "Delta Lake", "DuckDB", "Docker"],
    links: {
      github:
        "https://github.com/suryalionael/streaming-clickstream-pipeline",
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
  },
];

export const moreSystems = [
  {
    title: "dbt E-Commerce Analytics Mart",
    note: "Tested dbt marts on the real Olist dataset — one revenue definition, CI-enforced.",
    href: "https://github.com/suryalionael/dbt-ecommerce-analytics-mart",
  },
  {
    title: "Aspen OS",
    note: "Project operating system for nonprofits — in production at QuickRN.",
    href: "https://aspen-os.vercel.app",
  },
  {
    title: "FloodCast Jakarta",
    note: "Calibrated multi-horizon flood-risk prediction with SHAP explanations.",
    href: "https://github.com/suryalionael/Lionael-Surya/tree/main/case-studies/flood-risk-datathon-2026",
  },
  {
    title: "Retail Sales ETL Pipeline",
    note: "Airflow-orchestrated batch ETL into a star-schema warehouse, idempotent by design.",
    href: "https://github.com/suryalionael/retail-sales-etl-pipeline",
  },
];
