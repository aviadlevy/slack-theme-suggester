const parser = require('./parser');
const axios = require("axios");
const slackMessages = require("./slackMessages");

module.exports = {
    bandDict: {},
    sendEndingMsg: function (response_url, bandName) {
        this.sendMsgToSlack(response_url, slackMessages.getFinalMsg(bandName)
        )
    },
    sendSuggestionMsg: function (response_url, letter) {
        parser.getBandsFromFile(letter, 'bands_enriched.csv')
            .then(choices => {
                this.bandsDict = choices;
                return this.sendMsgToSlack(response_url, slackMessages.getChoiceMsg(choices, 'bands', letter));
            });
    },
    sendMsgToSlack: function (response_url, msg) {
        return axios.post(response_url, msg)
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    sendIsThisYourPick: function (response_url, bandName, letter) {
        this.sendMsgToSlack(response_url, slackMessages.getIsThisYourPickMsg(this.bandsDict, bandName, letter));
    }
};