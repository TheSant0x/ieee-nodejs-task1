const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  numberOfAttendees: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  }
});

const Events = mongoose.model('Event', EventSchema);

export default Events;