import { FunctionComponent, useState, useCallback, MouseEvent } from "react";
//import Modals11 from "../components/modals11";
//import PortalPopup from "../components/portal-popup";
import styles from "../styles/menu-center.module.css";
import {Button, Menu, MenuItem, Box, List, ListItem ,ListItemText} from '@mui/material'
import { useStaticData } from "../contexts/static_data_context_provider";
import { useAppData } from "../contexts/app_data_context_provider";


const MenuCenter: FunctionComponent = () => {

  const {allGacSeasons} = useStaticData()
  const {setAppData} = useAppData()
  //console.log('gac seasons ',allGacSeasons)

  const gac_list:JSX.Element[] = []
  const options:string[]=[]

  for (let i = 0;i<allGacSeasons.length;i++){
    let rounds=allGacSeasons[i].rounds[0]+''
    for (let j = 1; j<allGacSeasons[i].rounds.length; j++) {rounds+=' '+allGacSeasons[i].rounds[j]}
    options.push(
      'Season '+allGacSeasons[i].season+'. Rounds '+rounds
      // <MenuItem onClick={} key={i}>
      //   Season {allGacSeasons[i].season}. Rounds {rounds} 
      // </MenuItem>

    )    
  }
  
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLElement>,
      index: number,
    ) => {
      setSelectedIndex(index);
      console.log(index)
      setAnchorEl(null);
      setAppData({type:'CURRENT_GAC', value:index})

    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className={styles.menuCenterDiv}>
        <Box flex='1' display='flex' align-self='stretch' flex-direction='row' justify-content='center'>
        <List 
          component="nav"
          //aria-label="Device settings"
          sx={{ bgcolor: 'background.paper' }}
        >
          <ListItem align-self='stretch' 
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="Select Gac season"
              secondary={options[selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        </Box>
      </div>
    );
  }




export default MenuCenter

// flex: 1;
// align-self: stretch;
// display: flex;
// flex-direction: row;
// padding: var(--padding-lg) var(--padding-2xl);
// box-sizing: border-box;
// align-items: center;
// justify-content: center;
// cursor: pointer;
// text-align: right;
// font-size: var(--paragraph-small-normal-size);
// color: var(--color-black);
// font-family: var(--paragraph-small-normal);