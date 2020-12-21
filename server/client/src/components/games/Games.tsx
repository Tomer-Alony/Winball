import { makeStyles, Paper, WithStyles } from "@material-ui/core";
import * as React from "react";
import { Game } from '../../modles/Game';

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
    gameContainer: {
        width: '100%',
    }
}));

export default function Games(props: GameProps, state: GameState) {
    const classes = useStyles();

    const { game } = props;

    return (
        <div style={{ textAlign: 'center' }} className={classes.root}>
            <h1>Games</h1>
            <Paper className={classes.gameContainer}>
                <div>16:30</div>
                <div>
                    <img src={require('../../static/images/groups/Fcb.png')}></img>
                </div>
            </Paper>
        </div>
    );
};