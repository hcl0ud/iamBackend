import{_ as p,C as d,r as C,o as f,a as h,b as s,c,d as t,F as v,e as I,f as w,p as g,g as y,w as N,n as b,t as _}from"./index-1d20f0bf.js";const x={name:"App",computed:{CONSTANTS(){return d}},data(){return{CrewPost:"/CrewPost",title:"-",summary:"-",user:"-",isTrendActive:!0,selected:"trend"}},setup(){const a=C({crewName:"",crewIntro:"",crewImg:"",ownerInfo:""}),n=async()=>{await w("crew/getCrewList").then(e=>{a.value=e.data;for(let r in e.data)e.data[r].color=`hsl(${parseInt(Math.random()*24,10)*15}, 16%, 75%)`}).catch(e=>{alert("크루 정보를 불러올 수 없습니다."),console.log(e)})},i=async e=>{const r=JSON.parse(g.getLocalStorage(d.KEY_LIST.USER_INFO));if(r.isMember){alert("이미 크루에 가입된 사용자입니다!");return}await w("crew/JoinCrew",{userIdx:r.userIdx,crewIdx:a.crewName}).then(l=>{alert("크루 가입 성공!"),location.reload()}).catch(l=>{alert("오류 발생!"),location.reload()})};return f(()=>{n()}),{boardData:a,JoinCrew:i}}},S={class:"crewmain-container"},k={class:"recommended-crews"},J=t("h2",null,"전체 크루 목록",-1),L={class:"crew-box-container"},T={class:"crew-info"},M={class:"crew-description"};function A(a,n,i,e,r,l){const u=h("router-link");return s(),c("div",S,[t("div",k,[J,t("div",L,[(s(!0),c(v,null,I(e.boardData,o=>(s(),c("div",{class:"crew-box",key:o._crewId},[y(u,{to:{name:"CrewPost",query:{id:o._id}}},{default:N(()=>[t("div",{class:"crew-avatar",style:b(`background-color: ${o.color}`)},null,4)]),_:2},1032,["to"]),t("div",T,[t("h3",null,_(o.crewName),1),t("p",M,_(o.crewIntro),1),t("button",{type:"submit",class:"CrewJoin-button",onClick:n[0]||(n[0]=(...m)=>e.JoinCrew&&e.JoinCrew(...m))}," 크루가입 ")])]))),128))])])])}const B=p(x,[["render",A]]);export{B as default};
