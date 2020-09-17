const unirest = require("unirest");
require("dotenv").config();

exports.getOneUserAdminLocation = (req, res) => {
  const apiCall = unirest("GET",
    "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
  );
  apiCall.headers({
    x_rapidapi_host: process.env.X_RAPIDAPI_HOST,
    x_rapidapi_key: process.env.X_RAPIAPI_KEY,
    "useQueryString": true
  });
  apiCall.end(function(result) {
    if (res.error) throw new Error(result.error);
    console.log(result.body);
    res.send(result.body);
  });
};
