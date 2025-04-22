from fastapi import FastAPI,Request
from solver import solver_with_model

app=FastAPI()
async def solve(request:Request):
    body=await request.json()
    result=solve_with_model(body["type"],body["data"])
    return result