import getCurrentUrl from "./getCurrentUrl";

export default function getParamUrl(){
    const url = getCurrentUrl();
    const id = url.split('/').pop();
    return decodeURI(id);
}