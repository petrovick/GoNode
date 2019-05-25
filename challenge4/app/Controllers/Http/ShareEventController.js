"use strict";

const Kue = use("Kue");
const Job = use("App/Jobs/ShareEventMail");

const User = use("App/Models/User");
const Event = use("App/Models/Event");

class ShareEventController {
  async store({ request, params, auth }) {
    console.log(params.id);
    const user = await User.findOrFail(auth.user.id);
    const event = await Event.findOrFail(params.id);
    console.log(user.email);
    Kue.dispatch(
      Job.key,
      { email: user.email, username: user.username, eventName: event.title },
      { attempts: 3 }
    );
  }
}

module.exports = ShareEventController;
