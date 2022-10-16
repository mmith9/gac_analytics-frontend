import {useState, useEffect} from 'react'



const useDebounceInputString = (input:string, setInputString:Function, delay:number) => {
//    const [prev_string, mem_string] = useState('')

    //const new_string = prev_string+input
    //mem_string(new_string)
    
    useEffect(()=>{
        console.log('timeout set')
        const timer_handle = setTimeout(()=>{
            setInputString(input)
            //mem_string('')
        }, delay)
        return (()=>{
            clearTimeout(timer_handle)
        }) //this is cleanup function
    })
}