import{_,l as h,a as g,b as o,c as a,d as t,t as c,g as v,w as f,F as n,e as i,r as u,o as C,s as p}from"./index-1d20f0bf.js";const D=h({name:"App",data(){return{id:0,crewId:"",profileImg:"",crewName:"",crewIntro:"",ownerName:"",writeTime:"",crewTitle:"",crewContents:"",CrewEdit:"/CrewEdit"}},setup(){const e=u({}),d=async()=>{await p("crew/getCrewBoardDetail",location.search).then(r=>{r?(console.log(r),e.value=r.data):alert("크루 정보를 불러올 수 없습니다.")}).catch(r=>{console.log(r),alert("크루 정보를 불러오는 중에 오류가 발생했습니다.")})},l=u({}),w=async()=>{await p("crew/getCrewBoardList",location.search).then(r=>{r?r.crewName==e.crewName&&(l.value=r.data,console.log(r)):alert("게시물 정보를 불러올 수 없습니다.")}).catch(r=>{console.log(r),alert("게시물 정보를 불러오는 중에 오류가 발생했습니다.")})};return C(()=>{d(),w()}),{boardData:e,crewData:l}},methods:{handleImageUpload(e){this.crewImage=e.target.files[0],this.previewCrewImage()},previewCrewImage(){if(this.crewImage){const e=new FileReader;e.onload=()=>{this.crewImagePreview=e.result},e.readAsDataURL(this.crewImage)}else this.crewImagePreview=""},createCrew(){console.log("크루 이름:",this.crewName),console.log("크루 소개:",this.crewDescription),console.log("크루 대표 사진:",this.crewImage)}}}),I={class:"crewpost-container"},y={class:"crew-text"},b={class:"crew-name-container"},k={class:"crew-name"},N=t("div",{class:"crewDay"},"day 2일전",-1),B=t("button",{class:"Crew-button"},"글작성",-1),E={class:"description-space"},L={class:"crew-description"},T=t("div",{class:"crew-post-title"}," 크루 게시물 보기 ",-1),$={class:"crew-post-container"},F={class:"post-box"},P={class:"postbox-summary"};function A(e,d,l,w,r,R){const m=g("router-link");return o(),a("div",I,[t("div",y,[t("div",b,[t("div",k,c(e.boardData.crewName),1),N,v(m,{to:"/CrewEdit"},{default:f(()=>[B]),_:1})]),t("div",E,[t("div",L,c(e.boardData._crewIntro),1)])]),T,t("div",$,[t("div",F,[(o(!0),a(n,null,i(e.crewData,s=>(o(),a("div",{class:"postbox-img",key:s._id},[t("p",null,c(s.profileImg),1)]))),128)),t("div",P,[t("div",null,[(o(!0),a(n,null,i(e.crewData,s=>(o(),a("div",{class:"post-title",key:s._id},[t("p",null,c(s.crewTitle),1)]))),128)),(o(!0),a(n,null,i(e.crewData,s=>(o(),a("div",{class:"post-contents",key:s._id},[t("p",null,c(s.crewContents),1)]))),128))]),(o(!0),a(n,null,i(e.crewData,s=>(o(),a("div",{class:"postusername",key:s._id},[t("p",null,c(s.userEmail),1)]))),128)),(o(!0),a(n,null,i(e.crewData,s=>(o(),a("div",{class:"post-day",key:s._id},[t("p",null,c(s.writeTime),1)]))),128))])])])])}const V=_(D,[["render",A]]);export{V as default};