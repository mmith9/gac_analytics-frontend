import { useStaticData } from "../contexts/static_data_context_provider";
import { useAppData } from '../contexts/app_data_context_provider'
import { UnitList } from '../type_defs/data_types';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box'
import { blue } from '@mui/material/colors';
import DebouncedTextInput from './debounced_text_input';
import { addUnitToTeam, copyTeam } from "../type_defs/gac_objects";
import { PORow, Team } from "../type_defs/data_classes";
import { DatacronDialogProps} from "../type_defs/dialogs";
import { MenuItem, Select } from "@mui/material";
import DcAbilityDropList from "./dc_ability_drop_menu";
const axios = require('axios').default;

function DatacronDialog(props: DatacronDialogProps)
{

    const { onClose, selectedValue, open, side } = props;
    const { unitDialogProps, setAppData, defenderTeam, attackerTeam, currentGac } = useAppData()
    const { allUnits, allUnitStatus } = useStaticData()
    const [user_input, setUser_input] = useState('')

    const handleClose = () => { close_datacron_dialog() }

    const handleListItemClick = (key: string, side_: string) =>
    {
        console.log('list item click ', key)

        switch (side_)
        {
            case 'defender': {
                break
            }
            case 'attacker': {
                break
            }
            default: { console.error('wrong side ', side) }
        }
        close_datacron_dialog()
    }

    const close_datacron_dialog = () =>
    {
        setAppData({ type: 'DATACRON_DIALOG', value: { open: false, side: '' } })
        setUser_input('')
    }

    var startTime = performance.now()
 

    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return (
        <Dialog onClose={handleClose} open={open} maxWidth={false} fullWidth={false}>
            <Box margin='15px' height='80vh' width='90vw' >

                <DcAbilityDropList dc_ab_level={3} season={currentGac} />
                <Box height='20px' width='90vw'/>
                <DcAbilityDropList dc_ab_level={6} season={currentGac} />
                <Box height='20px' width='90vs' />
                <DcAbilityDropList dc_ab_level={9} season={currentGac} />

                
                
            </Box>
        </Dialog>
    );
}

export default DatacronDialog

