// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize Firebase app in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyBDyvPlOcA_wnEcBGQDCg7k4LJ9Fg86rwk",
  authDomain: "fir-app-73b06.firebaseapp.com",
  projectId: "fir-app-73b06",
  storageBucket: "fir-app-73b06.appspot.com",
  messagingSenderId: "602839581159",
  appId: "1:602839581159:web:228e85826cc0a42df33d42",
  measurementId: "G-MW3874HSJJ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    " ------ [firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
