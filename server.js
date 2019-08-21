// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

//YY-MM-DD
//MM-DD-YY
//Milliseconds putting numbers in minus shall give a date before 1970

app.get("/api/timestamp/:date_string?", (req, res) => {
  let timeStamp = req.params.date_string;
  if (timeStamp == undefined) {
    timeStamp = Date.now();
    let parseTime = new Date(timeStamp);
    return res.json({
      "unix": timeStamp,
      "utc": parseTime.toUTCString(),
    });
  } else if (Number(timeStamp)) {
    timeStamp = Number(timeStamp);
    let utcDate = new Date(timeStamp);
    res.json({
      "unix": timeStamp,
      "utc": utcDate.toUTCString(),
    });
  } else {
    let parseTime = Date.parse(timeStamp);
    let utcDate = new Date(parseTime);
    res.json({
      "unix": parseTime,
      "utc": utcDate.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
