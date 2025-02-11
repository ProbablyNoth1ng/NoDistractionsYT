  import {useEffect, useState} from 'react'
  import './Main.scss'

  import FormControlLabel from '@mui/material/FormControlLabel';
  import { sendMessageToActiveTab } from '../../utils/chrome';
  import { StorageData } from '../../types';

  import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";

  export function Main(){
      const [checked, setChecked] = useState<boolean>(false);

      // useEffect(() => {
      //   const handlePageLoad = async () => {
      //     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      //     if (tab.id) {
      //       await sendMessageToActiveTab({
      //         action: checked ? 'toggleOffShorts' : 'toggleOnShorts',
      //         value: checked,
      //       });
      //     }
      //   };
      
      //   chrome.tabs.onUpdated.addListener(handlePageLoad);
      
      //   return () => {
      //     chrome.tabs.onUpdated.removeListener(handlePageLoad);
      //   };
      // }, [checked]);
      
      // useEffect(() => {
      //   loadStoredState()
        
      // },[])   

      //   const loadStoredState = async () => {
      //     try{
      //       const data = await chrome.storage?.local?.get('disableShorts') as StorageData
      //       const isDisabled = data.disableShorts || false
      //       setChecked(isDisabled)

      //       console.log(isDisabled)
      //       await sendMessageToActiveTab({
      //         action:`${isDisabled ? "toggleOffShorts" : "toggleOnShorts"}`,
      //         value: isDisabled 
      //       });
          
          
      //   }catch (error){
      //     console.error(error)
      //   }
      // }


      
      
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
                  <div className="main_wrap container">
                    
                    <p className='py-10 text-4xl'>Extension Settings</p>
                    <div className="row"></div>
                    <div className="block py-10 flex justify-between">
                      <div className="text_part">
                          <p className='text-3xl uppercase'>disable shorts</p>
                          <p className='text-2xl'>disable shorts on main page and </p>
                      </div>
                          {/* <FormControlLabel
                              className='my-3'
                              control={
                                  <Switch   name="" />
                              }
                              label=""
                              
                          /> */}
                           <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }}  checked={checked} onChange={handleChange} />}
                            label=""
                          />
                          
                    </div>
                    <div className="row"></div>
                    <div className="block py-10 flex justify-between">
                      <div className="text_part">
                          <p className='text-3xl uppercase'>disable shorts</p>
                          <p className='text-2xl'>disable shorts on main page and </p>
                      </div>
                          {/* <FormControlLabel
                              className='my-3'
                              control={
                                  <Switch   name="" />
                              }
                              label=""
                              
                          /> */}
                           <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }}  />}
                            label=""
                          />
                        
                    </div>
                    <div className="row"></div>
                    <div className="block py-10 flex justify-between">
                      <div className="text_part">
                          <p className='text-3xl uppercase'>disable shorts</p>
                          <p className='text-2xl'>disable shorts on main page and </p>
                      </div>
                          {/* <FormControlLabel
                              className='my-3'
                              control={
                                  <Switch   name="" />
                              }
                              label=""
                              
                          /> */}
                           <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }}   />}
                            label=""
                          />
                         
                    </div>
                    <div className="row"></div>


                  </div>
  
              </main>
          </>

      )
  }


  const IOSSwitch = styled((props) => (
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
  