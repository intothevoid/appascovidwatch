import os
import uvicorn
from app.main import app

if __name__ == "__main__":
    uvicorn.run(app, port=3180, host="0.0.0.0")
