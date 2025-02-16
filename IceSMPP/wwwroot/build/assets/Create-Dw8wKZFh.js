import{m as S,j as e,L as T}from"./App-RCZf4Oj7.js";import{A}from"./AuthenticatedLayout-DoUyAWbG.js";import{B as m}from"./button-c9ic-fOB.js";import{I as u}from"./input-BzAsFOCX.js";import{L as o}from"./label-BK41ekJv.js";import{T as h}from"./textarea-i-93MjFS.js";import{B as P}from"./badge-VbPA3Qe2.js";import{C as x,a as j,b as g,c as E,d as v}from"./card-CHroE5b1.js";import"./index-DQmsG2na.js";import"./index-CxaUTmkl.js";import"./Combination-SYSJioZv.js";import"./index-BRk-liT1.js";import"./createLucideIcon-DysgWwsB.js";import"./index-BkidR4kz.js";import"./index-j9oXl22B.js";import"./index-CPWa_MGE.js";import"./dropdown-menu-BJIcfCxy.js";import"./building-2-u8d_W66A.js";import"./coins-DrjgZywA.js";import"./theme-switcher-C7zo5Vjy.js";function X({auth:f,vendor:p}){const{data:s,setData:i,post:y,processing:b,errors:l}=S({type:"smpp",host:"",port:"",username:"",password:"",system_type:"",config:{source_ton:"5",source_npi:"0",dest_ton:"1",dest_npi:"1",endpoints:[]},notes:""}),N=t=>{t.preventDefault(),y(route("vendors.connections.store",p))},w=()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"system_type",children:"System Type"}),e.jsx(u,{id:"system_type",value:s.system_type,onChange:t=>i("system_type",t.target.value)}),l.system_type&&e.jsx("p",{className:"text-sm text-destructive",children:l.system_type})]}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"source_ton",children:"Source TON"}),e.jsxs("select",{id:"source_ton",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:s.config.source_ton,onChange:t=>i("config",{...s.config,source_ton:t.target.value}),children:[e.jsx("option",{value:"0",children:"Unknown (0)"}),e.jsx("option",{value:"1",children:"International (1)"}),e.jsx("option",{value:"2",children:"National (2)"}),e.jsx("option",{value:"3",children:"Network Specific (3)"}),e.jsx("option",{value:"4",children:"Subscriber Number (4)"}),e.jsx("option",{value:"5",children:"Alphanumeric (5)"}),e.jsx("option",{value:"6",children:"Abbreviated (6)"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"source_npi",children:"Source NPI"}),e.jsxs("select",{id:"source_npi",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:s.config.source_npi,onChange:t=>i("config",{...s.config,source_npi:t.target.value}),children:[e.jsx("option",{value:"0",children:"Unknown (0)"}),e.jsx("option",{value:"1",children:"ISDN/Telephone (1)"}),e.jsx("option",{value:"3",children:"Data (3)"}),e.jsx("option",{value:"4",children:"Telex (4)"}),e.jsx("option",{value:"6",children:"Land Mobile (6)"}),e.jsx("option",{value:"8",children:"National (8)"}),e.jsx("option",{value:"9",children:"Private (9)"}),e.jsx("option",{value:"10",children:"ERMES (10)"}),e.jsx("option",{value:"14",children:"Internet (14)"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"dest_ton",children:"Destination TON"}),e.jsxs("select",{id:"dest_ton",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:s.config.dest_ton,onChange:t=>i("config",{...s.config,dest_ton:t.target.value}),children:[e.jsx("option",{value:"0",children:"Unknown (0)"}),e.jsx("option",{value:"1",children:"International (1)"}),e.jsx("option",{value:"2",children:"National (2)"}),e.jsx("option",{value:"3",children:"Network Specific (3)"}),e.jsx("option",{value:"4",children:"Subscriber Number (4)"}),e.jsx("option",{value:"5",children:"Alphanumeric (5)"}),e.jsx("option",{value:"6",children:"Abbreviated (6)"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"dest_npi",children:"Destination NPI"}),e.jsxs("select",{id:"dest_npi",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:s.config.dest_npi,onChange:t=>i("config",{...s.config,dest_npi:t.target.value}),children:[e.jsx("option",{value:"0",children:"Unknown (0)"}),e.jsx("option",{value:"1",children:"ISDN/Telephone (1)"}),e.jsx("option",{value:"3",children:"Data (3)"}),e.jsx("option",{value:"4",children:"Telex (4)"}),e.jsx("option",{value:"6",children:"Land Mobile (6)"}),e.jsx("option",{value:"8",children:"National (8)"}),e.jsx("option",{value:"9",children:"Private (9)"}),e.jsx("option",{value:"10",children:"ERMES (10)"}),e.jsx("option",{value:"14",children:"Internet (14)"})]})]})]})]}),_=()=>{const t=(a="auth")=>{const n=s.config.endpoints||[],r={auth:{method:"POST",path:"/oauth/v3/token",content_type:"application/x-www-form-urlencoded",tag:"auth",headers:{Authorization:"{{authorization_header}}",Accept:"application/json"},template:{grant_type:"client_credentials"}},login:{method:"POST",path:"/login",content_type:"application/json",tag:"login",headers:{Accept:"application/json"},template:{username:"{{username}}",password:"{{password}}"}},sendsms:{method:"POST",path:"/sendsms",content_type:"application/json",tag:"sendsms",headers:{Authorization:"Bearer {{access_token}}",Accept:"application/json"},template:{to:"{{phone}}",message:"{{message}}",from:"{{sender}}"}},sendsms_multi:{method:"POST",path:"/sendsms/multi",content_type:"application/json",tag:"sendsms_multi",headers:{Authorization:"Bearer {{access_token}}",Accept:"application/json"},template:{messages:[{to:"{{phone}}",message:"{{message}}",from:"{{sender}}"}]}},dlrreports:{method:"GET",path:"/reports/dlr",content_type:"application/json",tag:"dlrreports",headers:{Authorization:"Bearer {{access_token}}",Accept:"application/json"},template:{message_id:"{{message_id}}",from_date:"{{from_date}}",to_date:"{{to_date}}"}}};i("config",{...s.config,endpoints:[...n,r[a]||{method:"POST",path:"",content_type:"application/json",tag:"custom",headers:{},template:{}}]})},c=(a,n,r)=>{const d=[...s.config.endpoints||[]];d[a]={...d[a],[n]:r},i("config",{...s.config,endpoints:d})},C=a=>{const n=[...s.config.endpoints||[]];n.splice(a,1),i("config",{...s.config,endpoints:n})};return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(o,{children:"Endpoints"}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("select",{className:"flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",onChange:a=>t(a.target.value),value:"",children:[e.jsx("option",{value:"",disabled:!0,children:"Add Endpoint..."}),e.jsx("option",{value:"auth",children:"Authentication"}),e.jsx("option",{value:"login",children:"Login"}),e.jsx("option",{value:"sendsms",children:"Send SMS"}),e.jsx("option",{value:"sendsms_multi",children:"Send Multiple SMS"}),e.jsx("option",{value:"dlrreports",children:"DLR Reports"}),e.jsx("option",{value:"custom",children:"Custom Endpoint"})]})})]}),(s.config.endpoints||[]).map((a,n)=>e.jsxs(x,{children:[e.jsx(j,{className:"p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs(g,{className:"text-base",children:["Endpoint ",n+1]}),e.jsx(P,{variant:"outline",children:a.tag||"custom"})]}),e.jsx(m,{type:"button",variant:"ghost",size:"sm",onClick:()=>C(n),children:"Remove"})]})}),e.jsxs(v,{className:"p-4 pt-0 space-y-4",children:[e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{children:"HTTP Method"}),e.jsxs("select",{className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:a.method,onChange:r=>c(n,"method",r.target.value),children:[e.jsx("option",{value:"POST",children:"POST"}),e.jsx("option",{value:"GET",children:"GET"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{children:"Content Type"}),e.jsxs("select",{className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:a.content_type,onChange:r=>c(n,"content_type",r.target.value),children:[e.jsx("option",{value:"application/json",children:"application/json"}),e.jsx("option",{value:"application/x-www-form-urlencoded",children:"application/x-www-form-urlencoded"}),e.jsx("option",{value:"multipart/form-data",children:"multipart/form-data"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{children:"Path"}),e.jsx(u,{value:a.path,onChange:r=>c(n,"path",r.target.value),placeholder:"/api/endpoint"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{children:"Headers (JSON)"}),e.jsx(h,{value:JSON.stringify(a.headers,null,2),onChange:r=>{try{const d=JSON.parse(r.target.value);c(n,"headers",d)}catch{c(n,"headers",r.target.value)}},placeholder:'{\\n  "Authorization": "Bearer {{access_token}}",\\n  "Accept": "application/json"\\n}'})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{children:"Request Template (JSON)"}),e.jsx(h,{value:JSON.stringify(a.template,null,2),onChange:r=>{try{const d=JSON.parse(r.target.value);c(n,"template",d)}catch{c(n,"template",r.target.value)}},placeholder:'{\\n  "key": "value"\\n}'})]})]})]},n))]})};return e.jsxs(A,{user:f.user,header:{title:`Add Connection - ${p.name}`,module:"Vendors",breadcrumbs:[{label:"Vendors",href:route("vendors.index")},{label:p.name,href:route("vendors.show",p)},{label:"Add Connection"}]},children:[e.jsx(T,{title:`Add Connection - ${p.name}`}),e.jsx("div",{className:"container mx-auto py-6",children:e.jsxs(x,{children:[e.jsxs(j,{children:[e.jsx(g,{children:"Add Connection"}),e.jsxs(E,{children:["Create a new connection for ",p.name]})]}),e.jsx(v,{children:e.jsxs("form",{onSubmit:N,className:"space-y-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"type",children:"Type"}),e.jsxs("select",{id:"type",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",value:s.type,onChange:t=>i("type",t.target.value),children:[e.jsx("option",{value:"smpp",children:"SMPP"}),e.jsx("option",{value:"http",children:"HTTP"})]}),l.type&&e.jsx("p",{className:"text-sm text-destructive",children:l.type})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"host",children:"Host"}),e.jsx(u,{id:"host",value:s.host,onChange:t=>i("host",t.target.value),placeholder:s.type==="smpp"?"e.g. smpp.example.com":"e.g. api.example.com"}),l.host&&e.jsx("p",{className:"text-sm text-destructive",children:l.host})]}),s.type==="smpp"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"port",children:"Port"}),e.jsx(u,{id:"port",type:"number",value:s.port,onChange:t=>i("port",t.target.value),placeholder:"e.g. 2775"}),l.port&&e.jsx("p",{className:"text-sm text-destructive",children:l.port})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"username",children:"Username"}),e.jsx(u,{id:"username",value:s.username,onChange:t=>i("username",t.target.value)}),l.username&&e.jsx("p",{className:"text-sm text-destructive",children:l.username})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"password",children:"Password"}),e.jsx(u,{id:"password",type:"password",value:s.password,onChange:t=>i("password",t.target.value)}),l.password&&e.jsx("p",{className:"text-sm text-destructive",children:l.password})]})]}),s.type==="smpp"&&w(),s.type==="http"&&_(),e.jsxs("div",{className:"space-y-2",children:[e.jsx(o,{htmlFor:"notes",children:"Notes"}),e.jsx(h,{id:"notes",value:s.notes,onChange:t=>i("notes",t.target.value)})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx(m,{type:"submit",disabled:b,children:"Create Connection"})})]})})]})})]})}export{X as default};
