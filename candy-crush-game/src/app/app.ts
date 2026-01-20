import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game';

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

   constructor(public game: GameService) {}

  ngOnInit() {
    this.game.createBoard();

    setInterval(() => {
      this.game.checkRowOfThree();
      this.game.checkColumnOfThree();
      this.game.moveDown();
    }, 150);
  }


}
