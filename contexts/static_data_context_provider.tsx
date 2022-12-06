import { createContext, ReactNode, useReducer ,useContext, useState, ReducerWithoutAction } from "react";
import { Unit, Zuo, DcMechanic, UnitStat, DcStat } from "../type_defs/data_classes";

import { GacSeasonList, UnitList } from "../type_defs/data_types";



interface StaticDataInterface {
  allUnits:UnitList,
  allGacSeasons: GacSeasonList,
  allUnitStatus:string,
  allGacSeasonsStatus:string,
  unit_dict: Unit[];
  zuo_dict: Zuo[];
  dc_mc_dict: DcMechanic[];
  unit_stat_dict: UnitStat[];
  dc_stat_dict: DcStat[];
  setStatic: React.Dispatch<Action>,
}

const warnNoContext = () => console.warn('no static context provider')
const empty_specimen:StaticDataInterface = {
  allUnits:[],
  allGacSeasons: [],
  allUnitStatus:'unused',
  allGacSeasonsStatus:'unused',
  unit_dict: [],
  zuo_dict: [],
  dc_mc_dict: [],
  unit_stat_dict: [],
  dc_stat_dict: [],
  setStatic:warnNoContext,

}

const StaticDataContext = createContext(empty_specimen)
StaticDataContext.displayName = 'StaticDataProvider Context'

interface Action {
  type:string,
  value?:any
}

function staticDataReducer(state:StaticDataInterface, action:Action):StaticDataInterface {
  //console.log('entered reducer ', action)
  switch (action.type) {
    case 'ALL_UNITS': {
      //console.log('reducer all units: ', action.value)
      return { ...state, allUnits: action.value };
    }
    case 'ALL_UNITS_STATUS':{
      return {...state, allUnitStatus: action.value}
    }
    case 'ALL_GAC_SEASONS': {
      //console.log('reducer all units: ', action.value)
      return { ...state, allGacSeasons: action.value };
    }
    case 'ALL_GAC_SEASONS_STATUS':{
      return {...state, allGacSeasonsStatus: action.value}
    }
     case 'ALL_DICTS': {
      const newState = {...state}
      newState.unit_dict = action.value.unit_dict
      newState.zuo_dict = action.value.zuo_dict
      newState.dc_mc_dict = action.value.dc_mc_dict
      newState.unit_stat_dict = action.value.unit_stat_dict 
      newState.dc_stat_dict = action.value.dc_stat_dict
      //console.log(newState)
      return newState
    }
    

    default:{
      return state
    }
  }
}

function StaticDataContextProvider({ children }: { children: ReactNode; }): JSX.Element {

  const [StaticInit, dispatch] = useReducer(staticDataReducer, empty_specimen);
  const value = { ...StaticInit, setStatic: dispatch };

  return (
    <StaticDataContext.Provider value={value}>
      {children}
    </StaticDataContext.Provider>
  );
}

function useStaticData(): StaticDataInterface {
  return useContext(StaticDataContext);
}

export {StaticDataContext, StaticDataContextProvider, useStaticData}

