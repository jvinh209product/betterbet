export const EVENTS=['signup_completed','workspace_created','teammate_invited','first_value_reached'];
export const DAY=86400000;
export const DEFAULT_FILTERS={from:'2026-09-01',to:'2026-09-23',device:'all',acquisition_channel:'all',plan_type:'all',country:'all',days:7,excludeIncomplete:false};
export function generateDemo(){
 const events=[];let seed=2092026;
 const random=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<12000;i++){
  const rank=(i*7919)%12000,user_id=`od-${String(i+1).padStart(5,'0')}`;
  const row={user_id,device:random()<.36?'mobile':'desktop',acquisition_channel:['organic','paid','referral'][Math.floor(random()*3)],plan_type:random()<.7?'free':'trial',country:['US','VN','GB','DE','SG'][Math.floor(random()*5)],session_id:`session-${i+1}`};
  let time=Date.UTC(2026,8,1)+Math.floor(random()*23)*DAY+Math.floor(random()*20)*3600000;
  const add=(name,t)=>events.push({...row,event_name:name,timestamp:new Date(t).toISOString()});
  add(EVENTS[0],time);
  if(rank<10080){time+=3600000*(1+random()*3);add(EVENTS[1],time);
   if(rank<3720){time+=3600000*(8+random()*25);add(EVENTS[2],time);
    if(rank<2160){time+=3600000*(8+random()*45);add(EVENTS[3],time);}
   }else if(i%9===0)add('invite_screen_viewed',time+3600000);
  }
 }
 return {id:'orbitdesk-demo-v1',name:'OrbitDesk',provenance:'synthetic_demo',events,fingerprint:'orbitdesk-2092026-v1',observation_end_at:'2026-09-30T23:59:59Z',parse_warnings:[]};
}
const cache=new WeakMap();
function indexed(events){if(cache.has(events))return cache.get(events);const map=new Map();for(const e of events){const id=JSON.stringify([e.case_id||'',e.entity_type||'user',e.entity_id||e.user_id]);if(!map.has(id))map.set(id,[]);map.get(id).push({...e,time:Date.parse(e.timestamp)});}for(const rows of map.values())rows.sort((a,b)=>a.time-b.time);cache.set(events,map);return map;}
export function computeOrderedFunnel(events,filters=DEFAULT_FILTERS,observationEnd='2026-09-30T23:59:59Z',steps=EVENTS,config={}){
 const counts=steps.map(()=>0),cohort=[];let incomplete=0;
 const from=filters.from?Date.parse(filters.from+'T00:00:00Z'):-Infinity,to=filters.to?Date.parse(filters.to+'T23:59:59.999Z'):Infinity;
 const window=Math.max(1,Number(filters.days)||7)*DAY,end=Date.parse(observationEnd);
 for(const [id,rows]of indexed(events)){
  const entry=rows.find(e=>e.event_name===steps[0]&&e.time>=from&&e.time<=to&&e.time<=end);if(!entry)continue;
  if(config.id&&entry.case_id&&entry.case_id!==config.id)continue;if(config.unit&&entry.entity_type&&entry.entity_type!==config.unit)continue;
  if(['device','acquisition_channel','plan_type','country'].some(k=>filters[k]&&filters[k]!=='all'&&entry[k]!==filters[k]))continue;
  const censored=entry.time+window>end;if(censored){incomplete++;if(filters.excludeIncomplete)continue;}
  let last=entry.time,progress=1;const times=[entry.time];counts[0]++;
  for(let s=1;s<steps.length;s++){const minimum=/day30/.test(steps[s])?30*DAY:0;const maximum=steps[s]==='second_session_7d'?7*DAY:steps[s]==='paid_within_14d'?14*DAY:window;const next=rows.find(e=>e.event_name===steps[s]&&e.time>last&&e.time>=entry.time+minimum&&e.time<=Math.min(end,entry.time+window,entry.time+maximum));if(!next)break;counts[s]++;last=next.time;times.push(last);progress++;}
  cohort.push({user_id:entry.entity_id||entry.user_id,entry,progress,times,censored});
 }
 return {counts,cohort,incomplete,steps:counts.map((users,i)=>({event_name:steps[i],users,cumulative_conversion:counts[0]?users/counts[0]:null,previous_step_conversion:i&&counts[i-1]?users/counts[i-1]:null,dropoff_users:i?counts[i-1]-users:null,dropoff_rate:i&&counts[i-1]?1-users/counts[i-1]:null}))};
}
export function compareSegments(events,filters,observationEnd,property,steps=EVENTS,config={}){
 const all=computeOrderedFunnel(events,{...filters,[property]:'all'},observationEnd,steps,config);const groups=new Map();
 for(const row of all.cohort){const key=row.entry[property]||'unknown';if(!groups.has(key))groups.set(key,steps.map(()=>0));const c=groups.get(key);for(let i=0;i<row.progress;i++)c[i]++;}
 return [...groups].map(([name,counts])=>({name,counts,activation:counts[0]?counts[config.primaryIndex??3]/counts[0]:null}));
}
export function parseCsv(text){
 if(!text?.trim())throw new Error('empty');text=text.replace(/^\uFEFF/,'');
 const first=text.split(/\r?\n/)[0];const delimiter=[',',';','\t'].sort((a,b)=>first.split(b).length-first.split(a).length)[0];
 let rows=[],row=[],field='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===delimiter&&!quoted){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);field='';if(row.some(v=>v.trim()))rows.push(row);row=[];}else field+=c;}
 if(quoted)throw new Error('quotes');row.push(field);if(row.some(v=>v.trim()))rows.push(row);
 if(rows.length<2)throw new Error('rows');if(rows.length>100001)throw new Error('limit');
 const headers=rows.shift().map(h=>h.trim());if(new Set(headers).size!==headers.length||headers.some(h=>!h))throw new Error('headers');
 return {headers,rows:rows.map((r,i)=>({line:i+2,cells:r,values:Object.fromEntries(headers.map((h,j)=>[h,(r[j]??'').trim()]))})),delimiter};
}
export function fingerprint(text){let hash=2166136261;for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(16);}
export function validateEvents(parsed,mapping,aliases={},assumeUTC=false){
 const errors=[],warnings=[],events=[],seen=new Set();let duplicates=0;
 for(const r of parsed.rows){const v=r.values,id=v[mapping.user_id]?.trim(),name=v[mapping.event_name]?.trim();let timestamp=v[mapping.timestamp]?.trim();
  if(!id||!name){errors.push({line:r.line,reason:'missing'});continue;}
  if(!/^\d{4}-\d{2}-\d{2}T/.test(timestamp||'')){errors.push({line:r.line,reason:'timestamp'});continue;}
  if(!/(Z|[+-]\d{2}:?\d{2})$/i.test(timestamp)){if(assumeUTC){timestamp+='Z';warnings.push('utc');}else{errors.push({line:r.line,reason:'timezone'});continue;}}
  if(!Number.isFinite(Date.parse(timestamp))){errors.push({line:r.line,reason:'timestamp'});continue;}
  const event_name=aliases[name]||name,normalized=new Date(timestamp).toISOString(),key=[id,event_name,normalized].join('|');
  if(seen.has(key)){duplicates++;continue;}seen.add(key);
  const event={user_id:id,event_name,timestamp:normalized};for(const k of ['device','acquisition_channel','plan_type','country','session_id'])event[k]=v[mapping[k]]||'unknown';events.push(event);
 }
 if(!events.some(e=>e.event_name===EVENTS[0]))warnings.push('no_entry');
 const observationEnd=events.length?new Date(Math.max(...events.map(e=>Date.parse(e.timestamp)))).toISOString():null;
 const users=indexed(events);let orderIssues=0;for(const rows of users.values()){const entry=rows.find(e=>e.event_name===EVENTS[0]);if(!entry&&rows.some(e=>EVENTS.includes(e.event_name)))orderIssues++;else if(entry&&rows.some(e=>EVENTS.indexOf(e.event_name)>0&&e.time<=entry.time))orderIssues++;}
 if(orderIssues)warnings.push('order');return {events,errors,warnings:[...new Set(warnings)],duplicates,orderIssues,observationEnd};
}
export function wilson(k,n,z=1.959963984540054){if(!n)return [null,null];const p=k/n,d=1+z*z/n,m=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [m-h,m+h];}
export function twoArmMetrics(rows){const arms={control:{n:0,k:0},treatment:{n:0,k:0}};for(const row of rows){arms[row.variant].n++;arms[row.variant].k+=Number(row.converted);}return metricsFromCounts(arms.control.k,arms.control.n,arms.treatment.k,arms.treatment.n);}
export function metricsFromCounts(ck,cn,tk,tn){const arms={control:{k:ck,n:cn},treatment:{k:tk,n:tn}};for(const a of Object.values(arms)){a.rate=a.n?a.k/a.n:null;a.interval=wilson(a.k,a.n);}
 const c=arms.control,t=arms.treatment;if(!c.n||!t.n)return {...arms,difference:null,relative:null,interval:[null,null]};const diff=t.rate-c.rate;
 return {...arms,difference:diff,relative:c.rate?diff/c.rate:null,interval:[diff-Math.sqrt((t.rate-t.interval[0])**2+(c.interval[1]-c.rate)**2),diff+Math.sqrt((t.interval[1]-t.rate)**2+(c.rate-c.interval[0])**2)]};
}
export function validateOutcomes(parsed,windowDays=7,observationEnd=new Date().toISOString()){
 const rows=[],errors=[],seen=new Set(),warnings=[];const unitCounts=new Map();for(const r of parsed.rows){const id=r.values.user_id;unitCounts.set(id,(unitCounts.get(id)||0)+1);}
 const required=['user_id','variant','exposure_timestamp','converted'];if(required.some(h=>!parsed.headers.includes(h)))return {rows,errors:[{line:1,reason:'schema'}],warnings};
 for(const r of parsed.rows){const v=r.values;const id=v.user_id,variant=v.variant.toLowerCase(),time=Date.parse(v.exposure_timestamp);const val=v.converted.toLowerCase();
  if(!id||!['control','treatment'].includes(variant)||!['1','0','true','false'].includes(val)||!Number.isFinite(time)||!/(Z|[+-]\d{2}:?\d{2})$/i.test(v.exposure_timestamp)){errors.push({line:r.line,reason:'invalid'});continue;}
  if(unitCounts.get(id)>1){errors.push({line:r.line,reason:'duplicate'});continue;}seen.add(id);
  if(time+windowDays*DAY>Date.parse(observationEnd)){errors.push({line:r.line,reason:'followup'});continue;}
  const converted=['1','true'].includes(val);let conversionTime=Date.parse(v.conversion_timestamp);
  if(converted&&v.conversion_timestamp&&(!Number.isFinite(conversionTime)||conversionTime<time||conversionTime>time+windowDays*DAY)){errors.push({line:r.line,reason:'conversion'});continue;}
  if(converted&&!v.conversion_timestamp)warnings.push('binary');rows.push({user_id:id,variant,exposure_timestamp:new Date(time).toISOString(),converted,conversion_timestamp:v.conversion_timestamp||null});
 }
 return {rows,errors,warnings:[...new Set(warnings)]};
}
export function sampleSize(p1,p2,alpha=.05,power=.8){
 const alphaZ={'.05':1.95996398454,'.1':1.64485362695,'.01':2.57582930355},powerZ={'.8':.84162123357,'.9':1.28155156554,'.95':1.64485362695};
 if(!(p1>0&&p1<1&&p2>0&&p2<1&&p1!==p2))return null;
 const zA=alphaZ[String(alpha).replace(/^0/,'')],zB=powerZ[String(power).replace(/^0/,'')];if(!zA||!zB)return null;
 const mean=(p1+p2)/2;return Math.ceil((zA*Math.sqrt(2*mean*(1-mean))+zB*Math.sqrt(p1*(1-p1)+p2*(1-p2)))**2/(p2-p1)**2);
}
export function csvCell(v){let s=String(v??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function toCsv(rows){return rows.map(r=>r.map(csvCell).join(',')).join('\r\n');}
