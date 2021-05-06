import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';

const SingleItem = ({title , path ,styleIcon}) => {
    return (
    <div>
         <Link to={path} style={{ textDecoration: 'none' ,color: 'inherit'}}>
            <ListItem button>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
            <ListItemText primary={title} />
            </ListItem>
        </Link> 
    </div>
    )
}

export default SingleItem

