import { DatacronCC, Team, Unit } from "./data_classes";

export function addUnitToTeam(newUnit: Unit, team: Team | null) {
    let newTeam=copyTeam(team)
    if (newTeam===null) {newTeam = {leader : newUnit, members:[newUnit]}; return newTeam}
    if (newTeam.members.length >=5) {console.log('newTeam allready full ',newTeam); return newTeam}
    if (newTeam.members.includes(newUnit)) {console.log('unit already in newTeam'); return newTeam}
    newTeam.members.push(newUnit); return newTeam
}

export function removeUnitFromTeam(unitToRm: Unit, team: Team | null) {
    let newTeam = copyTeam(team)
    if (newTeam === null) {console.warn('newTeam allready null'); return newTeam}
    if (newTeam.members.length === 1 && newTeam.members[0] === unitToRm) {newTeam = null; return newTeam}
    if (newTeam.members.includes(unitToRm) && newTeam.members[0] !== unitToRm) 
        {newTeam.members = newTeam.members.filter((unit) => unit!==unitToRm); return newTeam}
    console.warn('uexpected case of remove unit from newTeam ', unitToRm, newTeam)   
}

export function copyTeam(team: Team | null):Team|null {
    if (team === null) {return null}
    return {...team}
}

export function addDatacronToTeam(datacron:DatacronCC, team: Team | null)
{
    let newTeam = copyTeam(team)
    if (newTeam === null) { console.log('cant add dc to empty newTeam') ; return null }
    newTeam.datacron=datacron; return newTeam
}