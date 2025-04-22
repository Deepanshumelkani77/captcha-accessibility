import base64
import numpy as np
import io
import scipy.signal
import soundfile as sf
import librosa

def preprocess_audio(base64_str):
    audio_data = base64.b64decode(base64_str)
    y, sr = librosa.load(io.BytesIO(audio_data), sr=None)
    b, a = scipy.signal.butter(4, [300/(sr/2), 3000/(sr/2)], btype='band')
    filtered = scipy.signal.lfilter(b, a, y)
    norm_audio = librosa.util.normalize(filtered)
    buffer = io.BytesIO()
    sf.write(buffer, norm_audio, sr, format='WAV')
    return base64.b64encode(buffer.getvalue()).decode('utf-8')
