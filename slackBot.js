const parser = require('./parser');
const axios = require("axios");
const slackMessages = require("./slackMessages");

module.exports = {
    themeNameToImgDict: {},
    sendEndingMsg: function (responseUrl, themeName) {
        this.sendMsgToSlack(responseUrl, slackMessages.getFinalMsg(themeName)
        )
    },
    sendSuggestionMsg: async function (responseUrl, letter, filePath) {
        this.themeNameToImgDict = await parser.getThemeNamesToImgFromFile(letter, filePath);
        return this.sendMsgToSlack(responseUrl, slackMessages.getChoiceMsg(this.themeNameToImgDict, parser.theme, letter));
    },
    sendMsgToSlack: function (responseUrl, msg) {
        return axios.post(responseUrl, msg)
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    sendIsThisYourPick: function (responseUrl, themeName, letter) {
        this.sendMsgToSlack(responseUrl, slackMessages.getIsThisYourPickMsg(this.themeNameToImgDict, themeName, letter));
    }
};