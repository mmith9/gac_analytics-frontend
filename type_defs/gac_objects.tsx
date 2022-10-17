import { Team, Unit } from "./data_classes";

export function addUnitToTeam(newUnit:Unit, team:Team|null) {
    if (team===null) {team = {leader : newUnit, members:[newUnit]}; return team}
    if (team.members.length >=5) {console.log('team allready full ',team); return team}
    if (team.members.includes(newUnit)) {console.log('unit already in team'); return team}
    team.members.push(newUnit); return team
}

export function removeUnitFromTeam(unitToRm:Unit, team:Team | null ) {
    if (team === null) {console.warn('team allready null'); return team}
    if (team.members.length === 1 && team.members[0] === unitToRm) {team = null; return team}
    if (team.members.includes(unitToRm) && team.members[0] !== unitToRm) 
        {team.members = team.members.filter((unit) => unit!==unitToRm); return team}
    console.warn('uexpected case of remove unit from team ', unitToRm, team)   
}

export function copyTeam(team:Team|null):Team|null {
    if (team === null) {return null}
    return {...team}
}