"use strict";

const Mail = use("Mail");

class ShareEventMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "ShareEventMail-job";
  }

  // This is where the work is done.
  async handle({ email, username, eventName }) {
    console.log(email);
    console.log(username);
    console.log(eventName);
    console.log("ShareEventMail-job started");
    try {
      await Mail.send(
        ["emails.shareevent"],
        {
          user_name: username,
          event_name: eventName
        },
        message => {
          message
            .to(email)
            .from("petrovickg@gmail.com", "Petrovick | Rocketseat")
            .subject("Novo evento para você.");
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ShareEventMail;
