import { useAppData } from '../contexts/app_data_context_provider'
import { useState } from 'react';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import { addDatacronToTeam, copyTeam } from "../type_defs/gac_objects";
import { DatacronCC, StatLimit ,PORow, Team } from "../type_defs/data_classes";
import { DatacronDialogProps, TeamDialogProps} from "../type_defs/dialogs";
import { MenuItem, Select, Stack } from "@mui/material";
import DcAbilityDropList from "./dc_ability_drop_menu";
import DcStatsMultiDroplist from "./dc_stat_multi_droplists";
import { useStaticData } from '../contexts/static_data_context_provider';
import DatacronDialog from './dialog_datacron_props';
import { UnitCard } from './unit_card';

const axios = require('axios').default;

const TeamDialog = (props: TeamDialogProps) => 
{
    const {open, side} = props
    const { setAppData, defenderTeam, attackerTeam, currentGac } = useAppData()
    const { allUnits, allUnitStatus } = useStaticData()

    const theTeam = (side=='attackers') ? attackerTeam : defenderTeam
    const handleClose = () =>  {  
        switch (side)
        {
            case 'attackers': {
                const newTeam = theTeam
                setAppData({ type: 'ATTACKER_TEAM', value: newTeam })
                break
            }
            case 'defenders': {
                const newTeam = theTeam
                setAppData({ type: 'DEFENDER_TEAM', value: newTeam })
                break
            }
            default: { console.error('wrong side ', side) }
        }
        close_team_dialog()
    }

    const close_team_dialog = () =>
    {
        setAppData({ type: 'TEAM_DIALOG', value: { open: false, side: side } })
    }

    let unit_cards = []
    if (theTeam) {
       // if (theTeam.leader) { unit_cards.push(<UnitCard unit={theTeam.leader} key={theTeam.leader.unit_id} />)}
        if(theTeam.members) {unit_cards.push(
            theTeam.members.map((member) => (<UnitCard unit={member} key={member.unit_id}/>))
        )}
    }
    else {return(<></>)}


    return (<>
        <Dialog onClose={handleClose} open={open} maxWidth={false} fullWidth={false}>
            <Box margin='15px' height='80vh' width='90vw' >
                <Stack direction='row'>
                {unit_cards}
                </Stack>
            </Box>
        </Dialog>
    </>
    );
}

export default TeamDialog

