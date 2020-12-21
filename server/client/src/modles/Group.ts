export interface Group {
    _id: string,
    name: string,
    players: PlayerScores[],
    description: string
    leaguesIds: string[],
    manager_id: string,
}

export interface PlayerScores {
    games: number,
    side: number,
    bullseye: number,
    points: number,
    playerId: string
}

export interface PlayerMetadata extends Map<string, {
    displayName: string,
    picture: string,
    id: number
}> {

}

export interface PlayerAvatar {
    name: string,
    picPath: string
}