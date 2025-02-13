  import {useEffect, useState} from 'react'
  import './Main.scss'

  import FormControlLabel from '@mui/material/FormControlLabel';
  import { sendMessageToActiveTab } from '../../utils/chrome';
  import Switch, { SwitchProps } from "@mui/material/Switch";
  import { styled } from "@mui/material/styles";

  type SwitchType = 'shorts' | 'grayscale';
  export function Main(){
      const [shortsOffChecked, setShortsOffChecked] = useState<boolean>(false);
      const [grayScaleChecked, setGrayScaleChecked] = useState<boolean>(false);

      useEffect(() => {
        const handlePageLoad = async () => {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab.id) {
            await sendMessageToActiveTab({
              action: shortsOffChecked ? 'toggleOffShorts' : 'toggleOnShorts',
              value: shortsOffChecked,
            });
            await sendMessageToActiveTab({
              action: grayScaleChecked ? 'toggleOnGrayscale' : 'toggleOffGrayscale',
              value: grayScaleChecked,
            });
          }
        };
        chrome.tabs.onUpdated.addListener(handlePageLoad);
      
        return () => {
          chrome.tabs.onUpdated.removeListener(handlePageLoad);
        };
      }, [shortsOffChecked,grayScaleChecked]);
      
      useEffect(() => {
        loadStoredState()
        
      },[])   

        const loadStoredState = async () => {
          try{

            const res = await chrome.storage?.local?.get(['disableShorts','grayscale'])


            const isDisabledShorts = res.disableShorts || false
            const isDisabledGrayscale = res.grayscale || false

            setShortsOffChecked(isDisabledShorts)
            setGrayScaleChecked(isDisabledGrayscale)

            console.log('Shorts:', isDisabledShorts);
            console.log('Grayscale:', isDisabledGrayscale);


            await sendMessageToActiveTab({
              action:`${isDisabledShorts ? "toggleOffShorts" : "toggleOnShorts"}`,
              value: isDisabledShorts 
            });
            await sendMessageToActiveTab({
              action:`${isDisabledGrayscale ? "toggleOnGrayscale" : "toggleOffGrayscale"}`,
              value: isDisabledGrayscale 
            });
          
        }catch (error){
          console.error(error)
        }
      }


      
      
      const handleChange = (switchType:SwitchType) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        console.log('Switch clicked:', isChecked); // Check if event handler is firing
        
        switch(switchType){
          case 'shorts':
              setShortsOffChecked(isChecked);
              console.log('State updated to:', isChecked); // Check if state is updating

                await sendMessageToActiveTab({
                  action:`${isChecked ? "toggleOffShorts" : "toggleOnShorts"}`,
                  value: isChecked 
                });
                
                await chrome.storage.local.set({'disableShorts': isChecked });
                console.log('Storage updated:', isChecked); // Check if storage is updating

                const stored = await chrome.storage.local.get('disableShorts');
                console.log('Verified storage state:', stored);

              break

          case 'grayscale':
                setGrayScaleChecked(isChecked)
                  await sendMessageToActiveTab({
                    action:`${isChecked ? "toggleOnGrayscale" : "toggleOffGrayscale"}`,
                    value: isChecked 
                  });

                  await chrome.storage.local.set({'grayscale': isChecked });
                  // console.log('Storage updated:', isChecked); // Check if storage is updating 
                  const storedd = await chrome.storage.local.get('grayscale');
                  console.log('Verified grayscale storage:', storedd)
                break
          
        }

      };
      
      
      return (
          <>
              <main className='main'>
                  <div className="main_wrap container">
                    
                    <p className='py-5 text-3xl'>Extension Settings</p>
                    <div className="row"></div>
                    <div className="block py-3 flex justify-between">
                      <div className="text_part">
                          <p className='text-2xl uppercase'>disable shorts</p>
                          <p className='text-xl'>disable shorts on main page and </p>
                      </div>
                         
                        <FormControlLabel
                            control={
                              <IOSSwitch 
                                sx={{ m: 1 }} 
                                checked={shortsOffChecked}
                                onChange={handleChange('shorts')}
                              />
                            }
                            label=""
                          />
                    </div>
                    <div className="row"></div>
                     <div className="block py-3 flex justify-between">
                      <div className="text_part">
                          <p className='text-2xl uppercase'>Grayscale mode</p>
                          <p className='text-xl'>makes youtube gray  </p>
                      </div>
                        
                        <FormControlLabel
                              control={
                                <IOSSwitch 
                                  sx={{ m: 1 }} 
                                  checked={grayScaleChecked}
                                  onChange={handleChange('grayscale')}
                                />
                              }
                              label=""
                            />
                          
                    </div>
                

                  </div>
  
              </main>
          </>

      )
  }

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
     width: 42,
     height: 26,
     padding: 0,
     '& .MuiSwitch-switchBase': {
       padding: 0,
       margin: 2,
       transitionDuration: '300ms',
       '&.Mui-checked': {
         transform: 'translateX(16px)',
         color: '#fff',
         '& + .MuiSwitch-track': {
           backgroundColor: '#65C466',
           opacity: 1,
           border: 0,
           ...theme.applyStyles('dark', {
             backgroundColor: '#2ECA45',
           }),
         },
         '&.Mui-disabled + .MuiSwitch-track': {
           opacity: 0.5,
         },
       },
       '&.Mui-focusVisible .MuiSwitch-thumb': {
         color: '#33cf4d',
         border: '6px solid #fff',
       },
       '&.Mui-disabled .MuiSwitch-thumb': {
         color: theme.palette.grey[100],
         ...theme.applyStyles('dark', {
           color: theme.palette.grey[600],
         }),
       },
       '&.Mui-disabled + .MuiSwitch-track': {
         opacity: 0.7,
         ...theme.applyStyles('dark', {
           opacity: 0.3,
         }),
       },
     },
     '& .MuiSwitch-thumb': {
       boxSizing: 'border-box',
       width: 22,
       height: 22,
     },
     '& .MuiSwitch-track': {
       borderRadius: 26 / 2,
       backgroundColor: '#E9E9EA',
       opacity: 1,
       transition: theme.transitions.create(['background-color'], {
         duration: 500,
       }),
       ...theme.applyStyles('dark', {
         backgroundColor: '#39393D',
       }),
     },
  }));

  