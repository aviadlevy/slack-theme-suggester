const express = require('express');
const bodyParser = require('body-parser');
const slackBot = require('./slackBot');
const app = express();

app.listen(process.env.PORT || 80, () => {
    if (process.argv[2] === undefined) {
        console.log('please specify path to csv file');
        process.exit()
    }
	if (process.env.STS_PORT === undefined) {
		console.log('please set env variable - STS_PORT=<the_port_for_this_app>');
        process.exit()
	}
    console.log('server is up with port: ' + process.env.STS_PORT);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/choice', req => {
    let resBody = JSON.parse(req.body.payload);
    if (resBody.callback_id.startsWith('postChoice')) {
        if (resBody.actions[0].name.toLowerCase() === 'yes') {
            slackBot.sendEndingMsg(resBody.response_url, resBody.actions[0].value);
        } else {
            slackBot.sendSuggestionMsg(resBody.response_url, resBody.callback_id.split('_')[1], process.argv[2]);
        }
    } else {
        let themeName = resBody.actions[0].name;
        let letter = resBody.actions[0].value;
        slackBot.sendIsThisYourPick(resBody.response_url, themeName, letter);
    }
});

app.post('/suggest', (req, res) => {
    const {token, text, response_url} = req.body;
    if (token === process.env.VEREFICATION_TOKEN) {
        let letter = text;
        if (letter.length !== 1) {
            res.send({
                'response_type': 'ephemeral',
                'text': 'Please send only one letter.\nPlease try again.'
            });
            return;
        }
        slackBot.sendSuggestionMsg(response_url, letter, process.argv[2]);
    } else {
        res.send({
            'response_type': 'ephemeral',
            'text': 'Verification token mismatch'
        });
    }
});