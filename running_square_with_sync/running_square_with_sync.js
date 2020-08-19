var running_square_with_sync = SAGE2_App.extend({

    init: function (data) {
        // Inicializujeme Canvas
        this.SAGE2Init("canvas", data);
        // Inicializujeme promeny
        this.ctx = this.element.getContext("2d");
        this.vector = [-1, 0];
        this.speed = 25;
        this.squareSize = 50;
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
    // Funkce se automaticky vola po aktualizaci parametru
    load: function () {
        // neco
    },

    drawSquare: function () {
        this.ctx.fillStyle = this.state.color;
        this.ctx.fillRect(this.state.coordinates[0],
            this.state.coordinates[1],
            this.squareSize,
            this.squareSize);
    },

    nextPoint: function (dt) {
        //Vypocitame novу souradnice ctverce
        let new_x = this.state.coordinates[0] + this.vector[0] * dt * this.speed * 5;
        let new_y = this.state.coordinates[1] + this.vector[1] * dt * this.speed * 5;
        // Pokud se ctverec srazí se stěnou, zmeni smer pohybu, jinak ukladame nove souradnice
        if (new_x + this.squareSize > this.element.width ||
            new_y + this.squareSize > this.element.width ||
            new_x < 0 || new_y < 0) {

            this.newVector();
        }
        else {
            // Ukladame nove souradnice
            this.state.coordinates[0] = new_x;
            this.state.coordinates[1] = new_y;
            this.SAGE2Sync(true);
        }
    },

    newVector: function () {
        // Vypocitame novy smer
        x = Math.random() * 2 * Math.PI;

        this.vector[0] = Math.cos(x);
        this.vector[1] = Math.sin(x);
        // Ukladame ovu barvu
        this.state.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        // Aktualizujeme synchronizovane parametry
        this.SAGE2Sync(true);
    }
});