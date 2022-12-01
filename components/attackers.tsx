import { FunctionComponent, useEffect, useState } from "react";
import styles from "../styles/attackers.module.css";
import Team_row from './team_row'
import { useStaticData } from "../contexts/static_data_context_provider";
import { UnitList } from '../type_defs/data_types'
import { useAppData } from "../contexts/app_data_context_provider";
import { PORow, Unit } from "../type_defs/data_classes";
const axios = require('axios').default;

const Attackers: FunctionComponent = () =>
{
	console.log('attackers render')
	const { gacBattleData, currentGac } = useAppData()
	const { allUnits } = useStaticData()
	const [attLeaders, setAttLeaders] = useState<[PORow]|null>(null)

	let unit_rows: JSX.Element[] = []
	let unit_row: UnitList = []
	let unit:Unit
	let current_gac:number

	if (currentGac>0) {current_gac = currentGac}
	else {current_gac = 32}

	const url = 'http://192.168.2.205:8000/precalcs/?season=' + current_gac + '&item_type=att_lead'

	async function fetcher(url:string) {const response = await axios.get(url); setAttLeaders(response.data.payload)}
	useEffect(()=>{fetcher(url)},[url])

	let leader_num = 0
	if (allUnits.length === 0 || attLeaders===null) { console.log('no render'); return (<div className={styles.attackersDiv} />) }
	if (gacBattleData.battles.length == 0) {
		console.log('A ordered render')
		for (let i = 0; i < 8; i++) {
			unit_row = []
			for (let j = 0; j < 5; j++){
				if (attLeaders[leader_num]) {
					unit={...allUnits[attLeaders[leader_num].id -1 ]}
					unit.count = attLeaders[leader_num].count					
					unit_row.push(unit)
					leader_num++
				}
			}
			unit_rows.push(<Team_row key={i} units={unit_row} side='attackers' />)
		}
	}
	else
	{
		console.log('A true render')
		unit_rows = gacBattleData.battles.map((battle, index) => (<Team_row key={index} side='attackers'
			wins={battle.wins} losses={battle.losses} avg_banners={battle.avg_banners} win_percent={battle.win_percent}
			units={battle.attackers.filter(attacker => attacker > 0).map(attacker => allUnits[attacker - 1])} />))
	}

	return (
		<div className={styles.attackersDiv}>
			{unit_rows} 
		</div>
	);
};

export default Attackers;
