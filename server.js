const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const messagesFilePath = path.join(__dirname, 'messages.json');

app.get('/api/messages', (req, res) => {
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.json([]);
            }
            return res.status(500).send('Error reading messages file.');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/messages', (req, res) => {
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading messages file.');
        }
        const messages = (data) ? JSON.parse(data) : [];
        const newMessage = {
            id: Date.now(),
            name: req.body.name,
            message: req.body.message,
        };
        messages.push(newMessage);
        fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing messages file.');
            }
            res.status(201).json(newMessage);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
