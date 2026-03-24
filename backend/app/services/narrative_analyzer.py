from typing import List
from pydantic import BaseModel, Field
from app.ai.model_router import generate_strategic_insight
from app.core.agent_config import get_agent_config

class FatigueAnalysis(BaseModel):
    is_fatigued: bool = Field(..., description="True if the author is overusing a specific hook format or narrative structure.")
    dominant_format: str = Field(..., description="The recurring format detected (e.g., 'Thread-boy listicles', 'Contrarian Stop Doing X').")
    fatigue_severity: int = Field(..., description="Scale 0-100 indicating how rapidly the audience is becoming blind to this format.")
    pattern_disruptor: str = Field(..., description="A recommended immediate pivot strategy to shock the algorithm and regain attention.")
    
def analyze_format_fatigue(posts: List[str]) -> FatigueAnalysis:
    """
    Analyzes an array of recent posts to determine if the author is suffering from algorithm format fatigue.
    """
    agent = get_agent_config("narrative_analyzer")
    
    # Combine posts into a structured string
    corpus = "\n\n--- RECENT POST ---\n\n".join(posts)
    
    user_prompt = (
        f"Analyze this sequence of recent posts from the author:\n\n{corpus}\n\n"
        "Extract the Narrative Fatigue Analysis strictly matching the schema."
    )
    
    return generate_strategic_insight(
        system_instruction=agent.system_prompt,
        prompt=user_prompt,
        model=agent.default_model,
        temperature=agent.temperature,
        response_model=FatigueAnalysis
    )
