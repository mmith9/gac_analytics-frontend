import { FunctionComponent, useEffect, useState } from "react";
import styles from "../styles/defenders.module.css";
import { useStaticData } from "../contexts/static_data_context_provider";
import { UnitList } from "../type_defs/data_types";
import Team_row from "./team_row";
import { useAppData } from "../contexts/app_data_context_provider";

import { PORow, PrecalcObject, Unit } from "../type_defs/data_classes";
const axios = require('axios').default;


export const Defenders = () =>{
	//console.log('defenders render')
	const { gacBattleData, currentGac, setAppData} = useAppData()
	const { allGacSeasons ,allUnits } = useStaticData()
	const [defLeaders, setdefLeaders] = useState<[PORow] | null>(null)

	async function fetcher(url: string)
	{
		console.log('fetcher:', url)
		let response
		try {
			response = await axios.get(url)
		}
		catch (err) {
			console.log(err)
		}
		//console.log(response)
		const data = response.data.payload
		setdefLeaders(data)
	}

	let unit_rows: JSX.Element[] = []
	let current_season:number
	
	if (currentGac !=0) {current_season = currentGac}
	else (current_season = 32)
	
	const url = 'http://192.168.2.205:8000/precalcs/?season=' + current_season + '&item_type=def_lead'
	//console.log(url)
	useEffect(() => { fetcher(url)},[url])
	
	//console.log(defLeaders)
	if (allUnits.length === 0 || defLeaders === null) { console.log('no render') ;return (<div className={styles.defendersDiv} />) } 

	if (gacBattleData.battles.length === 0)
	{
		let unit_row: UnitList
		let unit: Unit
		let unit_id:number
	
		console.log('D ordered render')

		let leader_num = 0
		for (let i = 0; i < 8; i++)
		{
			unit_row = []
			for (let j = 0; j < 5; j++)
			{	
				if (defLeaders[leader_num]) {
					unit_id = defLeaders[leader_num].id -1 				
					unit = {...allUnits[unit_id]}
					unit.count = defLeaders[leader_num].count
					
					unit_row.push(unit)
					leader_num++
				}
			}
			unit_rows.push(<Team_row key={i} units={unit_row} side='defenders' />)
		}
	}
	else
	{
		console.log('D true render')
		unit_rows = gacBattleData.battles.map((battle, index) => (<Team_row key={index} side='defenders'
			units={battle.defenders.filter(defender => defender > 0).map(defender => allUnits[defender - 1])} />))
	}
	
	
	
	return (
		<div className={styles.defendersDiv}>
			{unit_rows}
		</div>
	);
};
