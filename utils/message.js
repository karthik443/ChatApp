const moment = require('moment')

function formatMessage(username,text,sentByme){
    return {
        username,
        text,
        time:moment.utc().format('MMMM Do, h:mm a'),
        sentByme:sentByme
    };
}
module.exports={formatMessage};