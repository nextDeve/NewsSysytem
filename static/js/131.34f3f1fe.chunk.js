"use strict";(self.webpackChunkht=self.webpackChunkht||[]).push([[131],{44131:function(t,e,n){n.r(e),n.d(e,{default:function(){return r}});var i=n(85242),a=n(80184);function r(){return(0,a.jsx)("div",{children:(0,a.jsx)(i.Z,{publishState:2})})}},85242:function(t,e,n){n.d(e,{Z:function(){return S}});var i=n(1413),a=n(29439),r=n(72791),u=n(76770),o=n(13085),c=n(87309),s=n(62213),d=n(74569),l=n.n(d),h=n(35796),p=n(43504),f=n(80184),x=u.Z.confirm;function S(t){var e=(0,r.useState)([]),n=(0,a.Z)(e,2),u=n[0],d=n[1],S=JSON.parse(localStorage.getItem("token")),b=S.username,g=S.region,m=S.roleId,w={2:"\u4e0b\u7ebf",1:"\u53d1\u5e03",3:"\u4e0a\u7ebf"};(0,r.useEffect)((function(){l().post("/api/getNewsByStateAndRight",{username:b,region:g,roleId:m,publishState:t.publishState}).then((function(t){d(t.data)}))}),[b,g,m,t.publishState]);var Z=[{title:"Id",dataIndex:"id",width:240,render:function(t){return(0,f.jsx)("b",{children:t})}},{title:"\u65b0\u95fb\u6807\u9898",dataIndex:"title",width:480,render:function(t,e){return(0,f.jsx)(p.rU,{to:"/news-manage/preview/".concat(e.id),state:e,children:t})}},{title:"\u4f5c\u8005",dataIndex:"author"},{title:"\u5206\u7c7b",dataIndex:"categoryName"},{title:"\u64cd\u4f5c",render:function(e){return(0,f.jsx)("div",{children:(0,f.jsx)(c.Z,{type:"primary",style:{marginRight:"10px"},onClick:function(){x({title:"\u786e\u5b9a\u8981".concat(w[t.publishState],"\u5417\uff1f"),icon:(0,f.jsx)(h.Z,{}),okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var n=2===t.publishState?{publishState:3}:{publishState:2,publishTime:Date.now()};l().post("/api/updateNews",(0,i.Z)((0,i.Z)({},e),n)).then((function(){d(u.filter((function(t){return t.id!==e.id}))),o.Z.info({message:"".concat(w[t.publishState],"\u6210\u529f\uff01"),placement:"topRight"})}))}})},children:w[t.publishState]})})}}];return(0,f.jsx)("div",{children:(0,f.jsx)(s.Z,{columns:Z,dataSource:u,pagination:{pageSize:5},rowKey:"id"})})}}}]);
//# sourceMappingURL=131.34f3f1fe.chunk.js.map