from fastapi import FastAPI, Request
from solver.solve_with_model import solve_captcha

app = FastAPI()

@app.post("/solve/{captcha_type}")
async def solve(captcha_type: str, request: Request):
    body = await request.json()
    processed_data = body["processed"]

    solution, confidence = solve_captcha(captcha_type, processed_data)
    return {
        "solution": solution,
        "confidence": confidence
    }
