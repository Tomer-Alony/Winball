export interface Group {
    id: string,
    name: string,
    description: string
    playersData: PlayerData[]
}

export interface PlayerData {
    
    name: string,
    picPath: string,
    id: number,
    games: number,
    side: number,
    bullseye: number,
    points: number
}

export interface PlayerAvatar {
    name: string,
    picPath: string
}