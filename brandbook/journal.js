
// ============================================================
  // BRAND & DESIGN SYSTEM
  // ============================================================
  brand = {
    productName: "Coworker365",
    brandSystem: {
      name: "Coworker365 Brandbook",
      css: "coworker365.com/brandbook/coworker365.css",
      status: "✅ LINKED",
      purpose: [
        "Unified visual identity",
        "Consistent UI for GUIDE-driven tools",
        "Shared typography, colors, spacing",
        "Checkbox and status visualization"
      ]
    },
    usageRules: [
      "All GUIDE UI must consume coworker365.css",
      "No inline colors outside brand tokens",
      "Status icons and checkboxes follow brand styles"
    ]
  },

/**
 * GUIDE METHODOLOGY JOURNAL
 * Goal → Understand → Implement → Diagnose → Evolve
 *
 * This file documents the state, progress, and decisions
 * of an autonomous GUIDE loop (human or AI-driven).
 */

const GUIDEJournal = {
  methodology: "GUIDE",
  version: "1.0.0",
  createdAt: new Date().toISOString(),

  description: "Autonomous decision and improvement loop",

  // ============================================================
  // GLOBAL LOOP CONTROLS
  // ============================================================
  loopControl: {
    maxIterations: 12,
    currentIteration: 0,
    maxCostUSD: 5.0,
    spentCostUSD: 0,
    confidenceThreshold: 0.85,
    humanEscalationEnabled: true,
    stopRequested: false
  },

  // ============================================================
  // GUIDE PHASES
  // ============================================================
  phases: {

    // ----------------------------------------------------------
    // G — GOAL
    // ----------------------------------------------------------
    Goal: {
      status: "⏳ IN PROGRESS", // ⏳ IN PROGRESS | ✅ COMPLETE | ❌ BLOCKED
      purpose: "Define what success looks like",

      checklist: {
        goalStatementDefined: false,
        successMetricDefined: false,
        constraintsDefined: false,
        terminationConditionDefined: false,
        priorityAssigned: false
      },

      data: {
        goalStatement: null,
        successMetric: null,
        constraints: [],
        terminationCondition: null,
        priority: null
      },

      exitCriteria: [
        "goalStatementDefined",
        "successMetricDefined"
      ]
    },

    // ----------------------------------------------------------
    // U — UNDERSTAND
    // ----------------------------------------------------------
    Understand: {
      status: "⏳ IN PROGRESS",
      purpose: "Build context and reduce uncertainty",

      checklist: {
        inputsValidated: false,
        assumptionsListed: false,
        knowledgeGapsIdentified: false,
        riskFactorsFlagged: false,
        strategySelected: false
      },

      data: {
        inputs: [],
        assumptions: [],
        knowledgeGaps: [],
        risks: [],
        selectedStrategy: null
      },

      exitCriteria: [
        "inputsValidated",
        "strategySelected"
      ]
    },

    // ----------------------------------------------------------
    // I — IMPLEMENT
    // ----------------------------------------------------------
    Implement: {
      status: "⏳ IN PROGRESS",
      purpose: "Execute the current best plan",

      checklist: {
        planGenerated: false,
        stepsOrdered: false,
        executionStarted: false,
        outputsRecorded: false,
        errorsCaptured: false
      },

      data: {
        planSteps: [],
        executionLogs: [],
        outputs: [],
        errors: []
      },

      exitCriteria: [
        "executionStarted",
        "outputsRecorded"
      ]
    },

    // ----------------------------------------------------------
    // D — DIAGNOSE
    // ----------------------------------------------------------
    Diagnose: {
      status: "⏳ IN PROGRESS",
      purpose: "Evaluate results against expectations",

      checklist: {
        resultsMeasured: false,
        successMetricEvaluated: false,
        deviationsDetected: false,
        rootCauseIdentified: false,
        outcomeClassified: false
      },

      data: {
        measuredResults: null,
        expectedResults: null,
        deviationSummary: null,
        rootCauses: [],
        outcome: null // success | partial | failure
      },

      exitCriteria: [
        "successMetricEvaluated",
        "outcomeClassified"
      ]
    },

    // ----------------------------------------------------------
    // E — EVOLVE
    // ----------------------------------------------------------
    Evolve: {
      status: "⏳ IN PROGRESS",
      purpose: "Improve system before next loop",

      checklist: {
        strategyUpdated: false,
        parametersTuned: false,
        knowledgeStored: false,
        riskRulesUpdated: false,
        nextActionSelected: false
      },

      data: {
        strategyChanges: [],
        parameterChanges: [],
        knowledgeUpdates: [],
        riskRuleUpdates: [],
        nextAction: null // repeat | escalate | stop
      },

      exitCriteria: [
        "knowledgeStored",
        "nextActionSelected"
      ]
    }
  },

  // ============================================================
  // MEMORY (PERSISTED ACROSS LOOPS)
  // ============================================================
  memory: {
    lessonsLearned: [],
    successfulPatterns: [],
    failedPatterns: [],
    metricsHistory: []
  },

  // ============================================================
  // METRICS
  // ============================================================
  metrics: {
    loopsCompleted: 0,
    lastOutcome: null,
    averageConfidence: null,
    lastUpdated: null
  },

  // ============================================================
  // NOTES
  // ============================================================
  notes: [
    "Each phase must satisfy exitCriteria before advancing",
    "Checkboxes are machine-verifiable state",
    "Designed for autonomous or human-in-the-loop systems",
    "Safe for Durable Object or DB persistence"
  ]
};

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------
function isPhaseComplete(phase) {
  return phase.exitCriteria.every(
    key => phase.checklist[key] === true
  );
}

function canAdvanceToNextPhase(guide, phaseName) {
  return isPhaseComplete(guide.phases[phaseName]);
}

// Export
if (typeof module !== "undefined" && module.exports) {
  module.exports = GUIDEJournal;
}

// Console summary
console.log("=== GUIDE METHODOLOGY JOURNAL ===");
console.log(`Iteration: ${GUIDEJournal.loopControl.currentIteration}`);
console.log(`Max iterations: ${GUIDEJournal.loopControl.maxIterations}`);
console.log("Phase status:");
Object.entries(GUIDEJournal.phases).forEach(([name, phase]) => {
  console.log(`- ${name}: ${phase.status}`);
});
