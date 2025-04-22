import base64
import numpy as np
import cv2
import io
from PIL import Image

def preprocess_image(base64_str):
    # Decode the base64 string
    img_data = base64.b64decode(base64_str)
    image = Image.open(io.BytesIO(img_data)).convert('RGB')
    img = np.array(image)

    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    blobs = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        char = thresh[y:y+h, x:x+w]
        resized = cv2.resize(char, (28, 28))

        _, buffer = cv2.imencode('.png', resized)
        blobs.append(base64.b64encode(buffer).decode('utf-8'))

    return blobs
