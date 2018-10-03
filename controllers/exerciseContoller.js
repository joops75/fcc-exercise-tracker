const User = require('../models/User');
const Exercise = require('../models/Exercise');
const validDate = require('../utils/validDate');

module.exports = class {
    getHomePage(req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
    }

    postUser(req, res) {
        const { username } = req.body;
        if (!username) return res.send('Username required.');
        User.create({ username })
            .then(doc => res.send({ _id: doc.id, username: doc.username }))
            .catch(err => { throw err; });
    }

    async postExercise(req, res) {
        const { userId, description, duration, date } = req.body;
        if (!userId || !description || !duration) return res.send('Please fill out all required fields.');
        const durationOk = /^\d+$/.test(duration);
        const dateOk = !date || validDate(date);
        if (!durationOk && !dateOk) return res.send('Invalid duration (integer required) and date');
        if (!durationOk) return res.send('Invalid duration (integer required)');
        if (!dateOk) return res.send('Invalid date');
        const fields = date ? { userId, description, duration, date } : { userId, description, duration };
        const newExerise = await Exercise.create(fields);
        User.findByIdAndUpdate(userId, { $push: { log: newExerise }, $inc: { count: 1 } }, { new: true, select: '-__v' })
            .populate({
                path: 'log',
                select: '-_id -userId -__v -utcDate',
                options: { sort: { date: -1 } }
            })
            .then(doc => {
                if (!doc)  return res.send('No such userId exists');
                res.send(doc)
            })
            .catch(err => { throw err; });
    }

    getUsers(req, res) {
        User.find({}, '_id username', (err, docs) => {
            if (err) throw err;
            res.send(docs);
        })
    }

    getUser(req, res) {
        const { userId, from, to, limit } = req.query;
        if (!userId) return res.send('userId required');
        const fromOk = !from || validDate(from);
        const toOk = !to || validDate(to);
        const limitOk = !limit || /^\d+$/.test(limit);
        if (!fromOk || !toOk || !limitOk) {
            return res.send(`
                The following parameters are not valid: 
                ${!fromOk ? "'from' " : ''}
                ${!toOk ? "'to' " : ''}
                ${!limitOk ? "'limit' " : ''}
            `)
        }
        const match = {};
        if (from || to) match.date = {};
        if (from) match.date.$gte = from;
        if (to) match.date.$lte = to;
        User.findById(userId, '-__v',)
            .populate({
                path: 'log',
                match,
                select: '-_id -userId -__v -utcDate',
                options: { sort: { date: -1 }, limit }
            })
            .then(doc => {
                if (!doc)  return res.send('No such userId exists');
                res.send(doc)
            })
            .catch(err => { throw err; });
    }
}