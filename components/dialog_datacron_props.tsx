import { useAppData } from '../contexts/app_data_context_provider'
import { useEffect, useState } from 'react';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import { addDatacronToTeam, copyTeam } from "../type_defs/gac_objects";
import { DatacronCC, StatLimit ,PORow, Team } from "../type_defs/data_classes";
import { DatacronDialogProps} from "../type_defs/dialogs";
import DcAbilityDropList from "./dc_ability_drop_menu";
import DcStatsMultiDroplist from "./dc_stat_multi_droplists";

const axios = require('axios').default;

function DatacronDialog(props: DatacronDialogProps)
{

    const { open, side } = props;
    const { setAppData, defenderTeam, attackerTeam, currentGac } = useAppData()
    //const { allUnits, allUnitStatus } = useStaticData()
    //const [user_input, setUser_input] = useState('')
    const [datacronAtt, setDatacronAtt] = useState({ ability_3: 0, ability_6: 0, ability_9: 0, stat_limits: [{ stat_id: 0, stat_min: 0, stat_max: 0 }] } as DatacronCC)    
    const [datacronDef, setDatacronDef] = useState({ ability_3: 0, ability_6: 0, ability_9: 0, stat_limits: [{ stat_id: 0, stat_min: 0, stat_max: 0 }] } as DatacronCC)

    const datacron = (side=='attackers') ? datacronAtt : datacronDef
    const setDatacron = (side=='attackers') ? setDatacronAtt : setDatacronDef

    const handleClose = () =>  {  
        switch (side)
        {
            case 'attackers': {
                const newTeam = addDatacronToTeam(datacron, attackerTeam)
                setAppData({ type: 'ATTACKER_TEAM', value: newTeam })
                break
            }
            case 'defenders': {
                const newTeam = addDatacronToTeam(datacron, defenderTeam)
                setAppData({ type: 'DEFENDER_TEAM', value: newTeam })
                break
            }
            default: { console.error('wrong side ', side) }
        }
        close_datacron_dialog()
    }

    const value_return=(what:string, value:number)=>{
   //     console.log(what, value)
        switch (what){
            case "ability_3": { setDatacron({ ...datacron, ability_3: value }); break }
            case "ability_6": { setDatacron({ ...datacron, ability_6: value }); break }
            case "ability_9": { setDatacron({ ...datacron, ability_9: value }); break }
        }
    }
    
    const valueReturnStats=(limits:StatLimit[])=>{
        //console.log(limits)
        setDatacron({ ...datacron, stat_limits:limits })
    }

    const close_datacron_dialog = () =>
    {
        setAppData({ type: 'DATACRON_DIALOG', value: { open: false, side: side } })
        //console.log('DC DIALOG', datacron)
    }

    return (<>
        <Dialog onClose={handleClose} open={open} maxWidth={false} fullWidth={false}>
            <Box margin='15px' height='80vh' width='90vw' >

                <DcAbilityDropList dc_ab_level={3} season={currentGac} 
                    initValue={''+datacron.ability_3} valueReturn={value_return}/>
                <Box height='20px' width='90vw'/>
                <DcAbilityDropList dc_ab_level={6} season={currentGac} 
                    initValue={'' + datacron.ability_6} valueReturn={value_return} />
                <Box height='20px' width='90vs' />
                <DcAbilityDropList dc_ab_level={9} season={currentGac} 
                    initValue={'' + datacron.ability_9} valueReturn={value_return} />

                
                <DcStatsMultiDroplist initLimits={datacron.stat_limits} season={currentGac} valueReturn={valueReturnStats}/>
            </Box>
        </Dialog>
    </>
    );
}

export default DatacronDialog

