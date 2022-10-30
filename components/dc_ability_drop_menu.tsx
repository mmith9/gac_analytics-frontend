import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Typography, Box, SvgIcon, Container, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { PORow } from "../type_defs/data_classes";
import CancelIcon from '@mui/icons-material/Cancel';
const axios = require('axios').default;


const DcAbilityDropList = ({ dc_ab_level, season }: { dc_ab_level: number, season: number }) =>
{
    const [dcList, setDcList] = useState<[PORow] | null>(null)
    const [dcAbId, setDcAbId] = useState('0')
    const [cancelDisabled, setCancelDisabled] = useState(true)

    async function fetcher(url: string)
    {
        console.log('fetcher:', url)
        let response
        try        {   response = await axios.get(url)        }
        catch (err)
        {            console.log(err)        }
        //console.log(response)
        const data = response.data.payload as [PORow]
        setDcList(data)
    }

    const handleSelect = (event: SelectChangeEvent) => {
        setDcAbId(event.target.value);
        setCancelDisabled(false)
     }

    const handleCancel =()=>{setDcAbId('0');setCancelDisabled(true)}

    const url = 'http://192.168.2.205:8000/precalcs?season=' + season + '&item_type=dc_ability_' + dc_ab_level
    useEffect(() => { fetcher(url) }, [url])

    let menu_items:JSX.Element[]
    if (dcList === null){
        console.log('dcList null')
        menu_items =  [<MenuItem value ='0' key='solo'>Placeholder Item</MenuItem>]
    }
    else {
        console.log('got menu items')
        console.log(dcList)
        menu_items = dcList.map(row => (
                <MenuItem key={row.id} value={row.id}>
                    <Stack direction='row' spacing='10px'>
                        <Typography align='right' fontSize='sx' fontWeight='light'>
                            {row.count}
                        </Typography>
                        <Box>
                        {row.name}
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