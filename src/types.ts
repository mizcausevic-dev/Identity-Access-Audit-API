export type UserStatus = "active" | "dormant" | "disabled";
export type RiskStatus = "low-risk" | "needs-review" | "high-risk";

export interface User {
  id: string;
  userName: string;
  department: string;
  role: string;
  status: UserStatus;
  manager: string;
}

export interface Role {
  id: string;
  name: string;
  privileged: boolean;
  sensitiveApplications: string[];
}

export interface Entitlement {
  id: string;
  userId: string;
  applicationId: string;
  privilegeLevel: "standard" | "elevated" | "admin";
}

export interface Application {
  id: string;
  name: string;
  sensitivity: "low" | "medium" | "high";
}

export interface PolicyException {
  id: string;
  userId: string;
  applicationId: string;
  reason: string;
  active: boolean;
}

export interface AccessReview {
  id: string;
  userId: string;
  completedAt: string;
  reviewer: string;
  outcome: "approved" | "reduced" | "pending";
}

export interface AuditFinding {
  id: string;
  userId: string;
  severity: "medium" | "high" | "critical";
  summary: string;
}

export interface AnalysisInput {
  userName: string;
  department: string;
  role: string;
  sensitiveApplications: string[];
  privilegedEntitlements: number;
  daysSinceLastAccessReview: number;
  hasPolicyException: boolean;
  isDormant: boolean;
}

export interface AnalysisResponse {
  status: RiskStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface RemediationResponse {
  priority: "medium" | "high" | "critical";
  rationale: string[];
  recommendedNextAction: string;
}
