import os
from scrapers.covid import CovidScraper
from fastapi import FastAPI
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware

# Origins for requests
origins = [
    "http://appascovidwatch.karan.myds.me",
    "https://appascovidwatch.karan.myds.me",
    "http://localhost",
    "http://localhost:3180",
    "https://localhost:3180",
    "https://127.0.0.1:3180",
    "https://127.0.0.1:3180",
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


# Worldwide summary
@app.get("/summary/world")
async def get_world_summary():
    return covscrape.get_worldwide_summary()


# State wise summary
@app.get("/summary/{state}")
async def get_state_summary(state):
    return covscrape.get_state_summary(state)


# Main index page
@app.get("/")
async def get_root():
    return FileResponse("app/index.html")
