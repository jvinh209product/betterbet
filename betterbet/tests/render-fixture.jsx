import React from 'react';import {renderToString} from 'react-dom/server';
import {Context} from '../src/components/ui.jsx';import Marketing from '../src/Marketing.jsx';import Lab from '../src/Lab.jsx';
import {initialState} from '../src/domain/content.mjs';import {generateDemo,computeOrderedFunnel,DEFAULT_FILTERS} from '../src/domain/analytics.mjs';
const demo=generateDemo(),funnel=computeOrderedFunnel(demo.events,DEFAULT_FILTERS,demo.observation_end_at);
export function renderPage(page,language='en',withDecision=false){
 globalThis.location={pathname:'/',search:'',href:'https://example.com/'};globalThis.innerWidth=1440;
 const state=initialState();state.language=language;
 const decision=withDecision?{id:'BET-0001',title:'Chosen bet',provenance:'synthetic_demo',dataset_fingerprint:demo.fingerprint,issue:'Invite teammate',observation:'Observed pattern',baseline:{counts:funnel.counts},filters:DEFAULT_FILTERS,hypothesis:'Test hypothesis',evidence:state.evidence.slice(0,2),options:state.options.map(o=>({...o,title:o.title[0],mechanism:o.mechanism[0]})),chosen:'A',rationale:'Rationale',revisit:'Revisit',created_at:new Date().toISOString(),updated_at:new Date().toISOString(),history:[]}:null;
 if(decision){state.decisions=[decision];state.activeDecision=decision.id;state.investigation={step:2,baseline:{counts:funnel.counts},filters:DEFAULT_FILTERS,dataset_fingerprint:demo.fingerprint,provenance:'synthetic_demo'};state.experiments[decision.id]={id:'EXP-1',title:'Experiment',hypothesis:'Hypothesis',population:'New users',unit:'unique_user',method:'usability',numerator:'first_value_reached',denominator:'signup_completed',days:7,baseline:18,target:22,alpha:.05,power:.8,control:'Control',treatment:'Treatment',guardrail:'Invite',rule:'Rule',notes:'',start:'',end:''};state.briefs[decision.id]={content:'# REAL EDITABLE BRIEF',updated_at:new Date().toISOString()};}
 const t=(en,vi)=>language==='vi'?vi:en,c=x=>Array.isArray(x)?x[language==='vi'?1:0]:x??'';
 const context={state,setState:()=>{},route:page,navigate:()=>{},t,c,n:x=>String(x),percent:x=>x==null?'—':(x*100).toFixed(2)+'%',demoFunnel:funnel,funnel,dataset:demo,decision,imported:null,outcomes:{},toast:()=>{},confirm:async()=>true,storageError:false,backup:()=>{},restore:()=>{},reset:()=>{},exportDecision:()=>{},activateDecision:()=>{},log:()=>{}};
 return renderToString(<Context.Provider value={context}>{page.startsWith('/lab')?<Lab page={page==='/lab'?'entry':page.split('/')[2]}/>:<Marketing page={page==='/'?'home':page.slice(1)}/>}</Context.Provider>);
}
