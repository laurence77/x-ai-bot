from typing import List, Dict, Any
from pydantic import BaseModel, Field
from app.ai.model_router import generate_strategic_insight
from app.core.agent_config import get_agent_config
import json

class PulseAnalysis(BaseModel):
    optimal_window_start: str = Field(..., description="The highly specific start time for the next post window (e.g., '14:30 EST').")
    optimal_window_end: str = Field(..., description="The highly specific end time for the next post window (e.g., '14:45 EST').")
    urgency_score: int = Field(..., description="A score from 0-100. 100 means 'Post immediately, velocity is peaking'.")
    reasoning: str = Field(..., description="The algorithmic and psychological justification for this precise window.")

def analyze_posting_window(engagement_data: List[Dict[str, Any]]) -> PulseAnalysis:
    """
    Analyzes historical engagement patterns to recommend extreme micro-posting 15-minute windows.
    """
    agent = get_agent_config("algorithm_pulse")
    
    # Format data for prompt
    data_str = json.dumps(engagement_data, indent=2)
    
    user_prompt = (
        f"Analyze this payload of recent audience engagement velocity metrics for the user:\n\n"
        f"```json\n{data_str}\n```\n\n"
        "Calculate the highly exact 'micro-posting window' (max 15 minutes) for maximum algorithmic leverage."
    )
    
    return generate_strategic_insight(
        system_instruction=agent.system_prompt,
        prompt=user_prompt,
        model=agent.default_model,
        temperature=agent.temperature,
        response_model=PulseAnalysis
    )
