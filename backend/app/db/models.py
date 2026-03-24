from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, JSON
from .database import Base
from datetime import datetime

class User(Base):
    """Core user record linked to their X identity"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    x_handle = Column(String, unique=True, index=True)
    x_user_id = Column(String, unique=True)
    access_token = Column(String)
    refresh_token = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Workspace(Base):
    """Multi-tenant enterprise boundary for managing multiple profiles"""
    __tablename__ = "workspaces"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
class AuditLog(Base):
    """Immutable log of all AI actions taken within a workspace for compliance"""
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    action = Column(String)
    details = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
