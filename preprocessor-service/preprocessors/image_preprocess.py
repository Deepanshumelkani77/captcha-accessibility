import base64
import numpy as np
import cv2
import io
from PIL import Image

def preprocess_image(base64_str):
    # Decode the base64 string and load the image
    img_data = base64.b64decode(base64_str)
    image = Image.open(io.BytesIO(img_data)).convert('RGB')
    img = np.array(image)

    # Convert the image to grayscale and apply threshold
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

    # Find contours and extract bounding boxes
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    blobs = []
    for cnt in contours:
        # Get the bounding box for each contour
        x, y, w, h = cv2.boundingRect(cnt)

        # Ensure the character is not too small
        if w < 5 or h < 5:
            continue

        # Extract and resize the character region
        char = thresh[y:y+h, x:x+w]
        resized = cv2.resize(char, (28, 28))

        # Convert the resized image to base64
        _, buffer = cv2.imencode('.png', resized)
        blobs.append(base64.b64encode(buffer).decode('utf-8'))

    return blobs
