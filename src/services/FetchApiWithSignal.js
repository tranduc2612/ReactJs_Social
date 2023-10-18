export default async function fetchApiWithSignal(signalRef,key,funcFetch,data){
    let controller = new AbortController();

    // nếu đã có request được thực hiện trước đó với cùng key thì hủy nó
    if (typeof signalRef.current[key] != typeof undefined) {
        signalRef.current[key].abort();
    }

    try {
        // lưu lại controller để hủy request khi cần
        signalRef.current[key] = controller;

        // tạo signal
        let signal = signalRef.current[key].signal;
        await funcFetch({ signal, data })
           .then((res) => {
               return res
           })
           .catch((error) => {
               if (error.message == "canceled") {
                   console.log("Request cancelled");
                   return;
               }
               else {
                   console.error(error);
               }
           });
        return "sss"

    }catch(e){

    }
}