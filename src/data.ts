import type {
  AccessReview,
  Application,
  AuditFinding,
  Entitlement,
  PolicyException,
  Role,
  User,
} from "./types.js";

export const users: User[] = [
  {
    id: "user_01",
    userName: "Jordan Avery",
    department: "Finance Operations",
    role: "Billing Administrator",
    status: "active",
    manager: "Priya Lawson",
  },
  {
    id: "user_02",
    userName: "Nina Ortiz",
    department: "Platform Engineering",
    role: "Infrastructure Operator",
    status: "active",
    manager: "Marcus Hale",
  },
  {
    id: "user_03",
    userName: "Samir Patel",
    department: "Revenue Operations",
    role: "Reporting Analyst",
    status: "dormant",
    manager: "Leah Foster",
  }
];

export const roles: Role[] = [
  {
    id: "role_01",
    name: "Billing Administrator",
    privileged: true,
    sensitiveApplications: ["ERP", "Revenue Reporting"],
  },
  {
    id: "role_02",
    name: "Infrastructure Operator",
    privileged: true,
    sensitiveApplications: ["Cloud Console", "Secrets Vault"],
  },
  {
    id: "role_03",
    name: "Reporting Analyst",
    privileged: false,
    sensitiveApplications: ["Revenue Reporting"],
  }
];

export const applications: Application[] = [
  {
    id: "app_01",
    name: "ERP",
    sensitivity: "high",
  },
  {
    id: "app_02",
    name: "Revenue Reporting",
    sensitivity: "high",
  },
  {
    id: "app_03",
    name: "Cloud Console",
    sensitivity: "high",
  },
  {
    id: "app_04",
    name: "Secrets Vault",
    sensitivity: "high",
  }
];

export const entitlements: Entitlement[] = [
  {
    id: "ent_01",
    userId: "user_01",
    applicationId: "app_01",
    privilegeLevel: "admin",
  },
  {
    id: "ent_02",
    userId: "user_01",
    applicationId: "app_02",
    privilegeLevel: "admin",
  },
  {
    id: "ent_03",
    userId: "user_02",
    applicationId: "app_03",
    privilegeLevel: "admin",
  },
  {
    id: "ent_04",
    userId: "user_02",
    applicationId: "app_04",
    privilegeLevel: "elevated",
  },
  {
    id: "ent_05",
    userId: "user_03",
    applicationId: "app_02",
    privilegeLevel: "standard",
  }
];

export const policyExceptions: PolicyException[] = [
  {
    id: "exc_01",
    userId: "user_01",
    applicationId: "app_02",
    reason: "Quarter-end finance close",
    active: true,
  },
  {
    id: "exc_02",
    userId: "user_02",
    applicationId: "app_04",
    reason: "Platform migration maintenance",
    active: true,
  }
];

export const accessReviews: AccessReview[] = [
  {
    id: "review_01",
    userId: "user_01",
    completedAt: "2025-10-07T15:00:00.000Z",
    reviewer: "IAM Governance",
    outcome: "approved",
  },
  {
    id: "review_02",
    userId: "user_02",
    completedAt: "2026-03-18T12:00:00.000Z",
    reviewer: "Security Engineering",
    outcome: "approved",
  },
  {
    id: "review_03",
    userId: "user_03",
    completedAt: "2025-08-20T10:00:00.000Z",
    reviewer: "Revenue Ops Leadership",
    outcome: "pending",
  }
];

export const auditFindings: AuditFinding[] = [
  {
    id: "finding_01",
    userId: "user_01",
    severity: "critical",
    summary: "Privileged ERP and revenue access retained beyond standard review window.",
  },
  {
    id: "finding_02",
    userId: "user_03",
    severity: "high",
    summary: "Dormant user retained access to sensitive revenue reporting systems.",
  }
];
