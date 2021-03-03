import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import ImageIcon from '@material-ui/icons/Image';
import GroupDisplay from './GroupDisplay/GroupDisplay';
import AddGroupDialog from './GroupDisplay/AddGroupDialog';
import EditGroupDialog from './EditGroup/EditGroupDialog';

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
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [playersMeta, setPlayersMeta] = useState(new Map());

    useEffect(async () => {
        const allGroupsPromise = await axios(
            '/api/groups/all',
        );

        setGroupsData(allGroupsPromise.data);
        setSelectedGroup(allGroupsPromise.data[0]);
    }, []);

    useEffect(async () => {
        if (selectedGroup) {
            const playersMetaPromise = await axios(
                '/api/players/', {
                method: 'POST',
                data: {
                    playersIds: selectedGroup.players.map((currPlayer) => {
                        return currPlayer.playerId;
                    })
                }
            });

            var playersMap = new Map();
            await playersMetaPromise.data.map(player => {
                playersMap.set(player._id, player);
            });
            setPlayersMeta(playersMap);
            setIsLoading(false);
        }
    }, [selectedGroup])

    const classes = useStyles();

    const handleGroupSelection = async (group) => {
        setSelectedGroup(group);
    }

    const handleNewGroup = (newGroup) => {
        var newGroupsData = [...groupsData];
        newGroupsData.push(newGroup);
        setGroupsData(newGroupsData);
        setIsLoading(true);
    }

    const handleEditMode = (toggle) => {
        setIsEditMode(toggle);
    }

    const handleUpdatedGroup = (updatedGroup) => {
        updatedGroup.isManager = true;
        const updatedGroups = groupsData.map(currGroup => {
            return currGroup._id === updatedGroup._id ? updatedGroup : currGroup;
        })

        setGroupsData(updatedGroups);
        setSelectedGroup(updatedGroup);
    }

    const renderGroupsLayout = () => {
        return (
            <>
                <AddGroupDialog handleNewGroup={handleNewGroup} />
                <EditGroupDialog isOpen={isEditMode}
                    handleIsOpen={handleEditMode}
                    group={selectedGroup}
                    handleUpdatedGroup={handleUpdatedGroup} />
                <List className={classes.root}>
                    {isLoading
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
                                    {group.isManager
                                        ? <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditMode(!isEditMode)}>
                                                <EditIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        : ''}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </>
        );
    };

    const renderGroupsDetailsLayout = () => {
        return (
            <div>
                { !isLoading
                    && <GroupDisplay group={selectedGroup} playersMeta={playersMeta} />
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