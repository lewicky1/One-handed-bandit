class Statistics {
  constructor() {
    this.gameResults = [];
  }
  addGameToStatistics(win, bid) {
    let gameResults = { win, bid };
    this.gameResults.push(gameResults);
  }
  showGameStats() {
    let games = this.gameResults.length;
    let wins = this.gameResults.filter((result) => result.win).length;
    let losses = this.gameResults.filter((result) => !result.win).length;
    return [games, wins, losses];
  }
}
