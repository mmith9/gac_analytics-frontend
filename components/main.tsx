import { FunctionComponent } from "react";
import LeftPanel from "../components/left-panel";
import Combats from "../components/combats";
import RightPanel from "../components/right-panel";
import styles from "../styles/main.module.css";
import {Paper} from "@mui/material"
const Main: FunctionComponent = () => {
  return (
    <div className={styles.mainDiv}>

      <LeftPanel />
      <Combats />
      <RightPanel />
      
    </div>
  );
};

export default Main;
