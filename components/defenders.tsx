import { FunctionComponent } from "react";
import styles from "../styles/defenders.module.css";
import { useStaticData } from "../contexts/static_data_context_provider";
import { UnitList } from "../type_defs/data_types";
import Team_row from "./team_row";
import { useAppData } from "../contexts/app_data_context_provider";

const Defenders: FunctionComponent = () =>
{
	console.log('defenders render')
	const { gacBattleData } = useAppData()
	const { allUnits } = useStaticData()

	let unit_rows: JSX.Element[] = []
	let unit_row: UnitList = []

	if (allUnits.length == 0) { if (allUnits.length == 0) { console.log('no render') ;return (<div className={styles.defendersDiv} />) } }
	if (gacBattleData.battles.length == 0)
	{
		console.log('D random render')
		for (let i = 0; i < 5; i++)
		{
			unit_row = []
			for (let j = 0; j < 5; j++)
			{
				let rnd = Math.floor(Math.random() * allUnits.length)
				unit_row.push(allUnits[rnd])
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

export default Defenders;
