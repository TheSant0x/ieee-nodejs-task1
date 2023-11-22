const express = require('express');
const app = express();
const port = 7777;

const events = [];
for (let i = 1; i <= 7; i++) {
    events.push({
        id: i,
        name: `Event number ${i}`,
        desc: `Description for event number ${i}`
    });
}

//GET all events
app.get('/events', (req, res) => {
    res.json(events);
});

//GET event by ID
app.get('/events/:eventId', (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const event = events.find(event => event.id === eventId);

    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});