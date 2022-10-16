import { FunctionComponent } from "react";
import MenuLeft from "../components/menu-left";
import MenuCenter from "../components/menu-center";
import MenuRight from "../components/menu-right";
import styles from "../styles/top-menu.module.css";


const TopMenu: FunctionComponent = () => {
  return (
    <div className={styles.topMenuDiv}>
      <MenuLeft />
      <MenuCenter />
      <MenuRight />
    </div>
  );
};

export default TopMenu;
