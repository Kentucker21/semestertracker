 export default function Removeprefix(prefix,string){
let result=string;


if(string.startsWith(prefix)){
    result=string.substring(prefix.length)
 return result
}
}



