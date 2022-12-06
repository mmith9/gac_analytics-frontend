import {Avatar, Stack, Typography} from "@mui/material"

import { UnitFreq } from "../type_defs/data_classes";

import { useStaticData } from "../contexts/static_data_context_provider";


const Unit_avatar = ({unit, onClick=null, leader=false}:{unit:UnitFreq, onClick?:any, leader:boolean}) => {
    //console.log(unit)
    const {unit_dict} = useStaticData()
    if (!unit_dict) {return (<></>)}

    //console.log(unit_dict)
    //console.log(unit)
    //console.log(unit_dict[Number(unit.unit_id) - 1])
    let size='40px'
    if (leader) {size = '60px'}
    if (unit.count && unit.count>0) {size='60px'}
    return (
        <Stack >
            <Avatar onClick={onClick} src={unit_dict[Number(unit.unit_id)-1].image_url} sx={{height:size, width:size}} imgProps={{loading:'lazy'}}/>
            <Typography align='center' fontSize='sx' fontWeight='light'>
                {(unit.count)? (unit.count):'' }
            </Typography>
        </Stack>

    )

}

export default Unit_avatar