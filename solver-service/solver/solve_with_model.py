import base64
import torch
from solver.model import load_model

# Load the model once
models = load_model()

def solve_captcha(captcha_type, data):
    if captcha_type == "text":
        # Single base64 image input
        image_tensor = decode_base64_to_tensor(data)
        output = models["text"](image_tensor.unsqueeze(0))
    elif captcha_type == "image":
        # List of base64 blobs (one per char)
        predictions = []
        for blob in data:
            tensor = decode_base64_to_tensor(blob)
            pred = models["image"](tensor.unsqueeze(0))
            predictions.append(pred.argmax(dim=1).item())
        return "".join([chr(65 + p) for p in predictions]), 0.95  # Dummy confidence
    elif captcha_type == "audio":
        # Input is normalized WAV in base64
        audio_tensor = decode_audio_to_tensor(data)
        output = models["audio"](audio_tensor.unsqueeze(0))
    else:
        return "Unsupported", 0.0

    pred = output.argmax(dim=1).item()
    return str(pred), torch.softmax(output, dim=1).max().item()


def decode_base64_to_tensor(base64_str):
    from PIL import Image
    import io
    import torchvision.transforms as transforms
    img_data = base64.b64decode(base64_str)
    image = Image.open(io.BytesIO(img_data)).convert('L')  # Grayscale
    transform = transforms.Compose([
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])
    return transform(image)

def decode_audio_to_tensor(base64_str):
    import librosa
    import numpy as np
    import io
    wav_bytes = base64.b64decode(base64_str)
    y, sr = librosa.load(io.BytesIO(wav_bytes), sr=16000)
    mel = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=64)
    mel_db = librosa.power_to_db(mel, ref=np.max)
    tensor = torch.tensor(mel_db).unsqueeze(0).float()
    return tensor
