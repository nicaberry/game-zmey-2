"use strict";

class ZmeyController {
    constructor(model, elems) {
        this.model = model; 
        this.elems = elems;

        this.listenerGame();
    }

    listenerGame() {
        this.clickStartPauseGame();
        this.pressKey();
        this.clickExitGameBtn();
        this.exitGameYes();
        this.exitGameNo();
        this.clickAgainGameBtn();
        this.clickCloseRulesBtn();
        this.clickOpenRulesBtn(); 
    }

    clickCloseRulesBtn() {
        this.elems.closeRulesBtn.onclick = (e) => {
            this.model.closeWindow("rules", false);
        }
    }

    clickOpenRulesBtn() {
        this.elems.openRulesBtn.onclick = (e) => {
            this.model.showWindow("rules");
        }
    }

    clickStartPauseGame() {
        if (!this.model.isWinOrOverGame) {
            this.elems.startPauseBtn.onclick = (e) => {
                this.startPauseGame();
            }
        }
    }

    startPauseGame() {
        if (!this.model.isWinOrOverGame) {
            this.model.isStartGame = !this.model.isStartGame;
            this.model.startGame();
        }
    }

    pressKey() {
        window.onkeydown = (e) => {
            if(this.model.isStartGame) {
                if (e.keyCode === 38) {
                    this.model.orientation = [-1, 0];
                } else if (e.keyCode === 39) {
                    this.model.orientation = [0, 1];
                } else if (e.keyCode === 40) { 
                    this.model.orientation = [1, 0];
                } else if (e.keyCode === 37) { 
                    this.model.orientation = [0, -1];
                } 
            }
            if (e.keyCode === 32) {
                this.startPauseGame();
            }
        }
    }

    clickExitGameBtn() {
        this.elems.exitBtn.onclick = (e) => {
            this.model.showWindow("stop");
        }
    }

    exitGameYes() {
        for (let i = 0; i < this.elems.exitGameBtns.length; i++) {
            this.elems.exitGameBtns[i].onclick = (e) => {
                this.model.exitGame();
            }
        }
    }

    exitGameNo() {
        this.elems.proceedGameBtn.onclick = (e) => {
            this.model.closeWindow("stop", false);
        }
    }

    clickAgainGameBtn() {
        for (let i = 0; i < this.elems.againGameBtns.length; i++) {
            this.elems.againGameBtns[i].onclick = (e) => {
                let winOrOver = e.target.getAttribute("data-again");
                this.model.closeWindow(winOrOver, true);
            }
        }
    }
}