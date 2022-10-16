import { FunctionComponent } from "react";
import Attackers from "../components/attackers";
import Defenders from "../components/defenders";
import styles from "../styles/combats.module.css";
import { StaticDataContext } from "../contexts/static_data_context_provider";

const Combats: FunctionComponent = () => {
  return (
    <div className={styles.combatsDiv}>
      <Attackers />
      <Defenders />
    </div>
  );
};




// const Attackers_ = () => {
//   return(
//     <StaticDataContext.Consumer>
//       {({allUnits})=>{return (<Attackers key={allUnits.length} />)}}
//     </StaticDataContext.Consumer>
//   )
// }


export default Combats;