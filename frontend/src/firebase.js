import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBDyvPlOcA_wnEcBGQDCg7k4LJ9Fg86rwk",
  authDomain: "fir-app-73b06.firebaseapp.com",
  projectId: "fir-app-73b06",
  storageBucket: "fir-app-73b06.appspot.com",
  messagingSenderId: "602839581159",
  appId: "1:602839581159:web:228e85826cc0a42df33d42",
  measurementId: "G-MW3874HSJJ",
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Get Firebase Cloud Messaging instance
const messaging = getMessaging(app);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BPXgvSKC42owAwbGtOKOhgAhrO7JzBa4VhKbFd82iUc8VoTUMapwl6N8jx1eUr7UP5eFO0qT26y2sGjqTOvFpec",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client:: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      messaging.useServiceWorker(registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
