const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/messages', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).send('Error reading messages from Supabase.');
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([
                { name: req.body.name, message: req.body.message }
            ]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send('Error writing message to Supabase.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
