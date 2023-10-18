export default function getParamUrl(){
    const url = window.location.href;
    const id = url.split('/').pop();
    return id;
}