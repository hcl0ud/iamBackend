/* empty css                       */import{_ as p,o as u,p as g,q as c,b as l,c as w,d as r,j as I,t as v,h as f,u as h,k as d,m,f as C}from"./index-1d20f0bf.js";const _={data(){return{CrewPost:"/CrewPost",crewName:"",crewDescription:"",crewImage:null,crewImagePreview:""}},methods:{handleImageUpload(s){this.crewImage=s.target.files[0],this.previewCrewImage()},previewCrewImage(){if(this.crewImage){const s=new FileReader;s.onload=()=>{this.crewImagePreview=s.result},s.readAsDataURL(this.crewImage)}else this.crewImagePreview=""}},setup(){u(async()=>{g.loginCheck()||(alert("로그인 후에 이용해주세요"),await c.push("/CrewMain"))});const s={id:0,crewName:"",crewImg:"",crewIntro:"",ownerName:"",crewMember:0};return{crewInfo:s,crewUp:async()=>{if(s.profileImg&&s.crewName&&s.crewIntro){const n=await C("crew/createCrew",s);n&&n.resultCode===1?(alert("크루 생성 성공!"),location.reload()):alert("크루생성 실패!")}else alert("빈 칸 없이 모두 입력 해주세요.");c.push("/CrewMain")}}}},x={class:"create-crew-container"},N=r("h2",null,"크루 만들기",-1),U={class:"createcrew-preview"},b={class:"preview-img"},k=["src"],y={class:"centered-text"},P={class:"crew-imageLoad"},D={class:"crew-text"},M={class:"crew-name-container"},V={class:"description-space"},q={class:"crew-description"};function B(s,e,n,i,o,a){return l(),w("div",x,[N,r("div",U,[r("div",b,[o.crewImagePreview?(l(),w("img",{key:0,src:o.crewImagePreview,alt:"크루 대표 사진",class:"centered-image"},null,8,k)):I("",!0),r("div",y,[r("h1",null,v(o.crewName),1)])]),r("form",{onSubmit:e[7]||(e[7]=f(()=>{},["prevent"]))},[r("div",P,[h(" 크루 표지사진을 업로드 해주세요. "),r("input",{type:"file",id:"crew-image",onChange:e[0]||(e[0]=(...t)=>a.handleImageUpload&&a.handleImageUpload(...t)),class:"upload-btn",onInput:e[1]||(e[1]=t=>i.crewInfo.profileImg=t.target.value),required:""},null,32)]),r("div",D,[r("div",M,[d(r("input",{type:"text",id:"crew-name","onUpdate:modelValue":e[2]||(e[2]=t=>o.crewName=t),class:"input-box",placeholder:"크루 이름을 입력하세요.",onInput:e[3]||(e[3]=t=>i.crewInfo.crewName=t.target.value),required:""},null,544),[[m,o.crewName]])]),r("div",V,[r("div",q,[d(r("input",{type:"text",id:"crew-description","onUpdate:modelValue":e[4]||(e[4]=t=>o.crewDescription=t),class:"input-box",placeholder:"간단하게 크루를 소개해주세요.",onInput:e[5]||(e[5]=t=>i.crewInfo.crewIntro=t.target.value),required:""},null,544),[[m,o.crewDescription]])])])]),r("button",{class:"action-button",type:"submit",onClick:e[6]||(e[6]=(...t)=>i.crewUp&&i.crewUp(...t))}," 만들기 ")],32)])])}const S=p(_,[["render",B]]);export{S as default};