import base64
import cv2
import numpy as np
import io
from PIL import Image

def preprocess_text(base64_str):
    img_data=base64.b64decode(base64_str)
    image=Image.open(io.BytesIO(img_data)).convert('L')
    img=np.array(image)

    _,thresh=cv2.threshold(img,128,255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    coords=np.column_stack(np.where(thresh>0))
    angle=cv2.minAreaRect(coords)[-1]
    if angle<-45:
        angle= -(90+angle)
    else:
        angle= -angle
    (h,w)=thresh.shape[:2]
    M=cv2.getRotationMatrix2D((w//2,h//2),angle,1.0)
    deskewed=cv2.warpAffine(thresh,M,(w,h),flags=cv2.INTER_CUBIC)

    _,buffer=cv2.imencode('.png',deskewed)
    return base64.b64decode(buffer).decode('utf-8')