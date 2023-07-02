#!/bin/bash

docker run -d --name appa --restart unless-stopped -p 3180:3180 appa
