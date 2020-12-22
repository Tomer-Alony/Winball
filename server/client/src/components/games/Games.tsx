import { makeStyles, Paper, TextField, Typography, WithStyles } from "@material-ui/core";
import * as React from "react";
import { Game } from '../../modles/Game';
import GameDisplay from './GameDisplay';


interface GameState {

}

interface GameProps extends WithStyles {
    game: Game
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        fontFamily: theme.typography.fontFamily,
    },
    container: {
        maxHeight: '100%',
    },
}));

export default function Games(props: GameProps, state: GameState) {
    const classes = useStyles();

    const { game } = props;

    return (
        <div style={{ textAlign: 'center' }} className={classes.root}>
            <h1>Games</h1>
            <GameDisplay></GameDisplay>
            <GameDisplay></GameDisplay>
            <GameDisplay></GameDisplay>
        </div>
    );
};