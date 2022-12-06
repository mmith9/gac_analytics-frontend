import { createContext, ReactNode, useContext, useReducer} from "react";
import {DatacronCC, GacBattleData, Team, TeamCC} from '../type_defs/data_classes'

interface Action {
  type:string,
  value?:any
}

import {DatacronDialogProps, datacronDialogProps_init, AddUnitDialogProps, addUnitDialogProps_init, TeamDialogProps_init, TeamDialogProps} from '../type_defs/dialogs'

interface AppDataInterface {
  currentGac:number,
  defenderTeam:TeamCC |null,
  attackerTeam:TeamCC |null,
  setAppData: React.Dispatch<Action>,
  unitDialogProps: AddUnitDialogProps,
  datacronDialogProps: DatacronDialogProps,
  teamDialogProps: TeamDialogProps,
  gacBattleData: GacBattleData,
  defenderDC: DatacronCC |null,
  attackerDC: DatacronCC |null
}

const warnNoContext = () => console.warn('no app_data provider')
const empty_specimen:AppDataInterface={
  currentGac:0,
  defenderTeam:null,
  attackerTeam:null,
  setAppData:warnNoContext,
  datacronDialogProps: datacronDialogProps_init,
  unitDialogProps: addUnitDialogProps_init,
  teamDialogProps: TeamDialogProps_init,
  gacBattleData: {battles:[]},
  defenderDC: null,
  attackerDC: null
}

function appDataReducer(state:AppDataInterface, action:Action):AppDataInterface {
  //console.log('entered reducer ', action)
  switch (action.type) {
    case 'CURRENT_GAC': {
      //console.log('reducer all units: ', action.value)
      return { ...state, currentGac: action.value };
    }
    case 'DEFENDER_TEAM':{
      return {...state,defenderTeam : action.value}
    }
    case 'ATTACKER_TEAM':{
      return {...state,attackerTeam : action.value}
    }
    case 'UNIT_DIALOG':{
      return {...state,unitDialogProps : action.value}
    }
    case 'DATACRON_DIALOG': {
      return { ...state, datacronDialogProps: action.value }
    }
    case 'TEAM_DIALOG': {
      return { ...state, teamDialogProps: action.value }
    }
    case 'GAC_BATTLE_DATA': {
      return { ...state, gacBattleData: action.value }
    }
    case 'DEFENDER_DC': {
      return { ...state, defenderDC: action.value }
    }
    case 'ATTACKER_DC': {
      return { ...state, attackerDC: action.value }
    }
    default:{
      return state
    }
  }
}

const AppDataContext = createContext<AppDataInterface>(empty_specimen)
const AppDataContextProvider = ({children}:{children:ReactNode}) => {

  const [initValue, dispatch] = useReducer(appDataReducer, empty_specimen)
  return (
    <AppDataContext.Provider value={{...initValue, setAppData:dispatch}}>
      {children}
    </AppDataContext.Provider>
  )
}

const useAppData = () => {return useContext<AppDataInterface>(AppDataContext)}
export {AppDataContext, AppDataContextProvider, useAppData}
