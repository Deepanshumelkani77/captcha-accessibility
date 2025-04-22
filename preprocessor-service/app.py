from fastapi import FastAPI, Request
from preprocessors.text_preprocess import preprocess_text
from preprocessors.image_preprocess import preprocess_image
from preprocessors.audio_preprocess import preprocess_audio

app = FastAPI()

@app.post("/preprocess/{type}")
async def preprocess(type: str, request: Request):
    body = await request.json()
    data = body["data"]

    print(f"Received {type} data")  # Log to confirm type of data

    if type == "image":
        return {"processed": preprocess_image(data)}
    elif type == "text":
        return {"processed": preprocess_text(data)}
    elif type == "audio":
        return {"processed": preprocess_audio(data)}
    else:
        return {"error": "Unsupported CAPTCHA type"}
