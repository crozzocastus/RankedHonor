from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.get("/")
async def get_matches():
    """Get match history"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )


@router.get("/{match_id}")
async def get_match(match_id: str):
    """Get match details"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )


@router.post("/")
async def create_match():
    """Create a new match"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )
