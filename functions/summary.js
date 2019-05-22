const axios = require('axios');

module.exports = () => {
    axios.get('https://storage.googleapis.com/osbuddy-exchange/summary.json')
    .then(res => {
        console.log('eok')
        return "ok";
    })
    .catch(err => {
        console.log('wok')
        return "nok";
    });
}