import {useState} from 'react'
import './Main.scss'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export function Main(){
    const [checked, setChecked] = useState<boolean>(false);


    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      if (event.target.checked) {
        removeShortsMain();
      }
      
    };


    const removeShortsMain = async () => {
        if(chrome?.tabs){
            let [tab] = await chrome.tabs.query({active:true,currentWindow: true})
            chrome.scripting.executeScript<string[], void>({
              target: {tabId:tab.id!},
              func: () => {
                let shorts = document.querySelectorAll('ytd-rich-grid-renderer [elements-per-row="4"]');
                console.log(shorts)
                shorts.forEach((elem) => {
                    elem.remove();
                })
              }
            })
        }
        
      }
    return (
        <>
            <main className='main'>
                <div className="main_wrap">
                <FormControlLabel
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

