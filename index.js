// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", (req, res) => {
  const today = new Date();
  res.json({
    unix: parseInt(today.getTime().toFixed(0)),
    utc: today.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  console.log("params", req.params.date, typeof req.params.date);

  const REGEX = /^[0-9]*$/;
  //const date = req.params.date.includes("-") ? new Date(req.params.date) : new Date(Number(req.params.date));
  const date = REGEX.test(req.params.date)
    ? new Date(Number(req.params.date))
    : new Date(req.params.date);

  if (date != "Invalid Date") {
    res.json({
      unix: parseInt(date.getTime().toFixed(0)),
      utc: date.toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
