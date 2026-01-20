import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  width = 8;
  score = 0;

  candyColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
  ];

  gameBoard: string[] = [];

 ngOnInit() {
  this.createBoard();

  setInterval(() => {
    this.checkRowOfThree();
    this.checkColumnOfThree();
    this.moveDown();
  }, 150);
}



  createBoard() {
    console.log("width", this.width);
    for (let i = 0; i < this.width * this.width; i++) {
      const randomColor =
        this.candyColors[
          Math.floor(Math.random() * this.candyColors.length)
        ];

      this.gameBoard.push(randomColor);
    }
  }

  checkRowOfThree() {
  for (let i = 0; i < 64; i++) {
    const row = [i, i + 1, i + 2];
    const color = this.gameBoard[i];

    const invalid = [
      6, 7, 14, 15, 22, 23,
      30, 31, 38, 39, 46, 47,
      54, 55, 62, 63
    ];

    if (invalid.includes(i)) continue;

    if (
      row.every(
        index =>
          this.gameBoard[index] === color &&
          color !== 'blank'
      )
    ) {
      this.score += 3;
      row.forEach(index => (this.gameBoard[index] = 'blank'));
    }
  }
}

moveDown() {
  for (let i = 0; i < 56; i++) {
    if (this.gameBoard[i + this.width] === 'blank') {
      this.gameBoard[i + this.width] = this.gameBoard[i];
      this.gameBoard[i] = 'blank';
    }
  }
}

checkColumnOfThree() {
  for (let i = 0; i < 48; i++) {
    const column = [
      i,
      i + this.width,
      i + this.width * 2,
    ];

    const color = this.gameBoard[i];

    if (
      column.every(
        index =>
          this.gameBoard[index] === color &&
          color !== 'blank'
      )
    ) {
      this.score += 3;
      column.forEach(index => (this.gameBoard[index] = 'blank'));
    }
  }
}


}
