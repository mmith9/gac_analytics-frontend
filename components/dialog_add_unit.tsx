import { useStaticData } from "../contexts/static_data_context_provider";
import { useAppData } from '../contexts/app_data_context_provider'
import { UnitList } from '../type_defs/data_types';
import { useState } from 'react';
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

import { AddUnitDialogProps} from "../type_defs/dialogs";
import { ListItemButton } from "@mui/material";
import { UnitCC } from "../type_defs/data_classes";

function AddUnitDialog(props: AddUnitDialogProps) {

    const { open, side } = props;
    const {unitDialogProps, setAppData, defenderTeam, attackerTeam} = useAppData()
    const {allUnits} = useStaticData()
    const [user_input, setUser_input] = useState('')    

    const handleClose = () => {close_unit_dialog()}

    const handleListItemClick = (key: string, side_: string) => {
        console.log('list item click ', key)
        const newUnitProps = allUnits.filter((unit)=>(unit.base_id==key))[0]
        const newUnit:UnitCC = {unit_id:Number(newUnitProps.unit_id), stat_limits:[] }
        console.log(newUnit)
        switch (side_) {
            case 'defenders':{
                let newTeam=copyTeam(defenderTeam)
                newTeam = addUnitToTeam(newUnit, newTeam)
                console.log('added unit to team', newTeam)
                setAppData({type: 'DEFENDER_TEAM', value:newTeam})
                break
            }
            case 'attackers':{
                let newTeam=copyTeam(attackerTeam)
                newTeam = addUnitToTeam(newUnit, newTeam)
                setAppData({ type: 'ATTACKER_TEAM', value: newTeam })
                break
            }
            default:{console.error('wrong side ', side)}
        }
    close_unit_dialog()
    }
    
    const close_unit_dialog= ()=>{
        setAppData({type:'UNIT_DIALOG', value:{open:false, side:''}})
        setUser_input('')
    }
 
    var startTime = performance.now()
    let filtered_units:UnitList=[]  
    if (unitDialogProps.open) {
        if (user_input.length>0) {
            filtered_units = allUnits.filter((value, index) => {return (allUnits[index].name.toLowerCase().search(user_input) >=0 )})
            }
        else {filtered_units = allUnits}
    }
    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return (
        <Dialog onClose={handleClose} open={open} sx={{ height: "100%" }}>
            <Box height='100vh' width='300px' >
                <DialogTitle>Title</DialogTitle>
                <List sx={{ pt: 0 }}>

                    <DebouncedTextInput setParentInput={setUser_input} />

                    {filtered_units.map((unit, index) => (
                        <ListItemButton onClick={() => handleListItemClick(unit.base_id, side)} key={unit.base_id}>
                            <ListItemAvatar>
                                <Avatar src={unit.image_url} sx={{ bgcolor: blue[100], color: blue[600] }}>
                          
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={unit.name} />
                        </ListItemButton>
                    ))}


                </List>
            </Box>
        </Dialog>
    );
}

export default AddUnitDialog
