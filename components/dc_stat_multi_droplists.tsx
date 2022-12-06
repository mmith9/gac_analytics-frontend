
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { StatLimit , PORow} from "../type_defs/data_classes"
import CancelIcon from '@mui/icons-material/Cancel';
import { apiUrl } from "../type_defs/settings";

const axios = require('axios').default;



const DcStatsMultiDroplist = ({ initLimits, season, valueReturn }: { initLimits:StatLimit[] ,season: number, valueReturn: Function }) => {
    const [limits, setLimits] = useState(initLimits)

    const addField = () => {
        const newLimits = [...limits, {stat_id:0, stat_min:0, stat_max:0}]
        setLimits(newLimits)
        valueReturn(newLimits)}

    const removeField = (index:number) => {
        const newLimits = limits.filter((v, i) => (index !==i))
        setLimits(newLimits)
        valueReturn(newLimits)}

    const limitChange = (index:number, newValue:StatLimit) => {
        const newLimits = limits.map((item, idx) => {
            if (index !== idx) {return item}
            else {return newValue}
        })
        setLimits(newLimits)
        valueReturn(newLimits)
    }

    const [allLimits, setAllLimits] = useState<PORow[] | null>(null)

    async function fetcher(url: string) {
        //console.log('fetcher:', url)
        let response
        try { response = await axios.get(url) }
        catch (err)
        { console.log(err) }
        //console.log(response)
        if (response) {
            const data = response.data.payload as PORow[]
            setAllLimits(data)
        }
    }
    const url = apiUrl + 'precalcs?season=' + season + '&item_type=dc_all_stats'
    useEffect(() => {fetcher(url)},[url])

    //console.log('alllimits', allLimits)
    if (!allLimits) {return (<></>)}

    let usedLimits:Number[] = []
    if (limits) {usedLimits = limits.map((limit) => limit.stat_id)}

    return (
        <>
            <Button onClick={addField}>Add stats to datacron</Button>
            {limits.map((limit, index) => (
            <Stack direction='row' key={index}>
                    <DcStatDroplist listIndex={index} currentLimit={limit} usedLimits={usedLimits} allLimits={allLimits} valueReturn={limitChange}/>
                <Box justifyContent='center' sx={{ background: 'white', mb:'30px'}}>
                    <Button variant='text' color='error' onClick={() => {removeField(index)}} size='small' sx={{ mt: '0.7vh' }}>
                        <CancelIcon fontSize='large' />
                    </Button>
                </Box>
            </Stack>
            
            
            ))}
        </>
    )

}

const DcStatDroplist = ({listIndex, currentLimit, allLimits, usedLimits, valueReturn}:
    {listIndex:number, currentLimit:StatLimit, allLimits:PORow[], usedLimits: Number[],  valueReturn:Function}) => {
    
    
    const getMaxOfStat = (stat_id: number) => {
        let the_max = 0
        for (let i = 0; i < allLimits.length; i++) {
            if (allLimits[i].id == stat_id) {
                the_max = allLimits[i].max_value as number
                //console.log('found') 
                break
            }
            //else {console.log(i, typeof(i))}
        }
        //console.log('max', stat_id, typeof(stat_id), the_max)
        return the_max
    }

    const handleSelect = (event: SelectChangeEvent) =>    {
        const what = listIndex
        const value:StatLimit = {
            stat_id:Number(event.target.value),
            stat_min: 0, 
            stat_max: getMaxOfStat(Number(event.target.value))
        }
        //console.log('stat child set ', what, value)
        valueReturn(what, value)
    }
    const handleSlide = (event: Event, newValue:number | number[]) => {
        const what = listIndex
        const newValue_ = newValue as number[]
        const value:StatLimit = {
            stat_id: currentLimit.stat_id,
            stat_min: newValue_[0] ,
            stat_max: newValue_[1]
        }
        valueReturn(what, value)
    }

    let menu_items: JSX.Element[]

    const filter = usedLimits.filter((num) => (num != currentLimit.stat_id))

    menu_items = allLimits.filter((limit) => (!filter.includes(limit.id))).map(row => (
        <MenuItem key={row.id} value={row.id} >
            <Stack direction='row' spacing='10px'>
                <Typography align='right' fontSize='sx' fontWeight='light'>
                    {row.count}
                </Typography>
                <Box >{row.name}</Box>
            </Stack>
        </MenuItem>
        )
    )
    menu_items.unshift(<MenuItem value={0} key='solo'> Not defined </MenuItem>)
    //console.log('limit of ', {currentLimit})
    //console.log('all limits', allLimits)
    const as_percent = (a_float: number) =>{
        return (Math.round(a_float *10000)/100 +'%')
    }

    const marks = [{ value: 0, label: '0%' },
        { value: getMaxOfStat(currentLimit.stat_id), label: as_percent(getMaxOfStat(currentLimit.stat_id)) }]
    if (currentLimit.stat_min !=0) {marks.push({value: currentLimit.stat_min, label:as_percent(currentLimit.stat_min)})}
    if (currentLimit.stat_max != getMaxOfStat(currentLimit.stat_id)) { marks.push({ value: currentLimit.stat_max, label: as_percent(currentLimit.stat_max)})}

    return (
        <FormControl sx={{ width: '22vw' }}>
            <Select id='stat limit {index}' value={currentLimit.stat_id+''} onChange={handleSelect}>
                {menu_items}
            </Select>
            {currentLimit.stat_id != 0 ? 
                <Slider min={0} max={getMaxOfStat(currentLimit.stat_id)} step={0.00001} marks={marks} value={[currentLimit.stat_min, currentLimit.stat_max]} 
                onChange={handleSlide} valueLabelDisplay="auto" valueLabelFormat={as_percent}>
                
                </Slider>
            :<></>}
        </FormControl>
    )
}

export default DcStatsMultiDroplist