function getActions(choices, letter) {
    let actions = [];
    choices.forEach(choice => {
        actions.push({
            "name": choice,
            "text": choice,
            "type": "button",
            "value": letter
        })
    });
    return actions;
}

function getAttachmentWithLimitActionLength(ChooseFrom, choices, letter) {
    attachments = [];
    let i = 1;
    let size = 5;
    if (choices.length % 5 <= 2) {
        size = 4;
    }
    while (choices.length > 0) {
        attachments.push(
            {
                "text": `Pick a ${ChooseFrom} #${i}`,
                "fallback": "Shame... buttons aren't supported in this land",
                "callback_id": `${ChooseFrom}_choice`,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": getActions(choices.splice(0, size), letter)
            });
        i++;
    }
    return attachments;
}

function getYesNoActions(bandName) {
    return [
        {
            "name": "yes",
            "text": "Yes",
            "type": "button",
            "value": `${bandName}`
        },
        {
            "name": "no",
            "text": "No",
            "type": "button",
            "value": `${bandName}`
        }
    ];
}

module.exports =
    {
        getChoiceMsg: function (choices, ChooseFrom, letter) {
            return {
                "text": `What ${ChooseFrom} do you choose?`,
                "attachments":
                    getAttachmentWithLimitActionLength(ChooseFrom, Object.keys(choices), letter)

            };
        },
        getIsThisYourPickMsg: function (bandsDict, bandName, letter) {
            return {
                "text": "Do you happy with your pick?",
                "attachments": [
                    {
                        "title": `${bandName}`,
                        "fallback": "Shame... buttons aren't supported in this land",
                        "callback_id": `postChoice_${letter}`,
                        "image_url": bandsDict[bandName],
                        "actions": getYesNoActions(bandName)
                    }
                ]
            };
        },
        getFinalMsg: function (bandName) {
            return {
                "text": "",
                attachments: [
                    {
                        "color": "good",
                        title: "You picked " + bandName.replace("&amp;", "&") + ". Great!"
                    }
                ]
            };
        }
    };