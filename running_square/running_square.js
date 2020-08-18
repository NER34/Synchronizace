﻿var running_square = SAGE2_App.extend({

    init: function (data) {
        // Inicializujeme Canvas
        this.SAGE2Init("canvas", data);
        // Inicializujeme promeny
        this.ctx = this.element.getContext("2d");
        this.coordinates = [0, 0];
        this.vector = [-1, 0];
        this.speed = 25;
        this.squareSize = 50;
        this.color = "blue";
        this.colors = ["red", "green", "blue"];
    },

    draw: function (date) {
        // Kreslime pozadi
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);
        // Kreslime ctverec
        this.drawSquare();
        // Posouvame ctverec nebo menime smer pohybu
        this.nextVector(this.dt);
    },

    drawSquare: function () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.coordinates[0],
            this.coordinates[1],
            this.squareSize,
            this.squareSize);
    },
    
    nextVector: function (dt) {
        //Vypocitame nove souradnice ctverce. dt je deltaTime
        let new_x = this.coordinates[0] + this.vector[0] * dt * this.speed * 5;
        let new_y = this.coordinates[1] + this.vector[1] * dt * this.speed * 5;
        // Pokud se ctverec srazí se stěnou, zmeni smer pohybu, jinak ukladame nove souradnice
        if (new_x + this.squareSize > this.element.width ||
            new_y + this.squareSize > this.element.width ||
            new_x < 0 || new_y < 0) {
            // Vypocitame novy smer
            x = Math.random() * 2 * Math.PI;
            
            this.vector[0] = Math.cos(x);
            this.vector[1] = Math.sin(x);
            // Ukladame ovu barvu
            this.color = this.colors[Math.round(Math.random() * this.colors.length)];
        }
        else {
            // Ukladame nove souradnice
            this.coordinates[0] = new_x;
            this.coordinates[1] = new_y;
        }
    }
});
