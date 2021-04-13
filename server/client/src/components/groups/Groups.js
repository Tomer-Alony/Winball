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
import {Button, MenuItem, Select, TextField, Typography} from "@material-ui/core";

const padding = 20;
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color: '#ffffff'
        },
        groupCard: {
            height: `${window.innerHeight - 275}px`,
            spacing: 0,
            direction: 'column',
            backgroundColor: '#403f3f',
        },
        detailsCard: {
            padding: `${padding}px`,
            height: `${window.innerHeight - 130 - (padding * 2)}px`,
            backgroundColor: '#2b2b2b',
        },
        filtersCard: {
            paddingTop: "12px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginTop: "20px",
            marginBottom: "12px",
            borderRadius: 0,
            height: '100px',
            backgroundColor: '#403f3f',
            color: "#ffffff"
        },
        groupDetails: {
            color: "#ffffff"
        }
    }),
);

const Groups = () => {
    const [groupsData, setGroupsData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [playersMeta, setPlayersMeta] = useState(new Map());
    const [nameFilter, setNameFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [commanderFilter, setCommanderFilter] = useState("");

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

    const handleNameFilter = (e) => {
        setNameFilter(e?.target?.value);
    }

    const handleDescriptionFilter = (e) => {
        setDescFilter(e?.target?.value);
    }

    const handleCommanderFilter = (e) => {
        setCommanderFilter(e?.target?.value);
    }

    const handleGroupSelection = async (group) => {
        setSelectedGroup(group);
    }

    const handleFilter = async () => {
        const params = {};
        if (nameFilter) {
            params.name = nameFilter;
        }
        if (commanderFilter !== undefined) {
            params.commander = commanderFilter;
        }
        if (descFilter) {
            params.desc = descFilter;
        }
        const allGroupsPromise = await axios(
            '/api/groups/all',
            { params }
        );

        setGroupsData(allGroupsPromise.data);
        setSelectedGroup(allGroupsPromise.data[0]);
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
                                selectedGroup &&
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
                { !isLoading && !!selectedGroup
                    && <GroupDisplay group={selectedGroup} playersMeta={playersMeta} />
                }
            </div>
        );
    };

    const renderFiltersLayout = () => {
        return <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5">Filter your group by</Typography>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{paddingRight: '16px'}}>
                    <TextField onChange={handleNameFilter} style={{borderRadius: '4px', padding: '8px', backgroundColor: 'lightgrey'}} placeholder="Name"/>
                </div>
                <div style={{paddingRight: '16px'}}>
                    <TextField onChange={handleDescriptionFilter} style={{borderRadius: '4px', padding: '8px', backgroundColor: 'lightgrey'}} placeholder="Description"/>
                </div>
                <div style={{paddingRight: '16px'}}>
                    <Select
                        style={{borderRadius: '4px', padding: '8px', height:"48px", backgroundColor: 'lightgrey'}}
                        onChange={handleCommanderFilter}
                        variant="outlined"
                    >
                        <MenuItem value={undefined}>Is Mannager?</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justify: 'end'}} >
                    <Button color="primary" style={{backgroundColor:"lightgrey"}} onClick={handleFilter}>Filter</Button>
                </div>
            </div>
        </div>;
    }

    const renderLayout = () => {
        return (
            <Grid container spacing={1} alignItems="stretch">
                <Grid item lg={3} xl={3}>
                    <Card className={classes.filtersCard}>
                        {renderFiltersLayout()}
                    </Card>
                    <Card className={classes.groupCard}>
                        {renderGroupsLayout()}
                    </Card>
                </Grid>
                <Grid item lg={9} xl={9}>
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