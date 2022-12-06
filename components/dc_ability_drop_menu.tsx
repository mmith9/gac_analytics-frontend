import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Typography, Box, SvgIcon, Container, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { PORow } from "../type_defs/data_classes";
import CancelIcon from '@mui/icons-material/Cancel';
import { apiUrl } from "../type_defs/settings";
const axios = require('axios').default;


const DcAbilityDropList = ({ initValue,dc_ab_level, season, valueReturn }: 
    { initValue:string,dc_ab_level: number, season: number, valueReturn:Function }) =>{

    const [dcList, setDcList] = useState<[PORow] | null>(null)
    const [dcAbId, setDcAbId] = useState('0')
    const [cancelDisabled, setCancelDisabled] = useState(true)

 

    const handleSelect = (event: SelectChangeEvent) => {
        setDcAbId(event.target.value);
        setCancelDisabled(false)
        const what = 'ability_' + dc_ab_level
        const value = event.target.value
        //console.log('child set ', what, value)
        valueReturn(what, value)
     }

    const handleCancel =()=>{
        setDcAbId('0');setCancelDisabled(true)
        const what = 'ability_'+dc_ab_level
        const value=0
      // console.log('child cancel ', what, value)
        valueReturn(what, value)
    }

    async function fetcher(url: string)
    {
        console.log('fetcher:', url)
        let response
        try { response = await axios.get(url) }
        catch (err)
        { console.log(err) }
        //console.log(response)
        const data = response.data.payload as [PORow]
        setDcList(data)
        setDcAbId(initValue)
        if (initValue !== '0') { setCancelDisabled(false) }
    }
    const url = apiUrl + 'precalcs?season=' + season + '&item_type=dc_ability_' + dc_ab_level
    useEffect(() => { fetcher(url) }, [url])

    function strip_tags(a_string: string) {
        let new_string:string = a_string

        while (new_string.includes('<') && (new_string.includes('>'))) {
            const tag_start = new_string.indexOf('<')
            const tag_end = new_string.indexOf('>')
            new_string = new_string.slice(0,tag_start) + new_string.slice(tag_end+1)
        }

        // const line_break = 10
        // if (new_string.length > line_break) {
        //     const first_space = new_string.slice(line_break).indexOf(' ')
        //     if (first_space>=0) {
        //         if (new_string.slice(first_space +line_break +1).length > 0){
        //             new_string = new_string.slice(0,first_space +line_break) 
        //                 +'<br>'
        //                 +new_string.slice(first_space +line_break +1)
        //         }
        //     }
        // }
        return new_string
    }

    let menu_items:JSX.Element[]
    if (dcList === null){
        console.log('dcList null')
        menu_items =  [<MenuItem value ='0' key='solo'>Placeholder Item</MenuItem>]
    }
    else {
        //console.log('got menu items')
        //console.log(dcList)
        menu_items = dcList.map(row => (
            <MenuItem key={row.id} value={row.id} sx={{ whiteSpace: 'unset', wordWrap:'none'}}>
                    <Stack direction='row' spacing='10px'>
                        <Typography align='right' fontSize='sx' fontWeight='light'>
                            {row.count}
                        </Typography>
                        <Box >
                        
                        {strip_tags(row.name as string)}
                        
                        </Box>
                    </Stack>
                </MenuItem>
                
            )
        )
        menu_items.unshift(<MenuItem value='0' key='solo'> Not defined </MenuItem>)
    }  
    
    //console.log(menu_items)
    //console.log('dc_ab_level season', dc_ab_level, season)
    return (
        <>
        <Stack direction='row'>
        <FormControl sx={{width:'85vw'}}>
        <InputLabel id="demo-simple-select-label">Dc ability level {dc_ab_level}</InputLabel>
        <Select id='dc-ability-{dc_ab_level}-{season}' 
                label='Datacron ability level {dc_ab_level}'
                labelId="demo-simple-select-label"
                value={dcAbId}
                onChange={handleSelect}>
            {menu_items}
        </Select>
        </FormControl>
        <Box  justifyContent='center' sx={{background:'white'}}>
                <Button disabled={cancelDisabled} variant='text' color='error' onClick={handleCancel} size='small'
                sx={{mt:'0.7vh'}}>
                <CancelIcon fontSize='large' />
            </Button>
        </Box>
            </Stack>
        </>
    )
    }



export default DcAbilityDropList