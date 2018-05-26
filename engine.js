var alphabet = ['A','B','C','D','E','F','G','H'];
var letters = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7};

function test1() {
	cb.rotate();
	if(gm.turn==1) gm.turn = 0;
	else gm.turn = 1;
}

class game_manager {
	constructor() {
		this.firstPlayer = 1;
		this.turn = 1;
		this.gameType = 1;
		this.whiteName = 'Biały';
		this.blackName = 'Czarny';
		this.diary = '#gameDiary';
		this.canChangeTurn = true;
		this.turns = 0;
		this.canControl = true;
		this.diaryList = new Array();
		this.moreBackMove = false;
	}
	addLog(log) {
		$(this.diary).append(log);
	}
	resetLog() {
		$(this.diary).html('');
	}
	restart() {
		if(this.turn!=1) {
			cb.rotate();
		}
		
		gm = new game_manager();
		sm = new style_manager();
		mm = new menu_manager();
		cb = new chessboard();
		msm = new moveSimulation_manager();
		
		whitePawn1 = new figure('pawn',1,'whitePawn1');
		whitePawn2 = new figure('pawn',1,'whitePawn2');
		whitePawn3 = new figure('pawn',1,'whitePawn3');
		whitePawn4 = new figure('pawn',1,'whitePawn4');
		whitePawn5 = new figure('pawn',1,'whitePawn5');
		whitePawn6 = new figure('pawn',1,'whitePawn6');
		whitePawn7 = new figure('pawn',1,'whitePawn7');
		whitePawn8 = new figure('pawn',1,'whitePawn8');
		whiteTower1 = new figure('tower',1,'whiteTower1');
		whiteTower2 = new figure('tower',1,'whiteTower2');
		whiteHorse1 = new figure('horse',1,'whiteHorse1');
		whiteHorse2 = new figure('horse',1,'whiteHorse2');
		whiteLaufer1 = new figure('laufer',1,'whiteLaufer1');
		whiteLaufer2 = new figure('laufer',1,'whiteLaufer2');
		whiteHetman = new figure('hetman',1,'whiteHetman');
		whiteKing = new figure('king',1,'whiteKing');

		blackPawn1 = new figure('pawn',0,'blackPawn1');
		blackPawn2 = new figure('pawn',0,'blackPawn2');
		blackPawn3 = new figure('pawn',0,'blackPawn3');
		blackPawn4 = new figure('pawn',0,'blackPawn4');
		blackPawn5 = new figure('pawn',0,'blackPawn5');
		blackPawn6 = new figure('pawn',0,'blackPawn6');
		blackPawn7 = new figure('pawn',0,'blackPawn7');
		blackPawn8 = new figure('pawn',0,'blackPawn8');
		blackTower1 = new figure('tower',0,'blackTower1');
		blackTower2 = new figure('tower',0,'blackTower2');
		blackHorse1 = new figure('horse',0,'blackHorse1');
		blackHorse2 = new figure('horse',0,'blackHorse2');
		blackLaufer1 = new figure('laufer',0,'blackLaufer1');
		blackLaufer2 = new figure('laufer',0,'blackLaufer2');
		blackHetman = new figure('hetman',0,'blackHetman');
		blackKing = new figure('king',0,'blackKing');
		
		$(cb.classFigure).remove();
		$(cb.classDeadFigure).remove();
		
		this.newGame();	
	}
	newGame() {
		
		whitePawn1.active();
		whitePawn2.active();
		whitePawn3.active();
		whitePawn4.active();
		whitePawn5.active();
		whitePawn6.active();
		whitePawn7.active();
		whitePawn8.active();
		whiteTower1.active();
		whiteTower2.active();
		whiteHorse1.active();
		whiteHorse2.active();
		whiteLaufer1.active();
		whiteLaufer2.active();
		whiteHetman.active();
		whiteKing.active();
		
		blackPawn1.active();
		blackPawn2.active();
		blackPawn3.active();
		blackPawn4.active();
		blackPawn5.active();
		blackPawn6.active();
		blackPawn7.active();
		blackPawn8.active();
		blackTower1.active();
		blackTower2.active();
		blackHorse1.active();
		blackHorse2.active();
		blackLaufer1.active();
		blackLaufer2.active();
		blackHetman.active();
		blackKing.active();
		
		setTimeout(function(){
			whitePawn1.move('G1');
			whitePawn2.move('G2');
			whitePawn3.move('G3');
			whitePawn4.move('G4');
			whitePawn5.move('G5');
			whitePawn6.move('G6');
			whitePawn7.move('G7');
			whitePawn8.move('G8');
			whiteTower1.move('H1');
			whiteTower2.move('H8');
			whiteHorse1.move('H2');
			whiteHorse2.move('H7');
			whiteLaufer1.move('H3');
			whiteLaufer2.move('H6');
			whiteHetman.move('H4');
			whiteKing.move('H5');
			
			blackPawn1.move('B1');
			blackPawn2.move('B2');
			blackPawn3.move('B3');
			blackPawn4.move('B4');
			blackPawn5.move('B5');
			blackPawn6.move('B6');
			blackPawn7.move('B7');
			blackPawn8.move('B8');
			blackTower1.move('A1');
			blackTower2.move('A8');
			blackHorse1.move('A2');
			blackHorse2.move('A7');
			blackLaufer1.move('A3');
			blackLaufer2.move('A6');
			blackHetman.move('A4');
			blackKing.move('A5');
		},0);
	}
	endGame() {
		if(cb.whiteCheck==true || cb.blackCheck==true) alert('Szach Mat');
		else alert('Pat');
	}
	nextTurn() {
		this.moreBackMove = false;
		if(cb.checkKing(1)==false) {
			if(this.canChangeTurn==true) {
				cb.whiteCheck=false;
				cb.blackCheck=false;
				this.showLastEntry();
				if(this.gameType==1) {
					cb.rotate();
				}
				cb.checkKing(0);
				if(this.turn==1) this.turn=0;
				else this.turn=1;
				if(this.turn==1) msm.baseCheck(1);
				else msm.baseCheck(0);
			}
		} else {
			this.backMove();
			this.resetLog();
			this.addLog('Zły ruch, król jest szachowany!');
			if(this.turn==1) $('#'+whiteKing.id).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
			else $('#'+blackKing.id).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
		}
		
	}
	backMove() {
		var backMoves = null;
		if(this.moreBackMove==false) backMoves = 2;
		else backMoves = 1;
		var entry = this.diaryList[this.diaryList.length-1];
		this.diaryList.splice(this.diaryList.length-1);
		if(entry.type=='move') {
			eval(cb.squares[letters[entry.toId[0]]][(entry.toId[1]-1)]).move(entry.fromId);
			eval(cb.squares[letters[entry.fromId[0]]][(entry.fromId[1]-1)]).moves-=backMoves;
		}
		if(entry.type=='attack') {
			eval(cb.squares[letters[entry.toId[0]]][(entry.toId[1]-1)]).move(entry.fromId);
			eval(cb.squares[letters[entry.fromId[0]]][(entry.fromId[1]-1)]).moves-=backMoves;
			$('#'+cb.deads[cb.deads.length-1]).fadeIn(500);
			eval(cb.deads[cb.deads.length-1]).move(entry.toId);
			$('#dead'+cb.deads[cb.deads.length-1]).fadeOut(400);
			setTimeout(function(){
				$('#dead'+cb.deads[cb.deads.length-1]).remove();
				cb.deads.splice(cb.deads.length-1);
			},400);
		}
		if(entry.type=='castling') {
			eval(cb.squares[letters[entry.toId[0]]][(entry.toId[1]-1)]).move(entry.fromId);
			eval(cb.squares[letters[entry.fromId[0]]][(entry.fromId[1]-1)]).moves-=backMoves;
			if(entry.color==1) {
				if(entry.toId=='H3') {
					whiteTower1.move('H1');
					whiteTower1.moves-=backMoves;
				} else {
					whiteTower2.move('H8');
					whiteTower2.moves-=backMoves;
				}
			} else {
				if(entry.toId=='A3') {
					blackTower1.move('A1');
					blackTower1.moves-=backMoves;
				} else {
					blackTower2.move('A8');
					blackTower2.moves-=backMoves;
				}
			}
		}
		this.moreBackMove = true;
	}
	showLastEntry() {
		this.resetLog();
		if(this.diaryList[this.diaryList.length-1].color==1)
			this.addLog('Białe: ');
		else this.addLog('Czarne: ');
		if(this.diaryList[this.diaryList.length-1].type=='move')
			this.addLog('ruch z ');
		else if(this.diaryList[this.diaryList.length-1].type=='attack')
			this.addLog('bicie z ');
		if(this.diaryList[this.diaryList.length-1].type=='castling')
			this.addLog('król wykonuje roszadę z ');
		this.addLog(this.diaryList[this.diaryList.length-1].fromId);
		this.addLog(' na ');
		this.addLog(this.diaryList[this.diaryList.length-1].toId);
		this.addLog('.');
	}
}
class style_manager {
	constructor() {
		this.styleName = 'classic';
		this.whiteBorder = 'skins/classic/numberWhiteTurn.png';
		this.blackBorder = 'skins/classic/numberBlackTurn.png';
		this.whiteSquare = 'skins/classic/bialy.png';
		this.blackSquare = 'skins/classic/czarny.png';
		this.squareHoverColor = '#a39f3c';
		this.figureFocusColor = '#317cf7';
		this.figureAttackColor = '#ff0000';
		this.textColor = '#fff';
		this.textShadowCmentary = '#0e4f3c';
		this.textColorCmentary = '#4c605a';
		this.figureImage = {
			whitePawn : 'skins/classic/pion1.png',		blackPawn : 'skins/classic/pion2.png',
			whiteTower : 'skins/classic/wieza1.png',	blackTower : 'skins/classic/wieza2.png',
			whiteHorse : 'skins/classic/kon1.png',		blackHorse : 'skins/classic/kon2.png',
			whiteLaufer : 'skins/classic/laufer1.png',	blackLaufer : 'skins/classic/laufer2.png',
			whiteHetman : 'skins/classic/hetman1.png',	blackHetman : 'skins/classic/hetman2.png',
			whiteKing : 'skins/classic/krol1.png',		blackKing : 'skins/classic/krol2.png'
		}
		
	}
	updateStyle() {
		$(mm.gameWrapper).css('color',this.textColor);
		$(cb.classWaitForPromote).css('color',this.textColorCmentary);
		$(cb.classWaitForPromote).css('text-shadow','0 0 0.5vw '+this.textShadowCmentary);
	}
	updateHoverEffects() {
		$(cb.classSquare).hover(function(){
			if(cb.moves.indexOf(this.id) == -1)
				$(this).css('box-shadow','inset 0 0 5vmin '+sm.squareHoverColor);
		},function(){
			if(cb.moves.indexOf(this.id) == -1)
				$(this).css('box-shadow','none');
		});
	}
}

