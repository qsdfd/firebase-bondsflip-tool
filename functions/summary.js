const axios = require('axios');

module.exports = () => {
    axios.get('https://storage.googleapis.com/osbuddy-exchange/summary.json')
    .then(res => {
        return "ok";
    })
    .catch(err => {
        return "nok";
    });
}