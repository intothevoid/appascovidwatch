#!/bin/bash

docker run -d --name appa --restart unless-stopped -p 8000:8000 appa
