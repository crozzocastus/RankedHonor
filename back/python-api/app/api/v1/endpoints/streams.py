from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.get("/live")
async def get_live_streams():
    """Get currently live streams"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )


@router.get("/creator/{creator_id}")
async def get_creator_stream(creator_id: str):
    """Get creator stream status"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )
