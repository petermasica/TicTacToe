#!/bin/bash
docker build . -t tic-tac-toe && docker run -d -p 8000:80 tic-tac-toe
