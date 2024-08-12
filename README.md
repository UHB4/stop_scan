#  ⛽ Stop scan

## 프로젝트 소개
운전자들을 위해 고속도로 휴게소, 주유소, 전기차 충전소 정보를 제공하는 웹 애플리케이션<br>
실시간 정보, 주변 편의시설 등을 한눈에 확인할 수 있다.

## 기능
- 메인페이지 (https://stopscan.store)
- 고속도로별 휴게소 정보 조회 (https://stopscan.store/RestAreaInfo)
- 휴게소 상세 정보 및 편의시설 확인
- 지도 기반 휴게소 위치확인
- 주변 주유소 및 충전소 실시간 상태확인 (https://stopscan.store/GasStation)

## 
# 개발 환경
- intellij
- pycharm
- sql developer
- putty
- win SCP

## Main Stack

<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white">
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
<img src="https://img.shields.io/badge/OracleDB-F80000?style=for-the-badge&logo=oracle&logoColor=white">
<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white">


## Main Library

### axios
- axios를 사용하여 RESTful API와의 통신 구현
- 주로 GET,POST 사용


### react-router-dom v6

- 라우팅, 동적 라우팅, query parmeter와 url parameter를 효율적으로 파싱

### OracleDB

- Oracle 데이터베이스와의 연결 및 쿼리 실행
- 'oracledb'라이브러리를 사용하여 Oracle 데이터베이스와 상호작용

### Kakao Maps SDK

- 카카오 지도 API를 이용하여 지도를 표시하고,마커,오버레이, 원형등을 추가

### GSAP

- 스크롤 애니메이션 추가



## 배포
 AWS EC2 인스턴스 설정
- EC2 인스턴스 생성 및 보안 그룹설정
- SSH 접속을 위한 키 페어 생성
![배포1](https://github.com/user-attachments/assets/3195442e-a00a-49cb-b32e-0e45e789651e)

 서버 접속 및 파일 전송
- PUTTY를 사용한 EC2 인스턴스 SSH 접속
  
- WinSCP를 이용한 파일 전송
  ![배포5](https://github.com/user-attachments/assets/1faabf59-74a9-4d7b-b470-69bfc239640e)

 웹 서버 설정
- Express와 Flask 서버 설치 및 설정
- Nginx 설치 및 리버스 프록시 설정(80포트로 들어오는 요청을 express와 flask서버로 전달)
  <img width="340" alt="배포2" src="https://github.com/user-attachments/assets/0f5f6554-4600-490f-8fff-ff23d3a77fe9">
  <img width="297" alt="배포3" src="https://github.com/user-attachments/assets/1180a76d-4c3f-4b88-93a2-d2c49b1cf7b9">   
  <img width="218" alt="배포4" src="https://github.com/user-attachments/assets/57ff15b0-55e6-478d-86da-8a6a23c0b5f4">


HTTPS 설정
- SSL 인증서 발급 및 설정
- Nginx에서 HTTPS 설정


 테스트 및 배포 
- 로컬에서 테스트 
- 실제 도메인으로 접속 테스트                                                                                                                               

## 형상관리
Github desktop을 사용하여 형상관리를 수행.
Git의 모든 기능을 GUI로 제공하여,커맨드라인을 사용하

<img width="227" alt="형상관리1" src="https://github.com/user-attachments/assets/f69ced85-01f8-4c89-a0ba-233b4931b78b">
- 
GitHub Desktop은 파일의 변경사항을 시각적으로 쉽게 확인할 수 있도록 도와줌.    
파일을 추가, 수정, 삭제할 때마다 해당 내용이 명확하게 표시되므로, 
  실수로 인한 오류를 줄일 수 있음.


   

<img width="178" alt="형상관리2" src="https://github.com/user-attachments/assets/e4dc0899-6096-45e6-a5ac-5c30f3ec5bd1">

GitHub Desktop의 브랜치 관리 기능을 활용하여, 서로 다른 기능을 개발하거나,     
새로운 시도를 할 때마다 별도의 브랜치를 생성하여 작업할 수 있음.    
이로 인해 메인 브랜치의 안정성을 유지하면서도 새로운 기능을 병렬로 개발할 수 있었음.
