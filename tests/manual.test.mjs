import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,validate,report} from '../public/core.js';
import {upgrade} from '../public/care.js';
import {sectors,createManual} from '../public/manual.js';
test('분야는 다섯 개이며 새 기획에는 고정 브랜드가 없다',()=>{assert.equal(sectors.length,5);const p=initial(false);assert.equal(p.brand,'');assert.equal(p.sector,'');assert.equal(p.venues.length,0);assert.throws(()=>createManual(''));});
test('분야별 초안은 공통 기준과 별도 절차를 포함하고 미점검으로 시작한다',()=>{for(const sector of sectors){const items=createManual(sector);assert.equal(items.length,3);assert.equal(items[2].sector,sector);assert.ok(items.every(x=>x.status==='초안'&&x.check==='미점검'));}});
test('분야 변경 후 이전 매뉴얼을 보존하고 보고서에서 재검토를 안내한다',()=>{const p=upgrade(initial(false));p.sector=sectors[0];p.manual.items=createManual(p.sector);p.manual.items[0].finding='합성 점검 기록';p.sector=sectors[1];const q=validate(JSON.parse(JSON.stringify(p)));assert.equal(q.manual.items[0].finding,'합성 점검 기록');assert.match(report(q),/이전 분야 기준/);assert.match(report(q),/합성 점검 기록/);assert.throws(()=>validate({...q,sector:'미지원 분야'}));q.manual.items[0].id='<img>';assert.throws(()=>validate(q));});
test('이전 버전 백업의 사용자 자료를 지우지 않고 매뉴얼 필드를 확장한다',()=>{const p=initial(false);delete p.sector;p.brand='기존 사용자 입력';const q=validate(p);assert.equal(q.brand,'기존 사용자 입력');assert.equal(q.sector,'');assert.equal(q.manual.items.length,0);});
