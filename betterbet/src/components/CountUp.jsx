import React,{useRef,useEffect} from 'react';
import {formatMetric,createCounter} from '../domain/counters.mjs';
export default function CountUp({value,kind='count',language='en',digits=2}){
 const ref=useRef(),controller=useRef(),latest=useRef({value,kind,language,digits}),visible=useRef(false),started=useRef(false);latest.current={value,kind,language,digits};
 const initial=useRef(typeof window==='undefined'||value==null||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?value:0);const final=formatMetric(value,kind,language,digits);
 useEffect(()=>{const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');const paint=v=>{const p=latest.current;if(ref.current)ref.current.textContent=formatMetric(v,p.kind,p.language,p.digits);};const ctr=createCounter({request:requestAnimationFrame,cancel:cancelAnimationFrame,onValue:paint});controller.current=ctr;
  const animate=()=>{const v=latest.current.value;if(!visible.current)return;ctr.update(v,started.current?600:900,!!media?.matches||document.visibilityState==='hidden');started.current=true;};controller.current.animate=animate;
  const finish=()=>{if(media?.matches||document.visibilityState==='hidden')ctr.update(latest.current.value,0,true);};media?.addEventListener?.('change',finish);document.addEventListener('visibilitychange',finish);
  let observer;if(window.IntersectionObserver){observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;if(visible.current)animate();else if(started.current)ctr.finish();});observer.observe(ref.current);}else{visible.current=true;animate();}
  return()=>{ctr.stop();observer?.disconnect();media?.removeEventListener?.('change',finish);document.removeEventListener('visibilitychange',finish);controller.current=null;};
 },[]);
 useEffect(()=>{if(controller.current){controller.current.animate();if(ref.current)ref.current.textContent=formatMetric(controller.current.current,kind,language,digits);}},[value,kind,language,digits]);
 return <span className="metric-counter" style={{fontVariantNumeric:'tabular-nums',display:'inline-block',minWidth:typeof value==='number'?final.length+'ch':undefined}}><span ref={ref} aria-hidden="true">{formatMetric(initial.current,kind,language,digits)}</span><span className="sr-only">{final}</span></span>;
}
