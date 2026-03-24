import os
import secrets
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

X_CLIENT_ID = os.getenv("X_CLIENT_ID", "mock_client_id")
X_CLIENT_SECRET = os.getenv("X_CLIENT_SECRET", "mock_client_secret")
REDIRECT_URI = os.getenv("X_REDIRECT_URI", "http://localhost:3000/api/auth/callback/twitter")

class OAuthURLResponse(BaseModel):
    url: str
    state: str
    code_challenge: str
    code_verifier: str

@router.get("/login", response_model=OAuthURLResponse)
async def x_login_url():
    """Generates the X (Twitter) OAuth 2.0 PKCE Authorization URL"""
    state = secrets.token_urlsafe(16)
    code_verifier = secrets.token_urlsafe(32)
    # Using 'plain' challenge for simplicity in simulation, real impl uses S256
    url = f"https://twitter.com/i/oauth2/authorize?response_type=code&client_id={X_CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=tweet.read%20users.read%20offline.access&state={state}&code_challenge={code_verifier}&code_challenge_method=plain"
    
    return OAuthURLResponse(url=url, state=state, code_challenge=code_verifier, code_verifier=code_verifier)

@router.get("/callback")
async def x_callback(code: str, state: str):
    """Handles the OAuth 2.0 callback and simulates token exchange"""
    if not code:
        raise HTTPException(status_code=400, detail="Missing authorization code")
    
    # Simulate a successful token exchange (In reality this is a POST to api.twitter.com/2/oauth2/token)
    return {
        "access_token": "mock_x_access_token_12345",
        "refresh_token": "mock_x_refresh_token_67890",
        "expires_in": 7200,
        "token_type": "bearer",
        "user_id": "twitter_user_123"
    }
