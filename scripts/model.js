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
        this.rottenApples = [[0, 0],];
        this.numberRottenApples = 0;
        this.level = 0;
        this.count = 0;
        this.isStartGame = false;
        this.ZmeyView = null;
        this.timerId = null;
        this.orientation = [0, 1];
        this.isWindowOpen = true;
    }

    setZmeyView(view) {
        this.ZmeyView = view;
    }

    init() {
        this.field = this.fields[this.level].field;
        this.lengthFieldY = this.fields[this.level].lengthFieldY;
        this.lengthFieldX = this.fields[this.level].lengthFieldX;
        this.zmeySpeed = this.fields[this.level].speed;
        this.numberRottenApples = this.fields[this.level].numberRottenApples;
        if (this.level === 0) {
            this.zmey = [[Math.floor( this.lengthFieldY/2), Math.floor( this.lengthFieldX/2)],];
            this.isStartGame = false;
            this.timerId = null;
            this.orientation = [0, 1];
            this.count = 0;
        }
        
        this.setZmeyInField(true);
        this.setAppleInField();
        this.setRottenApplesInField();
        this.ZmeyView.draw();
    }

    update() {
        if (this.isStartGame) {
            this.ZmeyView.draw();
        }
    }

    setZmeyInField(isApple) {
        this.cleanField(isApple);
        this.field[this.zmey[0][0]][this.zmey[0][1]] = 1;
        for (let i = 1; i < this.zmey.length; i++) {
            this.field[this.zmey[i][0]][this.zmey[i][1]] = 3;
        }
    }

    cleanField(isApple = false) {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j] === 1 || this.field[i][j] === 3) {
                    this.field[i][j] = 0;
                }
                if (isApple && this.field[i][j] === 2 || isApple && this.field[i][j] === 4)  {
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


    setRottenApplesInField() {
        this.rottenApples = [];
        for (let i = 0; i < this.numberRottenApples; i++) {
            let arr = [0, 0];
            arr[0] = this.getRandomNumber(this.lengthFieldY);
            arr[1] = this.getRandomNumber(this.lengthFieldX);
            let checkArr = this.createCheckArrForCheckRottenApples(arr);
            let isCheck = this.checkRottenApples(checkArr);
            if (this.field[arr[0]][arr[1]] === 0 && isCheck) {
                this.rottenApples.push(arr);
            } else {
                i--;
            }
        }

        this.rottenApples.forEach(item => {
            this.field[item[0]][item[1]] = 4;
        })
    }

    checkRottenApples(checkArr) {
        let arr = [];
        checkArr.forEach(item => {
           
            if (this.field[item[0]] !== undefined) {
                if (this.field[item[0]][item[1]] !== undefined) {
                    arr.push(this.field[item[0]][item[1]]);
                }
            }
        });
        return arr.every(item => item === 0);
    }

    createCheckArrForCheckRottenApples(arr) {
        let checkArr = [];
        checkArr.push([arr[0] + 1, arr[1]]);
        checkArr.push([arr[0] - 1, arr[1]]);
        checkArr.push([arr[0], arr[1] + 1]);
        checkArr.push([arr[0], arr[1] - 1]);
        return checkArr;
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
    
    startPauseGame() {
        this.isStartGame = !this.isStartGame;
        this.updateStartPauseBtn();
        if (this.isStartGame) {
            this.startGame();
        } else {
            this.stopGame(); 
            this.timerId = null;
        }
    }

    startGame() {
        this.live();
    }

    stopGame() {
        clearTimeout(this.timerId);
        this.timerId = null;

    }


    live() {
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
                this.moveZmey();
                this.oopsHeadEatTailOrRottenApple();
                this.setZmeyInField();
                this.eatApple();
                this.update();
            }, this.zmeySpeed);
        } 
    }
    
    eatApple() {
        if (this.field[this.apple[0]][this.apple[1]] === this.field[this.zmey[0][0]][this.zmey[0][1]]) {
           this.addTail();
           this.setAppleInField();
           this.addPointInCount();
           if(!this.winGame()) {
                this.setNewLevelGame();
           }  else {  
           }
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
        this.isWindowOpen = true;
        this.ZmeyView.showWindow(what, this.count, this.level);
    }

    closeWindow(what, isGameInit) {
        this.isWindowOpen = false;
        if (isGameInit) {
            clearTimeout(this.timerId);
            this.level = 0;
            this.init();
        }
        this.ZmeyView.closeWindow(what, this.count, this.level);
    }

    exitGame() {
        close();
    }

    oopsHeadEatTailOrRottenApple() {
        if (this.field[this.zmey[0][0]][this.zmey[0][1]] === 3 || this.field[this.zmey[0][0]][this.zmey[0][1]] === 4) {
            this.stopGame();
            this.showWindow("over");
        }
    }

    setLevelInView() {
        this.level += 1;
        this.ZmeyView.setLevel(this.level);
    }

    setNewLevelGame() {
        if (this.count === this.fields[this.level].count) {
            this.setLevelInView();
            this.stopGame();
            this.init(); 
            this.startGame();
        }
    }

    winGame() {
        if (this.count === this.fields[this.fields.length-1].count) { 
            this.stopGame(); 
            this.setLevelInView();
            this.showWindow("win");
            return true;
        }
        return false;
    }
}