import { Button } from "@mui/material";

import { FunctionComponent } from "react";
//import { useQuery } from "react-query";
import { useAppData } from "../contexts/app_data_context_provider";
import { useStaticData } from "../contexts/static_data_context_provider";

import styles from "../styles/bottom-menu.module.css";
import { GacBattle, GacDataRequest } from "../type_defs/data_classes";
import { apiUrl } from "../type_defs/settings";
const axios = require('axios').default;


const BottomMenu: FunctionComponent = () => {


	const {allGacSeasons} = useStaticData()
	const {currentGac,attackerTeam, defenderTeam, setAppData} = useAppData()
	
async function fetchGacData(url:string, body:GacDataRequest) {
	console.log(body)
	const response = await axios.post(url,body)
	const data = response.data
	console.log(response)
	setAppData({type:'GAC_BATTLE_DATA', value:data})
}

	const handleClick=(e:React.MouseEvent)=>{
		if ((defenderTeam === null && attackerTeam===null ) || currentGac===null) {return}
		let index=-1
		for (let i=0; i < allGacSeasons.length; i++) {
			if (allGacSeasons[i].season === currentGac) {index=i;break}
		}
		if (index<0){return}
		const new_request:GacDataRequest = {
			season: allGacSeasons[index]
		}
		if (defenderTeam !== null) { new_request.defenders = defenderTeam }
		if (attackerTeam !== null) {new_request.attackers=attackerTeam}
		console.log(currentGac)
		console.log
		console.log(new_request)
		fetchGacData(apiUrl + 'fetch_gac_data', new_request)
	}

	const handleClickClear = () => {
		setAppData({ type: 'ATTACKER_TEAM', value: null })
		setAppData({ type: 'DEFENDER_TEAM', value: null })
		setAppData({ type: 'ATTACKER_DC', value: null })
		setAppData({ type: 'DEFENDER_DC', value: null })
		setAppData({ type: 'GAC_BATTLE_DATA', value: {battles:[]} })
	}


	return (
		<div className={styles.bottomMenuDiv}>
			<Button variant='outlined' id="basic-button" onClick={handleClickClear}>
				Clear
			</Button>

			<Button variant='outlined' id="basic-button" onClick={handleClick}>
				Fetch Server Data
			</Button>
		</div>
	);
};

export default BottomMenu;
