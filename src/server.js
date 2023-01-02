require('dotenv').config();
const { PORT, DATABASE_URL } = process.env;
const mongoose = require('mongoose');
mongoose.connect(DATABASE_URL);

const upload = require('multer')();

const path = require('node:path');
const fs = require('node:fs');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const page of fs.readdirSync(path.join(__dirname, 'pages/'))) {
    app.use(`/${page}`, express.static(path.join(__dirname, `pages/${page}`)));
}

app.post('/login/', upload.none(), async (req, res) => {
    const AccountModel = require('./moongose_models/Account');

    const account = await AccountModel.findOne({ username: req.body.username });
    if (account) {
        if (account.password = req.body.password) {
            res.redirect('/success');
        }
        else {
            //password is incorrect
        }
    }
    else {
        //username is incorrect
    }
});

app.get('*', (req, res) => {
    res.status(404).send('ERROR: Page not found');
});

app.listen(PORT);
