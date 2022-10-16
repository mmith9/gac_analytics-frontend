import React, {SetStateAction, useState} from 'react';
import TextField from '@mui/material/TextField'


const DebouncedTextInput=({setParentInput}:{setParentInput:React.Dispatch<SetStateAction<string>>})=>{
    type TimeoutAndNull = NodeJS.Timeout|null
    const [handle, setHandle] = useState(null as TimeoutAndNull)
    const [debounced, setDebounced] = useState('')

    const handleChange=(event:any) => {
        setDebounced(event.target.value)
        if (handle != null) {clearTimeout(handle)}
        const new_handle=setTimeout(()=>{
            //console.log('timeout fired')
            setParentInput(event.target.value)
            }, 200)
        
        setHandle(new_handle)
    }

    return(
        <TextField  
            key='menu_input'
            value={debounced}
            onChange={handleChange}
            placeholder='search...'            
        />
        )
}
export default DebouncedTextInput





