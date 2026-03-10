# CreatorSignal: Full App Workflow Skeleton

This document serves as the high-level skeleton of the CreatorSignal application's operation, from user onboarding to daily content intelligence.

## 1. User Onboarding Flow
1.  **Welcome Screen**: Simple landing with CTA to "Connect X Account".
2.  **Auth & Integration**: User authenticates via X OAuth 2.0.
3.  **Initial Scan**:
    *   System pulls last 50 posts.
    *   AI generates an "Account Intelligence Audit" (Found in `blueprint/X media growth strategist plan.md`).
4.  **Competitor Setup**: User enters 5-10 competitor handles to monitor.

## 2. Daily Strategic Cycle
1.  **Morning Briefing (7:00 AM)**: 
    *   System processes yesterday's performance.
    *   Scans competitors for "Viral Spikes".
    *   Generates 3 actionable recommendations for the day.
2.  **Draft Optimization (Ad-hoc)**:
    *   User pastes draft in "Content Analyzer".
    *   System provides "Viral Probability Score" and "Hook Refinements".
3.  **Real-Time Monitoring**:
    *   System tracks published posts for 60 mins.
    *   Triggers "Post Rescue Protocol" if engagement velocity is low but potential is high.

## 3. Intelligence Layers (The Brain)
*   **Narrative Analyzer**: Detects if the creator is hitting "Format Fatigue".
*   **Algorithm Pulse**: Recommends micro-windows for posting based on current network activity.
*   **Voice DNA**: Ensures all AI suggestions match the creator's lexical fingerprint.

## 4. Enterprise/Agency Layer
*   **Multi-tenant Workspace**: Agencies manage multiple "Creator Profiles".
*   **White-label Reports**: Branded PDFs for boardroom-ready presentations.
*   **Audit Trail**: Every recommendation linked to data and prompt versions.

---

### Referenced Documents
*   [Market Analysis](file:///Users/laurence/Documents/x%20ai%20bot/blueprint/analysis_results.md.resolved)
*   [Technical Implementation Plan](file:///Users/laurence/Documents/x%20ai%20bot/blueprint/implementation_plan.md.resolved)
*   [Full Strategy Doc](file:///Users/laurence/Documents/x%20ai%20bot/blueprint/X%20media%20growth%20strategist%20plan.md)
