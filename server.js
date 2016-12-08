const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));

const ensureSecure = (req, res, next) => {
  if(req.secure){
    // OK, continue
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
};

app.get('*', ensureSecure, (req, res)=> {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log("Server started");