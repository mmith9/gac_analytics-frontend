
import { useContext } from 'react'
import React, {useEffect, useState} from "react";

import Viewport from '../components/viewport';
import ReactDOM from 'react-dom'
//import {debounce} from 'lodash/debounce'
import {StaticDataContextProvider} from "../contexts/static_data_context_provider"
import { AppDataContextProvider } from '../contexts/app_data_context_provider';
// superseeded ? by
//import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query-devtools';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from './_app.css';

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             refetchOnWindowFocus: false,
//         },
//     }
// })


const App = () => {
    console.log('App start')
    const [state,setState]=useState(1)

    const handleResize = ()=>{
        console.log('resize fired')
      //  console.log(window)
     //   setState(state+1)
     //   console.log(state)
    }
    
    useEffect(()=>{console.log(window); window.addEventListener('resize', handleResize)})

    
    return (
        <React.StrictMode>
            <StaticDataContextProvider>
                <AppDataContextProvider>
                    {/* <QueryClientProvider client={queryClient}> */}
                        
                        <div style={styles} >
                        <div style={{height:'100vh'}}>
                            <Viewport key={state}/>
                        </div>
                        </div>
                    {/* </QueryClientProvider> */}
                </AppDataContextProvider>
            </StaticDataContextProvider>
        </React.StrictMode>
    )
}

export default App



        
