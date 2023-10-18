export default function checkResponse(data){
    const statusCheck = data?.status.toString()[0];
    if(data?.success && statusCheck === "2"){
        return true;
    }
    
    return false;
}