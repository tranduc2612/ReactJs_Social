export function getValueLocalStorage(key){
    try{
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }
        return null;
    }catch(err){
        // Xóa giá trị không hợp lệ ra khỏi localStorage
        console.error(err)
        localStorage.removeItem(key);
        return null
    }
}

export function setValueToLocalStorage(key,value){
    try{
        const valueConvert = JSON.stringify(value);
        if(valueConvert){
            localStorage.setItem(key,valueConvert);
            return true
        }
        return false;
    }catch(err){
        console.error(err)
        return false;
    }
}

export function removeAllKeyAuthentication(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("token_type");
    return true
}