
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'; 
import styles from "../styles/left-panel.module.css";
import {Paper, Stack} from "@mui/material"
import { useAppData } from "../contexts/app_data_context_provider";
import { blue } from "@mui/material/colors";
import { useStaticData } from "../contexts/static_data_context_provider";

const SidePanel = ({side}:{side:string}) => {
	const {attackerTeam, defenderTeam, unitDialogProps, setAppData} = useAppData()
	const {unit_dict} = useStaticData()
	
	const handleClick_add_unit = () => setAppData({ type: 'UNIT_DIALOG', value: { open: true, side: side } })
	const handleClick_add_datacron = () => setAppData({ type: 'DATACRON_DIALOG', value: { open: true, side: side } })

	const handleClick_team = ()=> setAppData({type:'TEAM_DIALOG', value:{open:true, side:side}})

	const theTeam = (side=='attackers') ? attackerTeam : defenderTeam

	let add_button_disabled:boolean=false
	let add_button_text:string=''

  if (theTeam === null) {
      add_button_disabled=false
      add_button_text='ADD TEAM LEADER' }
  else if (theTeam.members.length <5) {
      add_button_disabled=false
      add_button_text='ADD TEAM MEMBER' }
  else {
      add_button_disabled=true
      add_button_text='ADD TEAM MEMBER' }

	console.log('A team', theTeam)
  return (


		<div className={styles.leftPanelDiv}>
			<Paper elevation={6} sx={{ display:'flex', flexDirection:'column', width: '100%', height: '100%' }}>
				<List sx={{ pt: 0 }}>
					<>
					<div className={styles.unitLimit5}>unit limit: 5</div>
					{theTeam ? theTeam.members.map((unit, index) => (
						<ListItem button onClick={() => { }} key={index}>
							<ListItemAvatar>
								<Avatar src={unit_dict[unit.unit_id - 1].image_url} sx={{ bgcolor: blue[100], color: blue[600] }}>

								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={unit_dict[unit.unit_id - 1].name} />
						</ListItem>
					)) : null}
				  </>
				</List>
				<Box sx={{display:'flex', height:'100%'}}></Box>
				<Button disabled={add_button_disabled} variant='outlined' id="basic-button" onClick={handleClick_add_unit}>
					{add_button_text}
				</Button>
			  <Button variant='outlined' id="basic-button" onClick={handleClick_add_datacron}>
				  Add datacron
			  </Button>
			  <Button variant='outlined' id="basic-button" onClick={handleClick_team}>
				  Team
			  </Button>

			</Paper>
		</div>
	);
};

export default SidePanel;
