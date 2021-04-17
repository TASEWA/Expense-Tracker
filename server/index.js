const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send('Crashed!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
