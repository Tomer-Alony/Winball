export interface Game {
    teamAId: Team,
    teamBId: Team,
    startTime: Date,
    winnerTeamId: string,
    finalScoreTeamA: number,
    finalScoreTeamB: number
}

export interface Team {
    id: string,
    name: string
}