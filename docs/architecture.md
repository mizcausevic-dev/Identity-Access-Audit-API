# Identity Access Audit API Architecture

## Service Overview

Identity Access Audit API models an internal operational service used by IAM, security engineering, compliance, platform teams, and leadership to review access posture, identify privilege risk, and coordinate remediation workflows.

It centralizes:

- users and role posture
- entitlements and application sensitivity
- policy exceptions
- access review history
- audit findings
- remediation prioritization

## Request Flow

1. An access-risk scenario is submitted to an analysis endpoint.
2. The request body is validated with Zod.
3. The service reviews privilege concentration, review recency, policy exceptions, dormant posture, and sensitive-application exposure.
4. The service returns issues, passed checks, a risk posture, and recommended next action.
5. Teams use dashboard, findings, and review endpoints to coordinate remediation and control evidence.

## Endpoint Map

- `GET /health`
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/roles`
- `GET /api/entitlements`
- `GET /api/applications`
- `GET /api/reviews`
- `GET /api/findings`
- `GET /api/dashboard/summary`
- `POST /api/analyze/access-risk`
- `POST /api/analyze/exception`
- `POST /api/analyze/remediation`

## Risk Model

### Access Review

The access workflow scores:

- privileged entitlement count
- access review age
- policy exception posture
- dormant account risk
- sensitive application scope
- elevated role patterns

### Remediation Prioritization

The remediation model prioritizes:

- overdue privileged access on sensitive systems
- active policy exceptions without fresh business validation
- dormant accounts with retained access
- evidence readiness ahead of audit and control review

## Security Notes

- Requests are validated before service logic runs.
- Configuration remains environment-driven.
- Error responses are centralized and consistent.
- CI, Dependabot, and CodeQL support ongoing repository hygiene.

## Future Production Upgrades

- persist review history and exceptions in PostgreSQL
- integrate IdP and directory event feeds
- add SoD conflict rules and peer-role baselines
- support access certification campaigns and reviewer attestations
- add audit evidence exports and remediation aging analytics
