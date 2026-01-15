from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, matches, rankings, streams

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(matches.router, prefix="/matches", tags=["Matches"])
api_router.include_router(rankings.router, prefix="/rankings", tags=["Rankings"])
api_router.include_router(streams.router, prefix="/streams", tags=["Streams"])
