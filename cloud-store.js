import {validate} from './public/core.js';
export async function cloudStore(request,env){
 const url=new URL(request.url),send=(code,data)=>new Response(JSON.stringify(data),{status:code,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
 if(!env.DB)return send(503,{error:'사이트 저장소를 사용할 수 없습니다. 작성 중인 내용은 이 기기에 보존됩니다.'});
 try{
 if(request.method==='GET'){const id=url.searchParams.get('id');if(!id){const rows=await env.DB.prepare('SELECT id,name,revision,updated_at FROM event_projects ORDER BY updated_at DESC LIMIT 500').all();return send(200,{projects:rows.results});}const row=await env.DB.prepare('SELECT body,revision FROM event_projects WHERE id = ?').bind(id).first();return row?send(200,{project:JSON.parse(row.body),revision:row.revision}):send(404,{error:'저장된 행사가 없습니다.'});}
 if(request.method!=='PUT')return send(405,{error:'지원하지 않는 요청입니다.'});
 if(request.headers.get('Origin')!==url.origin||request.headers.get('X-Event-Save')!=='1')return send(403,{error:'사이트 화면에서 저장해 주세요.'});
 const raw=await request.text();if(raw.length>5000000)return send(413,{error:'저장 자료는 5MB 이내로 줄여 주세요.'});
 let p,revision;try{const input=JSON.parse(raw);p=validate(input.project,{draft:true});revision=input.revision;if(!Number.isInteger(revision)||revision<0)throw Error();}catch{return send(400,{error:'저장 자료 형식을 확인하세요. 백업으로 초안을 보존할 수 있습니다.'});}
 const at=new Date().toISOString(),body=JSON.stringify(p);let result;
 if(revision===0)result=await env.DB.prepare('INSERT INTO event_projects (id,name,body,revision,updated_at) VALUES (?,?,?,1,?) ON CONFLICT(id) DO NOTHING').bind(p.id,p.name,body,at).run();
 else result=await env.DB.prepare('UPDATE event_projects SET name=?,body=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').bind(p.name,body,at,p.id,revision).run();
 if(!result.meta.changes)return send(409,{error:'다른 저장본이 있습니다. 초안을 백업한 뒤 사이트에서 최신 자료를 불러오세요.'});
 return send(200,{revision:revision+1,updatedAt:at});
 }catch{return send(503,{error:'사이트 저장에 실패했습니다. 초안은 유지되므로 잠시 후 다시 시도하세요.'});}
}
