import { makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import moment from "moment";

interface GameDataState {

}

interface GameDataProps {
   teamAName: string,
   teamBName: string,
   startDate: Date,
   startTime: Date,
   picAPath: string,
   picBPath: string
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
        backgroundColor: '#403f3f',
        marginBottom: '5px',
        color: '#ffffff'
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
        alignItems: 'center',
        marginLeft: '22px',
        marginRight: '22px'
    },
    input: {
        backgroundColor: 'white',
    },
    team: {
        width: '100px'
    }
}));

export default function GameDisplay(props: GameDataProps, state: GameDataState) {
    const classes = useStyles();
    const { teamAName, teamBName, startDate, startTime, picAPath, picBPath} = props;

    const date = moment(startDate).format('D-M-YY');
    var time = moment(startTime).format('HH:mm');
    if (time == "Invalid date") {
        time = "";
    }
    
    return (
        <>
        <Paper className={classes.gameContainer} square>
            <div>{date}</div>
            <div>{time}</div>
            <div className={classes.details}> 
                <Typography variant="body1" className={classes.team} gutterBottom>{teamAName}</Typography>
                <img className={classes.pics} src={picAPath}></img>
                <div className={classes.guessContent}>
                    <TextField id="outlined-basic" className={classes.guess} variant="outlined" InputProps={{className: classes.input }}/>
                    <Typography variant="body2" gutterBottom>:</Typography>
                    <TextField id="outlined-basic" className={classes.guess} variant="outlined" InputProps={{className: classes.input }}/>
                </div>
                <img className={classes.pics} src={picBPath}></img>
                <Typography variant="body1" className={classes.team} gutterBottom>{teamBName}</Typography>
            </div>
        </Paper>
        </>
    );
};