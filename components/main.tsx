import { FunctionComponent } from "react";
import Combats from "../components/combats";
import styles from "../styles/main.module.css";
import SidePanel from "./side_panel";
const Main: FunctionComponent = () => {
  return (
    <div className={styles.mainDiv}>

      <SidePanel side='attackers' />
      <Combats />
      <SidePanel side='defenders' />
      
    </div>
  );
};

export default Main;
