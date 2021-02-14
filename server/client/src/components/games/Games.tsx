import { makeStyles, Paper, TextField, Typography, WithStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Game } from '../../modles/Game';
import axios from 'axios';
import GameDisplay from './GameDisplay';
import FootballPic from '../../static/images/groups/football.png';
import moment from "moment";
import GameDate from './GameDate';


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
    title: {
        fontFamily: theme.typography.fontFamily,
        color: '#ffffff',
        height: '200px',
        alignItems: 'center',
        fontSize: '40px',
        display: 'grid',
    },
}));

export default function Games(props: GameProps, state: GameState) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    var gamesParse: {[key: string] : Game[]} = {};
    
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

    games.map(game => gamesParse[new Date(game.startDate).getTime().toString()] = [game]);

    return (
        <div style={{ textAlign: 'center' }} className={classes.root}>
            <div className={classes.title}>What's your guess?</div>
            {/* {Object.keys(gamesParse).map(date => (<GameDate startDate={date} gamesInDate={gamesParse[date]}></GameDate>))} */}
            {games.filter(game => new Date(game.startDate).getTime() - new Date().getTime() > 0)
            .map(game => (<GameDisplay teamAName={game.teamAId} 
                                             teamBName={game.teamBId} 
                                             startDate={game.startDate}
                                             startTime={(game.startTime) ? game.startTime : ""}
                                             picAPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamAId))?.picPath || FootballPic : ""}
                                             picBPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamBId))?.picPath || FootballPic : ""}></GameDisplay>))}
        </div>
    );
};