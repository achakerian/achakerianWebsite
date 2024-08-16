const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/content/:subject/:file', (req, res) => {
    const { subject, file } = req.params;
    const filePath = path.join(__dirname, 'content', subject, `${file}.md`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        const htmlContent = marked(data);
        res.send(htmlContent);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
