import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
  const MutiItem = ({title ,itemArray}) =>{

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

    return (
    <div>
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
            <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={title}/>
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={open} timeout="auto" unmountOnExit>
             {
                itemArray.map((arr , index) =>(
                  <List component="nav" disablePadding key={arr.name}>
                    <Link to={arr.path} style={{ textDecoration: 'none' ,color: 'inherit'}}>
                          <ListItem button className={classes.nested} key = {arr.name}>
                              <ListItemIcon key={arr.name}>
                                  {arr.icon}
                              </ListItemIcon>
                              <ListItemText key={index} primary= {arr.name}/>
                          </ListItem>
                      </Link>
                   </List>  
                 ))
             } 
        </Collapse>
      </div>
    )
}

export default MutiItem;
