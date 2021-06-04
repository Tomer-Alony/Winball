import React, { useEffect, useState } from "react";
import {createStyles, makeStyles, Paper, Typography} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import botPic from '../../static/images/bot.png';

const useStyles = makeStyles(theme => createStyles({
    betCard: {
        width: "100%",
        paddingTop: 24,
        paddingBottom: 24,
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#403f3f",
        color: "white"
    },
    playerName: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}));

export default function ScoreDisplay ({bet, games}) {
    const [isBullseye, setIsBullseye] = useState(false);
    const [isDir, setIsDir] = useState(false);

    const classes = useStyles();
    const isBetValid = (): boolean => {
        return (!!bet.bet && !!games[bet.gameId] && !!bet.player_name )
    }

    useEffect(() => {
        const bullOrDir = () => { 
            const betTeamA = bet.bet.split("-")[0];
            const betTeamB = bet.bet.split("-")[1];
            const game = games[bet.gameId];
            if (game.finalScoreTeamA == betTeamA && game.finalScoreTeamB == betTeamB) {
                setIsBullseye(true)
            } else if ((betTeamA == betTeamB && game.finalScoreTeamA == game.finalScoreTeamB) || 
                        (betTeamA > betTeamB && game.finalScoreTeamA > game.finalScoreTeamB) ||
                        (betTeamA < betTeamB && game.finalScoreTeamA < game.finalScoreTeamB)) {
                setIsDir(true)
            }
        }
        bullOrDir()

    }, []);

    return (
        <>
            {isBetValid() ?
                <Paper className={classes.betCard}>
                    <div className={classes.playerName}>
                        {/* <Avatar src={bet.player_name === 'ML Bot' ? botPic : bet.picPath}/> */}
                        <Typography variant="h5"><b>{bet.player_name}</b></Typography>
                    </div >
                    <div>
                        <i>"{games[bet.gameId].teamAId}"</i> - <i>"{games[bet.gameId].teamBId}"</i>
                    </div>
                    <div>
                        <Typography style={{color: isBullseye? 'green': isDir? 'orange' : 'white'}} variant="h6">{bet.bet}</Typography>
                    </div>
                    <div>
                        <Typography variant="body2">תוצאת המשחק</Typography>
                    </div>
                    <div>
                        <i>{games[bet.gameId].finalScoreTeamA}</i> - <i>{games[bet.gameId].finalScoreTeamB}</i>
                    </div>
                </Paper>
                :
                "Something was missing from this bet so we cannot show it"
            }
        </>
    );
};

