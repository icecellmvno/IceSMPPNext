import{r as u}from"./App-RCZf4Oj7.js";import{b as z}from"./index-DQmsG2na.js";function c(r){const[h,e]=u.useState(void 0);return z(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const f=new ResizeObserver(i=>{if(!Array.isArray(i)||!i.length)return;const b=i[0];let o,t;if("borderBoxSize"in b){const s=b.borderBoxSize,d=Array.isArray(s)?s[0]:s;o=d.inlineSize,t=d.blockSize}else o=r.offsetWidth,t=r.offsetHeight;e({width:o,height:t})});return f.observe(r,{box:"border-box"}),()=>f.unobserve(r)}else e(void 0)},[r]),h}export{c as u};
