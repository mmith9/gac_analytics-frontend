import {Avatar} from "@mui/material"

import { Unit } from "../type_defs/data_classes";
import {useEffect, useState, useContext} from "react";


const Unit_avatar = ({unit, onClick=null, leader=false}:{unit:Unit, onClick?:any, leader:boolean}) => {
    //console.log(unit)
    let size='40px'
    if (leader) {size = '60px'}
    
    return (<Avatar onClick={onClick} src={unit.image_url} sx={{height:size, width:size}}></Avatar>)

}

export default Unit_avatar