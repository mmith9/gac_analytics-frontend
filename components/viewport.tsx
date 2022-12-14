import { FunctionComponent } from "react";
import TopMenu from "./top-menu";
import DisplayPanel from "./display-panel";
import styles from "../styles/viewport.module.css";
import { useEffect } from "react";
import {UnitList} from '../type_defs/data_types'
import { useStaticData } from "../contexts/static_data_context_provider";
import Overlays from '../components/overlays'
import BottomMenu from "./bottom-menu";
import { useAppData } from "../contexts/app_data_context_provider";
import { apiUrl } from '../type_defs/settings'
import { StatLimit } from "../type_defs/data_classes";
const axios = require('axios').default;

function fetchT<T>(url:string):Promise<T> {
  return (fetch(url)
    .then(response => {
      //console.log(response)
      if (!response.ok) {throw(response.status)}
      return response.json() as Promise<T>
      })
    .catch(error => {
      console.log('log:', error.ok)
      throw error 
      })
  )
}

const Viewport = () => {
  const { allGacSeasons, allGacSeasonsStatus, allUnitStatus, setStatic } = useStaticData() //useContext(StaticDataContext)

  // original, working approach
  function getStatic<T>(current_status:string, url:string, variable_action:string, variable_status_action:string) {
    if ('unused'.search(current_status) >= 0) {
      //console.log(current_status)
      setStatic({type:variable_status_action, value:'pending'})
      //console.log('fetching ',variable_action)
      fetchT<T>(url)
      .then(
        (data) => {
          //console.log(data)
          setStatic({type:variable_action, value:data})
          setStatic({type:variable_status_action, value:'resolved'})
        }
      )
      .catch(
        (error) => {
          console.log('error? rejected?', error.status)
          setStatic({type:variable_status_action, value:'error'})
        }
      )      
    }
  }
  
  // refactor approach
async function getStaticT(current_status:string, url:string, variable_action:string, variable_status_action:string) {
    if ('unused'.search(current_status) >=0) {
      setStatic({type:variable_status_action, value:'pending'})
      //console.log('fetching', variable_action)
      try {
        const response = await fetch(url)
        const data = await (response.json())
        setStatic({type:variable_action, value:data})
        setStatic({type:variable_status_action, value:'resolved'})
      }
      catch(error) {
        console.log('error? rejected?', error)
        setStatic({type:variable_status_action, value:'error'})
      }  
    }
  }
 
  // both ways work
  //useEffect(()=>{getStaticT(allUnitStatus, apiUrl + 'characters', 'ALL_UNITS', 'ALL_UNITS_STATUS')})
  useEffect(()=>getStatic(allGacSeasonsStatus, apiUrl + 'gac_events', 'ALL_GAC_SEASONS', 'ALL_GAC_SEASONS_STATUS'))
  
  // third? way

  async function fetcher(url: string, variable_action: string)
  {
    //console.log('fetcher:', url)
    let response
    try { response = await axios.get(url) }
    catch (err)
    { console.log(err) }
    if (response)
    { const data = response.data
      setStatic({type:variable_action, value:data})
    }
  }
  const url = apiUrl + 'dictionaries'
  useEffect(() => { fetcher(url, 'ALL_DICTS') }, [])
  
  const {setAppData} = useAppData()
  useEffect(()=>{
    if (allGacSeasons.length>0) {setAppData({type:'CURRENT_GAC', value:allGacSeasons[0].season})}
  },[allGacSeasons, setAppData])


  return (
    <main className={styles.viewportMain}>
      <TopMenu />
      <DisplayPanel />
      <BottomMenu />
      <Overlays/>
    </main>
  );
};
 
export default Viewport;
export {fetchT}