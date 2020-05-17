# 지하철 정보 관리

## 기능 목록
#### 지하철 노선 관리 API
- 지하철 노선 추가 API
- 지하철 노선 목록 조회 API
- 지하철 노선 수정 API
- 지하철 노선 단건 조회 API
- 지하철 노선 제거 API

#### 지하철 노선 관리 페이지
- 노선 관리 페이지 연동
    - 페이지 호출 시 미리 저장한 지하철 노선 조회
    - 지하철 노선 목록 조회 API 사용
- 노선 추가
    - 노선 이름과 정보를 입력
    - 지하철 노선 추가 API 사용
- 노선 상세 정보 조회
    - 목록에서 노선 선택 시 상세 정보를 조회
- 노선 수정
    - 목록에서 우측 수정 버튼을 통해 수정 팝업화면 노출
    - 수정 팝업 노출 시 기존 정보는 입력되어 있어야 함
    - 정보 수정 후 지하철 노선 수정 API 사용
- 노선 삭제
    - 목록에서 우측 삭제 버튼을 통해 삭제
    - 지하철 노선 삭제 API 사용
    
#### 노선별 지하철역 관리 API
- 지하철 노선에 역 추가
- 지하철 노선에 역 제거
- 지하철 노선 역 목록 조회
- 전체 지하철 노선 역 목록 조회

#### 노선별 지하철역 관리 페이지
- 구간 페이지 연동
    - 전체 노선 목록과 노선에 등록된 지하철역 목록을 통해 페이지 로드
    - 최초 페이지 로드 시 모든 정보를 포함하는 방법
- 구간 추가
    - 추가 버튼과 팝업화면을 통해 추가
- 구간 제거
    - 목록 우측 제거 버튼을 통해 제거