const moment = require('moment-timezone')

function formatMessage(username,text,room,sentByme){
    console.log(username,text,sentByme,room,'im format msg')
    return {
        username,
        text,
        time: moment().tz('Asia/Kolkata').format('MMMM Do, h:mm a'),
        sentByme:sentByme,
        room,
    };
}
module.exports={formatMessage};