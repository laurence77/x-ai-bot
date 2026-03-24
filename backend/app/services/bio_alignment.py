from pydantic import BaseModel
from app.ai.model_router import generate_strategic_insight
from app.core.agent_config import get_agent_config
import json

class BioAlignmentRequest(BaseModel):
    current_bio: str
    viral_topic: str
    
class BioAlignmentResponse(BaseModel):
    mismatch_reason: str
    transformative_bio: str
    is_aligned: bool
    
def analyze_bio_alignment(current_bio: str, viral_topic: str) -> BioAlignmentResponse:
    agent = get_agent_config("bio_alignment")
    
    prompt = f"""
    Compare this user's bio: "{current_bio}"
    with their recent viral success in the topic: "{viral_topic}".
    
    If the bio does not explicitly mention this topic or a related value proposition, 
    it is a mismatch. If it is a mismatch, provide a 'mismatch_reason' and a 'transformative_bio' 
    that retains the existing brand but optimizes for the new audience segment.
    If it is already perfectly aligned, set 'is_aligned' to true and leave the reason empty.
    
    """
    
    response = generate_strategic_insight(
        system_instruction=agent.system_prompt, 
        prompt=prompt,
        model=agent.default_model,
        temperature=agent.temperature,
        response_model=BioAlignmentResponse
    )
    
    if not response:
        # Fallback Mock if API fails or isn't configured
        return BioAlignmentResponse(
            mismatch_reason="Failed to connect to AI Pipeline. Please set GEMINI_API_KEY.",
            transformative_bio="Mock Bio: I post about " + viral_topic,
            is_aligned=False
        )
        
    return response
