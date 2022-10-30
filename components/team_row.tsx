import {UnitList} from '../type_defs/data_types'
import Unit_avatar from './unit_avatar'
import styles_attackers from "../styles/combat-row-left1.module.css";
import styles_defenders from "../styles/combat-row1-right.module.css";
import { useAppData } from '../contexts/app_data_context_provider';
import { addUnitToTeam, copyTeam } from '../type_defs/gac_objects';
import { useStaticData } from '../contexts/static_data_context_provider';
import { Box, Button, IconButton, Stack } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag'


const Team_row = ({units, side, wins=0, losses=0, avg_banners=0, win_percent=0 }:
    {units: UnitList, side: string, wins?:number, losses?:number, avg_banners?:number, win_percent?:number }) => {

    const {attackerTeam, defenderTeam, gacBattleData ,setAppData} = useAppData()
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
        (<IconButton key={unit.base_id + index} onClick={
            () => (handleClick(unit.base_id, side))} > <Unit_avatar key={unit.base_id + index} 
            unit={unit} leader={index == 0} /> </IconButton>)) : []

    let styles
    let stats = null
    if (side === 'defenders') {styles = styles_defenders.combatRow1Right}
    else {styles = styles_attackers.combatRow1Left
        if (gacBattleData.battles.length !== 0) {
            stats = (<>
                <Box sx={{padding: '15px', fontSize: 'medium' }}> <strong>Seen</strong><br/>{wins+losses}  </Box> 
                <Box sx={{padding: '0px', fontSize: 'medium' }}><strong>win %</strong><br />{win_percent}  </Box>
                <Box sx={{padding: '10px', fontSize: 'medium'}}> <strong>avg</strong> <FlagIcon sx={{fontSize:'16px'}} /><br/>{avg_banners}  </Box>
            </>)
        }
    }
    
    return (
        <div className={styles}>
        {row} {stats}
        </div>
    )
}

export default Team_row
