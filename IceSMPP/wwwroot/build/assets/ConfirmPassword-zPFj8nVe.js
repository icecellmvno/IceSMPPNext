import{m as n,j as s,L as d}from"./App-CmqUjaN5.js";import{T as l,I as c}from"./TextInput-C5JTf_8D.js";import{I as u}from"./InputLabel-DTqaEJ7a.js";import{P as f}from"./PrimaryButton-Db5_E4in.js";import{G as x}from"./GuestLayout-BFqP8bLj.js";import"./theme-switcher-rNNMMUfo.js";import"./button-P3a7UsiS.js";import"./dropdown-menu-DXpi-5_y.js";import"./index-CoAmXZ53.js";import"./index-cPx927kp.js";import"./index-MP6m9tZ7.js";import"./createLucideIcon-DiUTaDX6.js";import"./index-BJ4xYr-b.js";import"./Combination-DIdNSm4m.js";function D(){const{data:o,setData:t,post:a,processing:e,errors:i,reset:m}=n({password:""}),p=r=>{r.preventDefault(),a(route("password.confirm"),{onFinish:()=>m("password")})};return s.jsxs(x,{children:[s.jsx(d,{title:"Confirm Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),s.jsxs("form",{onSubmit:p,children:[s.jsxs("div",{className:"mt-4",children:[s.jsx(u,{htmlFor:"password",value:"Password"}),s.jsx(l,{id:"password",type:"password",name:"password",value:o.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>t("password",r.target.value)}),s.jsx(c,{message:i.password,className:"mt-2"})]}),s.jsx("div",{className:"mt-4 flex items-center justify-end",children:s.jsx(f,{className:"ms-4",disabled:e,children:"Confirm"})})]})]})}export{D as default};
