import { createContext, ReactNode, useContext, useReducer} from "react";
import {GacBattleData, Team} from '../type_defs/data_classes'

interface Action {
  type:string,
  value?:any
}

import {UnitDialogProps, unitDialogProps_init} from '../components/unit_dialog'

interface AppDataInterface {
  currentGac:number |null,
  defenderTeam:Team |null,
  attackerTeam:Team |null,
  setAppData: React.Dispatch<Action>,
  unitDialogProps: UnitDialogProps,
  gacBattleData: GacBattleData
}

const warnNoContext = () => console.warn('no app_data provider')
const empty_specimen:AppDataInterface={
  currentGac:0,
  defenderTeam:null,
  attackerTeam:null,
  setAppData:warnNoContext,
  unitDialogProps: unitDialogProps_init,
  gacBattleData: {battles:[]}
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
    case 'GAC_BATTLE_DATA': {
      return { ...state, gacBattleData: action.value }
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
