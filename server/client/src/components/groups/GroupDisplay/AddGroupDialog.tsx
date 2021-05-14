import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataSelection from './AddGroupForm/DataSelection';
import Swal from 'sweetalert2'

import GroupTextInput from './AddGroupForm/GroupTextInput';
import { User } from '../../../modles/User';
import { League } from '../../../modles/League';
import { Group } from '../../../modles/Group';


interface AddGroupDialogProps {
    handleNewGroup: (group: Group) => void
}

interface AddGroupDialogState {
    isOpen: boolean,
    isLoading: boolean,
    usersToAdd: User[],
    usersData: User[],
    leaguesData: League[],
    loggedUser: User
    botUser: User
}

const styles = makeStyles((theme) => ({
    addButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: '3%',
        right: '2%',
    },
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
}));

export default function UserData(props: AddGroupDialogProps, state: AddGroupDialogState) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [leaguesData, setLeaguesData] = useState([]);
    const [leaguesToAdd, setLeaguesToAdd] = useState([]);
    const [loggedUser, setLoggedUser] = useState(null);
    const [description, setDescription] = useState('');
    const [botUser, setBotUser] = useState(null);

    const classes = styles();

    const { handleNewGroup } = props;

    useEffect(() => {
        const fetchData = async () => {
            const players = axios.get(
                '/api/players/all',
            );
            const leagues = axios.get(
                '/api/leagues/'
            )
            const loggedUser = axios.get('/api/current_user');

            const responses = await axios.all([players, leagues, loggedUser]);

            if (responses.length === 3) {
                var loadedUsers: User[] = responses[0].data.filter(user => { return user._id !== responses[2].data._id });
                var bot = loadedUsers.filter((currUser: User) => { return currUser.displayName === 'ML Bot'})[0];
                loadedUsers = loadedUsers.filter((currUser: User) => { return currUser.displayName !== 'ML Bot'})
                setUsersData(loadedUsers)
                setBotUser(bot);
                setLeaguesData(responses[1].data);
                setLoggedUser(responses[2].data);
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

    const handleDialog = () => {
        setIsOpen(!isOpen);
    }

    const handleUsersChange = (users: (User | string)[]) => {
        setUsersToAdd(users);
    }

    const handleOnNameChange = (name: string) => {
        setGroupName(name);
    }

    const handleLeaguesChange = (leagues: League[]) => {
        setLeaguesToAdd(leagues);
    }

    const handleDescChange = (desc: string) => {
        setDescription(desc);
    }

    const handleSubmit = async () => {
        usersToAdd.push(loggedUser);
        usersToAdd.push(botUser)
        const resp = await axios.put('/api/groups/add', {
            newGroup: {
                players: usersToAdd.map(user => {
                    return user._id
                }),
                leaguesIds: leaguesToAdd.map((league) => { return league._id }),
                name: groupName,
                manager_id: loggedUser._id,
                description: description
            }
        })

        setIsOpen(!isOpen);

        if (resp.status === 200) {
            Swal.fire(
                'Have fun!',
                'You created a new group successfully',
                'success'
            )
            handleNewGroup(resp.data);
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
            <Fab style={{backgroundColor: "#5F52B6", color: "white"}}
                aria-label="add"
                className={classes.addButton}
                onClick={handleDialog}>
                <AddIcon/>
            </Fab>
            <Dialog open={isOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new group</DialogTitle>
                <DialogContent>
                    {
                        isLoading
                            ? <CircularProgress />
                            :
                            <form className={classes.root}>
                                <GroupTextInput label='Name' isFocused={true} handleChange={handleOnNameChange} />
                                <GroupTextInput label='Description' isFocused={false} handleChange={handleDescChange} />
                                <DialogContentText>
                                    Select group participants:
                                    </DialogContentText>
                                <DataSelection 
                                    data={usersData}
                                    selectedData={[]}
                                    handleChange={handleUsersChange}
                                    label='Participants' />
                                <DialogContentText>
                                    Select leagues:
                                    </DialogContentText>
                                <DataSelection 
                                    data={leaguesData}
                                    selectedData={[]}
                                    handleChange={handleLeaguesChange}
                                    label='Leagues' />
                            </form>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}