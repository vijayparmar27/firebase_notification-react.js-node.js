const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
app.use(bodyParser.json());

const serviceAccount = require("./firecamp1.json");

const topic = "new1";

const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

initializeFirebase();
console.log("Subscribing to topic:", topic);

const token =
  "dVfio4TluAUSbVV2UE5FJ_:APA91bFwjEw0S0ac4bG_6QWkn_UsOuM6MhsE4QR7NEvXzmJo61s7CKvzq7q0_rSTHqfp0RniO9RLBEf9qDnIvPXEdGRbH_SXKjLb_YXDE5of6tifUfh40xQvuLLbyDTn8c8d_lgqvI9L";

// // Subscribe to the topic
// admin
//   .messaging()
//   .subscribeToTopic(token, topic)
//   .then((response) => {
//     console.log("Successfully subscribed to topic:", response);
//   })
//   .catch((error) => {
//     console.error("Error subscribing to topic:", error);
//   });

const message = {
  notification: {
    // title: "title....",
    body: "body.....",
  },
};

// Send the message after ensuring subscription
setTimeout(() => {
  console.log("Sending message to topic:", topic);
  admin
    .messaging()
    .sendToTopic(topic, message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}, 5000);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", (e) => {
  console.log("---- unexpected exception : e : ", e);
});
process.on("unhandledRejection", (e) => {
  console.log("---- unexpected exception : e : ", e);
});
