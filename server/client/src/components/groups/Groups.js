import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import ImageIcon from '@material-ui/icons/Image';
import GroupDisplay from './GroupDisplay/GroupDisplay';

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
    const [groupsData, setGroupsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/api/groups/all',
            );

            await setGroupsData(result.data);
            await setSelectedGroup(result.data[0]);
            setIsLoading(false);
        };

        if(isLoading) fetchData();
    });

    const classes = useStyles();

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
    }

    const renderGroupsLayout = () => {
        return (
            <List className={classes.root}>
                { isLoading
                    ? <CircularProgress />
                    : groupsData.map(group => {
                        return (
                            <ListItem
                                button
                                key={group._id}
                                selected={group._id === selectedGroup._id}
                                onClick={() => handleGroupSelection(group)}
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
                { !isLoading
                    ? <GroupDisplay group={selectedGroup} />
                    : ''
                }
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