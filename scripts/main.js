"use strict";
window.onload = () => {

    let containerGame = document.querySelector("#conteiner-game");
    
    let elems = {
        level: document.querySelector(".level span"),
        count: document.querySelector(".count span"),
        startPauseBtn: document.querySelector(".startPauseBtn"),
        stopBtn: document.querySelector(".stopBtn"),
        stopGameContainer: document.querySelector(".stop-game-container"),
        stopGameYesBtn: document.querySelector(".stop-game-yesBtn"),
        stopGameNoBtn: document.querySelector(".stop-game-noBtn"),
        gameOverContainer: document.querySelector(".game-over-container"),
        gameOverAgainBtn: document.querySelector(".game-over-againBtn"),
        gameOverCloseBtn: document.querySelector(".game-over-closeBtn"),
        gameOverLevel: document.querySelector(".game-over-level span"),
        gameOverCount: document.querySelector(".game-over-count span"),
    }

    let field = new Field(15, 15).getField();
    let zmeyModel = new ZmeyModel(field);
    let zmeyView = new ZmeyView(zmeyModel, containerGame, elems);
    zmeyModel.setZmeyView(zmeyView);

    let zmeyController = new ZmeyController(zmeyModel, elems);
    zmeyModel.init();
}

