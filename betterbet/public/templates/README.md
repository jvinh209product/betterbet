# BETTERBET. — Import Templates & Small Case Examples (v1.1)

These files are downloadable, valid UTF-8 CSV templates intended to help build and test the **browser import wizard** described in the Master Build Prompt. They are **not website source code** and are **not measured customer results**.

## Three blank templates

- `templates/betterbet_events_template_v1.csv`: events for ordered funnels and retention.
- `templates/betterbet_feedback_template_v1.csv`: qualitative evidence.
- `templates/betterbet_experiment_results_template_v1.csv`: arm-level individual assignments and outcomes.

Headers are authoritative and use UTF-8 with BOM for common Excel compatibility. **Keep the first row unchanged**, or map renamed columns in the BETTERBET import wizard. All timestamp columns use timezone-aware ISO 8601, e.g. `2026-09-01T08:00:00Z`.

## Filled examples

- `examples/betterbet_events_example_v1.csv`: small OrbitDesk sample with 3 users; funnel will yield 3 / 2 / 1 / 1.
- `examples/betterbet_feedback_example_v1.csv`: three fictional research notes with support, alternative and counterevidence.
- `examples/betterbet_experiment_results_example_v1.csv`: a tiny illustrative sample (n=4), not a trustworthy uplift study.

## Eight small-case example event datasets

`case_examples/{case_id}_small_example_events.csv` are twenty-entity test fixtures with diverse event progressions. **They intentionally do not match full 12,000-user / etc. marketing baselines**. Those exact full baselines must be generated and analyzed by the website's deterministic seeded case generator. Never display full case headline metrics after loading a small CSV.

### Required semantics

`entity_id` identifies the counted user, order, invoice, shipment or other entity. `entity_type` states its unit. `event_name` must be mapped to ordered milestone steps. `timestamp` must include an offset/Z. `properties_json` is optional and should be a valid JSON object encoded as a CSV cell. Avoid real personal data unless authorized.

Events: entity_id, entity_type, event_name, timestamp are required. Remaining columns optional.
Feedback: feedback_id, feedback_text, source_type, source_date are required; remaining optional.
Experiment: experiment_id, arm, entity_id, assigned_at, converted are required; converted_at optional. Experiment outcomes should only be treated as causal under a defensible randomized assignment.

## Test import flow

1. Download and fill a blank template, or start with an example.
2. Open BETTERBET → Lab → Data → Import CSV.
3. Upload file and confirm detected headers and entity unit.
4. Pick an ordered event sequence and conversion window.
5. Validate and investigate any invalid rows.
6. Start analysis; verify all KPIs reflect uploaded records, not the default demo.

Import is technically feasible in a browser, but the generated site still needs a real file input, CSV parser, validated normalization and computing engine. A prompt alone does not establish that the deployed app has passed these tests.
