import React from 'react';
// import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/esm/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { StyledMenu, StyledMenuItem } from '../../styles/MenuStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../Login/AuthApi';

export default function MainMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenuButtonClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleLogOut = () => {
        logOut();
        sessionStorage.removeItem("loggedUser");
    };
  
    return (
      <div className="vertical-center">
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleMenuButtonClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <StyledMenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="התנתקו" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  }