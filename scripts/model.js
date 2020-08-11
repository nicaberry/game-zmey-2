"use strict";

class ZmeyModel {
    constructor(fields) {
        this.fields = fields;
        this.field = null;
        this.lengthFieldY = 0;
        this.lengthFieldX = 0;
        this.zmey = [[0, 0],];
        this.zmeySpeed = 0;
        this.apple = [0, 0];
        this.level = 0;
        this.count = 0;
        this.isStartGame = false;
        this.ZmeyView = null;
        this.timerId = null;
        this.orientation = [0, 1];
    }

    setZmeyView(view) {
        this.ZmeyView = view;
    }

    init() {
        this.field = this.fields[this.level].field;
        this.lengthFieldY = this.fields[this.level].lengthFieldY;
        this.lengthFieldX = this.fields[this.level].lengthFieldX;
        this.zmeySpeed = this.fields[this.level].speed;

        if (this.level === 0) {
            this.zmey = [[Math.floor( this.lengthFieldY/2), Math.floor( this.lengthFieldX/2)],];
            this.isStartGame = false;
            this.timerId = null;
            this.orientation = [0, 1];
            this.count = 0;
        }
        
        this.setZmeyInField(true);
        this.setAppleInField();
        this.ZmeyView.draw();
    }

    update() {
        if(this.isStartGame) {
            this.ZmeyView.draw();
        }
    }

    setZmeyInField(bool) {
        this.cleanField(bool);
        this.field[this.zmey[0][0]][this.zmey[0][1]] = 1;
        for (let i = 1; i < this.zmey.length; i++) {
            this.field[this.zmey[i][0]][this.zmey[i][1]] = 3;
        }
    }

    cleanField(boolApple = false) {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j] === 1 || this.field[i][j] === 3) {
                    this.field[i][j] = 0;
                }
                if (boolApple && this.field[i][j] === 2)  {
                    this.field[i][j] = 0;
                }
            }
        }
    }

    setAppleInField() {
        this.apple[0] = this.getRandomNumber(this.lengthFieldY);
        this.apple[1] = this.getRandomNumber(this.lengthFieldX);
        if (this.field[this.apple[0]][this.apple[1]] === 0) {
            this.field[this.apple[0]][this.apple[1]] = 2
        } else {
            this.setAppleInField();
        }
    }

    getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    moveZmey() {
        this.moveTail();
        this.orientationZmeyHead(); 
    }

    orientationZmeyHead() {
        this.zmey[0][0] += this.orientation[0];
        if (this.zmey[0][0] >= this.lengthFieldY) {
            this.zmey[0][0] = 0;
        }
        if (this.zmey[0][0] < 0) {
            this.zmey[0][0] = this.lengthFieldY - 1;
        }

        this.zmey[0][1] += this.orientation[1];
        if (this.zmey[0][1] >= this.lengthFieldX) {
            this.zmey[0][1] = 0;
        }
        if (this.zmey[0][1] < 0) {
            this.zmey[0][1] = this.lengthFieldX - 1;
        }
    }

    moveTail() {
        let y = this.zmey[0][0];
        let x = this.zmey[0][1]
        for (let i = 1; i < this.zmey.length; i++) {
            let newY =  this.zmey[i][0];
            this.zmey[i][0] = y;
            y = newY;

            let newX =  this.zmey[i][1];
            this.zmey[i][1] = x;
            x = newX;
     }
    }

    updateStartPauseBtn() {
        this.ZmeyView.updateStartPauseBtn(this.isStartGame);
    }

    startGame() {
        this.updateStartPauseBtn();
        if (this.isStartGame) {
           this.live();
        } else {
            clearTimeout(this.timerId);
        }
    }

    live() {
        this.moveZmey();
        this.oopsHeadEatTail();
        this.setZmeyInField();
        this.eatApple();
        this.update();
        this.timerId = setTimeout(() => {
            this.live();
        }, this.zmeySpeed)
    }
    
    eatApple() {
        if (this.field[this.apple[0]][this.apple[1]] === this.field[this.zmey[0][0]][this.zmey[0][1]]) {
           this.addTail();
           this.setAppleInField();
           this.addPointInCount();
           this.setNewLevelGame();
        }
    }

    addPointInCount() {
        let points = 100;
        this.count += points;
        this.ZmeyView.addCount(this.count);
    }

    addTail() {
        this.zmey.push([this.zmey[this.zmey.length-1][0], this.zmey[this.zmey.length-1][1] + 1]);
    }

    showWindow(what) {
        this.ZmeyView.showWindow(what, this.count, this.level);
    }

    closeWindow(what, isGameInit) {
        if(isGameInit) {
            clearTimeout(this.timerId);
            this.level = 0;
            this.init();
        }
        this.ZmeyView.closeWindow(what, this.count, this.level);
    }

    exitGame() {
        close();
    }

    oopsHeadEatTail() {
        if (this.field[this.zmey[0][0]][this.zmey[0][1]] === 3) {
            this.isStartGame = false;
            this.startGame();
            this.showWindow("over");
        }
    }

    setLevelInView() {
        this.ZmeyView.setLevel(this.level);
    }

    setNewLevelGame() {
        if ( this.count === this.fields[this.level].count) {
            this.level += 1;
            this.winGame() === false ? this.init() : "";
            this.setLevelInView();
        }
    }

    winGame() {
        if( this.count === this.fields[this.fields.length-1].count) {   
            this.isStartGame = false;
            this.startGame();
            this.showWindow("win");
            return true;
        }
        return false;
    }
}