import {
  accessReviews,
  applications,
  auditFindings,
  entitlements,
  policyExceptions,
  roles,
  users,
} from "../data.js";
import type {
  AnalysisInput,
  AnalysisResponse,
  RemediationResponse,
  RiskStatus,
} from "../types.js";

function statusFromScore(score: number): RiskStatus {
  if (score >= 80) {
    return "high-risk";
  }

  if (score >= 55) {
    return "needs-review";
  }

  return "low-risk";
}

export function analyzeAccessRisk(input: AnalysisInput): AnalysisResponse {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 20;

  if (input.privilegedEntitlements >= 4) {
    issues.push("Privileged entitlement count exceeds standard role baseline.");
    score += 24;
  } else {
    passedChecks.push("Privileged entitlement count remains inside the standard role threshold.");
  }

  if (input.daysSinceLastAccessReview > 180) {
    issues.push("Access review is materially overdue.");
    score += 20;
  } else {
    passedChecks.push("Access review recency remains inside the governance window.");
  }

  if (input.hasPolicyException) {
    issues.push("Policy exception is still active on sensitive applications.");
    score += 18;
  } else {
    passedChecks.push("No active policy exception is attached to this user.");
  }

  if (input.isDormant) {
    issues.push("Dormant user access creates elevated remediation urgency.");
    score += 16;
  } else {
    passedChecks.push("User account is active and not currently dormant.");
  }

  if (input.sensitiveApplications.length >= 2) {
    issues.push("Multiple sensitive applications increase audit and privilege review priority.");
    score += 10;
  } else {
    passedChecks.push("Sensitive application scope is limited.");
  }

  if (input.role.toLowerCase().includes("administrator")) {
    score += 8;
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const status = statusFromScore(finalScore);
  const recommendedNextAction =
    status === "high-risk"
      ? "Route to IAM and compliance for immediate access review and entitlement reduction."
      : status === "needs-review"
        ? "Open an access review task, validate business need, and confirm policy exception ownership."
        : "Maintain normal review cadence and continue monitoring for exception drift.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function analyzeException(input: AnalysisInput): AnalysisResponse {
  const result = analyzeAccessRisk(input);

  if (input.hasPolicyException) {
    result.issues.push("Exception handling requires explicit business re-approval.");
    result.score = Math.min(100, result.score + 5);
    result.status = statusFromScore(result.score);
    result.recommendedNextAction =
      "Revalidate the exception, confirm time-bound ownership, and reduce privileged scope where possible.";
  }

  return result;
}

export function analyzeRemediation(input: AnalysisInput): RemediationResponse {
  const rationale: string[] = [];
  let priority: RemediationResponse["priority"] = "medium";

  if (input.privilegedEntitlements >= 4) {
    priority = "high";
    rationale.push("Privilege concentration supports faster entitlement reduction.");
  }

  if (input.daysSinceLastAccessReview > 180 || input.hasPolicyException) {
    priority = "critical";
    rationale.push("Overdue review and policy exception together create immediate audit pressure.");
  }

  if (input.isDormant) {
    priority = "critical";
    rationale.push("Dormant access should be remediated before the next control review cycle.");
  }

  if (rationale.length === 0) {
    rationale.push("The account can remain on the standard remediation path without emergency handling.");
  }

  const recommendedNextAction =
    priority === "critical"
      ? "Start same-day IAM remediation, remove unnecessary privileged access, and notify compliance leadership."
      : priority === "high"
        ? "Create a high-priority access review task and reduce entitlements in the next governance sprint."
        : "Track through the standard quarterly review process and verify control evidence completeness.";

  return {
    priority,
    rationale,
    recommendedNextAction,
  };
}

export function getDashboardSummary() {
  const dormantUsers = users.filter((user) => user.status === "dormant").length;
  const activeExceptions = policyExceptions.filter((exception) => exception.active).length;
  const privilegedRoles = roles.filter((role) => role.privileged).length;

  return {
    userCount: users.length,
    privilegedRoleCount: privilegedRoles,
    dormantUserCount: dormantUsers,
    activeExceptionCount: activeExceptions,
    auditFindingCount: auditFindings.length,
    topAuditRisks: [
      "Overdue access reviews on sensitive systems",
      "Policy exceptions retained beyond governance intent",
      "Dormant access in finance and revenue systems",
    ],
  };
}

export {
  accessReviews,
  applications,
  auditFindings,
  entitlements,
  policyExceptions,
  roles,
  users,
};
