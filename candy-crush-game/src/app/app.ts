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
}
