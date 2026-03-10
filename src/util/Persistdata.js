export default function Persistdata(json){
if(!localStorage){
    return
}

localStorage.setItem("SemesterJson",JSON.stringify(json))
}