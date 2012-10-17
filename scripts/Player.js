var Player = function(board_size) {
  this.board_size = board_size;
  this.remaining_ships = {
    4: 1,
    3: 1,
    2: 1
  };
  this.ships = {
    4: 0,
    3: 0,
    2: 0
  };
  this.board = this.initialize_board();
};
Player.prototype.initialize_board = function() {
  var board = [];
  for(var y = 0, yl = xl = this.board_size, x; y < yl; y += 1){
    board[y] = [];
    for(x = 0; x < xl; x += 1){
      board[y][x] = 0;
    }
  }
  return board;
};