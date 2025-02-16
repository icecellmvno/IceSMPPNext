import{r as j,j as e,L,S as H}from"./App-CmqUjaN5.js";import{u as V,f as M,a as $,b as k,c as A,g as B}from"./index-DPwg5YPN.js";import{A as E}from"./AuthenticatedLayout-C6tvOh1x.js";import{B as N}from"./button-P3a7UsiS.js";import{I as b}from"./input-BNaBDwi7.js";import{L as T}from"./label-BEB_8ICF.js";import{C as r,a as c,b as d,d as m,c as G}from"./card-W6xDAvb4.js";import{T as U,a as q,b as C,c as J,d as O,e as P}from"./table-D_1QihfK.js";import{S as Q,a as W,b as X,c as Y,d as D}from"./select-BwHXfXYN.js";import"./index-CoAmXZ53.js";import"./index-cPx927kp.js";import"./Combination-DIdNSm4m.js";import"./index-8L4t-OO9.js";import"./createLucideIcon-DiUTaDX6.js";import"./index-MP6m9tZ7.js";import"./index-BJ4xYr-b.js";import"./index-CZ-wKduk.js";import"./dropdown-menu-DXpi-5_y.js";import"./building-2-Dch_NdWF.js";import"./coins-D9U3F2Fg.js";import"./theme-switcher-rNNMMUfo.js";import"./index-CgeA6eXF.js";function Ne({auth:I,reports:g,customers:K,filters:u,summary:s}){var w,F,R;const[l,x]=j.useState(u.columnFilters||{}),[f,v]=j.useState(u.globalFilter||""),[S,z]=j.useState(u.sorting||[]),n=t=>new Intl.NumberFormat("en-US",{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}).format(t),_=j.useMemo(()=>[{accessorKey:"customer",header:"Customer",cell:({row:t})=>e.jsx("div",{className:"font-medium",children:t.original.customer.name})},{accessorKey:"total_messages",header:"Messages",cell:({row:t})=>e.jsx("div",{className:"text-right font-medium",children:t.original.total_messages})},{accessorKey:"total_sms_parts",header:"SMS Parts",cell:({row:t})=>e.jsx("div",{className:"text-right font-medium",children:t.original.total_sms_parts})},{accessorKey:"total_sale_price",header:"Sales",cell:({row:t})=>e.jsx("div",{className:"text-right font-medium",children:n(t.original.total_sale_price)})},{accessorKey:"total_cost_price",header:"Costs",cell:({row:t})=>e.jsx("div",{className:"text-right font-medium",children:n(t.original.total_cost_price)})},{accessorKey:"total_profit",header:"Profit",cell:({row:t})=>e.jsx("div",{className:"text-right font-medium",children:n(t.original.total_profit)})}],[]),i=V({data:g.data,columns:_,state:{columnFilters:l,globalFilter:f,sorting:S},getCoreRowModel:B(),onColumnFiltersChange:x,onGlobalFilterChange:v,onSortingChange:z,getSortedRowModel:A(),getFilteredRowModel:k(),getPaginationRowModel:$(),manualPagination:!0,manualSorting:!0,manualFiltering:!0,pageCount:Math.ceil(g.total/g.per_page)}),o=()=>{H.get(route("reports.financial.index"),{columnFilters:l,globalFilter:f,sorting:S,page:i.getState().pagination.pageIndex+1,pageSize:i.getState().pagination.pageSize},{preserveState:!0,preserveScroll:!0})};return e.jsxs(E,{user:I.user,header:{title:"Financial Reports",module:"Reports"},children:[e.jsx(L,{title:"Financial Reports"}),e.jsxs("div",{className:"container mx-auto py-6",children:[e.jsxs("div",{className:"grid gap-4 md:grid-cols-5 mb-6",children:[e.jsxs(r,{children:[e.jsx(c,{className:"pb-2",children:e.jsx(d,{className:"text-sm font-medium",children:"Total Messages"})}),e.jsx(m,{children:e.jsx("div",{className:"text-2xl font-bold",children:(s==null?void 0:s.total_messages)||0})})]}),e.jsxs(r,{children:[e.jsx(c,{className:"pb-2",children:e.jsx(d,{className:"text-sm font-medium",children:"Total SMS Parts"})}),e.jsx(m,{children:e.jsx("div",{className:"text-2xl font-bold",children:(s==null?void 0:s.total_sms_parts)||0})})]}),e.jsxs(r,{children:[e.jsx(c,{className:"pb-2",children:e.jsx(d,{className:"text-sm font-medium",children:"Total Sales"})}),e.jsx(m,{children:e.jsx("div",{className:"text-2xl font-bold",children:n((s==null?void 0:s.total_sale_price)||0)})})]}),e.jsxs(r,{children:[e.jsx(c,{className:"pb-2",children:e.jsx(d,{className:"text-sm font-medium",children:"Total Costs"})}),e.jsx(m,{children:e.jsx("div",{className:"text-2xl font-bold",children:n((s==null?void 0:s.total_cost_price)||0)})})]}),e.jsxs(r,{children:[e.jsx(c,{className:"pb-2",children:e.jsx(d,{className:"text-sm font-medium",children:"Total Profit"})}),e.jsx(m,{children:e.jsx("div",{className:"text-2xl font-bold",children:n((s==null?void 0:s.total_profit)||0)})})]})]}),e.jsxs(r,{children:[e.jsx(c,{children:e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"space-y-1",children:[e.jsx(d,{children:"Financial Reports"}),e.jsx(G,{children:"View and analyze financial reports"})]})})}),e.jsxs(m,{children:[e.jsxs("div",{className:"grid gap-4 md:grid-cols-2 mb-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(T,{children:"From Date"}),e.jsx(b,{type:"datetime-local",value:((w=l.send_timestamp)==null?void 0:w.split(" to ")[0])||"",onChange:t=>{var p;const a=t.target.value,h=((p=l.send_timestamp)==null?void 0:p.split(" to ")[1])||"";x({...l,send_timestamp:a&&h?`${a} to ${h}`:void 0}),o()}})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(T,{children:"To Date"}),e.jsx(b,{type:"datetime-local",value:((F=l.send_timestamp)==null?void 0:F.split(" to ")[1])||"",onChange:t=>{var p;const a=((p=l.send_timestamp)==null?void 0:p.split(" to ")[0])||"",h=t.target.value;x({...l,send_timestamp:a&&h?`${a} to ${h}`:void 0}),o()}})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4 py-4",children:[e.jsx(b,{placeholder:"Search all columns...",value:f??"",onChange:t=>{v(t.target.value),o()},className:"max-w-xs"}),e.jsxs(Q,{value:l.customer||void 0,onValueChange:t=>{x({...l,customer:t||void 0}),o()},children:[e.jsx(W,{className:"w-[180px]",children:e.jsx(X,{placeholder:"Select customer"})}),e.jsxs(Y,{children:[e.jsx(D,{value:"all",children:"All Customers"}),K.map(t=>e.jsx(D,{value:t.name,children:t.name},t.id))]})]}),e.jsx(N,{variant:"outline",onClick:()=>{x({}),v(""),o()},children:"Reset Filters"})]}),e.jsx("div",{className:"rounded-md border",children:e.jsxs(U,{children:[e.jsx(q,{children:i.getHeaderGroups().map(t=>e.jsx(C,{children:t.headers.map(a=>e.jsx(J,{children:a.isPlaceholder?null:M(a.column.columnDef.header,a.getContext())},a.id))},t.id))}),e.jsx(O,{children:(R=i.getRowModel().rows)!=null&&R.length?i.getRowModel().rows.map(t=>e.jsx(C,{"data-state":t.getIsSelected()&&"selected",children:t.getVisibleCells().map(a=>e.jsx(P,{children:M(a.column.columnDef.cell,a.getContext())},a.id))},t.id)):e.jsx(C,{children:e.jsx(P,{colSpan:_.length,className:"h-24 text-center",children:l.send_timestamp?"No results found":e.jsx("div",{className:"text-muted-foreground",children:"Please select a date range to view reports"})})})})]})}),e.jsxs("div",{className:"flex items-center justify-between space-x-2 py-4",children:[e.jsxs("div",{className:"flex-1 text-sm text-muted-foreground",children:[g.total," record(s) found."]}),e.jsxs("div",{className:"space-x-2",children:[e.jsx(N,{variant:"outline",size:"sm",onClick:()=>{i.previousPage(),o()},disabled:!i.getCanPreviousPage(),children:"Previous"}),e.jsx(N,{variant:"outline",size:"sm",onClick:()=>{i.nextPage(),o()},disabled:!i.getCanNextPage(),children:"Next"})]})]})]})]})]})]})}export{Ne as default};
