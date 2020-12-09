import React, {useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import GroupItem from './GroupItem/GroupItem';


const groupsfakedata = [
    {
        id: 1,
        name: 'MyGroup',
        description: 'This is my group'
    },
    {
        id: 2,
        name: 'SitonIsGay',
        description: 'He is gay as fuck'
    },
    {
        id: 3,
        name: 'Losers',
        description: 'A group for losers'
    },
    {
        id: 4,
        name: 'Champions',
        description: 'Champions leage group'
    },
]

const padding = 20;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        flexGrow: 1,
    },
    groupCard: {
        height: `${window.innerHeight - 80}px`,
        spacing: 0,
        direction: 'column',
    },
    detailsCard: {
        padding: `${padding}px`,
        height: `${window.innerHeight - 80 - (padding * 2)}px`,
    }
  }),
);

const Groups = () => {
    const [selectedGroup, setSelectedGroup] = useState(groupsfakedata[0]);

    const classes = useStyles();

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
    }

    const renderGroupsLayout = () => {
        return (
            <List className={classes.root}>
                {
                    groupsfakedata.map(group => {
                        return (
                            <ListItem 
                                button 
                                key={group.id}
                                selected={group.id === selectedGroup.id}
                                onClick={()=>handleGroupSelection(group)}
                            >
                                    <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={group.name} 
                                        secondary={group.description} 
                                    />
                            </ListItem>
                        )
                    })
                }
                
                
            </List>
        );
    };

    const renderGroupsDetailsLayout = () => {
        return (
            <div>
                {/* <Typography variant="h4">{selectedGroup.name}</Typography> */}
                <GroupItem group={selectedGroup} />
            </div>
        );
    };

    const renderLayout = () => {
        return (
            <Grid container spacing={1} alignItems="stretch">
                <Grid item lg={2} xl={2}>
                    <Card className={classes.groupCard}>
                        {renderGroupsLayout()}
                    </Card>
                </Grid>
                <Grid item lg={10} xl={10}>
                    <Card className={classes.detailsCard}>
                        {renderGroupsDetailsLayout()}
                    </Card>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className={classes.root}>
            {renderLayout()}
        </div>
    )    
}

export default Groups;