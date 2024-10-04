import base64
import cv2
import numpy as np
from ultralytics import YOLO
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import re

def is_valid_base64(s):
    return re.match(r'^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$', s) is not None

app = FastAPI()

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin 허용 (보안상 권장되지 않음)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# 모델 API 정의
class ModelEvalRequest(BaseModel):
    image: str
    category: str
    subcategory: Optional[str] = None


class GradeResult(BaseModel):
    image: str
    grade: str


class GradeResponse(BaseModel):
    results: List[GradeResult]


@app.get('/')
def main():
    return {"message": "Welcome to the Food Quality API", "version": "1.0"}


@app.post('/modeleval', response_model=GradeResponse)
async def modeleval(request: ModelEvalRequest):
    print('API 호출 시도')
    print(f'Received data: category={request.category}, subcategory={request.subcategory}')
    print(f'Image data length: {len(request.image)}')

    if not is_valid_base64(request.image):
        raise HTTPException(status_code=400, detail="Invalid base64 image data")

    try:
        image_data = base64.b64decode(request.image)
        category = request.category
        subcategory = request.subcategory

        if subcategory not in ['apple', 'Apple']:
            raise HTTPException(status_code=400, detail="Unsupported subcategory")

        result = []
        food_list = food_detection(subcategory, image_data)
        print('======================')
        print(food_list)
        print(type(food_list))
        if not food_list:
            # 객체를 발견하지 못한 경우
            print('객체 발견 실패')
            return GradeResponse(results=[])

        for food in food_list:
            fresh_result = is_fresh(subcategory, food)

            if fresh_result['freshness'] == 'ROTTEN':
                grade = 'rotten'
            else:
                grade_result = food_grade(subcategory, food)
                grade = grade_result['grade']

            # 이미지를 base64로 다시 인코딩
            _, buffer = cv2.imencode('.jpg', food)
            food_base64 = base64.b64encode(buffer).decode('utf-8')

            result.append(GradeResult(image=food_base64, grade=grade))

        return GradeResponse(results=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 식자재 탐지 모델
def food_detection(food, image_data):
    cropped_images = []

    # 객체 탐지 모델 로드
    model = YOLO(f'./models/detection/{food}_best.pt')

    # NumPy 배열로 변환
    nparray = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparray, cv2.IMREAD_COLOR)

    # 객체 탐지 수행
    # results = model(image)
    results = model.predict(image, conf=0.5)
    # print(results)

    # 탐지된 각 객체에 대해 이미지 크롭
    for obj in results:
        boxes = obj.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            # 이미지 크롭
            cropped_img = image[y1:y2, x1:x2]

            # 크롭된 이미지를 리스트에 추가
            cropped_images.append(cropped_img)

    return cropped_images


# 신선도 확인 모델
def is_fresh(food, image):
    # 신선도 분류 모델 로드
    model_path = f'./models/freshness/{food}_best_M.pt'
    model = YOLO(model_path)

    # 이미지 전처리
    if isinstance(image, np.ndarray):
        # 이미지가 이미 NumPy 배열인 경우
        processed_image = image
    else:
        # 이미지가 경로인 경우
        processed_image = cv2.imread(image)

    # 이미지에서 신선도 분류 수행
    results = model(processed_image)

    # 결과 해석
    prediction = results[0].probs.top1
    confidence = results[0].probs.top1conf.item()

    # 클래스 이름 매핑 (예시, 실제 모델에 맞게 조정 필요)
    class_names = {0: 'FRESH', 1: 'ROTTEN'}

    freshness = class_names[prediction]

    return {
        'freshness': freshness,
        'confidence': confidence
    }


# 품질 등급 측정 모델
def food_grade(food, image):
    # 품질 등급 분류 모델 로드
    model = YOLO(f'./models/grade/{food}_best.pt')

    # 이미지 전처리
    if isinstance(image, np.ndarray):
        # 이미지가 이미 NumPy 배열인 경우
        processed_image = image
    else:
        # 이미지가 경로인 경우
        processed_image = cv2.imread(image)

    # 이미지에서 품질 등급 분류 수행
    results = model(processed_image)

    # 결과 해석
    prediction = results[0].probs.top1
    confidence = results[0].probs.top1conf.item()

    # 클래스 이름 매핑
    class_names = {0: 'best', 1: 'good', 2: 'normal'}

    grade = class_names[prediction]

    return {
        'grade': grade,
        'confidence': confidence
    }



if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)