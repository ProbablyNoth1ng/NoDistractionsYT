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
                action:`${checked ? "toggleOffShorts" : "toggleOnShorts"}`,
                value:enable
              })
              
            }
          
        } catch (error){
          console.error('Failed to send message to content script:', error)
          throw error
        }
      
        
      }
      

      useEffect(() => {
        const handlePageLoad = async () => {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab.id) {
            await sendMessageToActiveTab({
              action: checked ? 'toggleOffShorts' : 'toggleOnShorts',
              value: checked,
            });
          }
        };
      
        chrome.tabs.onUpdated.addListener(handlePageLoad);
      
        return () => {
          chrome.tabs.onUpdated.removeListener(handlePageLoad);
        };
      }, [checked]);
      
      useEffect(() => {
        loadStoredState()
        
      },[])   

        const loadStoredState = async () => {
          try{
            const data = await chrome.storage?.local?.get('disableShorts') as StorageData
            const isDisabled = data.disableShorts || false
            setChecked(isDisabled)

            console.log(isDisabled)
            await sendMessageToActiveTab({
              action:`${isDisabled ? "toggleOffShorts" : "toggleOnShorts"}`,
              value: isDisabled 
            });
          
          
        }catch (error){
          console.error(error)
        }
      }


      
      
      const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        console.log('Switch clicked:', isChecked); // Check if event handler is firing
        
        setChecked(isChecked);
        console.log('State updated to:', isChecked); // Check if state is updating
        await sendMessageToActiveTab({
          action:`${isChecked ? "toggleOffShorts" : "toggleOnShorts"}`,
          value: isChecked 
        });
        try {
          await chrome.storage.local.set({ disableShorts: isChecked });
          console.log('Storage updated:', isChecked); // Check if storage is updating
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      
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
