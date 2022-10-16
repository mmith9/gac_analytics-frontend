import { FunctionComponent } from "react";
import styles from "../styles/attackers.module.css";
import Team_row from './team_row'
import { useStaticData } from "../contexts/static_data_context_provider";
import { UnitList } from '../type_defs/data_types'
import { useAppData } from "../contexts/app_data_context_provider";

const Attackers: FunctionComponent = () =>
{
	console.log('attackers render')
	const { gacBattleData } = useAppData()
	const { allUnits } = useStaticData()

	let unit_rows: JSX.Element[] = []
	let unit_row: UnitList = []

	if (allUnits.length == 0) { console.log('no render'); return (<div className={styles.attackersDiv} />) }
	if (gacBattleData.battles.length == 0) {
		console.log('A random render')
		for (let i = 0; i < 5; i++) {
			unit_row = []
			for (let j = 0; j < 5; j++)
			{
				let rnd = Math.floor(Math.random() * allUnits.length)
				unit_row.push(allUnits[rnd])
			}
			unit_rows.push(<Team_row key={i} units={unit_row} side='attackers' />)
		}
	}
	else
	{
		console.log('A true render')
		unit_rows = gacBattleData.battles.map((battle, index) => (<Team_row key={index} side='attackers'
			units={battle.attackers.filter(attacker => attacker > 0).map(attacker => allUnits[attacker - 1])} />))
	}

	return (
		<div className={styles.attackersDiv}>
			{unit_rows}
		</div>
	);
};

export default Attackers;

