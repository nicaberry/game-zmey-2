"use strict";

class ZmeyModel {
    constructor(field) {
        this.field = field;
        this.fieldY = this.field.length;
        this.fieldX = this.field[0].length;
        this.zmey = [[Math.floor(this.fieldY/2), Math.floor(this.fieldX/2)],];
        this.zmeySpeed = 300;
        this.apple = [0, 0];
        this.level = 0;
        this.count = 0;
        this.isStartGame = false;
        this.ZmeyView = null;
        this.timerId = null;
        this.orientir = [0, 1];
    }

    setZmeyView(view) {
        this.ZmeyView = view;
    }

    init(oridjinOrNew) {
        if (oridjinOrNew === "oridjin") {
            this.fieldY = this.field.length;
            this.fieldX = this.field[0].length;
            this.zmey = [[Math.floor(this.fieldY/2), Math.floor(this.fieldX/2)],];
            this.zmeySpeed = 300;
            this.level = 0;
            this.count = 0;
            this.isStartGame = false;
            this.timerId = null;
            this.orientir = [0, 1];
        }

        if (oridjinOrNew === "new") {
            this.fieldY = this.field.length;
            this.fieldX = this.field[0].length;
            this.zmeySpeed = 200;
        }
        
        this.setZmeyInField();
        this.setAppleInField();
        this.ZmeyView.draw();
    }

    update() {
        if(this.isStartGame) {
            this.ZmeyView.draw();
        }
    }

    setZmeyInField() {
        this.cleanField();
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
        this.apple[0] = this.getRandomNumber(this.fieldY);
        this.apple[1] = this.getRandomNumber(this.fieldX);
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
        this.orientirZmeyHead(); 
    }

    orientirZmeyHead() {
        this.zmey[0][0] += this.orientir[0];
        if (this.zmey[0][0] >= this.fieldY) {
            this.zmey[0][0] = 0;
        }
        if (this.zmey[0][0] < 0) {
            this.zmey[0][0] = this.fieldY - 1;
        }

        this.zmey[0][1] += this.orientir[1];
        if (this.zmey[0][1] >= this.fieldX) {
            this.zmey[0][1] = 0;
        }
        if (this.zmey[0][1] < 0) {
            this.zmey[0][1] = this.fieldX - 1;
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
            this.timerId = setInterval(() => {
                this.moveZmey();
                this.oopsHeadEatTail();
                this.setZmeyInField();
                this.eatApple();
                this.update();
            }, this.zmeySpeed);
        } else {
            clearInterval(this.timerId);
        }
    }
    
    showWindowStopGame() {
        this.ZmeyView.showWindowStopGame(true);
    }

    isStopGame(bool) {
        if (bool) {
            close();
        } else {
            this.ZmeyView.showWindowStopGame(false);
        }
    }

    eatApple() {
        if (this.field[this.apple[0]][this.apple[1]] === this.field[this.zmey[0][0]][this.zmey[0][1]]) {
           this.addTail();
           this.setAppleInField();
           this.addPointInCount();
           this.setLevel();
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

    showWindowGameOver(bool) {
        if(!bool) {
           this.init("oridjin");
        }
        this.ZmeyView.showWindowGameOver(bool, this.count, this.level);
    }
    
    oopsHeadEatTail() {
        if (this.field[this.zmey[0][0]][this.zmey[0][1]] === 3) {
            this.isStartGame = false;
            this.startGame();
            this.cleanField(true);
            this.showWindowGameOver(true);
        }
    }

    setLevel() {
        if( this.count === 500) {
            this.level = 1;
            this.setNewLevel();
        }

        this.ZmeyView.setLevel(this.level);
    }

    setNewLevel() {
        this.field = new Field(30, 30).getField();
        this.init("new");
    }
}