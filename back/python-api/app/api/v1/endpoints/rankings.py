from fastapi import APIRouter, HTTPException, status, Query
from typing import Optional

router = APIRouter()


@router.get("/global")
async def get_global_rankings(
    mode: Optional[str] = Query(None, description="Game mode filter"),
    region: Optional[str] = Query(None, description="Region filter"),
    limit: int = Query(50, ge=1, le=100)
):
    """Get global rankings"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )


@router.get("/user/{user_id}")
async def get_user_ranking(user_id: str):
    """Get user ranking position"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )
