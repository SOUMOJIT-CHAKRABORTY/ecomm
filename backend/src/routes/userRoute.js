"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.send("Hello World!");
});
exports.default = router;
