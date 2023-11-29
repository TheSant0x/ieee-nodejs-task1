import express from 'express';
import mongoose from 'mongoose';
import EventModel from './Events.js';

const connect = async () => {
    await mongoose.connect('mongodb+srv://mahmoudANDabdelrahim:7l274fx8WVGWpfQ1@cluster0.6yqowbd.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log('Connected to database');
    });
}
await connect();
const app = express();
app.use(express.json());
app.get('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to our home page' });
});
//FETCH ALL EVENTS
app.get('/events', async (req, res) => {
    const events = await EventModel.find();
    res.status(200).json({ events });
});
//POST EVENT
app.post('/events', async (req, res) => {
    try {
        const { event } = req.body;
        const addedEvent = new EventModel(event);
        await addedEvent.save();
        res.status(200).json(addedEvent);
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});
//FETCH SPECIFIC EVENT BY ID 
app.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventModel.findById(id);
        console.log('event = ', event);

        if (!event) {
            res.status(404).json({ message: 'no event found with this id' })
        }
        else res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//DELETE EVENT 
app.delete('/events/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await EventModel.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ message: 'Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'no event with this id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});
//UPDATE EVENT 
app.patch('/events/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { numberOfAttendees } = req.body;
        const event = await EventModel.findById(id);
        if (event) {
            event.numberOfAttendees = numberOfAttendees;
            event.save();
            res.status(200).json({ event });
        } else {
            res.status(404).json({ message: 'no event with this id' });
        }
    } catch (err) {
        res.status(500).json({message: 'server error'});
    }
});

const PORT = 7777;

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});