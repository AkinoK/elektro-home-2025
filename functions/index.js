/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const axios = require("axios");
// const nodemailer = require("nodemailer");

// admin.initializeApp();

// // Slack Webhook URL
// const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

// // Email Configuration
// const transporter = nodemailer.createTransport({
//   host: "s223.xrea.com",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: "web-inquiry@sv.elektrolibera.jp",
//     pass: "Elektro2176inq",
//   },
// });

// exports.postToSlackAndSendEmail = functions.firestore
//     .document("contacts/{contactId}")
//     .onCreate(async (snap, context) => {
//       const newData = snap.data();

//       // Handle createdAt timestamp and format it
//       // eslint-disable-next-line max-len
//       const createdAt = newData.createdAt ? formatDateTime(newData.createdAt.toDate()) : "No date provided";

//       // Construct message using formatted date and other document data
//       // eslint-disable-next-line max-len
//       const message = `【日時】: ${createdAt}\n【名前】: ${newData.name}\n【メールアドレス】: ${newData.email}\n【タイトル】: ${newData.subject}\n【メッセージ】: \n ${newData.message}`;

//       try {
//       // Send POST request to Slack
//         const response = await axios.post(SLACK_WEBHOOK_URL, {
//           text: message,
//         });

//         console.log("Slackへの通知成功:", response.status);
//       } catch (error) {
//         console.error("Slackへの通知失敗:", error);
//       }

//       try {
//       // Send the received message to both email addresses
//         await transporter.sendMail({
//           // from: "web-inquiry@sv.elektrolibera.jp",
//           // eslint-disable-next-line max-len
//           to: ["web-inquiry@sv.elektrolibera.jp"],
//           subject: `ElektroLibera お問い合わせ
//           : ${newData.subject}`,
//           text: message,
//         });

//         console.log("Email送信成功");
//       } catch (error) {
//         console.error("Email送信失敗:", error);
//       }

//       try {
//       // Send email to the person who submitted the contact form
//         const emailContent = `
      
//       このメールはお問い合わせフォームよりお問い合わせをいただいた方へ、自動返信によって送信されています。

//       ${newData.name} 様
      
//       お問い合わせをいただき、ありがとうございます。
//       以下の内容でお問い合わせをお受けいたしました。
      
//       ＜お問い合わせ内容＞
//       お問い合わせ日時: ${createdAt}
//       お名前: ${newData.name}
//       Emailアドレス: ${newData.email}
//       件名: ${newData.subject}
//       お問い合わせ内容: ${newData.message}

//       改めて、担当者よりご連絡させていただきますので、今しばらくお待ちください。

//       エレクトロリベラ合同会社

//       ------------------------------------------------------------------------------------------

//       Dear ${newData.name},

//       Thank you for getting in touch with us. Here are the details of your submission:

//       Date and Time: ${createdAt}
//       Name: ${newData.name}
//       Email: ${newData.email}
//       Subject: ${newData.subject}
//       Message: ${newData.message}

//       We will get back to you as soon as possible.

//       Best regards,
//       ElektroLibera, LLC.
//       `;
//         // Send email
//         await transporter.sendMail({
//           from: "\"エレクトロリベラお問い合わせ / ElektroLibera Inquiry\" <web-inquiry@sv.elektrolibera.jp>",
//           to: newData.email,
//           subject: "お問い合わせいただきありがとうございます。/ Thank you for contacting us!",
//           text: emailContent,
//         });

//         console.log("Auto-response Email送信成功");
//       } catch (error) {
//         console.error("Auto-response Email送信失敗:", error);
//       }
//     });

// // Function to format date and time
// function formatDateTime(date) {
//   const options = {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     timeZone: "Asia/Tokyo",
//     hour12: false,
//   };

//   const dateTimeFormat = new Intl.DateTimeFormat("ja-JP", options);
//   const parts = dateTimeFormat.formatToParts(date);
//   let formattedDate = "";

//   for (const part of parts) {
//     switch (part.type) {
//       case "year":
//         formattedDate += `${part.value}年`;
//         break;
//       case "month":
//         formattedDate += `${part.value}月`;
//         break;
//       case "day":
//         formattedDate += `${part.value}日 `;
//         break;
//       case "hour":
//         formattedDate += `${part.value}時`;
//         break;
//       case "minute":
//         formattedDate += `${part.value}分`;
//         break;
//     }
//   }

//   return formattedDate;
// }
