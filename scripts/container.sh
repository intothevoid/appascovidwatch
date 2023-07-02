#!/bin/bash

docker run --rm --name appa --restart unless-stopped -p 8000:8000 appa
