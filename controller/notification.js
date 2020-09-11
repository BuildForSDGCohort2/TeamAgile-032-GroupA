const { createInstance } = require("@engagespot/notifications");

exports.notificationCOnt = async (req, res, next) => {
  const { phone_number } = req.user;
  console.log(phone_number);
  try {
    const engagespotInstance = createInstance({
      apiKey: process.env.ENGAGESPOT_APIKEY,
      siteKey: process.env.ENGAGESPOT_SITEKEY
    });

    let result = await engagespotInstance
      .setMessage({
        campaign_name: "okkkkkkkkkkkkkkkkkkk",
        notification: {
          title: "You have a new message from John!",
          message: "Hey Dave, Wassup...",
          icon: "",
          url: "https://google.com"
        },
        send_to: "identifiers"
      })
      .addIdentifiers([phone_number])
      .send();
    

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
