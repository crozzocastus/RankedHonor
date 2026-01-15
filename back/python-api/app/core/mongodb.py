from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# MongoDB client
mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
mongodb_database = mongodb_client[settings.MONGODB_DATABASE]


async def get_mongodb():
    """Dependency for getting MongoDB database"""
    return mongodb_database