class menu_manager {
	constructor() {
		this.state = 1;
		this.isOpen = false;
		this.target = '#menuWrapper';
		this.openButton = '#menuButton';
		this.gameWrapper = '#gameWrapper';
	}
	openClose() {
		if(this.state == 0 && this.isOpen == false) {
			$(this.target).css('top','0vh');
			$(this.gameWrapper).css('top','100vh');
			$(this.openButton).html('▲');
			this.isOpen = true;
		}
		else if(this.state == 1 && this.isOpen == false) {
			$(this.target).css('top','-85vh');
			$(this.openButton).html('▲');
			this.isOpen = true;
		}
		else if(this.isOpen == true) {
			$(this.target).css('top','-95vh');
			$(this.gameWrapper).css('top','5vh');
			$(this.openButton).html('▼');
			this.isOpen = false;	
		}
	}
}

class chessboard {
	constructor() {
		this.border = '#chessboard';
		this.target = '#squeresWrapper';
		this.whiteStat = '#whiteStat';
		this.blackStat = '#blackStat';
		this.classSquare = '.square';
		this.classFigure = '.figure';
		this.whiteName = '#whiteName';
		this.blackName = '#blackName';
		this.classDeadFigure = '.deadFigure';
		this.classWaitForPromote = '.waitForPromote';
		this.whiteCmentary = '#whiteCmentary';
		this.blackCmentary = '#blackCmentary';
		this.selected = null;
		this.whiteCheck = false;
		this.blackCheck = false;
		this.squares = [
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null]
		];
		this.deads = new Array();
		this.deadsToPromotion = new Array();
		this.promotionFigure = null;
		this.moves = new Array();
		this.attacks = new Array();
		this.castlingMoves = new Array();
	}
	activeMove() {
		$(this.classSquare).click(function(){
			if(cb.selected!=null && cb.moves.indexOf(this.id)!= -1) {
				var id = this.id;
				var selected = cb.selected;
				var entry = {
					color: gm.turn,
					type: 'move',
					fromId: eval(selected).pos.id,
					toId: id
				};
				gm.diaryList.push(entry);
				eval(cb.selected).move(this.id);
				setTimeout(function(){
					if(eval(selected).type=='pawn' && id[0]=='A') cb.toPromotion(1,selected);
					if(eval(selected).type=='pawn' && id[0]=='H') cb.toPromotion(0,selected);
					if(!(eval(selected).type=='pawn' && (id[0]=='H' || id[0]=='A'))) gm.nextTurn();
				},500);
				
			}
		}); 
	}
	toPromotion(color,figure) {
		if((color==1 && cb.whiteCheck==false)||(color==0 && cb.blackCheck==false)) {
			gm.canControl = false;
			if(this.deads.length>0) {
				this.deads.forEach(function(el){
					if(eval(el).color==color && eval(el).type != 'pawn') {
						cb.deadsToPromotion.push(el);
					}
				});
				if(this.deadsToPromotion.length==0) {
					gm.canControl = true;
					gm.nextTurn();
				} else {
					this.deadsToPromotion.forEach(function(el){
						$('#dead'+el).css('box-shadow','inset 0 0 2.5vmin '+sm.squareHoverColor);
					});
					this.promotionFigure = figure;
					if(color==1) $(cb.whiteCmentary+' > '+cb.classWaitForPromote).css('font-size','1.5vw');
					else $(cb.blackCmentary+' > '+cb.classWaitForPromote).css('font-size','1.5vw');
				}
			} else {
				gm.canControl = true;
				gm.nextTurn();
			}
		} else gm.nextTurn();
	}
	promote(handler) {
		if(this.deadsToPromotion.indexOf(handler.id.slice(4))!=-1) {
			$('#'+this.promotionFigure).fadeOut(500);
			$('#'+handler.id).fadeOut(400);
			$(this.classWaitForPromote).css('font-size','0vw');
			this.deadsToPromotion.forEach(function(el){
				$('#dead'+el).css('box-shadow','none');
			});
			this.deadsToPromotion.splice(0);
			eval(cb.promotionFigure).dead();
			eval(handler.id.slice(4)).move(eval(this.promotionFigure).pos.id);
			eval(handler.id.slice(4)).health = 1;
			var id = handler.id.slice(4);
			setTimeout(function(){
				$('#'+id).fadeIn(500);
				$('#'+handler.id).remove();
			},400);
			setTimeout(function(){
				gm.canControl = true;
				gm.nextTurn();
				cb.promotionFigure = null;
			},1000);
		}
	}
	checkKing(when) {
		var check = false;
		var forColor = gm.turn;
		if(when==0) {
			if(forColor==1) forColor = 0;
			else forColor = 1;
		}
		if(forColor==1) {
			if(whiteKing.pos.y>0) {
				if(this.squares[whiteKing.pos.y-1][whiteKing.pos.x-1]!=null)
					if(eval(this.squares[whiteKing.pos.y-1][whiteKing.pos.x-1]).color != forColor && eval(this.squares[whiteKing.pos.y-1][whiteKing.pos.x-1]).type=='pawn') 
						check = true;
				if(this.squares[whiteKing.pos.y-1][whiteKing.pos.x+1]!=null)
					if(eval(this.squares[whiteKing.pos.y-1][whiteKing.pos.x+1]).color != forColor && eval(this.squares[whiteKing.pos.y-1][whiteKing.pos.x+1]).type=='pawn') 
						check = true;
			}
			
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.y-i>-1) {
					if(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x]!=null) {
						if(eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x]).type=='tower' || eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.y+i<8) {
					if(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x]!=null) {
						if(eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x]).type=='tower' || eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.x-i>-1) {
					if(cb.squares[whiteKing.pos.y][whiteKing.pos.x-i]!=null) {
						if(eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x-i]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x-i]).type=='tower' || eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.x+i<8) {
					if(cb.squares[whiteKing.pos.y][whiteKing.pos.x+i]!=null) {
						if(eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x+i]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x+i]).type=='tower' || eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.x+i<8 && whiteKing.pos.y+i<8) {
					if(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x+i]!=null) {
						if(eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x+i]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x+i]).type=='laufer' || eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.x-i>-1 && whiteKing.pos.y-i>-1) {
					if(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x-i]!=null) {
						if(eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x-i]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x-i]).type=='laufer' || eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.x-i>-1 && whiteKing.pos.y+i<8) {
					if(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x-i]!=null) {
						if(eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x-i]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x-i]).type=='laufer' || eval(cb.squares[whiteKing.pos.y+i][whiteKing.pos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKing.pos.x+i<8 && whiteKing.pos.y-i>-1) {
					if(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x+i]!=null) {
						if(eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x+i]).color!=forColor) {
							if(eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x+i]).type=='laufer' || eval(cb.squares[whiteKing.pos.y-i][whiteKing.pos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			if(whiteKing.pos.x>1 && whiteKing.pos.y>0) {
				if(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x-2]!=null)
					if(eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x-2]).color!=forColor && eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x-2]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x>0 && whiteKing.pos.y>1) {
				if(cb.squares[whiteKing.pos.y-2][whiteKing.pos.x-1]!=null)
					if(eval(cb.squares[whiteKing.pos.y-2][whiteKing.pos.x-1]).color!=forColor && eval(cb.squares[whiteKing.pos.y-2][whiteKing.pos.x-1]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x<6 && whiteKing.pos.y<7) {
				if(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x+2]!=null)
					if(eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x+2]).color!=forColor && eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x+2]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x<7 && whiteKing.pos.y<6) {
				if(cb.squares[whiteKing.pos.y+2][whiteKing.pos.x+1]!=null)
					if(eval(cb.squares[whiteKing.pos.y+2][whiteKing.pos.x+1]).color!=forColor && eval(cb.squares[whiteKing.pos.y+2][whiteKing.pos.x+1]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x>1 && whiteKing.pos.y<7) {
				if(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x-2]!=null)
					if(eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x-2]).color!=forColor && eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x-2]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x>0 && whiteKing.pos.y<6) {
				if(cb.squares[whiteKing.pos.y+2][whiteKing.pos.x-1]!=null)
					if(eval(cb.squares[whiteKing.pos.y+2][whiteKing.pos.x-1]).color!=forColor && eval(cb.squares[whiteKing.pos.y+2][whiteKing.pos.x-1]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x<6 && whiteKing.pos.y>0) {
				if(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x+2]!=null)
					if(eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x+2]).color!=forColor && eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x+2]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x<7 && whiteKing.pos.y>1) {
				if(cb.squares[whiteKing.pos.y-2][whiteKing.pos.x+1]!=null)
					if(eval(cb.squares[whiteKing.pos.y-2][whiteKing.pos.x+1]).color!=forColor && eval(cb.squares[whiteKing.pos.y-2][whiteKing.pos.x+1]).type=='horse')
						check = true;
			}
			if(whiteKing.pos.x>0) {
				if(cb.squares[whiteKing.pos.y][whiteKing.pos.x-1]!=null)
					if(eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x-1]).type=='king')
						check = true;
			}
			if(whiteKing.pos.x<7) {
				if(cb.squares[whiteKing.pos.y][whiteKing.pos.x+1]!=null)
					if(eval(cb.squares[whiteKing.pos.y][whiteKing.pos.x+1]).type=='king')
						check = true;
			}
			if(whiteKing.pos.y>0) {
				if(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x]!=null)
					if(eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x]).type=='king')
						check = true;
			}
			if(whiteKing.pos.y<7) {
				if(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x]!=null)
					if(eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x]).type=='king')
						check = true;
			}
			if(whiteKing.pos.x>0 && whiteKing.pos.y>0) {
				if(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x-1]!=null)
					if(eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x-1]).type=='king')
						check = true;
			}
			if(whiteKing.pos.x<7 && whiteKing.pos.y<7) {
				if(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x+1]!=null)
					if(eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x+1]).type=='king')
						check = true;
			}
			if(whiteKing.pos.y>0 && whiteKing.pos.x<7) {
				if(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x+1]!=null)
					if(eval(cb.squares[whiteKing.pos.y-1][whiteKing.pos.x+1]).type=='king')
						check = true;
			}
			if(whiteKing.pos.y<7 && whiteKing.pos.x>0) {
				if(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x-1]!=null)
					if(eval(cb.squares[whiteKing.pos.y+1][whiteKing.pos.x-1]).type=='king')
						check = true;
			}
			
			if(when==0 && check==true) {
				this.whiteCheck = true;
				$('#'+whiteKing.id).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
				gm.addLog(' Król jest szachowany!');
				return true;
			}
			if(when==1 && check==true) return true;
		} else {
			if(blackKing.pos.y<7) {
				if(this.squares[blackKing.pos.y+1][blackKing.pos.x-1]!=null)
					if(eval(this.squares[blackKing.pos.y+1][blackKing.pos.x-1]).color != forColor && eval(this.squares[blackKing.pos.y+1][blackKing.pos.x-1]).type=='pawn') 
						check = true;
				if(this.squares[blackKing.pos.y+1][blackKing.pos.x+1]!=null)
					if(eval(this.squares[blackKing.pos.y+1][blackKing.pos.x+1]).color != forColor && eval(this.squares[blackKing.pos.y+1][blackKing.pos.x+1]).type=='pawn') 
						check = true;
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.y-i>-1) {
					if(cb.squares[blackKing.pos.y-i][blackKing.pos.x]!=null) {
						if(eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x]).type=='tower' || eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.y+i<8) {
					if(cb.squares[blackKing.pos.y+i][blackKing.pos.x]!=null) {
						if(eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x]).type=='tower' || eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.x-i>-1) {
					if(cb.squares[blackKing.pos.y][blackKing.pos.x-i]!=null) {
						if(eval(cb.squares[blackKing.pos.y][blackKing.pos.x-i]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y][blackKing.pos.x-i]).type=='tower' || eval(cb.squares[blackKing.pos.y][blackKing.pos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.x+i<8) {
					if(cb.squares[blackKing.pos.y][blackKing.pos.x+i]!=null) {
						if(eval(cb.squares[blackKing.pos.y][blackKing.pos.x+i]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y][blackKing.pos.x+i]).type=='tower' || eval(cb.squares[blackKing.pos.y][blackKing.pos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.x+i<8 && blackKing.pos.y+i<8) {
					if(cb.squares[blackKing.pos.y+i][blackKing.pos.x+i]!=null) {
						if(eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x+i]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x+i]).type=='laufer' || eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.x-i>-1 && blackKing.pos.y-i>-1) {
					if(cb.squares[blackKing.pos.y-i][blackKing.pos.x-i]!=null) {
						if(eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x-i]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x-i]).type=='laufer' || eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.x-i>-1 && blackKing.pos.y+i<8) {
					if(cb.squares[blackKing.pos.y+i][blackKing.pos.x-i]!=null) {
						if(eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x-i]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x-i]).type=='laufer' || eval(cb.squares[blackKing.pos.y+i][blackKing.pos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKing.pos.x+i<8 && blackKing.pos.y-i>-1) {
					if(cb.squares[blackKing.pos.y-i][blackKing.pos.x+i]!=null) {
						if(eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x+i]).color!=forColor) {
							if(eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x+i]).type=='laufer' || eval(cb.squares[blackKing.pos.y-i][blackKing.pos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			if(blackKing.pos.x>1 && blackKing.pos.y>0) {
				if(cb.squares[blackKing.pos.y-1][blackKing.pos.x-2]!=null)
					if(eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x-2]).color!=forColor && eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x-2]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x>0 && blackKing.pos.y>1) {
				if(cb.squares[blackKing.pos.y-2][blackKing.pos.x-1]!=null)
					if(eval(cb.squares[blackKing.pos.y-2][blackKing.pos.x-1]).color!=forColor && eval(cb.squares[blackKing.pos.y-2][blackKing.pos.x-1]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x<6 && blackKing.pos.y<7) {
				if(cb.squares[blackKing.pos.y+1][blackKing.pos.x+2]!=null)
					if(eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x+2]).color!=forColor && eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x+2]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x<7 && blackKing.pos.y<6) {
				if(cb.squares[blackKing.pos.y+2][blackKing.pos.x+1]!=null)
					if(eval(cb.squares[blackKing.pos.y+2][blackKing.pos.x+1]).color!=forColor && eval(cb.squares[blackKing.pos.y+2][blackKing.pos.x+1]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x>1 && blackKing.pos.y<7) {
				if(cb.squares[blackKing.pos.y+1][blackKing.pos.x-2]!=null)
					if(eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x-2]).color!=forColor && eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x-2]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x>0 && blackKing.pos.y<6) {
				if(cb.squares[blackKing.pos.y+2][blackKing.pos.x-1]!=null)
					if(eval(cb.squares[blackKing.pos.y+2][blackKing.pos.x-1]).color!=forColor && eval(cb.squares[blackKing.pos.y+2][blackKing.pos.x-1]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x<6 && blackKing.pos.y>0) {
				if(cb.squares[blackKing.pos.y-1][blackKing.pos.x+2]!=null)
					if(eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x+2]).color!=forColor && eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x+2]).type=='horse')
						check = true;
			}
			if(blackKing.pos.x<7 && blackKing.pos.y>1) {
				if(cb.squares[blackKing.pos.y-2][blackKing.pos.x+1]!=null)
					if(eval(cb.squares[blackKing.pos.y-2][blackKing.pos.x+1]).color!=forColor && eval(cb.squares[blackKing.pos.y-2][blackKing.pos.x+1]).type=='horse')
						check = true;
			}
			
			if(blackKing.pos.x>0) {
				if(cb.squares[blackKing.pos.y][blackKing.pos.x-1]!=null)
					if(eval(cb.squares[blackKing.pos.y][blackKing.pos.x-1]).type=='king')
						check = true;
			}
			if(blackKing.pos.x<7) {
				if(cb.squares[blackKing.pos.y][blackKing.pos.x+1]!=null)
					if(eval(cb.squares[blackKing.pos.y][blackKing.pos.x+1]).type=='king')
						check = true;
			}
			if(blackKing.pos.y>0) {
				if(cb.squares[blackKing.pos.y-1][blackKing.pos.x]!=null)
					if(eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x]).type=='king')
						check = true;
			}
			if(blackKing.pos.y<7) {
				if(cb.squares[blackKing.pos.y+1][blackKing.pos.x]!=null)
					if(eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x]).type=='king')
						check = true;
			}
			if(blackKing.pos.x>0 && blackKing.pos.y>0) {
				if(cb.squares[blackKing.pos.y-1][blackKing.pos.x-1]!=null)
					if(eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x-1]).type=='king')
						check = true;
			}
			if(blackKing.pos.x<7 && blackKing.pos.y<7) {
				if(cb.squares[blackKing.pos.y+1][blackKing.pos.x+1]!=null)
					if(eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x+1]).type=='king')
						check = true;
			}
			if(blackKing.pos.y>0 && blackKing.pos.x<7) {
				if(cb.squares[blackKing.pos.y-1][blackKing.pos.x+1]!=null)
					if(eval(cb.squares[blackKing.pos.y-1][blackKing.pos.x+1]).type=='king')
						check = true;
			}
			if(blackKing.pos.y<7 && blackKing.pos.x>0) {
				if(cb.squares[blackKing.pos.y+1][blackKing.pos.x-1]!=null)
					if(eval(cb.squares[blackKing.pos.y+1][blackKing.pos.x-1]).type=='king')
						check = true;
			}
			
			if(when==0 && check==true) {
				this.blackCheck = true;
				$('#'+blackKing.id).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
				gm.addLog(' Król jest szachowany!');
				return true;
			}
			if(when==1 && check==true) return true;
		}
		return false;
	}
	ifKingCheck(figureID) {
		var check = false;
		if(gm.turn==1 && cb.whiteCheck==true) check = true;
		if(gm.turn==0 && cb.blackCheck==true) check = true;
		var check2 = false;
		if(eval(figureID).color==gm.turn && eval(figureID).type=='king' && check==true) check2 = true;
		return check2;
	}
	showChessboard() {
		$(this.border).css('background-image','url('+"'"+sm.whiteBorder+"'"+')');
		for(var i=0;i<64;i++) {
			if((i%8)%2==0)	{
				if(Math.floor(i/8)%2==0) {
					$(this.target).append('<div class="'+this.classSquare.slice(1)+'" '+
					'id="'+(alphabet[Math.floor(i/8)]+(i%8+1))+'" '+
					'style="background-image: url('+"'"+sm.whiteSquare+"'"+'); '+
					'top: '+(Math.floor(i/8)*10)+'vmin; left: '+((i%8)*10)+'vmin;"></div>');
				}
				else {
					$(this.target).append('<div class="'+this.classSquare.slice(1)+'" '+
					'id="'+(alphabet[Math.floor(i/8)]+(i%8+1))+'" '+
					'style="background-image: url('+"'"+sm.blackSquare+"'"+'); '+
					'top: '+(Math.floor(i/8)*10)+'vmin; left: '+((i%8)*10)+'vmin;"></div>');
				}
			}
			else {
				if(Math.floor(i/8)%2==0) {
					$(this.target).append('<div class="'+this.classSquare.slice(1)+'" '+
					'id="'+(alphabet[Math.floor(i/8)]+(i%8+1))+'" '+
					'style="background-image: url('+"'"+sm.blackSquare+"'"+'); '+
					'top: '+(Math.floor(i/8)*10)+'vmin; left: '+((i%8)*10)+'vmin;"></div>');
				}
				else {
					$(this.target).append('<div class="'+this.classSquare.slice(1)+'" '+
					'id="'+(alphabet[Math.floor(i/8)]+(i%8+1))+'" '+
					'style="background-image: url('+"'"+sm.whiteSquare+"'"+'); '+
					'top: '+(Math.floor(i/8)*10)+'vmin; left: '+((i%8)*10)+'vmin;"></div>');
				}
			}
		}
		this.updateStat();
	}
	updateStat() {
		$(this.blackName).html(gm.blackName);
		$(this.whiteName).html(gm.whiteName);
	}
	rotate() {
		if(gm.turn==0) {
			$(this.target).css('transform','rotate(0deg)');
			$(this.classFigure).css('transform','rotate(0deg)');
			$(this.border).css('background-image','url('+"'"+sm.whiteBorder+"'"+')');
		} else {
			$(this.target).css('transform','rotate(180deg)');
			$(this.classFigure).css('transform','rotate(-180deg)');
			$(this.border).css('background-image','url('+"'"+sm.blackBorder+"'"+')');
		}
	}
	showMoves() {
		this.moves.forEach(function(el){
			$('#'+el).css('box-shadow','inset 0 0 5vmin '+sm.figureFocusColor);
		});
		this.attacks.forEach(function(el){
			$('#'+cb.squares[letters[el[0]]][el[1]-1]).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
		});
		this.castlingMoves.forEach(function(el){
			$('#'+cb.squares[letters[el[0]]][el[1]-1]).css('box-shadow','inset 0 0 5vmin '+sm.figureFocusColor);
		});
	}
	cancelMoves() {
		$(this.classSquare).css('box-shadow','none');
		$(this.classFigure).css('box-shadow','none');
		$('#'+cb.selected).css('box-shadow','inset 0 0 5vmin '+sm.figureFocusColor);
		this.moves.splice(0,this.moves.length);
		this.attacks.splice(0,this.attacks.length);
		this.castlingMoves.splice(0,this.castlingMoves.length);
		cb.castlingInit = null;
	}
}

