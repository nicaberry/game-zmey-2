"use strict";
window.onload = () => {

    let containerGame = document.querySelector("#conteiner-game");
    
    let elems = {
        gameRulesContainer: document.querySelector(".game-rules"),
        closeRulesBtn: document.querySelector(".game-rulesCloseBtn"),
        openRulesBtn: document.querySelector(".game-rulesOpenBtn"),

        level: document.querySelector(".level span"),
        count: document.querySelector(".count span"),
        startPauseBtn: document.querySelector(".startPauseBtn"),
        exitBtn: document.querySelector(".exitBtn"),

        exitGameContainer: document.querySelector(".exit-game"),
        exitGameBtns: document.querySelectorAll(".game-exitBtn"),
        proceedGameBtn: document.querySelector(".game-proceedBtn"),

        gameOverContainer: document.querySelector(".game-over"),
        againGameBtns: document.querySelectorAll(".game-againBtn"),
        gameOverLevel: document.querySelector(".game-over-level span"),
        gameOverCount: document.querySelector(".game-over-count span"),

        gameWinContainer: document.querySelector(".game-win"),
        gameWinLevel: document.querySelector(".game-win-level span"),
        gameWinCount: document.querySelector(".game-win-count span"),
    }

    let fields = [
        {
            field: new Field(15, 15).getField(),
            lengthFieldY: 15,
            lengthFieldX: 15,
            numberRottenApples: 2,
            level: 0,
            count: 500,
            speed: 300,
        },
        {
            field: new Field(20, 20).getField(),
            lengthFieldY: 20,
            lengthFieldX: 20,
            numberRottenApples: 4,
            level: 1,
            count: 1000,
            speed: 250,
        },
        {
            field: new Field(15, 15).getField(),
            lengthFieldY: 15,
            lengthFieldX: 15,
            numberRottenApples: 2,
            level: 2,
            count: 1500,
            speed: 200,
        },
        {
            field: new Field(30, 30).getField(),
            lengthFieldY: 30,
            lengthFieldX: 30,
            numberRottenApples: 6,
            level: 3,
            count: 2000,
            speed: 150,
        },
        {
            field: new Field(20, 40).getField(),
            lengthFieldY: 20,
            lengthFieldX: 40,
            numberRottenApples: 6,
            level: 4,
            count: 2500,
            speed: 100,
        },
    ];

    let zmeyModel = new ZmeyModel(fields);
    let zmeyView = new ZmeyView(zmeyModel, containerGame, elems);
    zmeyModel.setZmeyView(zmeyView);

    let zmeyController = new ZmeyController(zmeyModel, elems);
    zmeyModel.init();
}

