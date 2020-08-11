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
        this.clickStopGameBtn()
        this.stopGameYes();
        this.stopGameNo();
        this.clickGameOverAgainBtn();
        this.clickGameOverCloseBtn();
    }

    clickStartPauseGame() {
        this.elems.startPauseBtn.onclick = (e) => {
            this.startPauseGame();
        }
    }

    startPauseGame() {
        this.model.isStartGame = !this.model.isStartGame;
        this.model.startGame();
    }

    pressKey() {
        window.onkeyup = (e) => {
            if (e.keyCode === 38) {
                this.model.orientir = [-1, 0];
            } else if (e.keyCode === 39) {
                this.model.orientir = [0, 1];
            } else if (e.keyCode === 40) { 
                this.model.orientir = [1, 0];
            } else if (e.keyCode === 37) { 
                this.model.orientir = [0, -1];
            } else if (e.keyCode === 32) {
                this.startPauseGame();
            }
        }
    }

    clickStopGameBtn() {
        this.elems.stopBtn.onclick = (e) => {
            this.model.showWindowStopGame();
        }
    }

    stopGameYes() {
        this.elems.stopGameYesBtn.onclick = (e) => {
            this.model.isStopGame(true);
        }
    }

    stopGameNo() {
        this.elems.stopGameNoBtn.onclick = (e) => {
            this.model.isStopGame(false);
        }
    }

    clickGameOverAgainBtn() {
        this.elems.gameOverAgainBtn.onclick = (e) => {
            this.model.showWindowGameOver(false);
        }
    }

    clickGameOverCloseBtn() {
        this.elems.gameOverCloseBtn.onclick = (e) => {
            this.model.isStopGame(true);
        }
    }

}