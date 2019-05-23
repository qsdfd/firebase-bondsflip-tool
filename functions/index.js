const functions = require('firebase-functions');

const BOND_ID = "13190";
const OSBUDDY_GR_PRICES_SUMMARY_GOOGLE_APIS_URL ="https://storage.googleapis.com/osbuddy-exchange/summary.json";
const OSRS_GE_API_URL = `https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${BOND_ID}`;
const FIREBASE_FIXED_VALS_URL = 'https://bondsflip-tool.firebaseio.com/vals.json';

exports.summary = functions.https.onRequest((req, res) => {
    axios
        .all([
            axios.get(OSBUDDY_GR_PRICES_SUMMARY_GOOGLE_APIS_URL),
            axios.get(OSRS_GE_API_URL),
            axios.get(FIREBASE_FIXED_VALS_URL)
        ])
        .then(axios.spread((summary, ge_api, fixed_vals) => {
            let fixed = fixed_vals.data;
            let bond = summary.data[BOND_ID];
            let convert = Math.round(
                Number(ge_api.data.item.current.price.slice(0, -1)) * 100000
            );
            let isReliable = bond && bond.overall_average && convert ? true : false;

            let floor = bond.overall_average - convert / 2;
            let ceil = bond.overall_average + convert / 2;
            let rest = bond.sell_quantity - bond.buy_quantity;
            let factor = Number((bond.buy_quantity / bond.sell_quantity).toFixed(2));

            let buy = floor - (floor % 100000) + 6000;
            let sell = ceil - (ceil % 100000) + 94000;
            let margin = sell - buy - convert;

            res.send({
                calc: {
                    sug: {
                        buy,
                        sell,
                        margin
                    },
                    floor,
                    ceil,
                    rest,
                    factor,
                    isReliable
                },
                convert,
                bond,
                fixed
            });
        }))
        .catch(err => {
            res.send(err.message);
        });
});