class figure {
	constructor(type,color,id) {
		this.type = type;
		this.color = color;
		this.id = id;
		this.health = 1;
		this.pos = {x:0,y:0,id:'00'};
		this.moves = 0;
		this.passingAttack = false;
		if(this.color == 1) {
			switch(this.type) {
				case 'pawn': {
					this.image=sm.figureImage.whitePawn;
					break;
				}
				case 'tower': {
					this.image=sm.figureImage.whiteTower;
					break;
				}
				case 'horse': {
					this.image=sm.figureImage.whiteHorse;
					break;
				}
				case 'laufer': {
					this.image=sm.figureImage.whiteLaufer;
					break;
				}
				case 'hetman': {
					this.image=sm.figureImage.whiteHetman;
					break;
				}
				case 'king': {
					this.image=sm.figureImage.whiteKing;
					break;
				}
			}
		} else {
			switch(this.type) {
				case 'pawn': {
					this.image=sm.figureImage.blackPawn;
					break;
				}
				case 'tower': {
					this.image=sm.figureImage.blackTower;
					break;
				}
				case 'horse': {
					this.image=sm.figureImage.blackHorse;
					break;
				}
				case 'laufer': {
					this.image=sm.figureImage.blackLaufer;
					break;
				}
				case 'hetman': {
					this.image=sm.figureImage.blackHetman;
					break;
				}
				case 'king': {
					this.image=sm.figureImage.blackKing;
					break;
				}
			}
		}
	}
	dead() {
		cb.deads.push(this.id);
		this.health = 0;
		$('#'+this.id).fadeOut(500);
		cb.squares[this.pos.y][this.pos.x] = null;
		if(this.color==1) {
			$(cb.whiteCmentary).append('<div onclick = "cb.promote(this)" id="dead'+this.id+'" class="'+cb.classDeadFigure.slice(1)+'" style="background-image: url('+"'"+this.image+"'"+')"></div>');
		} else {
			$(cb.blackCmentary).append('<div onclick = "cb.promote(this)" id="dead'+this.id+'" class="'+cb.classDeadFigure.slice(1)+'" style="background-image: url('+"'"+this.image+"'"+')"></div>');
		}
		$('#dead'+this.id).css('opacity');
		$('#dead'+this.id).css('opacity','1');
	}
	active() {
		$(cb.target).append('<div class="'+cb.classFigure.slice(1)+'" id="'+this.id+'" '+
		'style="background-image: url('+"'"+this.image+"'"+'); top: 35vmin; left: 35vmin"></div>');
		
		$('#'+this.id).hover(function(){
			if(cb.selected!=this.id && cb.attacks.indexOf(eval(this.id).pos.id)==-1 && cb.castlingMoves.indexOf(eval(this.id).pos.id)==-1 && cb.ifKingCheck(this.id)==false) {
				$(this).css('box-shadow','inset 0 0 5vmin '+sm.squareHoverColor);
			}
		},function(){
			if(cb.selected!=this.id && cb.attacks.indexOf(eval(this.id).pos.id)==-1 && cb.castlingMoves.indexOf(eval(this.id).pos.id)==-1 && cb.ifKingCheck(this.id)==false) {
				$(this).css('box-shadow','none');
			}
		});
		$('#'+this.id).click(function(){
			if(gm.canControl==true) {
				if(cb.castlingMoves.indexOf(eval(this.id).pos.id)!=-1) {
					var fromId = null;
					var toId = null;
					if(gm.turn==1) fromId = 'H5';
					else fromId = 'A5';
					if(eval(this.id).pos.x==0) {
						if(gm.turn==1) {
							whiteKing.move('H3');
							toId = 'H3';
							setTimeout(function(){whiteTower1.move('H4');},400);
						} else {
							blackKing.move('A3');
							toId = 'A3';
							setTimeout(function(){blackTower1.move('A4');},400);
						}
					} else {
						if(gm.turn==1) {
							whiteKing.move('H7');
							toId = 'H7';
							setTimeout(function(){whiteTower2.move('H6');},400);
						} else {
							blackKing.move('A7');
							toId = 'A7';
							setTimeout(function(){blackTower2.move('A6');},400);
						}
					}
					setTimeout(function(){gm.nextTurn();},900);
					var entry = {
						color: gm.turn,
						type: 'castling',
						fromId: fromId,
						toId: toId
					};
					gm.diaryList.push(entry);
				}
				else if(gm.turn==eval(this.id).color) {
					if(cb.selected!=null) $('#'+cb.selected).css('box-shadow','none');
					if(this.id!=cb.selected) {
						cb.selected = this.id;
						$('#'+this.id).css('box-shadow','inset 0 0 5vmin '+sm.figureFocusColor);
						eval(this.id).showMoves();
					}
					else if(this.id==cb.selected) {
						cb.selected = null;
						cb.cancelMoves();
						$('#'+this.id).css('box-shadow','inset 0 0 5vmin '+sm.squareHoverColor);
					}
					if(gm.turn==1 && cb.whiteCheck==true) $('#'+whiteKing.id).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
					if(gm.turn==0 && cb.blackCheck==true) $('#'+blackKing.id).css('box-shadow','inset 0 0 5vmin '+sm.figureAttackColor);
				} 
				else if(cb.attacks.indexOf(eval(this.id).pos.id) != -1) {
					eval(cb.selected).attack(eval(this.id).pos.id);
				}
			}
		});
	}
	attack(id) {
		var attackedFigure = cb.squares[letters[id[0]]][(id[1]-1)];
		if(eval(attackedFigure).passingAttack==true && eval(cb.selected).pos.y==eval(attackedFigure).pos.y && eval(cb.selected).type=='pawn') {
			if(gm.turn==1) id = 'C'+id[1];
			else id = 'F'+id[1];
		}
		var fromId = eval(cb.selected).pos.id;
		eval(attackedFigure).dead();
		setTimeout(function() {
			eval(cb.selected).move(id);
		},200);
		var selected = cb.selected;
		setTimeout(function(){
			if(eval(selected).type=='pawn' && id[0]=='A') cb.toPromotion(1,selected);
			if(eval(selected).type=='pawn' && id[0]=='H') cb.toPromotion(0,selected);
			if(!(eval(selected).type=='pawn' && (id[0]=='H' || id[0]=='A'))) gm.nextTurn();
		},700);
		var entry = {
			color: gm.turn,
			type: 'attack',
			fromId: fromId,
			toId: id
		};
		gm.diaryList.push(entry);
	}
	move(id) {
		if(gm.turn==1) {
			for(var i=0; i<8;i++) {
				if(cb.squares[3][i]!=null) {
					if(eval(cb.squares[3][i]).passingAttack==true) {
						eval(cb.squares[3][i]).passingAttack=false;
					}
				}
			}
		} else {
			for(var i=0; i<8;i++) {
				if(cb.squares[4][i]!=null) {
					if(eval(cb.squares[4][i]).passingAttack==true) {
						eval(cb.squares[4][i]).passingAttack=false;
					}
				}
			}
		}
		if(this.type=='pawn' && this.moves==1 && (id[0]=='D'||id[0]=='E')) {
			this.passingAttack=true;
		}
		cb.selected = null;
		cb.cancelMoves();
		$('#'+this.id).css('box-shadow','none');
		var y = letters[id[0]]*10;
		var x = (id[1]-1)*10;
		$('#'+this.id).css('top',(y+'vmin'));
		$('#'+this.id).css('left',(x+'vmin'));
		if(this.moves>0) {
			cb.squares[this.pos.y][this.pos.x] = null;
		}
		this.pos.x = (id[1]-1);
		this.pos.y = letters[id[0]];
		var tempPosId = this.pos.id;
		this.pos.id = id;
		cb.squares[this.pos.y][this.pos.x] = this.id;
		this.moves++;
	}
	simulateMove(id) {
		var x = (id[1]-1);
		var y = letters[id[0]];
		msm.squares[this.pos.y][this.pos.x] = null;
		msm.squares[y][x] = this.id;
	}
	showMoves() {
		cb.cancelMoves();
		switch(this.type) {
			case 'pawn': {
				if(this.color==1) {
					if(this.pos.y>0)
						if(cb.squares[this.pos.y-1][this.pos.x]==null)
							cb.moves.push(alphabet[this.pos.y-1]+(this.pos.x+1));
						
					if(this.pos.y>1)
						if(cb.squares[this.pos.y-2][this.pos.x]==null && cb.squares[this.pos.y-1][this.pos.x]==null && this.moves<2)
							cb.moves.push(alphabet[this.pos.y-2]+(this.pos.x+1));
						
					if(this.pos.x>0 && this.pos.y>0)
						if(cb.squares[this.pos.y-1][this.pos.x-1]!=null)
							if(eval(cb.squares[this.pos.y-1][this.pos.x-1]).color!=gm.turn)
								cb.attacks.push(alphabet[this.pos.y-1]+this.pos.x);
							
					if(this.pos.x<7 && this.pos.y>0)
						if(cb.squares[this.pos.y-1][this.pos.x+1]!=null)	
							if(eval(cb.squares[this.pos.y-1][this.pos.x+1]).color!=gm.turn)
								cb.attacks.push(alphabet[this.pos.y-1]+(this.pos.x+2));
				} else {
					if(this.pos.y<7)
						if(cb.squares[this.pos.y+1][this.pos.x]==null)
							cb.moves.push(alphabet[this.pos.y+1]+(this.pos.x+1));
						
					if(this.pos.y<6)
						if(cb.squares[this.pos.y+2][this.pos.x]==null && cb.squares[this.pos.y+1][this.pos.x]==null && this.moves<2)
							cb.moves.push(alphabet[this.pos.y+2]+(this.pos.x+1));
						
					if(this.pos.x>0 && this.pos.y<7)
						if(cb.squares[this.pos.y+1][this.pos.x-1]!=null)
							if(eval(cb.squares[this.pos.y+1][this.pos.x-1]).color!=gm.turn)
								cb.attacks.push(alphabet[this.pos.y+1]+this.pos.x);
							
					if(this.pos.x<7 && this.pos.y<7)
						if(cb.squares[this.pos.y+1][this.pos.x+1]!=null)	
							if(eval(cb.squares[this.pos.y+1][this.pos.x+1]).color!=gm.turn)
								cb.attacks.push(alphabet[this.pos.y+1]+(this.pos.x+2));
				}
				if(this.pos.x>0)
					if(cb.squares[this.pos.y][this.pos.x-1]!=null)
						if(eval(cb.squares[this.pos.y][this.pos.x-1]).passingAttack==true && eval(cb.squares[this.pos.y][this.pos.x-1]).color!=gm.turn)
							cb.attacks.push(alphabet[this.pos.y]+(this.pos.x));
				if(this.pos.x<7)
					if(cb.squares[this.pos.y][this.pos.x+1]!=null)
						if(eval(cb.squares[this.pos.y][this.pos.x+1]).passingAttack==true && eval(cb.squares[this.pos.y][this.pos.x+1]).color!=gm.turn)
							cb.attacks.push(alphabet[this.pos.y]+(this.pos.x+2));
				break;
			}
			case 'tower': {
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x]==null)
							cb.moves.push(alphabet[this.pos.y-i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y-i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x]==null)
							cb.moves.push(alphabet[this.pos.y+i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y+i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x-i>-1) {
						if(cb.squares[this.pos.y][this.pos.x-i]==null)
							cb.moves.push(alphabet[this.pos.y]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x+i<8) {
						if(cb.squares[this.pos.y][this.pos.x+i]==null)
							cb.moves.push(alphabet[this.pos.y]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				break;
			}
			case 'horse': {
				if(this.pos.x>1 && this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x-2]==null)
						cb.moves.push(alphabet[this.pos.y-1]+(this.pos.x-1));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x-2]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-1]+(this.pos.x-1));
				}
				if(this.pos.x>0 && this.pos.y>1) {
					if(cb.squares[this.pos.y-2][this.pos.x-1]==null)
						cb.moves.push(alphabet[this.pos.y-2]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y-2][this.pos.x-1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-2]+(this.pos.x));
				}
				if(this.pos.x<6 && this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x+2]==null)
						cb.moves.push(alphabet[this.pos.y+1]+(this.pos.x+3));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x+2]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+1]+(this.pos.x+3));
				}
				if(this.pos.x<7 && this.pos.y<6) {
					if(cb.squares[this.pos.y+2][this.pos.x+1]==null)
						cb.moves.push(alphabet[this.pos.y+2]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y+2][this.pos.x+1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+2]+(this.pos.x+2));
				}
				if(this.pos.x>1 && this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x-2]==null)
						cb.moves.push(alphabet[this.pos.y+1]+(this.pos.x-1));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x-2]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+1]+(this.pos.x-1));
				}
				if(this.pos.x>0 && this.pos.y<6) {
					if(cb.squares[this.pos.y+2][this.pos.x-1]==null)
						cb.moves.push(alphabet[this.pos.y+2]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y+2][this.pos.x-1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+2]+(this.pos.x));
				}
				if(this.pos.x<6 && this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x+2]==null)
						cb.moves.push(alphabet[this.pos.y-1]+(this.pos.x+3));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x+2]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-1]+(this.pos.x+3));
				}
				if(this.pos.x<7 && this.pos.y>1) {
					if(cb.squares[this.pos.y-2][this.pos.x+1]==null)
						cb.moves.push(alphabet[this.pos.y-2]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y-2][this.pos.x+1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-2]+(this.pos.x+2));
				}
				break;
			}
			case 'laufer': {
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x-i]==null)
							cb.moves.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y+i][this.pos.x-i]==null)
							cb.moves.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y-i][this.pos.x+i]==null)
							cb.moves.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x+i]==null)
							cb.moves.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				break;
			}
			case 'hetman': {
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x-i]==null)
							cb.moves.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y+i][this.pos.x-i]==null)
							cb.moves.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y-i][this.pos.x+i]==null)
							cb.moves.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x+i]==null)
							cb.moves.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x]==null)
							cb.moves.push(alphabet[this.pos.y-i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y-i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x]==null)
							cb.moves.push(alphabet[this.pos.y+i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y+i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x-i>-1) {
						if(cb.squares[this.pos.y][this.pos.x-i]==null)
							cb.moves.push(alphabet[this.pos.y]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x+i<8) {
						if(cb.squares[this.pos.y][this.pos.x+i]==null)
							cb.moves.push(alphabet[this.pos.y]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color!=gm.turn)	{
							cb.attacks.push(alphabet[this.pos.y]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				break;
			}
			case 'king': {
				if(this.pos.x>0) {
					if(cb.squares[this.pos.y][this.pos.x-1]==null)
						cb.moves.push(alphabet[this.pos.y]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y][this.pos.x-1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y]+(this.pos.x));
				}
				if(this.pos.x<7) {
					if(cb.squares[this.pos.y][this.pos.x+1]==null)
						cb.moves.push(alphabet[this.pos.y]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y][this.pos.x+1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y]+(this.pos.x+2));
				}
				if(this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x]==null)
						cb.moves.push(alphabet[this.pos.y-1]+(this.pos.x+1));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-1]+(this.pos.x+1));
				}
				if(this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x]==null)
						cb.moves.push(alphabet[this.pos.y+1]+(this.pos.x+1));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+1]+(this.pos.x+1));
				}
				if(this.pos.x>0 && this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x-1]==null)
						cb.moves.push(alphabet[this.pos.y-1]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x-1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-1]+(this.pos.x));
				}
				if(this.pos.x<7 && this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x+1]==null)
						cb.moves.push(alphabet[this.pos.y+1]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x+1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+1]+(this.pos.x+2));
				}
				if(this.pos.y>0 && this.pos.x<7) {
					if(cb.squares[this.pos.y-1][this.pos.x+1]==null)
						cb.moves.push(alphabet[this.pos.y-1]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x+1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y-1]+(this.pos.x+2));
				}
				if(this.pos.y<7 && this.pos.x>0) {
					if(cb.squares[this.pos.y+1][this.pos.x-1]==null)
						cb.moves.push(alphabet[this.pos.y+1]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x-1]).color!=gm.turn)
						cb.attacks.push(alphabet[this.pos.y+1]+(this.pos.x));
				}
				this.castling();
				break;
			}
		}
		cb.showMoves();
	}
	showMovesInSimulation() {
		msm.figuresMoves.splice(0);
		switch(this.type) {
			case 'pawn': {
				if(this.color==1) {
					if(this.pos.y>0)
						if(cb.squares[this.pos.y-1][this.pos.x]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+1));
						
					if(this.pos.y>1)
						if(cb.squares[this.pos.y-2][this.pos.x]==null && cb.squares[this.pos.y-1][this.pos.x]==null && this.moves<2)
							msm.figuresMoves.push(alphabet[this.pos.y-2]+(this.pos.x+1));
						
					if(this.pos.x>0 && this.pos.y>0)
						if(cb.squares[this.pos.y-1][this.pos.x-1]!=null)
							if(eval(cb.squares[this.pos.y-1][this.pos.x-1]).color!=gm.turn)
								msm.figuresMoves.push(alphabet[this.pos.y-1]+this.pos.x);
							
					if(this.pos.x<7 && this.pos.y>0)
						if(cb.squares[this.pos.y-1][this.pos.x+1]!=null)	
							if(eval(cb.squares[this.pos.y-1][this.pos.x+1]).color!=gm.turn)
								msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+2));
				} else {
					if(this.pos.y<7)
						if(cb.squares[this.pos.y+1][this.pos.x]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+1));
						
					if(this.pos.y<6)
						if(cb.squares[this.pos.y+2][this.pos.x]==null && cb.squares[this.pos.y+1][this.pos.x]==null && this.moves<2)
							msm.figuresMoves.push(alphabet[this.pos.y+2]+(this.pos.x+1));
						
					if(this.pos.x>0 && this.pos.y<7)
						if(cb.squares[this.pos.y+1][this.pos.x-1]!=null)
							if(eval(cb.squares[this.pos.y+1][this.pos.x-1]).color!=gm.turn)
								msm.figuresMoves.push(alphabet[this.pos.y+1]+this.pos.x);
							
					if(this.pos.x<7 && this.pos.y<7)
						if(cb.squares[this.pos.y+1][this.pos.x+1]!=null)	
							if(eval(cb.squares[this.pos.y+1][this.pos.x+1]).color!=gm.turn)
								msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+2));
				}
				if(this.pos.x>0)
					if(cb.squares[this.pos.y][this.pos.x-1]!=null)
						if(eval(cb.squares[this.pos.y][this.pos.x-1]).passingAttack==true && eval(cb.squares[this.pos.y][this.pos.x-1]).color!=gm.turn)
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x));
				if(this.pos.x<7)
					if(cb.squares[this.pos.y][this.pos.x+1]!=null)
						if(eval(cb.squares[this.pos.y][this.pos.x+1]).passingAttack==true && eval(cb.squares[this.pos.y][this.pos.x+1]).color!=gm.turn)
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+2));
				break;
			}
			case 'tower': {
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x-i>-1) {
						if(cb.squares[this.pos.y][this.pos.x-i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x+i<8) {
						if(cb.squares[this.pos.y][this.pos.x+i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				break;
			}
			case 'horse': {
				if(this.pos.x>1 && this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x-2]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x-1));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x-2]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x-1));
				}
				if(this.pos.x>0 && this.pos.y>1) {
					if(cb.squares[this.pos.y-2][this.pos.x-1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-2]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y-2][this.pos.x-1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-2]+(this.pos.x));
				}
				if(this.pos.x<6 && this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x+2]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+3));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x+2]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+3));
				}
				if(this.pos.x<7 && this.pos.y<6) {
					if(cb.squares[this.pos.y+2][this.pos.x+1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+2]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y+2][this.pos.x+1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+2]+(this.pos.x+2));
				}
				if(this.pos.x>1 && this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x-2]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x-1));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x-2]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x-1));
				}
				if(this.pos.x>0 && this.pos.y<6) {
					if(cb.squares[this.pos.y+2][this.pos.x-1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+2]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y+2][this.pos.x-1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+2]+(this.pos.x));
				}
				if(this.pos.x<6 && this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x+2]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+3));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x+2]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+3));
				}
				if(this.pos.x<7 && this.pos.y>1) {
					if(cb.squares[this.pos.y-2][this.pos.x+1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-2]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y-2][this.pos.x+1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-2]+(this.pos.x+2));
				}
				break;
			}
			case 'laufer': {
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x-i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y+i][this.pos.x-i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y-i][this.pos.x+i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x+i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				break;
			}
			case 'hetman': {
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x-i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i>-1) {
						if(cb.squares[this.pos.y+i][this.pos.x-i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y-i][this.pos.x+i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8 && this.pos.x-i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x+i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y-i>-1) {
						if(cb.squares[this.pos.y-i][this.pos.x]==null)
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y-i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y-i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.y+i<8) {
						if(cb.squares[this.pos.y+i][this.pos.x]==null)
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1));
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y+i]+(this.pos.x+1));
							break;
						}
						else if(eval(cb.squares[this.pos.y+i][this.pos.x]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x-i>-1) {
						if(cb.squares[this.pos.y][this.pos.x-i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1-i));
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1-i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x-i]).color==gm.turn)
							break;
					} else break;
				}
				for(var i = 1; i<=7;i++) {
					if(this.pos.x+i<8) {
						if(cb.squares[this.pos.y][this.pos.x+i]==null)
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1+i));
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color!=gm.turn)	{
							msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+1+i));
							break;
						}
						else if(eval(cb.squares[this.pos.y][this.pos.x+i]).color==gm.turn)
							break;
					} else break;
				}
				break;
			}
			case 'king': {
				if(this.pos.x>0) {
					if(cb.squares[this.pos.y][this.pos.x-1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y][this.pos.x-1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x));
				}
				if(this.pos.x<7) {
					if(cb.squares[this.pos.y][this.pos.x+1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y][this.pos.x+1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y]+(this.pos.x+2));
				}
				if(this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+1));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+1));
				}
				if(this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+1));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+1));
				}
				if(this.pos.x>0 && this.pos.y>0) {
					if(cb.squares[this.pos.y-1][this.pos.x-1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x-1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x));
				}
				if(this.pos.x<7 && this.pos.y<7) {
					if(cb.squares[this.pos.y+1][this.pos.x+1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x+1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x+2));
				}
				if(this.pos.y>0 && this.pos.x<7) {
					if(cb.squares[this.pos.y-1][this.pos.x+1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+2));
					else if(eval(cb.squares[this.pos.y-1][this.pos.x+1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y-1]+(this.pos.x+2));
				}
				if(this.pos.y<7 && this.pos.x>0) {
					if(cb.squares[this.pos.y+1][this.pos.x-1]==null)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x));
					else if(eval(cb.squares[this.pos.y+1][this.pos.x-1]).color!=gm.turn)
						msm.figuresMoves.push(alphabet[this.pos.y+1]+(this.pos.x));
				}
				break;
			}
		}
	}
	castling() {
		if(gm.turn==1) {
			if(whiteKing.moves<2) {
				if(whiteTower1.moves<2 && cb.squares[7][1]==null && cb.squares[7][2]==null && cb.squares[7][3]==null) cb.castlingMoves.push('H1');
				if(whiteTower2.moves<2 && cb.squares[7][5]==null && cb.squares[7][6]==null) cb.castlingMoves.push('H8');
			}
		} else {
			if(blackKing.moves<2) {
				if(blackTower1.moves<2 && cb.squares[0][1]==null && cb.squares[0][2]==null && cb.squares[0][3]==null) cb.castlingMoves.push('A1');
				if(blackTower2.moves<2 && cb.squares[0][5]==null && cb.squares[0][6]==null) cb.castlingMoves.push('A8');
			}
		}
	}
}

