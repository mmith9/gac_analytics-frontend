import { FunctionComponent, useState, useCallback } from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'; 
import styles from "../styles/left-panel.module.css";
import {Paper, Stack} from "@mui/material"
import { useAppData } from "../contexts/app_data_context_provider";
import { blue } from "@mui/material/colors";

const LeftPanel: FunctionComponent = () => {
	const {attackerTeam, unitDialogProps, setAppData} = useAppData()
	const handleClick = ()=> setAppData({type:'UNIT_DIALOG', value:{open:true, side:'attacker'}})

	let add_button_disabled:boolean=false
	let add_button_text:string=''

  if (attackerTeam === null) {
      add_button_disabled=false
      add_button_text='ADD TEAM LEADER' }
  else if (attackerTeam.members.length <5) {
      add_button_disabled=false
      add_button_text='ADD TEAM MEMBER' }
  else {
      add_button_disabled=true
      add_button_text='ADD TEAM MEMBER' }

	console.log('A team', attackerTeam)
  return (


		<div className={styles.leftPanelDiv}>
			<Paper elevation={6} sx={{ display:'flex', flexDirection:'column', width: '100%', height: '100%' }}>
				<List sx={{ pt: 0 }}>
					<>
					<div className={styles.unitLimit5}>unit limit: 5</div>
					{attackerTeam ? attackerTeam.members.map((unit, index) => (
						<ListItem button onClick={() => { }} key={index}>
							<ListItemAvatar>
								<Avatar src={unit.image_url} sx={{ bgcolor: blue[100], color: blue[600] }}>

								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={unit.name} />
						</ListItem>
					)) : null}
				  </>
				</List>
				<Box sx={{display:'flex', height:'100%'}}></Box>
				<Button disabled={add_button_disabled} variant='outlined' id="basic-button" onClick={handleClick}>
					{add_button_text}
				</Button>
			</Paper>
		</div>
	);
};

export default LeftPanel;
