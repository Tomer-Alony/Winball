import { makeStyles, Paper, TextField, Typography, WithStyles } from "@material-ui/core";
import FcbPic from '../../static/images/groups/Fcb.png'
import RealPic from '../../static/images/groups/Real.png'
import * as React from "react";

interface GameDataState {

}

interface GameDataProps {
   
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
        paddingTop: '8px',
        backgroundColor: '#e7e7de',
        marginBottom: '5px'
    },
    details: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        paddingBottom: '15px',
        alignItems: 'center'
    },
    pics: {
        width: '60px',
        height: '60px',
        marginLeft: '22px',
        marginRight: '22px'
    },
    guess: {
        width: '35px',
        borderColor: 'red'
    },
    guessContent: {
        justifyContent: 'space-between',
        display: 'flex',
        minWidth: '200px',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
    }
}));

export default function GameDisplay(props: GameDataProps, state: GameDataState) {
    const classes = useStyles();

    const {  } = props;

    return (
        <>
        <Paper className={classes.gameContainer}>
            <div>16:30</div>
            <div className={classes.details}> 
                <Typography variant="body1" gutterBottom>FC Barcelona</Typography>
                <img className={classes.pics} src={FcbPic}></img>
                <div className={classes.guessContent}>
                    <TextField id="outlined-basic" className={classes.guess} variant="outlined" InputProps={{className: classes.input }}/>
                    <Typography variant="body2" gutterBottom>:</Typography>
                    <TextField id="outlined-basic" className={classes.guess} variant="outlined" InputProps={{className: classes.input }}/>
                </div>
                <img className={classes.pics} src={RealPic}></img>
                <Typography variant="body1" gutterBottom>Real Madrid</Typography>
            </div>
        </Paper>
        </>
    );
};