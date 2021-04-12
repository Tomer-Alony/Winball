const cron = require('node-cron');
import { model, Model } from 'mongoose';
import { IBet, IGames, IGroup } from '../models';
import { getScore } from '../routes/crawler/crawler';

const Bets: Model<IBet> = model('Bets');
const Games: Model<IGames> = model('Games');
const Groups: Model<IGroup> = model('Groups');

export const scoresSchedule = async () => {
    cron.schedule('* * * * *', async function () {
        console.log('Running scores updater scheduler...')

        const bets = await Bets.find({}) as IBet[];
        const games = await Games.find({}) as IGames[];
        const groups = await Groups.find({}) as IGroup[];

        games.forEach(async (currGame) => {
            if (currGame.finalScoreTeamA == "" && currGame.finalScoreTeamB == "" &&
                currGame.startTime && currGame.startDate) {
                var gameDate = currGame.startDate
                gameDate.setHours(currGame.startTime.getHours());
                gameDate.setMinutes(currGame.startTime.getMinutes());
                if (currGame.startDate.getTime() < new Date().getTime()) {
                    const data = await getScore(currGame.teamAId, currGame.teamBId)
                    if (data) {
                        const score = data.toString();
                        currGame.finalScoreTeamA = score.toString().split('-')[0];
                        currGame.finalScoreTeamB = score.toString().split('-')[1];

                        if(currGame.finalScoreTeamA > currGame.finalScoreTeamA) { 
                            currGame.winnerTeamId = currGame.teamAId
                        } else if(currGame.finalScoreTeamA < currGame.finalScoreTeamB) {
                            currGame.winnerTeamId = currGame.teamBId
                        }

                        bets.forEach((currBet) => {
                            if (currBet.gameId == currGame.id) {
                                groups.forEach(currGroup => {
                                    currGroup.players.forEach(currPlayer => {
                                        if (currPlayer.id == currBet.playerId) {
                                            const teamABet = currBet.bet.split('-')[0];
                                            const teamBBet = currBet.bet.split('-')[1];
                                            if (score == currBet.bet) [
                                                currPlayer.points += 3,
                                                currPlayer.bullseye++
                                            ]
                                            else if ((teamABet == teamBBet &&
                                                currGame.finalScoreTeamA == currGame.finalScoreTeamB) ||
                                                ((teamABet > teamBBet &&
                                                    currGame.finalScoreTeamA > currGame.finalScoreTeamB) ||
                                                    (teamABet < teamBBet &&
                                                        currGame.finalScoreTeamA < currGame.finalScoreTeamB))) {
                                                currPlayer.points += 1,
                                                    currPlayer.side++
                                            }
                                        }
                                    })
                                    currGroup.save();
                                })
                            }
                        });

                        currGame.save();
                    }
                }
            }
        })
    })
}