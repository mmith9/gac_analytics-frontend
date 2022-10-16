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
import { Team } from "../type_defs/data_classes";

export interface UnitDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: Function;
    side: string;  

}
  export const unitDialogProps_init:UnitDialogProps = {
    open:false, selectedValue:'', onClose:()=>{}, side:'',
}

function UnitDialog(props: UnitDialogProps) {

    const { onClose, selectedValue, open, side } = props;
    const {unitDialogProps, setAppData, defenderTeam, attackerTeam} = useAppData()
    const {allUnits, allUnitStatus} = useStaticData()
    const [user_input, setUser_input] = useState('')    

    const handleClose = () => {close_unit_dialog()}

    const handleListItemClick = (key: string, side_: string) => {
        console.log('list item click ', key)
        const newUnit = allUnits.filter((unit)=>(unit.base_id==key))[0]
        console.log(newUnit)
        switch (side_) {
            case 'defender':{
                let newTeam=copyTeam(defenderTeam)
                newTeam = addUnitToTeam(newUnit, newTeam)
                console.log('added unit to team', newTeam)
                setAppData({type: 'DEFENDER_TEAM', value:newTeam})
                break
            }
            case 'attacker':{
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
                        <ListItem button onClick={() => handleListItemClick(unit.base_id, side)} key={unit.base_id}>
                            <ListItemAvatar>
                                <Avatar src={unit.image_url} sx={{ bgcolor: blue[100], color: blue[600] }}>
                          
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={unit.name} />
                        </ListItem>
                    ))}


                </List>
            </Box>
        </Dialog>
    );
}

export default UnitDialog
