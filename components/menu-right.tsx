import { FunctionComponent } from "react";
import styles from "../styles/menu-right.module.css";

const MenuRight: FunctionComponent = () => {
  return (
    <div className={styles.menuRightDiv}>
      <div className={styles.addDefenderUnits}>Add defender units</div>
    </div>
  );
};

export default MenuRight;
