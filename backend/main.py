from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os
import asyncio
from fastapi import FastAPI, HTTPException, Depends, Header

from fastapi.middleware.cors import CORSMiddleware

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

def load_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {
        "account_linked": False,
        "user_data": None,
        "audit_logs": []
    }

def save_db(data):
    # Convert datetime to string for JSON
    if data.get("user_data") and isinstance(data["user_data"].get("linked_at"), datetime):
        data["user_data"]["linked_at"] = data["user_data"]["linked_at"].isoformat()
    with open(DB_FILE, "w") as f:
        json.dump(data, f)

db = load_db()

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
    return LexicalDNA(
        style_archetype="The Disruptor / Visionary",
        vocabulary_density=0.84,
        sentence_variance="High (Complex-Short Hybrid)",
        emotional_resonance=92,
        top_narratives=["AI Sovereignty", "Exponential Growth", "Anti-Standardization"],
        suggested_shifts=["Increase 'Urgency' keywords by 12%", "Reduce passive voice in hooks"]
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
