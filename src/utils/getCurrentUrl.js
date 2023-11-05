export default function getCurrentUrl(){
    const {
        host, hostname, href, origin, pathname, port, protocol, search
      } = window.location
      
      return pathname
}