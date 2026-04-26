#!/bin/bash
# Start script for Render
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT
