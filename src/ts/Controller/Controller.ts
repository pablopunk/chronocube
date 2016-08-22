
/// <reference path="../Model/Model.ts"/>
/// <reference path="../Core/Interfaces.ts"/>


class Controller implements Dump {

    model :Model;

    constructor() {
        this.model = new Model();
    }

    dump() {
        this.model.dump();
    }
}