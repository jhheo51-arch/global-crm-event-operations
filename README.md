# Global CRM Event Operations

VIP 행사의 초청 이유부터 행사 후 담당 업무까지 연결하는 고객 관계 관리(CRM) 운영안입니다.

[SCENT LOOP 소개 PDF](public/downloads/SCENT-LOOP-Global-CRM-Portfolio.pdf) · [Excel 운영표](public/downloads/SCENT-LOOP-CRM-Operations.xlsx) · [프로젝트 기획안](PROJECT-PLAN.md)

아이아이컴바인드 채용공고를 바탕으로 만든 개인 프로젝트입니다. SCENT LOOP는 가상의 탬버린즈 카디퓨저 프리뷰 행사입니다.

## 핵심 설계

**초청 → 현장 경험 → 마케팅 동의 → 후속 상담과 재방문**

- 가상 고객 240명을 네 그룹으로 나누고, 초청 이유와 제외 조건을 정했습니다.
- 행사 참석과 마케팅 동의를 분리해 기록합니다.
- 행사 8주 전부터 행사 후 30일까지 담당자, 다음 행동, 기한과 완료 근거를 연결합니다.

## 검증 범위

고객 단계 합계, 전환율의 분모와 분자, 누락 업무와 출처 표시를 검사하고 PDF, Excel과 구현의 핵심 수치를 대조했습니다.

고객 수와 전환율은 계산 설명용 가상값입니다. 실제 고객 정보와 내부 정책은 사용하지 않았으며, 행사 운영 성과와 구매 효과는 검증하지 않았습니다.

## 자료 안내

**PDF에서 판단을 읽고, Excel에서 계산과 인계 구조를 확인할 수 있습니다.** 운영 웹 화면은 소유자 전용입니다.

| 보고 싶은 내용 | 문서 |
|---|---|
| 기능과 완료 조건 | [제품 기획서](PRD.md) |
| 조사 근거와 판단 | [조사 자료](RESEARCH-SOURCES.md) / [기획 판단과 검증 과제](PROJECT-NOTES.md) |
| 실행과 자동 검사 | [실행 안내](RUNNING.md) |

<details>
<summary>화면 미리보기</summary>

![SCENT LOOP 프로젝트 화면](assets/project-overview.png)

</details>

<details>
<summary>직접 실행하기와 자동 검사</summary>

**PDF에서 판단을 읽고 → Excel에서 계산과 인계 구조를 확인하는 순서**를 권합니다. 운영 웹 화면은 소유자 전용이므로 외부 방문자는 제출자료나 로컬 실행을 이용해 주세요.

Node.js 22 이상에서 저장소 폴더의 터미널에 입력합니다.

```sh
npm ci
npm start
```

터미널에 표시되는 주소를 브라우저로 엽니다. 서울시 데이터 연결 설정과 검사 명령은 [실행 안내](RUNNING.md)에 있습니다.

</details>

제작자가 기획 범위와 판단 기준을 정하고 문구, 화면과 계산식을 확인했습니다. 실제 적용에는 회사의 고객 정의, 국가별 동의 기준과 현장 검토가 필요합니다.
