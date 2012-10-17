var Game = function() {
  this.board_size = 10;
  this.player = new Player(this.board_size);
  this.enemy;
  this.state = 'setup';
};
Game.prototype.create_setup_board = function(jq_container) {
  var board = new Board(this, this.board_size, true);
  jq_container.append(board.render().el);
};
Game.prototype.board_click = function(x, y) {
  if(this.state === 'setup'){
    this.add_ship(x, y);
  } else if(this.state === 'play'){
    if(this.enemy.board[y][x] === 1){
      jQuery(jQuery('td', jQuery(jQuery('#enemy-board').find('tr')[y]))[x]).addClass('hit');
    } else{
      jQuery(jQuery('td', jQuery(jQuery('#enemy-board').find('tr')[y]))[x]).addClass('miss');
    };
  }
};
Game.prototype.add_ship = function(x, y) {
  var ship_type = jQuery('#game-setup .ships input[name=ship-select]:checked').val(),
      ship_orientation = jQuery('#game-setup .orientations input[name=ship-orientation]:checked').val(),
      new_ship = jQuery('<span class="ship-img ship-img-' + ship_type + '"></span>'),
      row = jQuery(jQuery('#game-setup .board tr')[y]);
      cell = jQuery(jQuery('td', row)[x]);
  if(ship_orientation === 'vertical'){
    new_ship.addClass('vertical');
  }
  var remaining = this.player.remaining_ships[ship_type];
  if(remaining === 0){
  } else{
    var ship_width = ship_orientation === 'vertical' ? 1 : +ship_type,
        ship_height = ship_orientation === 'vertical' ? +ship_type : 1,
        is_occupied = false;
    for(var hy = 0; hy < ship_height; hy += 1){
      if(is_occupied) break;
      for(var wx = 0; wx < ship_width; wx += 1){
        if(this.player.board[hy + y][wx + x] === 1){
          is_occupied = true;
          break;
        };
      }
    }
    if(is_occupied === false){
      cell.append(new_ship);
      this.player.remaining_ships[ship_type] -= 1;
      jQuery('#game-setup .ships input[name=ship-select]:checked').parent().find('.remaining').html(this.player.remaining_ships[ship_type]);
      var all_placed = true;
      for(var ship in this.player.remaining_ships){
        if(this.player.remaining_ships[ship] > 0){
          all_placed = false;
        }
      }
      if(all_placed === true){
        jQuery('#start-game-btn').removeAttr('disabled');
        this.state = 'play';
      }
      for(var hy = 0; hy < ship_height; hy += 1){
        if(is_occupied) break;
        for(var wx = 0; wx < ship_width; wx += 1){
          this.player.board[hy + y][wx + x] = 1;
        }
      }
    }
  }
};
Game.prototype.start_game = function() {
  jQuery('#game-setup').css({'display': 'none'});
  jQuery('#game-play').css({'display': 'block'});

  var player_board = new Board(this, this.board_size, false);
  jQuery('#player-board').append(player_board.render().el);
  player_board.populate(this.player.board);

  this.enemy = new Player();
  this.enemy.board = this.player.board.reverse();

  var enemy_board = new Board(this, this.board_size, true);
  jQuery('#enemy-board').append(enemy_board.render().el);
};