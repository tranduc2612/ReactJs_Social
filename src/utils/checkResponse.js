export default function checkResponse(data){
    if(data?.success && data?.status === 200){
        return true;
    }
    
    return false;
}