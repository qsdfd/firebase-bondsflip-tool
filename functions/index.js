const functions = require('firebase-functions');
const axios = require('axios');


const BOND_ID = "13190";
const OSBUDDY_GR_PRICES_SUMMARY_GOOGLE_APIS = 'https://storage.googleapis.com/osbuddy-exchange/summary.json';
const OSRS_GE_API_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=' + BOND_ID;


exports.summary = functions.https.onRequest((req, res) => {
    axios.get(OSBUDDY_GR_PRICES_SUMMARY_GOOGLE_APIS)
    .then(summ => {
        // let bond = summ.data[BOND_ID];
        axios.get(OSRS_GE_API_URL)
        .then(ge_api => {
        //     let convert = Number(ge_api.data.item.current.price.slice(0, -1)) * 100000;
        //     buy = bond.overall_average - (convert/2);
        //     sell = bond.overall_average + (convert/2);
        //     factor = Number((bond.buy_quantity / bond.sell_quantity).toFixed(2));

        //     res.send({
        //         calc : {
        //             buy,
        //             sell,
        //             factor
        //         },
        //         bond,
        //         convert
            // });
            res.send('ok')
        })
        .catch(err => {
            res.send(err.message);
        });
    })
    .catch(err => {
        res.send(err.message);
    });
});
