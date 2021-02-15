import express from "express";
import livereload from "livereload";
import connectLivereload from "connect-livereload";




//Sets up livereload so changes to html will auto refresh browser without plugins
let livereloadServer = livereload.createServer({extraExts : ["vue"]});

livereloadServer.watch("../frontend");
livereloadServer.server.once("connection", () => {setTimeout(() => {livereloadServer.refresh("/");}, 100);});


//Set request handles
let expressApp = express();

expressApp.use(connectLivereload()); //monkey patches HTML with livereload.js for auto F5
expressApp.use(express.json());
expressApp.use(express.static("../frontend"));


//start server
expressApp.listen((process.env.PORT || 80), () => console.log("#EXPRESS | Listening for requests"));