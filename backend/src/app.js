"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoute_1 = require("./routes/userRoute");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.use("/api/users", userRoute_1.default);
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
