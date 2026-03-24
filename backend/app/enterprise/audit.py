from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
from app.core.agent_config import get_agent_config

router = APIRouter()

class PromptAuditRecord(BaseModel):
    recommendation_id: str
    workspace_id: int
    agent_used: str
    prompt_version_hash: str
    timestamp: str

@router.get("/prompt-versions/{workspace_id}", response_model=List[PromptAuditRecord])
async def get_prompt_audit_trail(workspace_id: int):
    """
    Returns the exact semantic version/hash of the prompts used to generate past advice.
    Crucial for Enterprise auditability.
    """
    # Simulating fetching the linked prompt histories from the PostgreSQL audit tables
    return [
        PromptAuditRecord(
            recommendation_id="rec_99812",
            workspace_id=workspace_id,
            agent_used="bio_alignment",
            prompt_version_hash="v1.4.2_b9f3",  # Hash of the exact system prompt string used
            timestamp="2023-10-31T09:00:00Z"
        ),
        PromptAuditRecord(
            recommendation_id="rec_99813",
            workspace_id=workspace_id,
            agent_used="algorithm_pulse",
            prompt_version_hash="v1.1.0_a2c1",
            timestamp="2023-11-01T14:20:00Z"
        )
    ]
