﻿var running_square = SAGE2_App.extend({

    init: function (data) {
        // Inicializujeme Canvas
        this.SAGE2Init("canvas", data);
        // Inicializujeme promeny
        this.ctx = this.element.getContext("2d");
        // Souradnice ctverce [x, y]
        this.coordinates = [0, 0];
        // Smer pohybu
        this.vector = [-1, 0];
        // Rychlost pohybu
        this.speed = 125;
        // Velikost strany čtverce
        this.squareSize = 50;
        // Soucasna barva ctverce
        this.color = "blue";
        // Vsechny mozne barvy ctverce
        this.colors = ["red", "green", "blue"];
    },

    draw: function (date) {
        // Kreslime pozadi
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);
        // Kreslime ctverec
        this.drawSquare();
        // Posouvame ctverec nebo menime smer pohybu
        this.nextPoint(this.dt);
    },

    drawSquare: function () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.coordinates[0],
            this.coordinates[1],
            this.squareSize,
            this.squareSize);
    },

    nextPoint: function (dt) {
        //Vypocitame novу souradnice ctverce
        let new_x = this.coordinates[0] + this.vector[0] * dt * this.speed;
        let new_y = this.coordinates[1] + this.vector[1] * dt * this.speed;
        // Pokud se ctverec srazí se stěnou, zmeni smer pohybu, jinak ukladame nove souradnice
        if (new_x + this.squareSize > this.element.width ||
            new_y + this.squareSize > this.element.width ||
            new_x < 0 || new_y < 0) {

            this.newVector();
        }
        else {
            // Ukladame nove souradnice
            this.coordinates[0] = new_x;
            this.coordinates[1] = new_y;
        }
    },

    newVector: function () {
        // Vypocitame novy smer
        x = Math.random() * 2 * Math.PI;

        this.vector[0] = Math.cos(x);
        this.vector[1] = Math.sin(x);
        // Ukladame novou barvu
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
});
