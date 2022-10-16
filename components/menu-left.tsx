import { FunctionComponent } from "react";
import styles from "../styles/menu-left.module.css";
import {Paper} from "@mui/material"

const MenuLeft: FunctionComponent = () => {
  return (
    <div className={styles.menuLeftDiv}>

      <div className={styles.addAttackerUnits}>Add attacker units</div>
    </div>
  );
};

export default MenuLeft;
