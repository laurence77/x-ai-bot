import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

# We expect GEMINI_API_KEY to be in the environment variables
api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    client = genai.Client(api_key=api_key)
else:
    # Try to initialize without explicit key (relies on env variable in SDK)
    try:
        client = genai.Client()
    except Exception:
        client = None

def generate_strategic_insight(system_instruction: str, prompt: str) -> str:
    """Wrapper to call Gemini for strategic insights."""
    if not client:
        print("Gemini Client not initialized. Missing API key.")
        return None
        
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash', # Using regular flash due to general availability, preview might throw Not Found
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None
