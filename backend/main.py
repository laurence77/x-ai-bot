from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime
import json
import os
import asyncio
from fastapi import FastAPI, HTTPException, Depends, Header

from fastapi.middleware.cors import CORSMiddleware
from app.services.bio_alignment import BioAlignmentRequest, BioAlignmentResponse, analyze_bio_alignment
from app.services.voice_dna import analyze_lexical_dna
from app.services.narrative_analyzer import analyze_format_fatigue, FatigueAnalysis
from app.services.algorithm_pulse import analyze_posting_window, PulseAnalysis
from app.auth import x_oauth
from app.enterprise import workspace, reporting, audit
from app.auth import x_oauth

app = FastAPI(title="X/INTELLIGENCE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock persistence
DB_FILE = "mock_db.json"

def load_db() -> Dict[str, Any]:
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {
        "account_linked": False,
        "user_data": {},
        "audit_logs": []
    }

def save_db(data: Dict[str, Any]):
    # Convert datetime to string for JSON
    if data.get("user_data") and isinstance(data["user_data"].get("linked_at"), datetime):
        data["user_data"]["linked_at"] = data["user_data"]["linked_at"].isoformat()
    with open(DB_FILE, "w") as f:
        json.dump(data, f)

db: Dict[str, Any] = load_db()

# Security Simulation
API_KEY_HEADER = "X-CreatorSignal-Key"
VALID_API_KEYS = {"sk-neural-handshake-demo", "enterprise-key-alpha"}

async def verify_api_key(x_creatorsignal_key: str = Header(None)):
    if x_creatorsignal_key not in VALID_API_KEYS:
        # In a real app we'd raise 401, but for demo we simulate a warning log
        print(f"SECURITY ALERT: Unauthorized access attempt with key: {x_creatorsignal_key}")
        # return # Let it pass for UX but log it
    return x_creatorsignal_key

class AccountStatus(BaseModel):
    is_linked: bool
    handle: Optional[str] = None
    linked_at: Optional[datetime] = None

class LinkRequest(BaseModel):
    api_key: str
    target_handle: str

class LinkResponse(BaseModel):
    success: bool
    message: str
    handle: str

class PostMetrics(BaseModel):
    likes: int
    replies: int
    reposts: int
    bookmarks: int
    impressions: int

class Post(BaseModel):
    post_id: str
    text: str
    timestamp: datetime
    metrics: PostMetrics

class AnalysisOutput(BaseModel):
    hook_score: int
    viral_probability: float
    suggested_hook: str
    weaknesses: List[str]
    sentiment: str
    improvement_plan: str

class DashboardStats(BaseModel):
    growth_velocity: float
    follower_delta: str
    viral_probability: int
    next_window: str
    dwell_time: float
    dwell_rank: str

class CompetitorPost(BaseModel):
    id: str
    handle: str
    text: str
    ratio: float
    opportunity: str
    sentiment: str

class LexicalDNA(BaseModel):
    style_archetype: str
    vocabulary_density: float
    sentence_variance: str
    emotional_resonance: int
    top_narratives: List[str]
    suggested_shifts: List[str]

@app.get("/")
async def root():
    return {"message": "X/INTELLIGENCE API is running"}

@app.post("/v1/content/analyze", response_model=AnalysisOutput)
async def analyze_content(post_text: str):
    # Advanced mock logic for AI analysis
    return AnalysisOutput(
        hook_score=82,
        viral_probability=0.74,
        suggested_hook="Most people ruin their X growth with this one habit. It's not what you think.",
        weaknesses=["Slightly long opening", "Target audience could be clearer"],
        sentiment="Analytical & Provocative",
        improvement_plan="Shorten the initial hook and add a stronger contrast in the second line."
    )

@app.post("/v1/ai/bio-alignment", response_model=BioAlignmentResponse)
async def generate_bio_alignment(request: BioAlignmentRequest):
    return analyze_bio_alignment(request.current_bio, request.viral_topic)

@app.get("/v1/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    # Mock data for live dashboard
    return DashboardStats(
        growth_velocity=24.2,
        follower_delta="2.1k followers / 7d",
        viral_probability=84,
        next_window="19:30 UTC",
        dwell_time=14.2,
        dwell_rank="Top 5% in SaaS niche"
    )

@app.get("/v1/competitors/radar", response_model=List[CompetitorPost])
async def get_competitor_radar():
    return [
        CompetitorPost(
            id="c1",
            handle="@SaaS_Guru",
            text="AI is overhyped. Every company is just a wrapper.",
            ratio=4.2,
            opportunity="High: Post a 'Defense of Vertical AI' thread.",
            sentiment="Negative"
        ),
        CompetitorPost(
            id="c2",
            handle="@Web3_Whale",
            text="Infrastructure doesn't matter, only community does.",
            ratio=1.5,
            opportunity="Low: Ignore, low conversion resonance.",
            sentiment="Neutral"
        ),
        CompetitorPost(
            id="c3",
            handle="@Venture_Vision",
            text="The next decade belongs to agents, not human founders.",
            ratio=5.8,
            opportunity="CRITICAL: Counter with 'The Hybrid Human-AI Founder' thesis.",
            sentiment="Controversial"
        )
    ]

@app.get("/v1/intelligence/lexical-dna", response_model=LexicalDNA)
async def get_lexical_dna(apiKey: str = Depends(verify_api_key)):
    # Simulating the user's recent posts since X OAuth isn't live yet
    mock_recent_posts = [
        "The gap between Good SaaS and Enterprise-Grade is trust. Build systems, not hype.",
        "Most founders ruin their X growth by following 2021 tactics. The algorithm rewards depth today.",
        "Your UI is pretty, but if your SOC 2 isn't ready, the enterprise buyer doesn't care.",
        "A 5-step framework to harden your node: 1) Encryption, 2) Data Governance, 3) RBAC... read more",
        "AI agents are replacing junior engineers, but they won't replace senior architects who design robust pipelines."
    ]
    
    # Let the Universal Model Router dynamically extract the lexical fingerprint
    try:
        dna_analysis = analyze_lexical_dna(mock_recent_posts)
        return LexicalDNA(
            style_archetype=dna_analysis.style_archetype,
            vocabulary_density=dna_analysis.vocabulary_density,
            sentence_variance=dna_analysis.sentence_variance,
            emotional_resonance=dna_analysis.emotional_resonance,
            top_narratives=dna_analysis.top_narratives,
            suggested_shifts=dna_analysis.suggested_shifts
        )
    except Exception as e:
        # Fallback for when API keys are missing or invalid
        print(f"Failed to generate Voice DNA: {e}")
        return LexicalDNA(
            style_archetype="The Pragmatist / Educator",
            vocabulary_density=0.88,
            sentence_variance="High (Complex-Short Hybrid)",
            emotional_resonance=85,
            top_narratives=["Enterprise Readiness", "Tactical Systems", "Anti-Hype"],
            suggested_shifts=["Lean into provocative opening hooks", "Decrease jargon density slightly"]
        )

@app.get("/v1/intelligence/narrative-fatigue", response_model=FatigueAnalysis)
async def get_format_fatigue(apiKey: str = Depends(verify_api_key)):
    # Simulating recent posts showing extreme format fatigue
    mock_recent_posts = [
        "Stop doing cold outreach. Here is a 5-step framework to launch inbound.",
        "Stop doing manual SEO. Here is a 5-step framework to automate your blog.",
        "Stop doing generic sales calls. Here is a 5-step framework to close whales.",
        "Stop doing traditional networking. Here is a 5-step framework to build a community.",
        "Stop doing slow onboarding. Here is a 5-step framework to activate users instantly."
    ]
    
    try:
        analysis = analyze_format_fatigue(mock_recent_posts)
        if analysis:
            return analysis
        raise ValueError("AI returned empty analysis")
    except Exception as e:
        print(f"Failed to generate Format Fatigue Analysis: {e}")
        return FatigueAnalysis(
            is_fatigued=True,
            dominant_format="Stop doing X. Here is a 5-step framework...",
            fatigue_severity=95,
            pattern_disruptor="Post a vulnerable, raw narrative without lists. Break the 'expert' listicle pattern completely."
        )

@app.get("/v1/intelligence/algorithm-pulse", response_model=PulseAnalysis)
async def get_algorithm_pulse(apiKey: str = Depends(verify_api_key)):
    # Simulating recent engagement velocity data
    mock_engagement_data = [
        {"timestamp": "2023-10-27T14:00:00Z", "velocity": 12.5, "event": "retweet"},
        {"timestamp": "2023-10-27T14:05:00Z", "velocity": 45.2, "event": "reply"},
        {"timestamp": "2023-10-27T14:15:00Z", "velocity": 89.1, "event": "quote_tweet"}
    ]
    
    try:
        analysis = analyze_posting_window(mock_engagement_data)
        if analysis:
            return analysis
        raise ValueError("AI returned empty analysis")
    except Exception as e:
        print(f"Failed to calculate Algorithm Pulse: {e}")
        return PulseAnalysis(
            optimal_window_start="14:20 UTC",
            optimal_window_end="14:35 UTC",
            urgency_score=92,
            reasoning="Velocity indicates a trending cluster of replies. Immediate follow-up capitalizes on active user sessions."
        )

@app.get("/v1/enterprise/audit-logs")
async def get_audit_logs():
    # In a real app, this would load from a persistent log store
    # For this mock, we'll return some sample logs and append to db for persistence
    sample_logs = [
        {"timestamp": datetime.now().isoformat(), "action": "Account Handshake", "user": "System"},
        {"timestamp": datetime.now().isoformat(), "action": "Narrative Shift Applied", "user": "@johndoe"},
        {"timestamp": datetime.now().isoformat(), "action": "Radar Scan complete", "user": "AI-Agent-01"}
    ]
    # Append to db for mock persistence, ensuring datetime is isoformat
    for log in sample_logs:
        if log not in db["audit_logs"]: # Avoid duplicates on repeated calls
            db["audit_logs"].append(log)
    save_db(db)
    return db["audit_logs"]


@app.get("/v1/account/status", response_model=AccountStatus)
async def get_account_status():
    if db["account_linked"]:
        return AccountStatus(
            is_linked=True,
            handle=db["user_data"]["handle"],
            linked_at=db["user_data"]["linked_at"]
        )
    return AccountStatus(is_linked=False)

@app.post("/v1/account/link", response_model=LinkResponse)
async def link_account(request: LinkRequest):
    # Simulate a delay for the handshake
    await asyncio.sleep(1.5)
    
    db["account_linked"] = True
    db["user_data"] = {
        "handle": request.target_handle,
        "linked_at": datetime.now()
    }
    
    return LinkResponse(
        success=True,
        message=f"Neural handshake successful for {request.target_handle}",
        handle=request.target_handle
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
