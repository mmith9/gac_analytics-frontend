import { List, Button, Box, MenuItem, ListItem, Avatar, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { FunctionComponent } from "react";
import styles from "../styles/right-panel.module.css";
import { useAppData } from '../contexts/app_data_context_provider';
import { blue } from '@mui/material/colors';

const RightPanel: FunctionComponent = () => {
    const {defenderTeam ,setAppData} = useAppData()

    const handleClick_add_unit = ()=> setAppData({type:'UNIT_DIALOG', value:{open:true, side:'defender'}})
    const handleClick_add_datacron = () => setAppData({ type: 'DATACRON_DIALOG', value: { open: true, side: 'defender' } })

    let add_datacron_button_disabled = false
    let add_button_disabled=false
    let add_button_text:string=''

    if (defenderTeam === null) {
        add_button_disabled=false
        add_button_text='ADD TEAM LEADER' }
    else if (defenderTeam.members.length <5) {
        add_button_disabled=false
        add_button_text='ADD TEAM MEMBER' }
    else {
        add_button_disabled=true
        add_button_text='ADD TEAM MEMBER' }
    
    console.log('D team', defenderTeam)
    return (

        <div className={styles.rightPanelDiv}>
            <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                {/* <Box sx={{display:'flex', flexDirection:'column', height:'100%'}}> */}
                <List sx={{ pt: 0 }}>

                    {defenderTeam ? defenderTeam.members.map((unit, index) => (
                        <ListItem button onClick={() => { }} key={unit.base_id}>
                            <ListItemAvatar>
                                <Avatar src={unit.image_url} sx={{ bgcolor: blue[100], color: blue[600] }}/>
                            </ListItemAvatar>
                            <ListItemText primary={unit.name} />
                        </ListItem>
                    )) : null}

                </List>
                <Box sx={{ display: 'flex', height: '100%' }}></Box>
                <Button disabled={add_button_disabled} variant='outlined' id="basic-button" onClick={handleClick_add_unit}>
                    {add_button_text}
                </Button>
                <Button disabled={add_datacron_button_disabled} variant='outlined' id="basic-button" onClick={handleClick_add_datacron}>
                    Add datacron
                </Button>

            </Paper>
        </div>

    );
};

export default RightPanel;




