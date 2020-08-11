"use strict";

class ZmeyView {
    constructor(model, container, elems) {
        this.model = model;
        this.container = container;
        this.elems = elems;
    }

    draw() {
        this.drawField();
    }

    drawField() {
        this.container.innerHTML = "";
        let divY;
        for (let i = 0; i < this.model.field.length; i++) {
            divY = this.createElem("div", "divY");
          for (let j = 0; j < this.model.field[i].length; j++) {
            let divX = this.setGameElem(this.model.field[i][j]);
            divY.append(divX);
          }
          this.container.append(divY);
        }
    }

    createElem(elem, classElem) {
        let elemCreate = document.createElement(elem);
        elemCreate.classList.add(classElem);
        return elemCreate;
    }

    setGameElem(id) {
        if (id === 0) {
            return this.createElem("div", "divX");
        }
        if (id === 1) {
            return this.createElem("div", "zmey");
        }
        if (id === 2) {
            return this.createElem("div", "apple");
        }
        if (id === 3) {
            return this.createElem("div", "tail");
        }
    }

    
    updateStartPauseBtn(bool) {
        if (bool) {
            this.elems.startPauseBtn.innerHTML = "pause";
        } else {
            this.elems.startPauseBtn.innerHTML = "start";
        }
    }

    showWindowStopGame(bool) {
        if (bool) {
            this.elems.stopGameContainer.style.display = "flex";
        } else { 
            this.elems.stopGameContainer.style.display = "none";
        }
    }

    addCount(number) {
        this.elems.count.innerHTML = number;
    }

    showWindowGameOver(bool, count, level) {
        if (bool) {
            this.elems.gameOverCount.innerHTML = count;
            this.elems.gameOverLevel.innerHTML = level;
            this.elems.gameOverContainer.style.display = "flex";
        } else {   
            this.elems.count.innerHTML = count;
            this.elems.level.innerHTML = level;
            this.elems.gameOverContainer.style.display = "none";
        }
    }
    
    setLevel(level) {
        this.elems.level.innerHTML = level;
    }
}