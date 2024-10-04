# import cv2
# import numpy as np
# from ultralytics import YOLO
# import matplotlib.pyplot as plt
#
# # 크롭된 이미지 시각화
# def visualize_cropped_images(cropped_images):
#     num_images = len(cropped_images)
#     columns = 3
#     rows = (num_images - 1) // columns + 1
#
#     fig, axes = plt.subplots(rows, columns, figsize=(15, 5 * rows))
#     axes = axes.flatten()
#
#     for i, img in enumerate(cropped_images):
#         axes[i].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
#         axes[i].set_title(f'Cropped Image {i+1}')
#         axes[i].axis('off')
#
#     # 남은 서브플롯 제거
#     for i in range(num_images, rows * columns):
#         fig.delaxes(axes[i])
#
#     plt.tight_layout()
#     plt.show()
#
#
#
# food = 'apple'
# image_data = './img.png'
# cropped_images = []
#
# # 객체 탐지 모델 로드
# model = YOLO(f'./models/detection/{food}_best.pt')
#
# # NumPy 배열로 변환
# # nparray = np.frombuffer(image_data, np.uint8)
# # image = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
# image = cv2.imread(image_data)
#
# # 객체 탐지 수행
# results = model(image)
# print('========== results ==========')
# print(results)
# print('==========         ==========')
# # 탐지된 각 객체에 대해 이미지 크롭
# for result in results:
#     boxes = result.boxes
#     for box in boxes:
#         x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
#         x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
#
#         # 이미지 크롭
#         cropped_img = image[y1:y2, x1:x2]
#
#         # 크롭된 이미지를 리스트에 추가
#         cropped_images.append(cropped_img)
# print(len(cropped_images))
# visualize_cropped_images(cropped_images)
#
# print('==============================')
# print('is fresh?')
# print('==============================')
#
#
# image = cropped_images[0]
# model = YOLO(f'./models/freshness/{food}_best.pt')
#
#
# # 이미지 전처리
# if isinstance(image, np.ndarray):
#     # 이미지가 이미 NumPy 배열인 경우
#     processed_image = image
# else:
#     # 이미지가 경로인 경우
#     processed_image = cv2.imread(image)
#
# # 이미지에서 신선도 분류 수행
# results = model(processed_image)
#
# print('========== results ==========')
# print(results)
# print('==========         ==========')
#
# # 결과 해석
# prediction = results[0].probs.top1
# confidence = results[0].probs.top1conf.item()
#
# # 클래스 이름 매핑 (예시, 실제 모델에 맞게 조정 필요)
# class_names = {0: 'fresh', 1: 'not fresh'}
#
# freshness = class_names[prediction]
#
# print({
#     'freshness': freshness,
#     'confidence': confidence
# })


import base64
import requests
import json
import matplotlib.pyplot as plt
import io
from PIL import Image


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


# 이미지 경로
image_path = "./img.png"

# 이미지를 base64로 인코딩
base64_image = encode_image(image_path)

# API 요청 데이터 준비
data = {
    "image": base64_image,
    "category": "fruit",
    "subcategory": "apple"
}

# API 엔드포인트 URL
url = "http://localhost:8000/modeleval"

# POST 요청 보내기
response = requests.post(url, json=data)

# 응답 출력
print(response.status_code)
# print(json.dumps(response.json(), indent=2))

# 응답 데이터 파싱
response_data = response.json()

# 결과 시각화
fig, axes = plt.subplots(1, len(response_data['results']), figsize=(15, 5))

for i, result in enumerate(response_data['results']):
    # base64 이미지 디코딩
    img_data = base64.b64decode(result['image'])
    img = Image.open(io.BytesIO(img_data))

    # 서브플롯에 이미지 표시
    if len(response_data['results']) > 1:
        ax = axes[i]
    else:
        ax = axes

    ax.imshow(img)
    ax.axis('off')
    ax.set_title(f"Grade: {result['grade']}")

plt.tight_layout()
plt.show()