import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2'
import TextField from '@material-ui/core/TextField';
import DataSelection from '../GroupDisplay/AddGroupForm/DataSelection';

import { Group } from '../../../modles/Group';


interface EditGroupProps {
    isOpen: boolean,
    handleIsOpen: (toggle: boolean) => void,
    group: Group,
    handleUpdatedGroup: (group: Group) => void
}

interface EditGroupState {
}

const styles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
}));

export default function UserData(props: EditGroupProps, state: EditGroupState) {
    const { isOpen, handleIsOpen, group, handleUpdatedGroup } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [players, setPlayers] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [leaguesData, setLeaguesData] = useState([]);
    const [loggedUser, setLoggedUser] = useState(null);

    const classes = styles();

    useEffect(() => {
        const fetchData = async () => {
            const playersPromise = axios.get(
                '/api/players/all',
            );
            const leaguesPromise = axios.get(
                '/api/leagues/'
            )
            const loggedUserPromise = axios.get('/api/current_user');

            const responses = await axios.all([playersPromise,
                leaguesPromise,
                loggedUserPromise]);

            if (responses.length === 3) {
                setUsersData(responses[0].data.filter(user => user._id !== responses[2].data._id));
                setLeaguesData(responses[1].data);
                setLoggedUser(responses[2].data);
                setName(group.name);
                setDesc(group.description);
                setPlayers(group.players);
                setLeagues(group.leaguesIds);
                setIsLoading(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! We couldn`t fetch groups data',
                    footer: 'Please try again later'
                })
            }

        };

        if (isLoading && isOpen) fetchData();
    });

    const handlePlayers = (players) => {
        setPlayers(players);
    }

    const handleLeagues = (leagues) => {
        setLeagues(leagues);
    }


    const handleSave = async () => {
        const newPlayers = players.map(player => {
            return player._id.toString();
        });
        newPlayers.push(loggedUser._id);
        const originPlayers = group.players.map(player => {
            return player.playerId.toString();
        })

        const updatedPlayers = group.players.filter(player => {
            return (player.playerId.toString() === loggedUser._id ||
                newPlayers.includes(player.playerId.toString()));
        });

        newPlayers.map(player => {
            if (!originPlayers.includes(player)) {
                updatedPlayers.push({
                    playerId: player,
                    bullseye: 0,
                    points: 0,
                    side: 0,
                    games: 0
                });
            }
        })

        const resp = await axios.put('/api/groups/', {
            updatedGroup: {
                players: updatedPlayers,
                leaguesIds: leagues,
                name: name,
                manager_id: loggedUser._id,
                description: desc,
                _id: group._id
            }
        })

        handleIsOpen(false);

        if (resp.status === 200) {
            Swal.fire(
                'We have a win!',
                'Your group has been successfully updated.',
                'success'
            )

            handleUpdatedGroup(resp.data);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! We couldn`t add a new group',
                footer: 'Please try again later'
            })
        }
    }

    return (
        <>
            <Dialog open={isOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new group</DialogTitle>
                <DialogContent>
                    {
                        isLoading
                            ? <CircularProgress />
                            :
                            <form className={classes.root}>
                                <TextField id="standard-required"
                                    label='Group Name'
                                    autoFocus={true}
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)}
                                />
                                <TextField id="standard-required"
                                    label='Group Description'
                                    value={desc}
                                    onChange={(e) =>
                                        setDesc(e.target.value)}
                                />
                                <DialogContentText>
                                    Group participants:
                                </DialogContentText>
                                <DataSelection
                                    data={usersData}
                                    selectedData={group.players.map(currPlayer => {
                                        return currPlayer.playerId;
                                    })}
                                    handleChange={handlePlayers}
                                    label='Group Participants' />
                                <DialogContentText>
                                    Group leagues:
                                </DialogContentText>
                                <DataSelection
                                    data={leaguesData}
                                    selectedData={group.leaguesIds}
                                    handleChange={handleLeagues}
                                    label='Group Leagues' />
                            </form>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleIsOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}