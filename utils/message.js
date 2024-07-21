const moment = require('moment-timezone')

function formatMessage(username,text,sentByme){
    return {
        username,
        text,
        time: moment().tz('Asia/Kolkata').format('MMMM Do, h:mm a'),
        sentByme:sentByme
    };
}
module.exports={formatMessage};