import { FunctionComponent } from "react";
import Main from "../components/main";
import styles from "../styles/display-panel.module.css";

const DisplayPanel: FunctionComponent = () => {
  return (
    <div className={styles.displayPanelDiv}>
      <Main />
    </div>
  );
};

export default DisplayPanel;
