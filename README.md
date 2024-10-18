# Gruit
### 좋은 식자재 분석 서비스

## 프로젝트 소개
* 일상생활에서 우리가 소비하는 식자재 중 맛있고 좋은 품질의 식자재를 일반인이 구분하기 어려울 수 있습니다.
* 이를 해결하기 위해 컴퓨터 비전과 AI 모델을 활용하여 식자재 중 좋은 품질의 식자재를 판단하고 찾아주는 서비스 'Gruit'를 제안합니다.

## 주요 기능 및 특징
### 메인화면(대분류 선택)
<table>
  <tr>
    <td style="width: 300px;"><img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/1.png" alt="이미지 설명" width="300"></td>
    <td style="width: 500px;"> 1. 과일, 채소, 육류 중 품질을 확인하고 싶은 식자재를 선택할 수 있습니다.</td>
  </tr>
</table>

### 소분류 선택 화면
<table>
  <tr>
    <td style="width: 300px;"><img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/2.png?raw=true" alt="이미지 설명" width="300"></td>
    <td style="width: 500px;"> 2. 선택한 식자재의 세부항목을 선택할 수 있습니다.</td>
  </tr>
</table>

### 이미지 등록 화면
<table>
  <tr>
    <td style="width: 300px;"><img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/3.png?raw=true" alt="이미지 설명" width="300"></td>
    <td style="width: 500px;"> 3. 사진 촬영 또는 앨범에서 식자재의 사진을 등록 할 수 있습니다 </td>
  </tr>
</table>

### 이미지 업로드 화면
<table>
  <tr>
    <td style="width: 300px;"><img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/4.png?raw=true" alt="이미지 설명" width="300"></td>
    <td style="width: 500px;"> 4. 업로드가 성공한 후 확인 버튼을 누르면 '이미지 업로드 성공' 표시와 함께 결과 페이지로 넘어가게 됩니다. <br>만약 업로드 한 이미지에 탐지된 객체가 여럿이라면 그 숫자만큼 분석 결과가 생성됩니다.</td>
  </tr>
</table>

### 분석 결과 화면
<table>
  <tr>
    <td style="width: 300px;"><img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/5.png?raw=true" alt="이미지 설명" width="300"></td>
    <td style="width: 500px;"> 5. 결과 페이지에서 식자제 판별 정보를 확인할 수 있으며, 아래로 스크롤하면 더 자세한 정보를 볼 수 있습니다.</td>
  </tr>
</table>

### 분석 결과 상세 화면
<table>
  <tr>
    <td style="width: 300px;"><img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/6.png?raw=true" alt="이미지 설명" width="300"></td>
    <td style="width: 500px;"> 6. 식자재에 대한 품질정보, 영양정보를 확인할 수 있습니다. <br>외부 API fatSecret을 통해 특정 식자제의 영양 정보를 불러올 수 있습니다.</td>
  </tr>
</table>

## 모델 소개
### 모델 구성

* 객체 탐지: yolov8n (데이터셋: https://www.kaggle.com/datasets/aeeeeeep/apple-single-object-detection)
* 신선도 분류: yolov8m-cls (데이터셋: https://www.kaggle.com/datasets/aeeeeeep/apple-single-object-detection)
* 품질 분류: yolov8m-cls (데이터셋: https://www.kaggle.com/datasets/aeeeeeep/apple-single-object-detection)

### 모델 학습방법
* 탐지 모델: 사전 학습된 yolov8 모델에 객체 이미지의 클래스 및 바운딩 박스 좌표 추가 학습
* 분류 모델: 사전 학습된 yolov8-cls 모델에 각 클래스를 폴더 구조로 분류해 추가 학습

## 사용 API
* fatSecret (칼로리 계산기)

## ⏱개발 기간
 * 2024년 8월 05일 ~ 2024년 9월 05일

## 👨‍👨‍👦‍👦팀원 구성
* 김동인(norebese) - 객체 탐지 모델 데이터 수집, 전처리, 학습 / 신선도 분류 모델 데이터 수집, 전처리, 학습
* 김도윤
* 조동수(팀장)
* 김대현
* 이종현

## 개발 도구
<img src="https://github.com/norebese/Gruit/blob/main/app/readme_img/tools.png?raw=true" height="300">

`Communication`
<img src="https://img.shields.io/badge/notion-000000?style=flat-square&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white">

## 실행 방법
해당 Repository를 clone 하여 다운로드
 ```cli
  git clone https://github.com/DEVholder/Gruit.git
  ```
  ```cli
  cd Grult
  ```  

#### FrontEnd App의 경우
* NodeJS, 안드로이드 스튜디오 SDK 필요
  ```cli
  cd ./app/react_native_app
  ```
* nodeJS 패키지 설치
  ```cli
  npm install
  ```
  혹은
  ```
  yarn install
  ```
* .env 파일 생성  
  Server 주소, Fatsecret 유저 키 & 시크릿 키  
  ```.env
  REACT_APP_SERVER_API=http://10.0.2.2:8000
  REACT_APP_FATSECRET_OAUTH_KEY='유저키'
  REACT_APP_FATSECRET_SECRET_KEY='시크릿 키'
  ```
* expo 애뮬레이터 실행
  ```cli
  npx expo start
  ```

#### BackEnd Server의 경우
* Python 필요
  ```cli
  cd ./app/backend
  ```
* Python 가상환경 설치 및 활성화
  ```cli
  python -m venv .venv
  ```
  윈도우의 경우
  ```cli
  .\.venv\Scripts\activate
  ```
  리눅스/맥의 경우
  ```cli
  source ./.venv/bin/activate
  ```

* Python 패키지 설치
  ```cli
  pip install -r requirements.txt
  ```
* FastAPI 서버 실행
  ```cli
  python main.py
  ```
### 

