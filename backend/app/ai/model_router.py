import os
import json
from typing import Type, TypeVar, Optional, Any
from pydantic import BaseModel
from litellm import completion
from dotenv import load_dotenv

load_dotenv()

DEFAULT_MODEL = os.getenv("DEFAULT_AI_MODEL", "gemini/gemini-2.5-flash")

T = TypeVar('T', bound=BaseModel)

def generate_strategic_insight(
    system_instruction: str, 
    prompt: str, 
    model: str | None = None,
    temperature: float = 0.7,
    response_model: Optional[Type[T]] = None
) -> str | T | None:
    """
    Unified wrapper to call ANY connected AI model for strategic insights.
    Uses LiteLLM which supports OpenAI, Anthropic, Google, Groq, etc.
    If response_model is provided, tries to cast the response to the specified Pydantic model.
    """
    target_model = model or DEFAULT_MODEL
    
    try:
        messages = [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": prompt}
        ]
        
        kwargs = {
            "model": target_model,
            "messages": messages,
            "temperature": temperature,
        }
        
        # LiteLLM supports passing response_format directly for structured outputs on compatible models
        if response_model:
            kwargs["response_format"] = response_model
            
        response = completion(**kwargs)
        
        # When structured output is natively handled by litellm, it parses directly into kwargs/response
        # But for generic handling across models:
        content = response.choices[0].message.content
        
        if response_model and isinstance(content, str):
            try:
                clean_text = content.replace('```json', '').replace('```', '').strip()
                data = json.loads(clean_text)
                return response_model(**data)
            except Exception as parse_err:
                print(f"[{target_model}] Failed to parse response into Pydantic model: {parse_err}")
                return None
                
        # If response_format returned a Pydantic object instead of text (LiteLLM structured output behavior)
        if response_model and not isinstance(content, str) and content is not None:
             return content # Already cast

        return content
    except Exception as e:
        print(f"[{target_model}] AI Model API Error: {e}")
        return None
