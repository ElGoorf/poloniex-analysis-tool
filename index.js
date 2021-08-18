import Poloniex from "poloniex-api-node";
import dotenv from "dotenv";

dotenv.config()
const credentials = {
    key: process.env.POLO_KEY,
    secret: process.env.POLO_SECRET,
};

async function run() {
    const poloniex = new Poloniex (credentials.key, credentials.secret);
    poloniex.returnOpenOrders('ALL', function (err, orders) {
        if (err) {
            throw new Error(err)
        }

        poloniex.returnTicker((tickerErr, ticker) => {
            if (tickerErr) {
                console.log(tickerErr.message);
            } else {


                const actualOrders = Object.entries(orders).filter(([pair, ordersForPair]) => ordersForPair.length > 0);

                let table = [];
                actualOrders.forEach(([pair, ordersForPair]) => {
                    const summary = ordersForPair.reduce((acc, order) => {
                        if (order.type === 'sell' && order.margin === 0) {
                            acc.totalOrderValue += parseFloat(order.total);
                            acc.totalOrderQuantity += parseFloat(order.startingAmount);

                            acc.avOrderSellPrice = acc.totalOrderValue/acc.totalOrderQuantity;

                            if (acc.lowestPrice > order.rate) {
                                acc.lowestPrice = order.rate;
                            }
                        }
                        return acc;
                    }, { totalOrderValue: 0, totalOrderQuantity: 0, avOrderSellPrice: 0, lowestPrice: Number.MAX_SAFE_INTEGER });

                    table.push([
                        pair,
                        ...Object.values(summary),
                        ticker[pair].last,
                        `${parseFloat(ticker[pair].percentChange * 100).toFixed(2)} %`, summary.avOrderSellPrice / ticker[pair].last, summary.lowestPrice / ticker[pair].last,
                    ])
                });
                console.table([
                    ['pair', 'total order sell', 'total sell quantity', 'av. sell price', 'lowest sell price', 'current value', '24hr', 'optimism', 'optimism at lowest'],
                    ...table.sort((a,b) => a[8] - b[8])
                ]);
            }
        });
    });
}

run();
