import {makeStyles, Paper, Snackbar, TextField, Typography, WithStyles} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Game } from '../../modles/Game';
import axios from 'axios';
import GameDisplay from './GameDisplay';
import FootballPic from '../../static/images/groups/football.png';
import moment from "moment";
import GameDate from './GameDate';
import Button from "@material-ui/core/Button";
import AlertMassage from "../AlertMessage";
import Socket from "../../helpers/Socket";
import {useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import UndoIcon from '@material-ui/icons/Undo';
import IconButton from "@material-ui/core/IconButton";


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
    btnOlder: {
        marginBottom: '20px',
        color: "#b9b8b8",
        '&:hover': {
            backgroundColor: "#5F52B6"
        }
    },
    gamesForBet: {
        marginBottom: '15px',
        marginTop: '15px', 
        backgroundColor: '#c6c1ec',
        color: 'black',
        fontFamily: theme.typography.fontFamily
    },
    gotoBtn: {
        position: "fixed",
        bottom: '20px',
        right: '20px', 
    }
}));

export default function Games(this:any, props: GameProps, state: GameState) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatusBase] = useState("");
    const user = useSelector((state) => (state as any).auth);

    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoadedOlderGames, setLoadOlderGames] = useState(false);
    var gamesParse: {[key: string] : Game[]} = {};

    const divRef = useRef(null);
    
    const updateBets = () => {
        socket.sendMessage(`${user?.displayName || "Someone"} just placed a bet!`)
    }

    const handleMessages = (msg: string) => {
        setStatusBase( msg )
    }

    const loadingOlderGames = () => {
        setLoadOlderGames(true);
    }
    
    const hideOlderGames = () => {
        setLoadOlderGames(false);
    }

    const socket = new Socket(() => {}, handleMessages);
    socket.connect();

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

        return function cleanup() {
            socket.disconnect()
        }
    }, []);

    games.map(game => gamesParse[new Date(game.startDate).getTime().toString()] = [game]);
    const date = new Date(2021, 0, 1);

    return (
        <>
        <div className={classes.gotoBtn}>
        {isLoading? null : isLoadedOlderGames?
                <IconButton style={{backgroundColor:'#c6c1ec'}} onClick={() => {divRef.current.scrollIntoView()}}>
                    <UndoIcon></UndoIcon>
                </IconButton> : null}
        </div>
        <div style={{ textAlign: 'center' }} className={classes.root}>
            {status ? <AlertMassage key={Math.random()} message={status} onClose={() => setStatusBase("")} /> : null}
            <div className={classes.title}>What's your guess?</div>
          
            <div>
            {isLoading ? null : isLoadedOlderGames? 
                <Button className={classes.btnOlder} onClick={hideOlderGames}>hide older games</Button> : 
                <Button className={classes.btnOlder} onClick={loadingOlderGames}>older games</Button>} 
            </div>

            
            {!isLoadedOlderGames ? null : 
            games.filter(game => new Date(game.startDate).getTime() - date.getTime() < 0)
            .map(game => (<GameDisplay gameId={game._id}
                                        teamAName={game.teamAId} 
                                        teamBName={game.teamBId} 
                                        startDate={game.startDate}
                                        startTime={(game.startTime) ? game.startTime : ""}
                                        picAPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamAId))?.picPath || FootballPic : ""}
                                        picBPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamBId))?.picPath || FootballPic : ""}
                                        isOlder={true}
                                        finalScoreTeamA={game.finalScoreTeamA}
                                        finalScoreTeamB={game.finalScoreTeamB}></GameDisplay>))}

            {isLoading ? <CircularProgress /> :

            <>
            {isLoadedOlderGames? 
                <div ref={divRef} className={classes.gamesForBet}><Typography>Games for bet</Typography></div>
                : null }
            {games.filter(game => new Date(game.startDate).getTime() - date.getTime() > 0)
            .map(game => (<GameDisplay gameId={game._id}
                                        teamAName={game.teamAId} 
                                        teamBName={game.teamBId} 
                                        startDate={game.startDate}
                                        startTime={(game.startTime) ? game.startTime : ""}
                                        picAPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamAId))?.picPath || FootballPic : ""}
                                        picBPath={(teams.length != 0) ? teams.find((currTeam) => currTeam.name.includes(game.teamBId))?.picPath || FootballPic : ""}
                                        isOlder={false}></GameDisplay>))} 
                                        </>}
        </div>
        </>
    );
};