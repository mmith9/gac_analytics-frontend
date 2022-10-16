import { Button } from "@mui/material";
import axios from "axios";
import { FunctionComponent } from "react";
//import { useQuery } from "react-query";
import { useAppData } from "../contexts/app_data_context_provider";
import { useStaticData } from "../contexts/static_data_context_provider";

import styles from "../styles/bottom-menu.module.css";
import { GacBattle, GacDataRequest } from "../type_defs/data_classes";



const BottomMenu: FunctionComponent = () => {

	const base_url='http://192.168.2.205:8000/'
	const {allGacSeasons} = useStaticData()
	const {currentGac,attackerTeam, defenderTeam, setAppData} = useAppData()
	
async function fetchGacData(url:string, body:GacDataRequest) {
	const response = await axios.post(url,body)
	const data = response.data
	console.log(response)
	setAppData({type:'GAC_BATTLE_DATA', value:data})
}

	const handleClick=(e:React.MouseEvent)=>{
		if (defenderTeam === null || currentGac===null) {return}
		const new_request:GacDataRequest = {
			defenders:defenderTeam,
			season: allGacSeasons[currentGac]
		}
		if (attackerTeam !== null) {new_request.attackers=attackerTeam}
		fetchGacData(base_url + 'fetch_gac_data', new_request)
	}


	return (
		<div className={styles.bottomMenuDiv}>
			<Button variant='outlined' id="basic-button" onClick={handleClick}>
				Fetch Server Data
			</Button>
		</div>
	);
};

export default BottomMenu;
