import { MessageType } from "../types";

function removeShorts(){
    let shorts = document.querySelectorAll('ytd-rich-grid-renderer [is-show-less-hidden]')
                
    console.log(shorts)
    shorts.forEach(elem => {
        elem.closest("div #content")?.remove()
    })
    document.querySelectorAll('yt-formatted-string').forEach((e) => {
        e.innerHTML == "Shorts" ? e.remove() : ''
    })
    document.querySelector("ytd-reel-shelf-renderer ")?.remove()

    return {processed:true}
}


const observer = new MutationObserver((mutations:MutationRecord[]) =>{
    mutations.forEach((mutation) =>{
        // if(mutation.type === "childList"){
        //     removeShorts();
        // }
    })
})

observer.observe(document.body, {
    childList:true,
    subtree:true,
})



chrome.runtime.onMessage.addListener(
   (message:MessageType, sender,sendResponse) => {
    console.log(sender)
    switch(message.action){
        case 'toggleShorts':
            const result = removeShorts()
            sendResponse({success:true, data:result})
            break
    }
    return true;
})


