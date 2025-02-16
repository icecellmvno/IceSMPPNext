import{r as _,m as v,j as s}from"./App-CmqUjaN5.js";import{B as m}from"./button-P3a7UsiS.js";import{I as i}from"./input-BNaBDwi7.js";import{L as t}from"./label-BEB_8ICF.js";import{T as g}from"./textarea-CYa3ItW1.js";import{S as O}from"./switch-C-_rdssw.js";import{B as H}from"./badge-kuerOQjQ.js";import{C as L,a as R,b as z,c as q,d as G}from"./card-W6xDAvb4.js";import{D as S,f as J,a as b,b as C,c as N,d as f,e as P}from"./dialog-dFOvoa_K.js";import{T as K,a as Q,b as w,c as p,d as V,e as o}from"./table-D_1QihfK.js";import{P as W}from"./plus-CG7YYuFa.js";import"./index-cPx927kp.js";import"./index-CoAmXZ53.js";import"./index-CgeA6eXF.js";import"./index-BJ4xYr-b.js";import"./index-8L4t-OO9.js";import"./createLucideIcon-DiUTaDX6.js";import"./Combination-DIdNSm4m.js";function hs({customer:h}){var u;const[D,j]=_.useState(!1),[y,x]=_.useState(null),{data:l,setData:c,post:E,processing:F,errors:a,reset:T}=v({system_id:"",system_type:"",password:"",ip_address:"",max_binds:1,notes:""}),{data:n,setData:r,put:I,processing:U,errors:d,reset:M}=v({system_id:"",system_type:"",password:"",ip_address:"",max_binds:1,is_active:!0,notes:""}),A=e=>{e.preventDefault(),E(route("customers.smpp-users.store",h),{onSuccess:()=>{j(!1),T()}})},B=e=>{e.preventDefault(),I(route("customers.smpp-users.update",[h,y]),{onSuccess:()=>{x(null),M()}})},k=e=>{r({system_id:e.system_id,system_type:e.system_type,ip_address:e.ip_address||"",max_binds:e.max_binds,is_active:e.is_active,notes:e.notes||""}),x(e.id)};return s.jsxs(s.Fragment,{children:[s.jsxs(L,{children:[s.jsx(R,{children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"space-y-1",children:[s.jsx(z,{children:"SMPP Users"}),s.jsx(q,{children:"Manage SMPP users and their configurations"})]}),s.jsxs(S,{open:D,onOpenChange:j,children:[s.jsx(J,{asChild:!0,children:s.jsxs(m,{children:[s.jsx(W,{className:"mr-2 h-4 w-4"}),"Add SMPP User"]})}),s.jsx(b,{children:s.jsxs("form",{onSubmit:A,children:[s.jsxs(C,{children:[s.jsx(N,{children:"Add SMPP User"}),s.jsx(f,{children:"Create a new SMPP user for this customer"})]}),s.jsxs("div",{className:"grid gap-4 py-4",children:[s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"system_id",children:"System ID"}),s.jsx(i,{id:"system_id",value:l.system_id,onChange:e=>c("system_id",e.target.value),placeholder:"Enter system ID"}),a.system_id&&s.jsx("p",{className:"text-sm text-destructive",children:a.system_id})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"system_type",children:"System Type"}),s.jsx(i,{id:"system_type",value:l.system_type,onChange:e=>c("system_type",e.target.value),placeholder:"Enter system type"}),a.system_type&&s.jsx("p",{className:"text-sm text-destructive",children:a.system_type})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"password",children:"Password"}),s.jsx(i,{id:"password",type:"password",value:l.password,onChange:e=>c("password",e.target.value),placeholder:"Enter password"}),a.password&&s.jsx("p",{className:"text-sm text-destructive",children:a.password})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"ip_address",children:"IP Address"}),s.jsx(i,{id:"ip_address",value:l.ip_address,onChange:e=>c("ip_address",e.target.value),placeholder:"Enter IP address"}),a.ip_address&&s.jsx("p",{className:"text-sm text-destructive",children:a.ip_address})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"max_binds",children:"Max Binds"}),s.jsx(i,{id:"max_binds",type:"number",min:"1",value:l.max_binds,onChange:e=>c("max_binds",e.target.value)}),a.max_binds&&s.jsx("p",{className:"text-sm text-destructive",children:a.max_binds})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"notes",children:"Notes"}),s.jsx(g,{id:"notes",value:l.notes,onChange:e=>c("notes",e.target.value)}),a.notes&&s.jsx("p",{className:"text-sm text-destructive",children:a.notes})]})]}),s.jsxs(P,{children:[s.jsx(m,{type:"button",variant:"outline",onClick:()=>j(!1),children:"Cancel"}),s.jsx(m,{type:"submit",disabled:F,children:"Create SMPP User"})]})]})})]})]})}),s.jsx(G,{children:s.jsxs(K,{children:[s.jsx(Q,{children:s.jsxs(w,{children:[s.jsx(p,{children:"System ID"}),s.jsx(p,{children:"System Type"}),s.jsx(p,{children:"IP Address"}),s.jsx(p,{children:"Max Binds"}),s.jsx(p,{children:"Status"}),s.jsx(p,{children:"Actions"})]})}),s.jsx(V,{children:(u=h.smpp_users)==null?void 0:u.map(e=>s.jsxs(w,{children:[s.jsx(o,{className:"font-medium",children:e.system_id}),s.jsx(o,{children:e.system_type}),s.jsx(o,{children:e.ip_address||"Any"}),s.jsx(o,{children:e.max_binds}),s.jsx(o,{children:s.jsx(H,{variant:e.is_active?"success":"secondary",children:e.is_active?"Active":"Inactive"})}),s.jsx(o,{children:s.jsx("div",{className:"flex items-center gap-2",children:s.jsx(m,{variant:"outline",size:"sm",onClick:()=>k(e),children:"Edit"})})})]},e.id))})]})})]}),s.jsx(S,{open:y!==null,onOpenChange:()=>x(null),children:s.jsx(b,{children:s.jsxs("form",{onSubmit:B,children:[s.jsxs(C,{children:[s.jsx(N,{children:"Edit SMPP User"}),s.jsx(f,{children:"Update SMPP user settings"})]}),s.jsxs("div",{className:"grid gap-4 py-4",children:[s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"edit-system_id",children:"System ID"}),s.jsx(i,{id:"edit-system_id",value:n.system_id,onChange:e=>r("system_id",e.target.value),placeholder:"Enter system ID"}),d.system_id&&s.jsx("p",{className:"text-sm text-destructive",children:d.system_id})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"edit-system_type",children:"System Type"}),s.jsx(i,{id:"edit-system_type",value:n.system_type,onChange:e=>r("system_type",e.target.value),placeholder:"Enter system type"}),d.system_type&&s.jsx("p",{className:"text-sm text-destructive",children:d.system_type})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"edit-password",children:"Password"}),s.jsx(i,{id:"edit-password",type:"password",value:n.password,onChange:e=>r("password",e.target.value),placeholder:"Enter new password (leave empty to keep current)"}),d.password&&s.jsx("p",{className:"text-sm text-destructive",children:d.password})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"edit-ip_address",children:"IP Address"}),s.jsx(i,{id:"edit-ip_address",value:n.ip_address,onChange:e=>r("ip_address",e.target.value),placeholder:"Enter IP address"}),d.ip_address&&s.jsx("p",{className:"text-sm text-destructive",children:d.ip_address})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"edit-max_binds",children:"Max Binds"}),s.jsx(i,{id:"edit-max_binds",type:"number",min:"1",value:n.max_binds,onChange:e=>r("max_binds",e.target.value)}),d.max_binds&&s.jsx("p",{className:"text-sm text-destructive",children:d.max_binds})]}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx(O,{id:"edit-is_active",checked:n.is_active,onCheckedChange:e=>r("is_active",e)}),s.jsx(t,{htmlFor:"edit-is_active",children:"Active"})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"edit-notes",children:"Notes"}),s.jsx(g,{id:"edit-notes",value:n.notes,onChange:e=>r("notes",e.target.value)}),d.notes&&s.jsx("p",{className:"text-sm text-destructive",children:d.notes})]})]}),s.jsxs(P,{children:[s.jsx(m,{type:"button",variant:"outline",onClick:()=>x(null),children:"Cancel"}),s.jsx(m,{type:"submit",disabled:U,children:"Save Changes"})]})]})})})]})}export{hs as default};