class moveSimulation_manager {
	constructor() {
		this.squares = [
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null]
		];
		this.figuresMoves = new Array();
	}
	baseCheck(color) {
		var figures;
		if(color==1) {
			figures = ['whitePawn1','whitePawn2','whitePawn3','whitePawn4','whitePawn5','whitePawn6','whitePawn7','whitePawn8',
			'whiteTower1','whiteTower2','whiteHorse1','whiteHorse2','whiteLaufer1','whiteLaufer2','whiteHetman','whiteKing'];
		} else {
			figures = ['blackPawn1','blackPawn2','blackPawn3','blackPawn4','blackPawn5','blackPawn6','blackPawn7','blackPawn8',
			'blackTower1','blackTower2','blackHorse1','blackHorse2','blackLaufer1','blackLaufer2','blackHetman','blackKing'];
		}
		var end = false;
		
		for(var i = 0;i<16;i++) {
			if(eval(figures[i]).health==1) {
				eval(figures[i]).showMovesInSimulation();
				this.figuresMoves.forEach(function(el){
					msm.copyChessboard(msm.squares, cb.squares);
					eval(figures[i]).simulateMove(el);
					if(msm.simulateCheckKing()==false) {
						end = true;
					}
				});
			}
			if(end==true) break;
		}
		if(end==false) {
			gm.endGame();
		}
	}
	copyChessboard(table1,table2) {
		for(var y = 0; y<8;y++) {
			for(var x = 0; x<8; x++) {
				table1[y][x] = table2[y][x];
			}
		}
	}
	findCoords(name) {
		var pos = {
			x: null,
			y: null
		}
		for(var i = 0; i<8; i++) {
			for(var j = 0; j<8; j++) {
				if(this.squares[i][j]==name) {
					pos.x = j;
					pos.y = i;
				}
			}
		}
		return pos;
	}
	simulateCheckKing() {
		var whiteKingpos = this.findCoords('whiteKing');
		var blackKingpos = this.findCoords('blackKing');
		var forColor = gm.turn;
		var check = false;
		if(forColor==1) {
			if(whiteKingpos.y>0) {
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x-1]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x-1]).color != forColor && eval(this.squares[whiteKingpos.y-1][whiteKingpos.x-1]).type=='pawn') 
						check = true;
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x+1]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x+1]).color != forColor && eval(this.squares[whiteKingpos.y-1][whiteKingpos.x+1]).type=='pawn') 
						check = true;
			}
			
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.y-i>-1) {
					if(this.squares[whiteKingpos.y-i][whiteKingpos.x]!=null) {
						if(eval(this.squares[whiteKingpos.y-i][whiteKingpos.x]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y-i][whiteKingpos.x]).type=='tower' || eval(this.squares[whiteKingpos.y-i][whiteKingpos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.y+i<8) {
					if(this.squares[whiteKingpos.y+i][whiteKingpos.x]!=null) {
						if(eval(this.squares[whiteKingpos.y+i][whiteKingpos.x]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y+i][whiteKingpos.x]).type=='tower' || eval(this.squares[whiteKingpos.y+i][whiteKingpos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.x-i>-1) {
					if(this.squares[whiteKingpos.y][whiteKingpos.x-i]!=null) {
						if(eval(this.squares[whiteKingpos.y][whiteKingpos.x-i]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y][whiteKingpos.x-i]).type=='tower' || eval(this.squares[whiteKingpos.y][whiteKingpos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.x+i<8) {
					if(this.squares[whiteKingpos.y][whiteKingpos.x+i]!=null) {
						if(eval(this.squares[whiteKingpos.y][whiteKingpos.x+i]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y][whiteKingpos.x+i]).type=='tower' || eval(this.squares[whiteKingpos.y][whiteKingpos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.x+i<8 && whiteKingpos.y+i<8) {
					if(this.squares[whiteKingpos.y+i][whiteKingpos.x+i]!=null) {
						if(eval(this.squares[whiteKingpos.y+i][whiteKingpos.x+i]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y+i][whiteKingpos.x+i]).type=='laufer' || eval(this.squares[whiteKingpos.y+i][whiteKingpos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.x-i>-1 && whiteKingpos.y-i>-1) {
					if(this.squares[whiteKingpos.y-i][whiteKingpos.x-i]!=null) {
						if(eval(this.squares[whiteKingpos.y-i][whiteKingpos.x-i]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y-i][whiteKingpos.x-i]).type=='laufer' || eval(this.squares[whiteKingpos.y-i][whiteKingpos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.x-i>-1 && whiteKingpos.y+i<8) {
					if(this.squares[whiteKingpos.y+i][whiteKingpos.x-i]!=null) {
						if(eval(this.squares[whiteKingpos.y+i][whiteKingpos.x-i]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y+i][whiteKingpos.x-i]).type=='laufer' || eval(this.squares[whiteKingpos.y+i][whiteKingpos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(whiteKingpos.x+i<8 && whiteKingpos.y-i>-1) {
					if(this.squares[whiteKingpos.y-i][whiteKingpos.x+i]!=null) {
						if(eval(this.squares[whiteKingpos.y-i][whiteKingpos.x+i]).color!=forColor) {
							if(eval(this.squares[whiteKingpos.y-i][whiteKingpos.x+i]).type=='laufer' || eval(this.squares[whiteKingpos.y-i][whiteKingpos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			if(whiteKingpos.x>1 && whiteKingpos.y>0) {
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x-2]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x-2]).color!=forColor && eval(this.squares[whiteKingpos.y-1][whiteKingpos.x-2]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x>0 && whiteKingpos.y>1) {
				if(this.squares[whiteKingpos.y-2][whiteKingpos.x-1]!=null)
					if(eval(this.squares[whiteKingpos.y-2][whiteKingpos.x-1]).color!=forColor && eval(this.squares[whiteKingpos.y-2][whiteKingpos.x-1]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x<6 && whiteKingpos.y<7) {
				if(this.squares[whiteKingpos.y+1][whiteKingpos.x+2]!=null)
					if(eval(this.squares[whiteKingpos.y+1][whiteKingpos.x+2]).color!=forColor && eval(this.squares[whiteKingpos.y+1][whiteKingpos.x+2]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x<7 && whiteKingpos.y<6) {
				if(this.squares[whiteKingpos.y+2][whiteKingpos.x+1]!=null)
					if(eval(this.squares[whiteKingpos.y+2][whiteKingpos.x+1]).color!=forColor && eval(this.squares[whiteKingpos.y+2][whiteKingpos.x+1]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x>1 && whiteKingpos.y<7) {
				if(this.squares[whiteKingpos.y+1][whiteKingpos.x-2]!=null)
					if(eval(this.squares[whiteKingpos.y+1][whiteKingpos.x-2]).color!=forColor && eval(this.squares[whiteKingpos.y+1][whiteKingpos.x-2]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x>0 && whiteKingpos.y<6) {
				if(this.squares[whiteKingpos.y+2][whiteKingpos.x-1]!=null)
					if(eval(this.squares[whiteKingpos.y+2][whiteKingpos.x-1]).color!=forColor && eval(this.squares[whiteKingpos.y+2][whiteKingpos.x-1]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x<6 && whiteKingpos.y>0) {
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x+2]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x+2]).color!=forColor && eval(this.squares[whiteKingpos.y-1][whiteKingpos.x+2]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x<7 && whiteKingpos.y>1) {
				if(this.squares[whiteKingpos.y-2][whiteKingpos.x+1]!=null)
					if(eval(this.squares[whiteKingpos.y-2][whiteKingpos.x+1]).color!=forColor && eval(this.squares[whiteKingpos.y-2][whiteKingpos.x+1]).type=='horse')
						check = true;
			}
			if(whiteKingpos.x>0) {
				if(this.squares[whiteKingpos.y][whiteKingpos.x-1]!=null)
					if(eval(this.squares[whiteKingpos.y][whiteKingpos.x-1]).type=='king')
						check = true;
			}
			if(whiteKingpos.x<7) {
				if(this.squares[whiteKingpos.y][whiteKingpos.x+1]!=null)
					if(eval(this.squares[whiteKingpos.y][whiteKingpos.x+1]).type=='king')
						check = true;
			}
			if(whiteKingpos.y>0) {
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x]).type=='king')
						check = true;
			}
			if(whiteKingpos.y<7) {
				if(this.squares[whiteKingpos.y+1][whiteKingpos.x]!=null)
					if(eval(this.squares[whiteKingpos.y+1][whiteKingpos.x]).type=='king')
						check = true;
			}
			if(whiteKingpos.x>0 && whiteKingpos.y>0) {
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x-1]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x-1]).type=='king')
						check = true;
			}
			if(whiteKingpos.x<7 && whiteKingpos.y<7) {
				if(this.squares[whiteKingpos.y+1][whiteKingpos.x+1]!=null)
					if(eval(this.squares[whiteKingpos.y+1][whiteKingpos.x+1]).type=='king')
						check = true;
			}
			if(whiteKingpos.y>0 && whiteKingpos.x<7) {
				if(this.squares[whiteKingpos.y-1][whiteKingpos.x+1]!=null)
					if(eval(this.squares[whiteKingpos.y-1][whiteKingpos.x+1]).type=='king')
						check = true;
			}
			if(whiteKingpos.y<7 && whiteKingpos.x>0) {
				if(this.squares[whiteKingpos.y+1][whiteKingpos.x-1]!=null)
					if(eval(this.squares[whiteKingpos.y+1][whiteKingpos.x-1]).type=='king')
						check = true;
			}
			
		} else {
			if(blackKingpos.y<7) {
				if(this.squares[blackKingpos.y+1][blackKingpos.x-1]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x-1]).color != forColor && eval(this.squares[blackKingpos.y+1][blackKingpos.x-1]).type=='pawn') 
						check = true;
				if(this.squares[blackKingpos.y+1][blackKingpos.x+1]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x+1]).color != forColor && eval(this.squares[blackKingpos.y+1][blackKingpos.x+1]).type=='pawn') 
						check = true;
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.y-i>-1) {
					if(this.squares[blackKingpos.y-i][blackKingpos.x]!=null) {
						if(eval(this.squares[blackKingpos.y-i][blackKingpos.x]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y-i][blackKingpos.x]).type=='tower' || eval(this.squares[blackKingpos.y-i][blackKingpos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.y+i<8) {
					if(this.squares[blackKingpos.y+i][blackKingpos.x]!=null) {
						if(eval(this.squares[blackKingpos.y+i][blackKingpos.x]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y+i][blackKingpos.x]).type=='tower' || eval(this.squares[blackKingpos.y+i][blackKingpos.x]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.x-i>-1) {
					if(this.squares[blackKingpos.y][blackKingpos.x-i]!=null) {
						if(eval(this.squares[blackKingpos.y][blackKingpos.x-i]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y][blackKingpos.x-i]).type=='tower' || eval(this.squares[blackKingpos.y][blackKingpos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.x+i<8) {
					console.log(eval(this.squares[blackKingpos.y][blackKingpos.x+i]).type+" "+this.squares[blackKingpos.y][blackKingpos.x+i]);
					if(this.squares[blackKingpos.y][blackKingpos.x+i]!=null) {
						if(eval(this.squares[blackKingpos.y][blackKingpos.x+i]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y][blackKingpos.x+i]).type=='tower' || eval(this.squares[blackKingpos.y][blackKingpos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.x+i<8 && blackKingpos.y+i<8) {
					if(this.squares[blackKingpos.y+i][blackKingpos.x+i]!=null) {
						if(eval(this.squares[blackKingpos.y+i][blackKingpos.x+i]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y+i][blackKingpos.x+i]).type=='laufer' || eval(this.squares[blackKingpos.y+i][blackKingpos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.x-i>-1 && blackKingpos.y-i>-1) {
					if(this.squares[blackKingpos.y-i][blackKingpos.x-i]!=null) {
						if(eval(this.squares[blackKingpos.y-i][blackKingpos.x-i]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y-i][blackKingpos.x-i]).type=='laufer' || eval(this.squares[blackKingpos.y-i][blackKingpos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.x-i>-1 && blackKingpos.y+i<8) {
					if(this.squares[blackKingpos.y+i][blackKingpos.x-i]!=null) {
						if(eval(this.squares[blackKingpos.y+i][blackKingpos.x-i]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y+i][blackKingpos.x-i]).type=='laufer' || eval(this.squares[blackKingpos.y+i][blackKingpos.x-i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			for(var i = 1; i<=7;i++) {
				if(blackKingpos.x+i<8 && blackKingpos.y-i>-1) {
					if(this.squares[blackKingpos.y-i][blackKingpos.x+i]!=null) {
						if(eval(this.squares[blackKingpos.y-i][blackKingpos.x+i]).color!=forColor) {
							if(eval(this.squares[blackKingpos.y-i][blackKingpos.x+i]).type=='laufer' || eval(this.squares[blackKingpos.y-i][blackKingpos.x+i]).type=='hetman') {
								check = true;
								break;
							} else break;
						} else break;
					}
				}
			}
			if(blackKingpos.x>1 && blackKingpos.y>0) {
				if(this.squares[blackKingpos.y-1][blackKingpos.x-2]!=null)
					if(eval(this.squares[blackKingpos.y-1][blackKingpos.x-2]).color!=forColor && eval(this.squares[blackKingpos.y-1][blackKingpos.x-2]).type=='horse')
						check = true;
			}
			if(blackKingpos.x>0 && blackKingpos.y>1) {
				if(this.squares[blackKingpos.y-2][blackKingpos.x-1]!=null)
					if(eval(this.squares[blackKingpos.y-2][blackKingpos.x-1]).color!=forColor && eval(this.squares[blackKingpos.y-2][blackKingpos.x-1]).type=='horse')
						check = true;
			}
			if(blackKingpos.x<6 && blackKingpos.y<7) {
				if(this.squares[blackKingpos.y+1][blackKingpos.x+2]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x+2]).color!=forColor && eval(this.squares[blackKingpos.y+1][blackKingpos.x+2]).type=='horse')
						check = true;
			}
			if(blackKingpos.x<7 && blackKingpos.y<6) {
				if(this.squares[blackKingpos.y+2][blackKingpos.x+1]!=null)
					if(eval(this.squares[blackKingpos.y+2][blackKingpos.x+1]).color!=forColor && eval(this.squares[blackKingpos.y+2][blackKingpos.x+1]).type=='horse')
						check = true;
			}
			if(blackKingpos.x>1 && blackKingpos.y<7) {
				if(this.squares[blackKingpos.y+1][blackKingpos.x-2]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x-2]).color!=forColor && eval(this.squares[blackKingpos.y+1][blackKingpos.x-2]).type=='horse')
						check = true;
			}
			if(blackKingpos.x>0 && blackKingpos.y<6) {
				if(this.squares[blackKingpos.y+2][blackKingpos.x-1]!=null)
					if(eval(this.squares[blackKingpos.y+2][blackKingpos.x-1]).color!=forColor && eval(this.squares[blackKingpos.y+2][blackKingpos.x-1]).type=='horse')
						check = true;
			}
			if(blackKingpos.x<6 && blackKingpos.y>0) {
				if(this.squares[blackKingpos.y-1][blackKingpos.x+2]!=null)
					if(eval(this.squares[blackKingpos.y-1][blackKingpos.x+2]).color!=forColor && eval(this.squares[blackKingpos.y-1][blackKingpos.x+2]).type=='horse')
						check = true;
			}
			if(blackKingpos.x<7 && blackKingpos.y>1) {
				if(this.squares[blackKingpos.y-2][blackKingpos.x+1]!=null)
					if(eval(this.squares[blackKingpos.y-2][blackKingpos.x+1]).color!=forColor && eval(this.squares[blackKingpos.y-2][blackKingpos.x+1]).type=='horse')
						check = true;
			}
			if(blackKingpos.x>0) {
				if(this.squares[blackKingpos.y][blackKingpos.x-1]!=null)
					if(eval(this.squares[blackKingpos.y][blackKingpos.x-1]).type=='king')
						check = true;
			}
			if(blackKingpos.x<7) {
				if(this.squares[blackKingpos.y][blackKingpos.x+1]!=null)
					if(eval(this.squares[blackKingpos.y][blackKingpos.x+1]).type=='king')
						check = true;
			}
			if(blackKingpos.y>0) {
				if(this.squares[blackKingpos.y-1][blackKingpos.x]!=null)
					if(eval(this.squares[blackKingpos.y-1][blackKingpos.x]).type=='king')
						check = true;
			}
			if(blackKingpos.y<7) {
				if(this.squares[blackKingpos.y+1][blackKingpos.x]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x]).type=='king')
						check = true;
			}
			if(blackKingpos.x>0 && blackKingpos.y>0) {
				if(this.squares[blackKingpos.y-1][blackKingpos.x-1]!=null)
					if(eval(this.squares[blackKingpos.y-1][blackKingpos.x-1]).type=='king')
						check = true;
			}
			if(blackKingpos.x<7 && blackKingpos.y<7) {
				if(this.squares[blackKingpos.y+1][blackKingpos.x+1]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x+1]).type=='king')
						check = true;
			}
			if(blackKingpos.y>0 && blackKingpos.x<7) {
				if(this.squares[blackKingpos.y-1][blackKingpos.x+1]!=null)
					if(eval(this.squares[blackKingpos.y-1][blackKingpos.x+1]).type=='king')
						check = true;
			}
			if(blackKingpos.y<7 && blackKingpos.x>0) {
				if(this.squares[blackKingpos.y+1][blackKingpos.x-1]!=null)
					if(eval(this.squares[blackKingpos.y+1][blackKingpos.x-1]).type=='king')
						check = true;
			}
		}
		return check;
	}
}

var gm = new game_manager();
var sm = new style_manager();
var mm = new menu_manager();
var cb = new chessboard();
var msm = new moveSimulation_manager();

var whitePawn1 = new figure('pawn',1,'whitePawn1');
var whitePawn2 = new figure('pawn',1,'whitePawn2');
var whitePawn3 = new figure('pawn',1,'whitePawn3');
var whitePawn4 = new figure('pawn',1,'whitePawn4');
var whitePawn5 = new figure('pawn',1,'whitePawn5');
var whitePawn6 = new figure('pawn',1,'whitePawn6');
var whitePawn7 = new figure('pawn',1,'whitePawn7');
var whitePawn8 = new figure('pawn',1,'whitePawn8');
var whiteTower1 = new figure('tower',1,'whiteTower1');
var whiteTower2 = new figure('tower',1,'whiteTower2');
var whiteHorse1 = new figure('horse',1,'whiteHorse1');
var whiteHorse2 = new figure('horse',1,'whiteHorse2');
var whiteLaufer1 = new figure('laufer',1,'whiteLaufer1');
var whiteLaufer2 = new figure('laufer',1,'whiteLaufer2');
var whiteHetman = new figure('hetman',1,'whiteHetman');
var whiteKing = new figure('king',1,'whiteKing');

var blackPawn1 = new figure('pawn',0,'blackPawn1');
var blackPawn2 = new figure('pawn',0,'blackPawn2');
var blackPawn3 = new figure('pawn',0,'blackPawn3');
var blackPawn4 = new figure('pawn',0,'blackPawn4');
var blackPawn5 = new figure('pawn',0,'blackPawn5');
var blackPawn6 = new figure('pawn',0,'blackPawn6');
var blackPawn7 = new figure('pawn',0,'blackPawn7');
var blackPawn8 = new figure('pawn',0,'blackPawn8');
var blackTower1 = new figure('tower',0,'blackTower1');
var blackTower2 = new figure('tower',0,'blackTower2');
var blackHorse1 = new figure('horse',0,'blackHorse1');
var blackHorse2 = new figure('horse',0,'blackHorse2');
var blackLaufer1 = new figure('laufer',0,'blackLaufer1');
var blackLaufer2 = new figure('laufer',0,'blackLaufer2');
var blackHetman = new figure('hetman',0,'blackHetman');
var blackKing = new figure('king',0,'blackKing');


window.onload = function() {
	sm.updateStyle();
	cb.showChessboard();
	sm.updateHoverEffects();
	cb.activeMove();
	gm.newGame();
	
}
