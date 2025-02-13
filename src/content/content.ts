import { MessageType } from "../types";

function removeShorts(state:boolean){
        console.log("🔍 Checking for Shorts...");
    let shorts = document.querySelectorAll('ytd-rich-grid-renderer [is-show-less-hidden]')
    console.log(shorts) 
    shorts.forEach(elem => {
        if(state){
            elem.closest("div #content")?.classList.add('hidden')
        } else {
            elem.closest("div #content")?.classList.remove('hidden')
        }
    })      
    document.querySelectorAll('yt-formatted-string').forEach((e) => {
       if(e.innerHTML == "Shorts"){
            if(state){
                e.closest('ytd-guide-entry-renderer')?.classList.add('hidden')
                
                console.log(`toggled hidden ${e}`)
            } else {    
                e.closest('ytd-guide-entry-renderer')?.classList.remove('hidden')
                console.log(`toggled hidden ${e}`)
            }
           
       }   else {
        console.log('didnt find') 
       }
    })  

    if(state){
        const toHide = document.querySelectorAll("ytd-reel-shelf-renderer ")
        toHide.forEach((elem) => {
            elem.classList.add('hidden')
        })
        // console.log("shorts under video"+document.querySelector("ytd-reel-shelf-renderer "))
    } else {    
        const toHide = document.querySelectorAll("ytd-reel-shelf-renderer ")
        toHide.forEach((elem) => {
            elem.classList.remove('hidden')
        })
        
    }
    
    
    return {processed:true}
}   

const grayscaleMode = (state:boolean) => {
    
    const element = document.querySelector('ytd-app') as HTMLElement
    console.log(element)

    console.log('grayscalemode ' + state)
    if(state){
       
            element.style.filter = 'grayscale(100%)';
            element.setAttribute('style', 'filter: grayscale(100%) !important');

    } else  {
            element.style.filter = 'none';  
            element.setAttribute('style', '');

    }
    
}

function runWhenReady(callback: () => void){
        if(document.readyState === "complete"){
            callback();
        } else {
            window.addEventListener("load",callback)
        }
}


chrome.runtime.onMessage.addListener(
   (message:MessageType, sender,sendResponse) => {
    console.log("📨 Received message:", message);
    switch(message.action){
        case 'toggleOffShorts':
            sendResponse({success:true, data:removeShorts(true)})
            break
        case 'toggleOnShorts':
            sendResponse({success:true, data:removeShorts(false)})
            break
        case 'toggleOffGrayscale':
            sendResponse({success:true, data:grayscaleMode(false)})
            break
        case 'toggleOnGrayscale':
            sendResponse({success:true, data:grayscaleMode(true)})
            break;

    }
    return true;
})


const observer = new MutationObserver(() => {
    console.log("🔄 Page updated - reapplying Shorts removal...");
    chrome.storage.local.get(['disableShorts','grayscale'],(data) =>{
        data.disableShorts ? removeShorts(true) : removeShorts(false)
        data.grayscale ? grayscaleMode(true) : grayscaleMode(false)

    })
})

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

runWhenReady(() => {
    console.log("🚀 Page fully loaded - Checking Shorts state...");
    chrome.storage.local.get("disableShorts", (data) => {
        data.disableShorts ? removeShorts(true) : removeShorts(false)
    })
    chrome.storage.local.get("grayscale", (data) => {
        data.grayscale ? grayscaleMode(true) : grayscaleMode(false)
    })
})
