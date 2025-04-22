from fastapi import FastAPI,Request
from preprocessor import image_preprocess,text_preprocess,audio_preprocess

app=FastAPI()

@app.post("/preprocess/{type}")
async def preprocess(type:str,request:Request):
    body=await request.json()
    data=body["data"]
    if type=="image":
        return image_preprocess(data)
    elif type=="text":
        return text_preprocess(data)
    elif type=="audio":
        return audio_preprocess(data)
