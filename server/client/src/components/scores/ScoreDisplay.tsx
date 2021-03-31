import React from "react";
import {createStyles, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => createStyles({
    betCard: {
        width: "100%",
        paddingTop: 24,
        paddingBottom: 24,
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}));

export default function ScoreDisplay ({bet, games}) {
    const classes = useStyles();
    const isBetValid = (): boolean => {
        return (!!bet.bet && !!games[bet.gameId] && !!bet.player_name )
    }

    return (
        <>
            {isBetValid() ?
                <Paper className={classes.betCard}>
                    <div>
                        <Typography variant="h5"><b>{bet.player_name}</b></Typography>
                    </div >
                    <div>
                        <i>"{games[bet.gameId].teamAId}"</i> - <i>"{games[bet.gameId].teamBId}"</i>
                    </div>
                    <div>
                        <Typography variant="h6">{bet.bet}</Typography>
                    </div>
                </Paper>
                :
                "Something was missing from this bet so we cannot show it"
            }
        </>
    );
};

