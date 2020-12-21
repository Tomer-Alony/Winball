import { makeStyles, Paper, TextField, WithStyles } from "@material-ui/core";
import * as React from "react";
import { Game } from '../../modles/Game';
import FcbPic from '../../static/images/groups/Fcb.png'
import RealPic from '../../static/images/groups/Rial.png'

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
    },
    details: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px',
    },
    pics: {
        width: '60px',
        height: '60px',
        marginLeft: '22px',
        marginRight: '22px'
    },
    guess: {
        width: '35px',
    },
    guessContent: {
        justifyContent: 'space-between',
        display: 'contents',
        maxWidth: '400px',
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
                <div className={classes.details}> 
                    <h4>FC Barcelona</h4>
                    <img className={classes.pics} src={FcbPic}></img>
                    <div className={classes.guessContent}>
                        <TextField id="outlined-basic" className={classes.guess} variant="outlined" />
                        <TextField id="outlined-basic" className={classes.guess} variant="outlined" />
                    </div>
                    <img className={classes.pics} src={RealPic}></img>
                    <h4>Real Madrid</h4>
                </div>
            </Paper>
        </div>
    );
};