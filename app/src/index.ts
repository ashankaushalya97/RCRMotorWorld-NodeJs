import express = require("express");
import router from "./main-dispatcher";

const app = express();

app.listen(8080,()=>console.log("Server has been started."));

app.use(router);
