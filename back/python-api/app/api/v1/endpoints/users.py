from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.get("/{user_id}")
async def get_user(user_id: str):
    """Get user by ID"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )


@router.put("/{user_id}")
async def update_user(user_id: str):
    """Update user profile"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Endpoint not yet implemented"
    )
