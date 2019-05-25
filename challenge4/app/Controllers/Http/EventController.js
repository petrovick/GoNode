"use strict";

const Event = use("App/Models/Event");

class EventController {
  async index({ request, response, view }) {
    const { date_event, page } = request.get();

    let query = Event.query(); //.with("user");

    if (date_event) {
      console.log("Entrou aqui");
      query = query.whereRaw(`"date_event"::date = ?`, date_event);
    }

    const events = await query.paginate(page);

    return events;
  }

  async store({ request, auth }) {
    const data = request.only(["title", "location", "date_event"]);
    console.log("Chegou aqui");
    const event = await Event.create({
      ...data,
      user_id: auth.user.id
    });
    return event;
  }

  async show({ params }) {
    var event = await Event.findOrFail(params.id);
    await event.load("user");
    return event;
  }

  async update({ params, request }) {
    var event = await Event.findOrFail(params.id);
    const data = request.only(["title", "location", "date_event"]);
    event.merge(data);
    await event.save();
    return event;
  }

  async destroy({ params }) {
    const event = await Event.findOrFail(params.id);
    event.delete();
  }
}

module.exports = EventController;
