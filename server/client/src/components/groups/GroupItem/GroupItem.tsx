import * as React from "react";
import { makeStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Group } from '../../../modles/Group';
import UserData from './UserData';
import pic1 from '../../../static/images/avatar/1.jpeg';
import pic2 from '../../../static/images/avatar/2.jpeg';
import pic3 from '../../../static/images/avatar/3.jpeg';
import pic4 from '../../../static/images/avatar/4.jpeg';

export interface Player {
    name: string,
    picPath: any
}

interface GroupState {

}

interface GroupProps extends WithStyles {
    group: Group
}

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: '100%',
    },
    tableCell: {
        width: 'calc(100%/6)'
    }
});

function createData(playerData: Player, games: number, side: number, bullseye: number, points: number, id: number) {
    return { playerData, games, side, bullseye, points, id };
}

const columns = [
    { id: 'player', label: 'Player', align: 'center' },
    { id: 'games', label: 'Games' },
    {
        id: 'side',
        label: 'Side',
        align: 'right',
        format: (value: any) => value.toLocaleString('en-US'),
    },
    {
        id: 'bullseye',
        label: 'Bullseye',
        format: (value: any) => value.toFixed(2),
    },
    {
        id: 'points',
        label: 'Points',
        format: (value: any) => value.toFixed(2),
    }
];

const players = [
    createData({ name: 'Adir Sation', picPath: pic1 }, 3, 1, 2, 10, 1),
    createData({ name: 'Shira Cohen', picPath: pic2 }, 3, 1, 2, 10, 2),
    createData({ name: 'Tomer Alony', picPath: pic3 }, 3, 1, 2, 10, 3),
    createData({ name: 'Yair Vered', picPath: pic4 }, 3, 1, 2, 10, 4),
];

export default function GroupItem(props: GroupProps, state: GroupState) {
    const classes = useStyles();

    const { group } = props;
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="Players table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    //@ts-ignore
                                    style={{ width: 'calc(100%/6)' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((currPlayer) => {
                            return (
                                <TableRow>
                                    <TableCell key={'player' + currPlayer.id} className={classes.tableCell} >
                                        <UserData player={currPlayer.playerData} />
                                    </TableCell>
                                    <TableCell key={'games' + currPlayer.id} className={classes.tableCell}>
                                        {currPlayer.games}
                                    </TableCell>
                                    <TableCell key={'side' + currPlayer.id} className={classes.tableCell}>
                                        {currPlayer.side}
                                    </TableCell>
                                    <TableCell key={'bullseye' + currPlayer.id} className={classes.tableCell}>
                                        {currPlayer.bullseye}
                                    </TableCell>
                                    <TableCell key={'points' + currPlayer.id} className={classes.tableCell}>
                                        {currPlayer.points}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}