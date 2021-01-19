
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('351065A1dKwJf83zmK5ff46488');

sendOtp.send("918871782180", "comradesms", '2321', function (error, data) {
  console.log(data);
  if (data.type == 'success') console.log('OTP verified successfully')
  if (data.type == 'error') console.log('OTP verification failed')
});




// var TeleSignSDK = require('telesignsdk');

// const customerId = "B400E547-77BD-4F8A-BBAD-73C525EC3A7D";
// const apiKey = "bxPAdPtL4muIT5I0xySLEFoTq0W56SgNz3EkAaSZXoDrtBxCtDNdEHmC8G3KIHIzvTve7t1sgHMYIhJaC+B6dA==";
// const rest_endpoint = "https://rest-api.telesign.com";
// const timeout = 10*1000; // 10 secs

// const client = new TeleSignSDK( customerId,
//     apiKey,
//     rest_endpoint,
//     timeout // optional
//     // userAgent
// );

// const phoneNumber = "917000121614";
// const phoneTypeVOIP = "5";

// console.log("## PhoneIDClient.phoneID ##");

// function messageCallback(error, responseBody) {
//     if (error === null) {
//         console.log(`PhoneID response for phone number: ${phoneNumber}` +
//             ` => code: ${responseBody['status']['code']}` +
//             `, description: ${responseBody['status']['description']}`);

//         if (responseBody['status']['code'] === 200) {
//             if (responseBody['phone_type']['code'] === phoneTypeVOIP) {
//                 console.log("Phone type in request is VOIP");
//             } else {
//                 console.log("Phone type in request is not VOIP");
//             }
//         }
//     } else {
//         console.error("Unable to get PhoneID. " + error);
//     }
// }
// client.phoneid.phoneID(messageCallback, phoneNumber);


// var FCM = require('fcm-node');
// var serverKey = 'AAAA000XhTA:APA91bHTQmQJGmwprQG-87Tx2-mDzI8Yb3g4dzKCuznp_nRUBd5A1FEk5UxfM-0LMHO8mDKlTE_GohR-4oShVGfl19FOfKJm8wlMnvf6PXCVOxECh1zl_i3DwPanPZKCR9piKg4t5uej'; //put your server key here
// var fcm = new FCM(serverKey);

// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: "f7UjrQqeosY:APA91bHImQj1cEZoWlkI3ZIHBe6UFRt7XsQRQUC0GBxVE8P1f-1B34DjI6ITl8i0xa5ccg8tm3C4IMl2N62Hu7xmm-tOnl9qOMAwaDS5HONSy2h7G2J9lXjOW1K6nSITy6sePs0fez-U", 
//     collapse_key: 'green',
//     notification: {
//         title: 'Title of your push notification', 
//         body: 'Body of your push notification' 
//     }
// };
// fcm.send(message, function(err, response){
//     if (err) {
//         console.log("Something has gone wrong!");
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });


// function sendPush(uid) {

//     // Get the user from Firestore
//     const getDeviceTokensPromise = admin.firestore()
//     .collection('users').doc(uid).get();

//     // Get the User profile from Firebase Auth
//     const getUserProfilePromise = admin.auth().getUser(uid);

//     Promise.all([getDeviceTokensPromise, getUserProfilePromise])
//     .then(function(results) {
//       // The array containing all the user's tokens.
//       const tokens = Object.keys(results[0].data().notificationTokens);

//       // The user profile from Firebase Auth
//       const user = results[1];

//       // Check if there are any device tokens.
//       if (tokens.length === 0) {
//         return console.log('There are no notification tokens to send to.');
//       }

//       // Notification details.
//       const payload = {
//         notification: {
//         title: 'Payment completed!',
//         body: `Thank you, ${user.displayName}, we received your payment.`
//         }
//       };

//       // Send notifications to all tokens.
//       admin.messaging().sendToDevice(tokens, payload)
//       .then(function(response) {
//         console.log('Successfully sent push: ', response);
//         return response;
//       })
//       .catch(function(error) {
//         console.log('Error sending push:', error);
//       });

//       return results;
//     })
//     .catch(function(error) {
//       console.log('Error retrieving tokens or user details:', error);
//     });

//   }