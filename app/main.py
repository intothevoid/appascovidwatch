import os
from scrapers.covid import CovidScraper
from fastapi import FastAPI
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Origins for requests
origins = [
    "http://appascovidwatch.herokuapp.com",
    "https://appascovidwatch.herokuapp.com",
    "http://localhost",
    "http://localhost:8000",
    "https://localhost:8000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
covscrape = CovidScraper()


@app.get("/numbers/{state}")
async def get_numbers(state):
    return covscrape.get_covid_numbers(state)


@app.get("/")
async def get_root():
    return FileResponse("app/index.html")
