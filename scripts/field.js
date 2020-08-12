"use strict";

class Field {
    constructor(y, x) {
        this.field = [];
        this.y = y;
        this.x = x;

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