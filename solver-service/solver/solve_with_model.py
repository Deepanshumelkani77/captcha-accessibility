import base64
import torch
from solver.model import load_model
from PIL import Image
import io
import torchvision.transforms as transforms
import librosa
import numpy as np

# Load models once
models = load_model()

def solve_captcha(captcha_type, data):
    try:
        if captcha_type == "text":
            # Single base64 image input
            image_tensor = decode_base64_to_tensor(data)
            output = models["text"](image_tensor.unsqueeze(0))
            pred = output.argmax(dim=1).item()
            confidence = torch.softmax(output, dim=1).max().item()
            return str(pred), confidence
        elif captcha_type == "image":
            # List of base64 blobs (one per char)
            predictions = []
            for blob in data:
                tensor = decode_base64_to_tensor(blob)
                pred = models["image"](tensor.unsqueeze(0))
                predictions.append(pred.argmax(dim=1).item())
            solution = "".join([chr(65 + p) for p in predictions])
            confidence = 0.95  # Dummy confidence, adjust if needed
            return solution, confidence
        elif captcha_type == "audio":
            # Input is normalized WAV in base64
            audio_tensor = decode_audio_to_tensor(data)
            output = models["audio"](audio_tensor.unsqueeze(0))
            pred = output.argmax(dim=1).item()
            confidence = torch.softmax(output, dim=1).max().item()
            return str(pred), confidence
        else:
            return "Unsupported", 0.0
    except Exception as e:
        return {"error": str(e)}, 0.0

def decode_base64_to_tensor(base64_str):
    try:
        img_data = base64.b64decode(base64_str)
        image = Image.open(io.BytesIO(img_data)).convert('L')  # Grayscale
        transform = transforms.Compose([
            transforms.Resize((28, 28)),
            transforms.ToTensor(),
            transforms.Normalize((0.5,), (0.5,))
        ])
        return transform(image)
    except Exception as e:
        raise ValueError("Error decoding image: {e}")

def decode_audio_to_tensor(base64_str):
    try:
        wav_bytes = base64.b64decode(base64_str)
        y, sr = librosa.load(io.BytesIO(wav_bytes), sr=16000)
        mel = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=64)
        mel_db = librosa.power_to_db(mel, ref=np.max)
        tensor = torch.tensor(mel_db).unsqueeze(0).float()
        return tensor
    except Exception as e:
        raise ValueError(f"Error decoding audio: {e}")
