import test from 'node:test';
import assert from 'node:assert/strict';
import {finalPlan,validateFinalPlan,finalPortfolioReport} from '../public/portfolio-final.js';
import {portfolioView} from '../public/portfolio-final-ui.js';

const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const helpers={btn:(t,a,c,e)=>`<button data-action="${a}" ${e||''}>${t}</button>`,esc,note:(x,t)=>`<div class="${t||''}">${esc(x)}</div>`};

test('고객군 합계와 퍼널은 일관되고 가상 데이터임을 밝힌다',()=>{assert.equal(validateFinalPlan(),true);assert.equal(finalPlan.segments.reduce((n,x)=>n+x.invited,0),240);assert.ok(finalPlan.funnel.every((x,i,a)=>i===0||x.count<=a[i-1].count));assert.ok(finalPlan.status.includes('가상 데이터'));});

test('KPI 산식은 고정된 분모와 일치한다',()=>{const expected=[156/240,116/132,104/116,82/116,47/82,28/82].map(x=>+(x*100).toFixed(1));assert.deepEqual(finalPlan.kpis.map(x=>x.value),expected);assert.ok(finalPlan.kpis.every(x=>x.formula.includes('÷')));});

test('단계 사이 이탈을 삭제하지 않고 모두 담당 업무로 남긴다',()=>{assert.equal(finalPlan.leaks.length,7);assert.ok(finalPlan.leaks.every(x=>x.lost>0&&x.care&&x.owner));assert.equal(finalPlan.leaks.find(x=>x.between==='참석 → 동의').lost,34);});

test('제출 화면이 프로젝트 기획안, 본인 판단, 제출 파일로 이어진다',()=>{const html=portfolioView(helpers);assert.ok(html.includes('프로젝트 기획안'));assert.ok(html.includes('제가 한 판단'));assert.ok(html.includes('제출 파일'));assert.ok(html.includes('.pdf'));assert.ok(html.includes('.xlsx'));assert.ok(html.includes('실제 브랜드의 CRM 정책, 고객 정보, 매출 또는 행사 성과가 아닙니다'));const report=finalPortfolioReport();assert.ok(report.includes('이 프로젝트를 만든 이유'));assert.ok(report.includes('가상 결과'));assert.ok(report.includes('실제 VIP 행사를 운영한 경험은 없습니다'));});

test('Global CRM 질문이 데이터와 다음 행동으로 이어진다',()=>{assert.equal(finalPlan.decisionMap.length,7);assert.ok(finalPlan.decisionMap.every(x=>x.question&&x.data&&x.action&&x.owner&&x.sla));const html=portfolioView(helpers);assert.ok(html.includes('담당자가 묻는 7가지 질문'));assert.ok(html.includes('consent_status'));assert.ok(html.includes('동의 고객만 CRM 등록'));});

test('프로젝트명 의미와 채용공고 담당업무 근거를 명시한다',()=>{assert.match(finalPlan.nameMeaning,/SCENT/);assert.match(finalPlan.nameMeaning,/LOOP/);assert.match(finalPlan.nameNotice,/실제로 사용한 행사명은 아닙니다/);assert.equal(finalPlan.responsibilities.length,4);assert.ok(finalPlan.responsibilities.every(x=>x.jd&&x.proof&&x.deliverable&&x.level));assert.equal(finalPlan.collaboration.length,3);assert.ok(finalPlan.collaboration.every(x=>x.team&&x.ask&&x.decide&&x.handoff));const html=portfolioView(helpers);assert.match(html,/공고의 업무를 프로젝트에 옮긴 방식/);assert.match(html,/리테일, 콘텐츠, 디자인/);assert.match(html,/팀마다 먼저 확인할 내용/);});
