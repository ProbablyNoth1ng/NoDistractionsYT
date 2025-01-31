import {useEffect, useState} from 'react'
import './Main.scss'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export function Main(){
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
      chrome.storage?.local?.get('disableShort', (data) => {
        setChecked(data.disableShort || false)
        if(data.disableShort){
          disableShort();
        }
      })
    },[])   

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked
      
      setChecked(isChecked);
      chrome.storage.local.set({disableShort: isChecked}, () => {
        console.log("switch state saved:", isChecked)
      })
      if (isChecked) {
        disableShort();
        // console.log(chrome.storage.local.get('disableShort', data => {console.log(data)}))
      }
      
    };


    const disableShort = async () => {
        if(chrome?.tabs){
            let [tab] = await chrome.tabs.query({active:true,currentWindow: true})
            chrome.scripting.executeScript<string[], void>({
              target: {tabId:tab.id!},
              func: () => {
                let shorts = document.querySelector('ytd-rich-grid-renderer [is-show-less-hidden]')?.closest("div #content");
                
                console.log(shorts)
                shorts?.remove();
                document.querySelector("ytd-reel-shelf-renderer")?.remove()


              }
            })
        }

      }
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
                {/* <FormControlLabel
                        className='my-1'
                        control={
                            <Switch  checked={checked} onChange={handleChange} name="" />
                        }
                        label="disable shorts on main screen"      
                />
                <FormControlLabel
                        className='my-1'
                        control={
                            <Switch  checked={checked} onChange={handleChange} name="" />
                        }
                        label="disable shorts on main screen"      
                /> */}
                



                </div>
 
            </main>
        </>

    )
}

