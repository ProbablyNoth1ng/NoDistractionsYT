import {MessageType} from '../types/index'

export async function sendMessageToActiveTab(message:MessageType) {
    const [tab] = await chrome.tabs.query({active:true, currentWindow:true})
    if(!tab.id) return
    
    return chrome.tabs.sendMessage(tab.id,message)
}