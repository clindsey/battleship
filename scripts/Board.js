var Board = function(game, size, active) {
  this.game = game;
  this.size = size;
  this.table;
  this.active = active;
};
Board.prototype.render = function() {
  this.table = jQuery('<table></table>');
  this.create_rows(this.table);
  return {el: this.table};
};
Board.prototype.create_rows = function(table) {
  for(var y = 0, yl = this.size; y < yl; y += 1){
    var tr = jQuery('<tr></tr>');
    this.create_columns(tr, y);
    table.append(tr);
  }
};
Board.prototype.create_columns = function(row, row_index) {
  var self = this;
  for(var x = 0, xl = this.size; x < xl; x += 1){
    var td = jQuery('<td></td>');
    if(this.active === true){
      (function(x, y) {
        td.click(function() {
          self.game.board_click(x, y);
        });
      })(x, row_index);
    }
    row.append(td);
  }
};
Board.prototype.populate = function(board_data) {
  for(var y = 0; y < board_data.length; y += 1){
    for(var x = 0; x < board_data[y].length; x += 1){
      if(board_data[y][x] === 1){
        jQuery(jQuery('td', jQuery(this.table.find('tr')[y]))[x]).addClass('occupied');
      }
    }
  }
};