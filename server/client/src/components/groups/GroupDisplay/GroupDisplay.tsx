import React, { useEffect, useState } from "react";
import * as _ from 'lodash';
import { makeStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Group, PlayerMetadata } from '../../../modles/Group';
import UserData from './UserData';

interface GroupState {

}

interface GroupProps extends WithStyles {
    group: Group,
    playersMeta: PlayerMetadata
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '100%',
    },
    tableCell: {
        width: 'calc(100%/6)'
    }
});

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

export default function GroupDisplay(props: GroupProps, state: GroupState) {

    const { group, playersMeta } = props;
    const classes = useStyles();

    group.players = _.sortBy(group.players, ['points', 'bullseye', 'side']).reverse();

    return (
        <>
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
                            {group.players.map((currPlayer) => {
                                if (playersMeta.get(currPlayer.playerId)) {
                                    const currPlayerMetadata = playersMeta.get(currPlayer.playerId);
                                    return (
                                        <TableRow>
                                            <TableCell key={'player' + currPlayer.playerId} className={classes.tableCell} >
                                                <UserData name={currPlayerMetadata.displayName} picPath={currPlayerMetadata.picture} />
                                            </TableCell>
                                            <TableCell key={'games' + currPlayer.playerId} className={classes.tableCell}>
                                                {currPlayer.games}
                                            </TableCell>
                                            <TableCell key={'side' + currPlayer.playerId} className={classes.tableCell}>
                                                {currPlayer.side}
                                            </TableCell>
                                            <TableCell key={'bullseye' + currPlayer.playerId} className={classes.tableCell}>
                                                {currPlayer.bullseye}
                                            </TableCell>
                                            <TableCell key={'points' + currPlayer.playerId} className={classes.tableCell}>
                                                {currPlayer.points}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}