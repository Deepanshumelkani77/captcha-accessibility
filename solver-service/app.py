from fastapi import FastAPI, Request
from solver.solve_with_model import solve_captcha
from fastapi import HTTPException
import traceback

app = FastAPI()
from fastapi import HTTPException
import traceback

@app.post("/solve/{captcha_type}")
async def solve(captcha_type: str, request: Request):
    try:
        body = await request.json()
        processed_data = body.get("processed")
        
        if not processed_data:
            raise HTTPException(status_code=400, detail="No processed data provided")
        
        # Call the solver function with captcha_type and processed_data
        solution, confidence = solve_captcha(captcha_type, processed_data)
        
        return {
            "solution": solution,
            "confidence": confidence
        }
    except Exception as e:
        # Detailed error response
        error_msg = f"Error: {str(e)}\n{traceback.format_exc()}"
        raise HTTPException(status_code=500, detail=error_msg)
