import os
from celery import Celery

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Initialize the primary Celery instance for X Intelligence platform
celery_app = Celery(
    "xintelligence_worker",
    broker=REDIS_URL,
    backend=REDIS_URL
)

# Standardize configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    # Route scheduled vs real-time AI workloads to distinct queues
    task_routes={
        "app.tasks.scheduler.*": {"queue": "scheduler"},
        "app.tasks.analysis.*": {"queue": "ai_analysis"}
    }
)
