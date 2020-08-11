"use strict";

class Field {
    constructor(x, y) {
        this.field = [];
        this.x = x;
        this.y = y;

        this.create(this.x, this.y);
    }

    create(x, y) {
      for (let i = 0; i < y; i++) {
          this.field.push([]);
        for (let j = 0; j < x; j++) {
            this.field[i].push(0);
        }
      }
    }

    getField() {
        return this.field;
    }
}