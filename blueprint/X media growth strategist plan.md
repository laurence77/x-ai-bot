# X Media Growth Strategist Plan

## 🎭 The Role

You are an elite social media growth strategist specializing in X.

1.  **Iterative Refinement**
    1.  Look at the "Impressions" vs "Engagement" ratio.
    2.  If engagement is high but impressions are low, your hook/headline is weak.
    3.  If impressions are high but engagement is low, your content is broad but boring.

### Data Inputs

- **posts_24h**: User's posts from the last 24 hours (text, metrics).
- **competitors**: Top posts from 3–5 competitor accounts.
- **account_baseline**: 30-day average engagement rate.

---

## 🏢 Enterprise-Grade Infrastructure

### 1. Multi-Tenancy & Workspace Architecture

Enterprise buyers require trust infrastructure:

- **Workspace hierarchy**: Organization → Teams → Members → Connected accounts.
- **RBAC (Role-Based Access Control)**:
  - **Admin**: Full control.
  - **Strategist**: View insights, create recommendations.
  - **Editor**: Draft content only.
  - **Viewer**: Read-only reports.

### 2. Audit Logging & Compliance

- **SOC 2 Compliance**: Every action must be logged (event, user, timestamp, IP).
- **Data Governance**: GDPR compliance, data residency, AI opt-out for model training.

### 3. API-First Architecture

- Documented REST API for integration with Salesforce, Notion, Slack.
- Webhook support for real-time events (Viral Alerts, Pattern Detection).

---

## 🛠 Technical Architecture

### Layers

- **Client Layer**: Next.js (Web), React Native (Mobile).
- **API Gateway**: Kong/AWS Gateway (JWT, Rate Limiting).
- **Backend Services**: FastAPI (Core API), Redis + Celery (Async Jobs).
- **AI Processing**: Model Router (Azure OpenAI for compliance, Anthropic for fallback).
- **Data Layer**: PostgreSQL (RLS enabled), Redis (Cache), Snowflake (Enterprise Data Warehouse).

### Prompt Versioning

Every AI generation must be linked to a `prompt_version_id` to ensure auditability and reproducibility.

---

## 🚀 14-Day MVP Roadmap

### Week 1: Foundation

1. Project Scaffolding (FastAPI, PostgreSQL, Next.js).
2. Authentication & RBAC.
3. X Account connection (OAuth 2.0).
4. Core AI Pipeline (Post Analyzer).
5. Account Intelligence Audit.
6. Competitor Radar.
7. Integration Testing.

### Week 2: Intelligence & Polish

1. Viral Probability Score.
2. Daily Intelligence Reports (Email/In-app).
3. Audit Log & Admin Panel.
4. Webhook System.
5. White-Label Foundation.
6. Pricing Tiers & Billing (Stripe).
7. Deployment (AWS) & Launch.

---

## 📈 Go-To-Market Strategy

### Positioning: "Creator Intelligence"

Don't sell "Analytics"; sell "Strategic Advantage."

### The First 1,000 Users

- **Phase 1 (Days 1-30)**: Direct outreach to 100 creators (5K-100K followers).
- **Phase 2 (Days 30-60)**: Product-led growth through shareable "Audit Moments."
- **Phase 3 (Days 60-90)**: Agency Wedge (one agency = 10-30 accounts).

### 1. Bio-Alignment (Conversion Gap)

Logic:

The system uses the gemini-2.5-flash-preview-09-2025 model to compare two data points:

- Account Context: The current bio, link clicks, and follower growth trends.
- Viral Sentiment: The core topic of the last 3 "High-Impression" posts.

The Prompt Strategy:

"Compare this user's bio [Bio] with their recent viral success in [Topic]. If the bio does not explicitly mention [Topic] or a related value proposition, output the 'Mismatch Reason' and a 'Transformative Bio' that retains the existing brand but optimizes for the new audience segment."

### 2. Rescue Notifications (The Coach)

Logic:

This is an event-driven worker. Every post published via the platform is tracked with an InitialPulse score at 5, 15, and 30 minutes.

- Trigger: If impressions_velocity < baseline_average * 0.7 AND bookmark_rate > engagement_rate.
- Diagnosis: High bookmarks + Low replies = "The Silent Value Trap." The algorithm stops showing it because nobody is talking, even though they are saving it.
- Rescue Action: Suggest a "Polarizing Question" or "Additional Resource" to be posted as a reply by the user to spark conversation.

### 3. Voice Fingerprinting (Agency Moat)

Logic:

Stored as a JSONB object in Postgres/Firestore for every account.

- lexical_dna: { "emoji_ratio": float, "sentence_length_avg": int, "vocabulary_level": "Grade 8" | "Expert" }
- usage: When generating recommendations, the AI is injected with the lexical_dna as a systemInstruction. This ensures that even if a junior strategist writes the thread, the AI "filters" it into the client's voice.

### 4. Narrative Hijack (War Room)

Logic:

The scraper monitors specified competitor IDs. It calculates the Ratio (replies / likes).

- Trigger: ratio > 1.5.
- Strategic Interpretation: The community is actively disagreeing with the competitor. This is prime "Whitespace Opportunity" for the user to post the counter-argument and steal the narrative.

### 5. Multi-Tenant Firestore Structure (MANDATORY)

```js
// Public shared data
/artifacts/{appId}/public/data/viral_trends/{trendId}

// Private workspace data (Agency Level)
/artifacts/{appId}/users/{userId}/workspaces/{workspaceId}/
    - accounts/ (The X accounts being managed)
    - voice_fingerprints/
    - audit_logs/ (Every AI generation logged for SOC 2)
```
