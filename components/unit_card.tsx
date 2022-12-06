import { useAppData } from '../contexts/app_data_context_provider'
import { useState } from 'react';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import { addDatacronToTeam, copyTeam } from "../type_defs/gac_objects";
import { DatacronCC, StatLimit, PORow, Team, UnitCC } from "../type_defs/data_classes";
import { DatacronDialogProps, TeamDialogProps } from "../type_defs/dialogs";
import { Avatar, MenuItem, Select, Stack, Typography } from "@mui/material";
import DcAbilityDropList from "./dc_ability_drop_menu";
import DcStatsMultiDroplist from "./dc_stat_multi_droplists";
import { useStaticData } from '../contexts/static_data_context_provider';

const axios = require('axios').default;


export const UnitCard = ({unit}:{unit:UnitCC}) => {
    const {allUnits, allUnitStats} = useStaticData()
    const size = '100px'
    const onClick = () => {}
    let limit_list
    if (unit.stat_limits) {
        limit_list = unit.stat_limits.map( (limit) => {
            const stat_name = allUnitStats[limit.stat_id]
            return (
                <>
                    {stat_name} : {limit.stat_min} to {limit.stat_max}
                </>
            )
        })
    }
    else {limit_list=null}

    return(<>
        <Box margin='15px' height='200px' width='100px'>
        <Stack >
            <Avatar onClick={onClick} src={allUnits[Number(unit.unit_id) - 1].image_url} sx={{ height: size, width: size }} imgProps={{ loading: 'lazy' }} />
            <Typography align='center' fontSize='sx' fontWeight='light'>
               {limit_list}
               lorem ipsum <br/>
               amet <br/>
            </Typography>
        </Stack>
        </Box>
    </>)
}