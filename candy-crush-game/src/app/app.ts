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
  draggedIndex: number | null = null;
  replacedIndex: number | null = null;

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

  checkRowOfThree(): boolean {
  let match = false;

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
      match = true;
      row.forEach(index => (this.gameBoard[index] = 'blank'));
    }
  }

  return match;
}

  moveDown() {
    for (let i = 0; i < 56; i++) {
      if (this.gameBoard[i + this.width] === 'blank') {
        this.gameBoard[i + this.width] = this.gameBoard[i];
        this.gameBoard[i] = 'blank';
      }
    }
  }

  checkColumnOfThree(): boolean {
  let match = false;

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
      match = true;
      column.forEach(index => (this.gameBoard[index] = 'blank'));
    }
  }

  return match;
}


  dragStart(index: number) {
    this.draggedIndex = index;
  }

  dragOver(event: Event) {
    event.preventDefault();
  }

  dragDrop(index: number) {
    this.replacedIndex = index;
  }

  dragEnd() {
  if (
    this.draggedIndex === null ||
    this.replacedIndex === null
  ) {
    return;
  }

  const validMoves = [
    this.draggedIndex - 1,
    this.draggedIndex + 1,
    this.draggedIndex - this.width,
    this.draggedIndex + this.width,
  ];

  const isValidMove = validMoves.includes(this.replacedIndex);

  if (!isValidMove) {
    this.resetDrag();
    return;
  }

  // Swap candies
  const temp = this.gameBoard[this.draggedIndex];
  this.gameBoard[this.draggedIndex] =
    this.gameBoard[this.replacedIndex];
  this.gameBoard[this.replacedIndex] = temp;

  // Check if swap created a match
  const matchFound = this.checkRowOfThree() || this.checkColumnOfThree();

  if (!matchFound) {
    // Revert swap
    const revert = this.gameBoard[this.draggedIndex];
    this.gameBoard[this.draggedIndex] =
      this.gameBoard[this.replacedIndex];
    this.gameBoard[this.replacedIndex] = revert;
  }

  this.resetDrag();
}

resetDrag() {
  this.draggedIndex = null;
  this.replacedIndex = null;
}


}
