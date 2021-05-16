import { Router } from 'express';
import axios from 'axios';
import { model, Model } from 'mongoose';
import { IGames } from '../../models/Games';
import { IGroup } from '../../models/Group';
import Bet from '../../models/Bet';

const router = Router();
const Games: Model<IGames> = model('Games');
const Groups: Model<IGroup> = model('Groups');

router.get('/addBets', async (req, res) => {
    const games = await Games.find({})
    const groups = await Groups.find({});
    const botId = '6098f6f54212edb12ca71b3c'

    let parsedGames = [];
    games.forEach((game, index) => {
        parsedGames.push({
            home: game.teamAId,
            away: game.teamBId
        })
    })

    const resp = await axios.post('http://localhost:5000/predict', parsedGames)
    let betsCounter = 0;

    if (games && groups && resp.data) {
        games.map((currGame: IGames) => {
            const userGroups = groups.filter((group: IGroup) =>
                group.players.findIndex(player =>
                    player.playerId.toString() == botId) != -1)
            userGroups.forEach((userGroup: IGroup) => {
                const newBet: any = {
                    playerId: botId,
                    gameId: currGame.id,
                    bet: resp.data[betsCounter],
                    player_name: "ML Bot",
                    date: Date.now()
                };
                userGroup.userBets.push(newBet)
                userGroup.save();
            })
            betsCounter++;
        })

        console.log('Added all bot bets successfully');
        res.send('ok');
    } else {
        res.status(500).send('an error occured while trying to get games or groups data');
    }
})

export default router;