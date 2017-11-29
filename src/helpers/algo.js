export default (b) => {
  const board = b.slice();
  for(let i = 0; i< 4; i++){
    for(let j = 0; j < 3; j++){
      if(board[j] === board[j+1] || board[j+1] === 0){
        board[j+1] += board[j];
        board[j] = 0;
      }
    }
  }  
  return board;
}