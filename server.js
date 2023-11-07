const express = require('express');
const bodyParser = require('body-parser');
const { loadItems, storeItems, changeItem, removeItem } = require('./service');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); 

app.get('/items', async (req, res) => {
    try {
        const items = await loadItems('items.json'); // Folosim calea către fișierul nostru JSON
        res.json(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/items', async (req, res) => {
    try {
        let items = await loadItems('items.json');
        const newItem = { ...req.body, id: Date.now().toString() };
        items.push(newItem);
        await storeItems(items, 'items.json');
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await changeItem(id, req.body);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await removeItem(id);
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
