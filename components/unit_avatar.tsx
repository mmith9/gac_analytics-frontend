import {Avatar, Stack, Typography} from "@mui/material"

import { Unit } from "../type_defs/data_classes";
import {useEffect, useState, useContext} from "react";


const Unit_avatar = ({unit, onClick=null, leader=false}:{unit:Unit, onClick?:any, leader:boolean}) => {
    //console.log(unit)
    let size='40px'
    if (leader) {size = '60px'}
    if (unit.count && unit.count>0) {size='60px'}
    return (
        <Stack >
            <Avatar onClick={onClick} src={unit.image_url} sx={{height:size, width:size}} imgProps={{loading:'lazy'}}/>
            <Typography align='center' fontSize='sx' fontWeight='light'>
                {(unit.count)? (unit.count):'' }
            </Typography>
        </Stack>

    )

}

export default Unit_avatar