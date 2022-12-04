import { FunctionComponent } from "react";

import {Teams} from "./teams";
import styles from "../styles/combats.module.css";


const Combats: FunctionComponent = () => {
  return (
    <div className={styles.combatsDiv}>
      <Teams side='attackers' />
      <Teams side='defenders' />
    </div>
  );
};



export default Combats;