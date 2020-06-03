class Draw {
  constructor() {
    this.options = ["red", "green", "blue", "yellow", "brown"];
    let _result = this.drawResult();
    this.getDrawResult = () => _result;
  }
  drawResult() {
    let colors = [];
    for (let i = 0; i < this.options.length; i++) {
      const index = Math.floor(Math.random() * this.options.length);
      const color = this.options[index];
      colors.push(color);
    }
    return colors;
  }
}

class Result {
  static moneyWon(result, bid) {
    if (result) return bid * 2;
    else return 0;
  }
  static checkWinner(draw) {
    if (draw[0] === draw[1] && draw[1] === draw[2]) return true;
    else return false;
  }
}

class Game {
  constructor(start) {
    this.stats = new Statistics();
    this.wallet = new Wallet(start);
    document
      .getElementById("spin")
      .addEventListener("click", this.startGame.bind(this));
    this.spanWallet = document.getElementById("amount");
    this.colorDivs = document.querySelectorAll(".game .color");
    this.bidInput = document.getElementById("bid");
    this.divResult = document.getElementById("result");
    this.spanPlayed = document.getElementById("games-played");
    this.spanWins = document.getElementById("won");
    this.spanLosses = document.getElementById("losses");

    this.render();
  }

  render(
    money = this.wallet.getWalletValue(),
    stats = [0, 0, 0],
    result = "",
    colors = ["gray", "gray", "gray"],
    bid = 0,
    wonMoney = 0
  ) {
    this.spanWallet.textContent = money;
    this.spanPlayed.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
    if (result) {
      result = `You win ${wonMoney}`;
    } else if (!result && result !== "") {
      result = `You lost ${bid}`;
    }
    this.divResult.textContent = result;
    this.colorDivs.forEach((color, index) => {
      color.style.backgroundColor = colors[index];
    });
  }

  startGame() {
    if (this.bidInput.value < 1) return alert("Set bid to more than 1.");
    const bid = Math.floor(this.bidInput.value);
    if (!this.wallet.checkCanPlay(bid)) {
      return alert("Not enough cash.");
    }
    this.wallet.changeWalletValue(bid, "-");
    this.draw = new Draw();
    const colors = this.draw.getDrawResult();
    const win = Result.checkWinner(colors);
    const wonMoney = Result.moneyWon(win, bid);
    this.wallet.changeWalletValue(wonMoney);
    this.stats.addGameToStatistics(win, bid);

    this.render(
      this.wallet.getWalletValue(),
      this.stats.showGameStats(),
      win,
      colors,
      bid,
      wonMoney
    );
  }
}

const startMoney = 5000;
const game = new Game(startMoney);
