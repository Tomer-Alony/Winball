import { makeStyles, Paper, TextField, Typography, WithStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Game } from '../../modles/Game';
import axios from 'axios';
import GameDisplay from './GameDisplay';
import FootballPic from '../../static/images/groups/football.png'


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
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);

    
    useEffect(() => {
        if (games.length === 0) {
            const fetchData = async () => {
                const gamesResult = await axios.get('/api/games');
                const teamsReuslt = await axios.get('/api/teams');
                
                if(gamesResult && teamsReuslt) {
                    setIsLoading(false);
                    setGames(gamesResult.data);
                    setTeams(teamsReuslt.data);
                }
            };

            if(isLoading) fetchData();
        }
    }, []);
    debugger
    return (
        <div style={{ textAlign: 'center' }} className={classes.root}>
            <h1>Games</h1>
            {games.map(game => (<GameDisplay teamAName={game.teamAId} 
                                             teamBName={game.teamBId} 
                                             startDate={game.startDate}
                                             startTime={game.startTime}
                                             picAPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamAId))?.picPath || FootballPic : ""}
                                             picBPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamBId))?.picPath || FootballPic : ""}></GameDisplay>))}
        </div>
    );
};