import React, { Component } from "react"
import { random as randomInt, debounce} from "lodash"
import Board from "./Board"
import Score from "./Score"
import "../Game.css"
import twoFour from "../helpers/algo"
import Controls from "./Controls"
import Hammer from "hammerjs"

class Game extends Component {
  constructor() {
    super()
    this.state = {
      game: this.putRandomTile(this.putRandomTile(Array(4).fill(Array(4).fill(0)))),
      currentScore: 0,
      highScore: 0
    }
  }
  componentDidMount() {
    window.addEventListener('keypress',(e)=>{
      switch(e.key.toLowerCase()) {
        case 'd':
          this.rightPlay();
          break;
        case 's': 
          this.downPlay();
          break;
        case 'a':
          this.leftPlay();
          break;
        case 'w':
          this.upPlay();
          break;
        default:
          break;
      }
    })
    const gameSwiper = new Hammer(this.app, {
      touchAction: 'none'
    });
    gameSwiper.get('swipe').set({
      direction: Hammer.DIRECTION_ALL
    })
    gameSwiper.on('swipe', e =>{
      e.preventDefault();
      switch(e.direction) {
        case 4:
          this.rightPlay();
          break;
        case 16: 
          this.downPlay();
          break;
        case 2:
          this.leftPlay();
          break;
        case 8:
          this.upPlay();
          break;
        default:
          break;
      }
    })
    const highScore = +window.localStorage.getItem('_2048_HIGHSCORE') || 0;
    this.setState({
      highScore
    })
  }
  saveScores = (score) => {
    const newScore = score;
    const newHighScore = score > this.state.highScore ? score: null;

    this.setState(prevState => {
      if(newHighScore) {
        return {
          score: newScore,
          highScore: newHighScore
        }
      } else {
        return {
          score: newScore
        }
      }
    })
  }
  recordScore = () => {
    const score = this.state.highScore;
    localStorage.setItem('_2048_HIGHSCORE', `${score}`);
  }
  rightPlay = () => {
    const copy = this.state.game.slice();
    const newBoard = copy.map(row => {
      return twoFour(row)
    })
    this.setState({
      game: this.putRandomTile(newBoard)
    })
  }
  leftPlay = () => {
    const newBoard = this.state.game.map(row => {
      return twoFour(row.reverse()).reverse()
    })
    this.setState({
      game: this.putRandomTile(newBoard)
    })
  }
  downPlay = () => {
    const swappedBoard = this.swapPos(this.state.game)
    const twoFouredCols = swappedBoard.map(col => twoFour(col))
    const colsToRows = this.swapPos(twoFouredCols)
    this.setState({
      game: this.putRandomTile(colsToRows)
    })
  }
  upPlay = () => {
    const swappedBoard = this.swapPos(this.state.game)
    const twoFouredCols = swappedBoard.map(col => twoFour(col.reverse()).reverse())
    const colsToRows = this.swapPos(twoFouredCols)
    this.setState({
      game: this.putRandomTile(colsToRows)
    })
  }
  swapPos = board => {
    return board.reduce(
      (acc, cur) => {
        cur.forEach((num, index) => {
          acc[index].push(num)
        })
        return acc
      },
      [[], [], [], []]
    )
  }
  resetBoard = () => {
    this.setState({
      game: this.putRandomTile(this.putRandomTile(Array(4).fill(Array(4).fill(0))))
    })
  }
  putRandomTile = board => {
    const gameBoard = [...board]
    const emptyIndices = gameBoard.reduce((acc, currentRow, rowNum) => {
      const next = [...acc]
      currentRow.forEach((elem, colNum) => {
        if (elem === 0) {
          next.push({
            row: rowNum,
            col: colNum
          })
        }
      })
      return next
    }, [])

    if (emptyIndices) {
      const index = randomInt(0, emptyIndices.length - 1)
      const pos = emptyIndices[index]
      const newRow = [...gameBoard[pos.row]]
      newRow[pos.col] = randomInt(1) ? 2 : 4
      gameBoard[pos.row] = newRow
    }

    return gameBoard
  }
  componentDidUpdate(){
    const sum = this.state.game.reduce((gameSum, row)=>{
      const rowSum = row.reduce((colSum, col)=>{
        return colSum+col;
      },0);
      return gameSum+rowSum;
    },0);
    const high = this.state.highScore;
    if(sum > high) {
      try {
        localStorage.setItem('_2048_HIGHSCORE', `${sum}`);
      } catch (e) {
        console.warn(`Couldn't store high score`);
      }
        this.setState({
        currentScore: sum,
        highScore: sum
      })
    } else if (sum > this.state.currentScore) {
      this.setState({
        currentScore: sum
      })
    }
  }
  render() {
    const board = this.state.game.slice();
    const isBoardFull = board.reduce((acc, cur)=>{
      const isCurrentRowFull = cur.every(col => col !== 0);
      return acc & isCurrentRowFull; 
    }, true);
    if(isBoardFull) this.resetBoard();
    
    return (
      <div className="container" ref={app => this.app = app}>
        <Score board={board} current={this.state.currentScore} high={this.state.highScore}/>
        <Board board={board}/>
        <Controls />
      </div>
    )
  }
}

export default Game
