import os
from scrapers.covid import CovidScraper
from fastapi import FastAPI
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware

# Origins for requests
origins = [
    "http://appascovidwatch.herokuapp.com",
    "https://appascovidwatch.herokuapp.com",
    "http://localhost",
    "http://localhost:8000",
    "https://localhost:8000",
    "https://127.0.0.1:8000",
    "https://127.0.0.1:8000",
]
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = FastAPI(middleware=middleware)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup the scraper
covscrape = CovidScraper()

# State wise numbers
@app.get("/numbers/{state}")
async def get_state_numbers(state):
    return covscrape.get_state_covid_numbers(state)


# State wise summary
@app.get("/summary/{state}")
async def get_state_summary(state):
    return covscrape.get_state_summary(state)


# Main index page
@app.get("/")
async def get_root():
    return FileResponse("app/index.html")
