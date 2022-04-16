"use strict";(self.webpackChunkht=self.webpackChunkht||[]).push([[584],{79110:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(29439),i=n(72791),a=n(51802),o=n(72010),s=n(199),c=n.n(s),l=n(1701),u=n.n(l),d=(n(25646),n(80184));var p=function(e){var t=(0,i.useState)(o.EditorState.createEmpty()),n=(0,r.Z)(t,2),s=n[0],l=n[1];return(0,i.useEffect)((function(){if(e.content){var t=u()(e.content),n=o.ContentState.createFromBlockArray(t.contentBlocks),r=o.EditorState.createWithContent(n);l(r)}}),[e.content]),(0,d.jsx)(a.Editor,{editorState:s,wrapperClassName:"wrapper-editer",editorClassName:"editor",onEditorStateChange:function(e){return l(e)},onBlur:function(){e.getContent(c()((0,o.convertToRaw)(s.getCurrentContent())))}})}},20584:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var r=n(1413),i=n(29439),a=n(72791),o=n(63503),s=n(83734),c=n(23695),l=n(13085),u=n(81477),d=n(80570),p=n(37031),f=n(87309),h=n(74569),g=n.n(h),x=n(16871),m=n(79110),Z=n(25984),j=n(80184),v=o.Z.Step,y=s.Z.Option;function C(){var e=(0,a.useState)(0),t=(0,i.Z)(e,2),n=t[0],h=t[1],C=(0,a.useState)([]),S=(0,i.Z)(C,2),k=S[0],w=S[1],b=(0,a.useState)({}),I=(0,i.Z)(b,2),E=I[0],T=I[1],N=(0,a.useState)(""),R=(0,i.Z)(N,2),B=R[0],q=R[1],A=(0,a.createRef)(),F=(0,x.s0)(),O=JSON.parse(localStorage.getItem("token")),U=O.region,D=O.roleId,J=O.username;(0,a.useEffect)((function(){g().get("/api/getCategories").then((function(e){return w(e.data)}))}),[]);var P=function(e){var t={title:E.title,categoryId:E.categoryId,content:B,region:U||"\u5168\u7403",author:J,roleId:D,auditState:e,publishState:0,createTime:Date.now(),star:0,view:0,id:(0,Z.x0)(),publishTime:0};g().post("/api/addNews",t).then((function(){l.Z.info({message:"\u63d0\u4ea4/\u4fdd\u5b58\u6210\u529f\uff01",placement:"topRight"}),F(0===e?"/news-manage/draft":"/audit-manage/list")}))};return(0,j.jsxs)("div",{children:[(0,j.jsx)(u.Z,{className:"site-page-header",title:"\u64b0\u5199\u65b0\u95fb"}),(0,j.jsxs)(o.Z,{current:n,children:[(0,j.jsx)(v,{title:"\u57fa\u672c\u4fe1\u606f",description:"\u65b0\u95fb\u6807\u9898\uff0c\u65b0\u95fb\u5206\u7c7b"}),(0,j.jsx)(v,{title:"\u65b0\u95fb\u4e3b\u4f53",description:"\u65b0\u95fb\u4e3b\u9898\u5185\u5bb9"}),(0,j.jsx)(v,{title:"\u65b0\u95fb\u63d0\u4ea4",description:"\u4fdd\u5b58\u8349\u7a3f\u6216\u63d0\u4ea4\u5ba1\u6838"})]}),(0,j.jsx)("div",{style:{display:0===n?"block":"none",marginTop:"20px"},children:(0,j.jsxs)(d.Z,(0,r.Z)((0,r.Z)({},{labelCol:{span:3},wrapperCol:{span:21}}),{},{ref:A,children:[(0,j.jsx)(d.Z.Item,{label:"\u65b0\u95fb\u6807\u9898",name:"title",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6807\u9898\uff01"}],children:(0,j.jsx)(p.Z,{})}),(0,j.jsx)(d.Z.Item,{label:"\u65b0\u95fb\u5206\u7c7b",name:"categoryId",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u65b0\u95fb\u5206\u7c7b"}],children:(0,j.jsx)(s.Z,{children:k.map((function(e){return(0,j.jsx)(y,{value:e.id,children:e.title},e.id)}))})})]}))}),(0,j.jsx)("div",{style:{display:1===n?"block":"none",marginTop:"20px",height:"350px"},children:(0,j.jsx)(m.Z,{getContent:function(e){q(e)}})}),(0,j.jsx)("div",{style:{display:2===n?"block":"none"}}),(0,j.jsxs)("div",{style:{marginTop:"80px"},children:[n<2&&(0,j.jsx)(f.Z,{type:"primary",onClick:function(){0===n?A.current.validateFields().then((function(e){T((0,r.Z)({},e)),h(n+1)})).catch((function(){console.log("error")})):""===B||"<p></p>"===B.trim()?c.ZP.error("\u65b0\u95fb\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\uff01"):h(n+1)},children:"\u4e0b\u4e00\u6b65"}),2===n&&(0,j.jsx)(f.Z,{type:"primary",onClick:function(){P(0)},children:"\u4fdd\u5b58\u8349\u7a3f"}),2===n&&(0,j.jsx)(f.Z,{type:"danger",onClick:function(){P(1)},children:"\u63d0\u4ea4\u5ba1\u6838"}),n>0&&(0,j.jsx)(f.Z,{onClick:function(){h(n-1)},children:"\u4e0a\u4e00\u6b65"})]})]})}},25984:function(e,t,n){n.d(t,{x0:function(){return r}});var r=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:21,t="",n=crypto.getRandomValues(new Uint8Array(e));e--;){var r=63&n[e];t+=r<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r<63?"_":"-"}return t}}}]);
//# sourceMappingURL=584.6bfe3b46.chunk.js.map