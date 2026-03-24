# X Intelligence Platform 🧠 (Version 2.0)

A premium toolkit and platform designed for X media growth strategists, providing deep insights, narrative hijacking capabilities, and lexical DNA analysis for optimizing social media strategies.

## Features ✨

### 1. Real AI Integration (Universal Router)

- **Model Agnostic Backend**: Powered by LiteLLM, dynamically switch between OpenAI, Anthropic, Gemini, Groq, or local models using a single environment variable.
- **Centralized Agent Configuration**: Manage deep system prompts, personality traits, and default specific models for every algorithmic instance directly from `backend/app/core/agent_config.py`.
- **Bio-Alignment AI**: Analyzes a user's current bio and top viral posts, mathematically identifying strategic conversion gaps and generating a transformative strategic bio. Connected to the live MagicBento frontend.
- **Lexical DNA Fingerprinting**: A specialized AI pipeline that analyzes recent post structures to establish a rigid `LexicalDNA` constraint template (Archetype, Resonance, Vocabulary Density).
- **Narrative Format Analyzer**: Scans recent activity to detect "Format Fatigue" and suggests immediate pattern disruptors to break algorithmic blindness.
- **Algorithm Pulse**: Interprets historical engagement data to calculate extreme 15-minute micro-posting windows.

### 2. Command Center (MagicBento)

A high-fidelity bento grid providing a strategic node overview, including:

- **War Room**: Live metric tracking and "Post Rescue Protocol" triggers.
- **Lexical DNA**: Voice fingerprinting and stylistic archetype visualizations.

### 3. User Onboarding & Identity

- **Strategic Onboarding Stepper**: Multi-step tactical initialization including Neural Handshake, Calibration, and Audit.
- **ReflectiveCard Identity**: Unified organizational and access level metadata.
- **Simulated Backend Handshake**: Integrated simulation for rapid onboarding.

### 4. Navigation & Structure

- **20-Icon Navigation Set**: Comprehensive 4-category sidebar navigation.
- **Strategic Footer (CardNav)**: Premium expandable footer with contextual node links.

## Tech Stack 🛠️

### Frontend

- **React 19 & Next.js 16**: Cutting-edge App Router for blistering performance.
- **Tailwind CSS V4**: Modern utility-first styling for rapid UI development.
- **Framer Motion & GSAP**: Fluid, premium micro-animations and page transitions.
- **Lucide React**: Crisp, modern iconography.

### Blueprint & Planning

- Comprehensive design specs located in `/blueprint` (`blueprint_status.md` / `X media growth strategist plan.md`).

## Quick Start 🚀

To run the frontend development server locally:

```bash
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` to view the command center.

## Project Structure 📁

- `/frontend` - The Next.js React application containing the UI components and pages.
- `/backend` - Setup for the intelligence logic (featuring mock data structures).
- `/blueprint` - Strategy documentation, artifacts, and planning.

## Future Roadmap 🗺️

### A. Intelligence Logic

*All features implemented.*

### B. Data & Infrastructure

- **X OAuth 2.0 Integration**: Implemented PKCE flow for token generation.
- **Database Architecture**: Implemented SQLAlchemy async models prepared for PostgreSQL.
- **Background Workers**: Celery + Redis architecture defined for autonomous background AI ops.

### C. Enterprise Layer (V2)

- **Multi-tenant Backend**: Advanced logical separation for agencies managing multiple client X profiles (`workspace.py`).
- **White-label PDF Reporting**: Aggressive reporting stubs targeting external agency clients (`reporting.py`).
- **Prompt Versioning**: Immutable AI prompt hash tracking mapping every generated strategy back to its explicit instruction version (`audit.py`).

## License

ISC
