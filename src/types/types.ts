export interface Player {
    name: string;
    ball: number;
    goal: number;
    safety: number;
    ace: number;
    breakrun: number;
}

export interface ScoreForm {
    player1: Player;
    player2: Player;
    inning: number;
    dead: number;
}