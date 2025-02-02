import {useEffect, useState} from 'react'
import './Main.scss'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { sendMessageToActiveTab } from '../../utils/chrome';
import { StorageData } from '../../types';

export function Main(){
    const [checked, setChecked] = useState<boolean>(false);
      const sendMessageToContentScript = async (enable:boolean) => {
        try{
          const [tab] = await chrome.tabs.query({active:true, currentWindow:true})
            if(tab.id){
              await chrome.tabs.sendMessage(tab.id,{
                action:"toggleShorts",
                value:enable
              })
              
            }
          
        } catch (error){
          console.error('Failed to send message to content script:', error)
          throw error
        }
      
        
      }
    


    useEffect(() => {
      loadStoredState()
    },[])   

      const loadStoredState = async () => {
        try{
          const data = await chrome.storage?.local?.get('disableShorts') as StorageData
          const isDisabled = data.disableShorts || false
          setChecked(isDisabled)
          console.log(isDisabled)
          if(isDisabled){
            await sendMessageToContentScript(true)
          } 
        
      }catch (error){
        console.error(error)
      }
    }

    
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      console.log('Switch clicked:', isChecked); // Check if event handler is firing
      
      setChecked(isChecked);
      console.log('State updated to:', isChecked); // Check if state is updating
    
      try {
        await chrome.storage.local.set({ disableShorts: isChecked });
        console.log('Storage updated:', isChecked); // Check if storage is updating
    
        await sendMessageToActiveTab({
          action: 'toggleShorts',
          value: isChecked
        });
        console.log('Message sent to content script'); // Check if message is being sent
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // const handleChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
    //   const isChecked = event.target.checked
    //   console.log(isChecked)
    //   setChecked(isChecked);

    //   try{
    //     await chrome.storage.local.set({disableShort: isChecked})
    //     console.log("switch state saved:", isChecked)
      
    //     await sendMessageToActiveTab({
    //       action: 'toggleShorts',
    //       value: isChecked
    //   }); 

    //   } catch(error){
    //     console.error('Failed to update state:', error)
    //     setChecked(!isChecked)

    //   }


    // };

   
    
    return (
        <>
            <main className='main'>
                <div className="main_wrap ">
                <FormControlLabel
                        className='my-1'
                        control={
                            <Switch  checked={checked} onChange={handleChange} name="" />
                        }
                        label="disable shorts on main screen"
                />
                



                </div>
 
            </main>
        </>

    )
}
