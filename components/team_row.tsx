import {UnitList} from '../type_defs/data_types'
import Unit_avatar from './unit_avatar'
import styles_attackers from "../styles/combat-row-left1.module.css";
import styles_defenders from "../styles/combat-row1-right.module.css";
import { useAppData } from '../contexts/app_data_context_provider';
import { addUnitToTeam, copyTeam } from '../type_defs/gac_objects';
import { useStaticData } from '../contexts/static_data_context_provider';


const Team_row = ({units, side}:{units:UnitList, side:string}) => {
    const {attackerTeam, defenderTeam, setAppData} = useAppData()
    const {allUnits} = useStaticData()

    const handleClick = (key: string, side_:string) => {
        console.log('list item click ', key)
        const newUnit = allUnits.filter((unit) => (unit.base_id == key))[0]
        console.log(newUnit)
        switch (side_){
            case 'defenders': {
                let newTeam = copyTeam(defenderTeam)
                newTeam = addUnitToTeam(newUnit, newTeam)
                console.log('added unit to team', newTeam)
                setAppData({ type: 'DEFENDER_TEAM', value: newTeam })
                break
            }
            case 'attackers': {
                let newTeam = copyTeam(attackerTeam)
                newTeam = addUnitToTeam(newUnit, newTeam)
                setAppData({ type: 'ATTACKER_TEAM', value: newTeam })
                break
            }
            default: { console.error('wrong side ', side) }
        }
    }

    const row = units ? units.map((unit, index) =>
        (<Unit_avatar onClick={() => (handleClick(unit.base_id, side))} key={unit.base_id + index} unit={units[index]} leader={index == 0} />)) : []

    let styles
    if (side==='attackers') {styles=styles_attackers.combatRow1Left}
    else {styles=styles_defenders.combatRow1Right}

    return (
        <div className={styles}>
        {row}
        </div>
    )
}

export default Team_row
