export function getLastName(fullname){
    if(typeof fullname === "string"){
        const newArr = fullname.trim().split(" ");
        return newArr[newArr.length - 1];
    }
    return fullname
}
