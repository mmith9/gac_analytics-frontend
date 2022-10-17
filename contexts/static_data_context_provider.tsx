import { createContext, ReactNode, useReducer ,useContext, useState, ReducerWithoutAction } from "react";
import { PopularLeaders } from "../type_defs/data_classes";

import { GacSeasonList, UnitList } from "../type_defs/data_types";

interface StaticDataInterface {
  allUnits:UnitList,
  allGacSeasons: GacSeasonList,
  allUnitStatus:string
  allGacSeasonsStatus:string,
  setStatic: React.Dispatch<Action>,
  popularLeaders:PopularLeaders | null,
  popularLeadersStatus:string
}

const warnNoContext = () => console.warn('no static context provider')
const empty_specimen:StaticDataInterface = {
  allUnits:[],
  allGacSeasons: [],
  allUnitStatus:'unused',
  allGacSeasonsStatus:'unused',
  setStatic:warnNoContext,
  popularLeaders:null,
  popularLeadersStatus:'unused'
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
    case 'POPULAR_LEADERS': {
      return { ...state, popularLeaders: action.value }
    }
    case 'POPULAR_LEADERS_STATUS': {
      return { ...state, popularLeadersStatus: action.value }
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

