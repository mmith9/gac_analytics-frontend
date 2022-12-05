import { FunctionComponent, useEffect, useState } from "react";
import attacker_styles from "../styles/attackers.module.css";
import defender_styles from "../styles/defenders.module.css";
import { useStaticData } from "../contexts/static_data_context_provider";
import { UnitList } from "../type_defs/data_types";
import Team_row from "./team_row";
import { useAppData } from "../contexts/app_data_context_provider";

import { PORow, PrecalcObject, Unit, UnitFreq } from "../type_defs/data_classes";
import { apiUrl } from "../type_defs/settings";
const axios = require('axios').default;


export const Teams = ({side}:{side:string}) =>{
	//console.log('team render ', side)
	const { gacBattleData, currentGac, defenderTeam, attackerTeam, setAppData} = useAppData()
	const { allUnits } = useStaticData()
	const [leaders, setLeaders] = useState<[PORow] | null>(null)
	const [unitsPerLeader, setUnitsPerLeader] = useState<[PORow] | null>(null)

	async function fetcher(url:string, setter:Function) {
		let response
		try {response = await axios.get(url)}
		catch (err) {console.log(err)}
		const data=response.data.payload
		setter(data)
	}

	let unit_rows: JSX.Element[] = []
	let current_season:number
	if (currentGac !=0) {current_season = currentGac}
	else (current_season = 32)

	const side_abbr = (side=='defenders') ? 'def_' : 'att_'
	const theTeam = (side=='defenders') ? defenderTeam : attackerTeam	
	const styles = (side == 'defenders') ? defender_styles.defendersDiv : attacker_styles.attackersDiv

	const leader_url = apiUrl+'precalcs/?season=' + current_season + '&item_type='+side_abbr+'lead'
	let leader = 0
	if (theTeam && theTeam.leader) {leader=theTeam.leader.unit_id}
	const unit_url = apiUrl+'precalcs/?season=' + current_season + '&item_type='+side_abbr+'units_per_lead'
		+ '&leader=' + leader

	useEffect(() => {fetcher(leader_url, setLeaders)}, [leader_url])
	useEffect(()=> {fetcher(unit_url, setUnitsPerLeader)},[unit_url])

	if (allUnits.length === 0 || ! (leaders)) { console.log('no render') ;return (<></>)}

	if (gacBattleData.battles.length === 0)
	{
		let unit_row: UnitList
		let unit: UnitFreq
		let unit_id:number
		let unit_num = 0
		let unitsToDraw
		if (theTeam===null) {
			console.log('D ordered leaders render')
			unitsToDraw=leaders}
		else {
			console.log('D ordered unit render')
			unitsToDraw=unitsPerLeader
		}
		if (unitsToDraw===null) {}
		else {
			for (let i = 0; i < 8; i++)	{
				unit_row = []
				for (let j = 0; j < 5; j++)
				{	
					if (unitsToDraw.length>unit_num) {
						unit_id = unitsToDraw[unit_num].id -1 				
						unit = {...allUnits[unit_id]}
						unit.count = unitsToDraw[unit_num].count
						unit_row.push(unit)
						unit_num++
					}
					else {break}
				}
				unit_rows.push(<Team_row key={i} units={unit_row} side={side} />)
			}
		}
	}
	else
	{
		console.log('true render')
		if (side=='defenders') {
			unit_rows = gacBattleData.battles.map((battle, index) => (<Team_row key={index} side='defenders'
				units={battle.defenders.filter(defender => defender > 0).map(defender => allUnits[defender - 1])} />))
		}
		else {
			unit_rows = gacBattleData.battles.map((battle, index) => (<Team_row key={index} side='attackers'
				wins={battle.wins} losses={battle.losses} avg_banners={battle.avg_banners} win_percent={battle.win_percent}
				units={battle.attackers.filter(attacker => attacker > 0).map(attacker => allUnits[attacker - 1])} />))
		}
	}
	
	return (
		<div className={styles}>
			{unit_rows}
		</div>
	);
};
