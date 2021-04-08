import { Router } from 'express';
import axios from 'axios';
import { model, Model } from 'mongoose';
import { ITeams } from '../../models/Teams';
import { IGames } from '../../models/Games';

const router = Router();
const Teams: Model<ITeams> = model('Teams');
const Games: Model<IGames> = model('Games');
router.get('/teams', async (req, res) => {
    const teams = await axios('http://localhost:5000/teams');

    if (teams.data) {
        const resp = teams.data.map(currTeam => {
            currTeam.leagueId = 'laliga';
            return currTeam;
        })

        Teams.insertMany(resp);
        res.status(200);
    } else {
        res.status(500).send('an error occured while trying to get teams data');
    }
});

router.get('/games', async (req, res) => {
    const games = await axios('http://localhost:5000/games');

    if (games.data) {
        const resp = games.data.map(currGame => {
            const parsedData = {
                startDate: currGame.date,
                teamAId: currGame.teamA,
                teamBId: currGame.teamB,
                startTime: currGame.time,
                winnerTeamId: calcWonTeam(currGame.score, currGame.teamA, currGame.teamB),
                finalScoreTeamA: currGame.score === 'vs' ? '' : currGame.score.charAt(0),
                finalScoreTeamB: currGame.score === 'vs' ? '' : currGame.score.charAt(2)
            }
            return parsedData;
        })

        Games.insertMany(resp);
        res.send('ok');
    } else {
        res.status(500).send('an error occured while trying to get games data');
    }


})

const calcWonTeam = (score: String, teamA: String, teamB: String): String => {
    if (score !== 'vs') {
        const scoreA = score.charAt(0);
        const scoreB = score.charAt(2);
        if (scoreA > scoreB) {
            return teamA;
        } else if (scoreA < scoreB) {
            return teamB;
        }
    }

    return '';
}

export const getScore = async (teamA: String, teamB: String) => {
    const score = await axios('http://localhost:5000/score/' + teamA + '/' + teamB);

    return new Promise((resolve, reject)=> {
        return resolve(score.data);
    })
};

export default router;