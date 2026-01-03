GUIDE Methodology

Goal → Understand → Implement → Diagnose → Evolve

Each phase has:

Purpose

Human methodology

Software / agent check-boxes

Exit criteria (critical for autonomy)

G — Goal

Define what success looks like before doing anything.

Methodology

Explicit objective

Constraints (cost, latency, safety)

Success metrics

Stop conditions

✅ Check-boxes

⬜ Goal statement is explicit (not implied)

⬜ Success metric is measurable

⬜ Constraints documented

⬜ Termination condition defined

⬜ Priority level assigned

Software hooks

goal.id

goal.success_metric

goal.constraints[]

goal.stop_condition

🛑 Exit when: goal is machine-verifiable.

U — Understand

Build context before action.

Methodology

Gather inputs

Validate assumptions

Identify unknowns

Select strategy

✅ Check-boxes

⬜ Inputs validated

⬜ Assumptions listed

⬜ Knowledge gaps identified

⬜ Risk factors flagged

⬜ Strategy selected

Software hooks

context.inputs[]

context.assumptions[]

context.unknowns[]

strategy.type

🛑 Exit when: uncertainty is explicit, not hidden.

I — Implement

Execute the current best plan.

Methodology

Create plan

Execute stepwise

Log actions

Capture outputs

✅ Check-boxes

⬜ Plan generated

⬜ Steps ordered

⬜ Execution started

⬜ Outputs recorded

⬜ Errors captured

Software hooks

plan.steps[]

execution.status

execution.logs[]

execution.outputs[]

🛑 Exit when: something observable happened.

D — Diagnose

Compare results vs expectations.

Methodology

Measure results

Detect deviations

Attribute causes

Classify outcome

✅ Check-boxes

⬜ Results measured

⬜ Success metric evaluated

⬜ Deviations detected

⬜ Root cause hypothesized

⬜ Outcome classified

Software hooks

diagnosis.metrics

diagnosis.delta

diagnosis.root_causes[]

diagnosis.outcome = success | partial | failure

🛑 Exit when: cause is named, not guessed.

E — Evolve

Improve the system before looping.

Methodology

Adjust strategy or plan

Update memory

Tighten constraints

Decide next loop

✅ Check-boxes

⬜ Strategy updated

⬜ Parameters tuned

⬜ Knowledge stored

⬜ Risk rules updated

⬜ Next action selected

Software hooks

memory.updates[]

strategy.revision

constraints.updated

next_action = repeat | escalate | stop

🛑 Exit when: change is persisted.

GUIDE Loop Control (Critical for Autonomy)

Add global guardrails:

🔁 Loop rules

⬜ Max iterations

⬜ Max cost

⬜ Confidence threshold

⬜ Human-handoff trigger

loop:
  max_iterations: 12
  max_cost_usd: 5.00
  confidence_threshold: 0.85
  human_escalation: true

How GUIDE Maps Perfectly to Software
GUIDE	Agent Role
Goal	Objective validator
Understand	Context builder
Implement	Executor
Diagnose	Evaluator
Evolve	Optimizer