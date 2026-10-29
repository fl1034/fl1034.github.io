-- Portfolio analytics · reproducible sample data
-- Run entirely in the browser with DuckDB.
CREATE OR REPLACE TABLE project_events AS
SELECT
    DATE '2026-01-01' + CAST(i % 90 AS INTEGER) AS event_date,
    ['Internet Pulse', '5D Chess', 'SQL/REPL'][1 + i % 3] AS project,
    ['Canada', 'Germany', 'Japan', 'Brazil'][1 + i % 4] AS country,
    120 + (i * 37) % 1800 AS duration_ms,
    CASE WHEN i % 11 = 0 THEN 'retry' ELSE 'success' END AS status
FROM generate_series(1, 2400) AS samples(i);

-- Compare engagement and reliability across projects.
WITH daily_activity AS (
    SELECT
        project,
        country,
        COUNT(*) AS sessions,
        ROUND(AVG(duration_ms), 1) AS avg_latency_ms,
        ROUND(100.0 * COUNT(*) FILTER (
            WHERE status = 'success'
        ) / COUNT(*), 1) AS success_pct
    FROM project_events
    WHERE event_date >= DATE '2026-01-01'
    GROUP BY project, country
), ranked_projects AS (
    SELECT *,
        DENSE_RANK() OVER (
            PARTITION BY country ORDER BY avg_latency_ms
        ) AS latency_rank
    FROM daily_activity
)
SELECT
    project,
    country,
    sessions,
    avg_latency_ms,
    success_pct,
    CASE WHEN latency_rank = 1 THEN 'Fastest'
         ELSE 'Healthy' END AS performance
FROM ranked_projects
ORDER BY country, latency_rank, project;
