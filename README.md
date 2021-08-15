# Poloniex Analysis Tool

Summarises all your open sell orders in a single table instead of requiring multiple browser tabs to be opened.

## Disclaimer

This is a third-party, unofficial tool with no affiliation to Poloniex. This tool is open-source, provided for use at user's discretion, without warranty or guarantee!

## How to set up

1. Install Node, and install dependencies with yarn or npm as you prefer.
2. Copy or rename `credentials.sample.json` to `credentials.json`.
3. Create a Poloniex APi key: https://poloniex.com/apiKeys. For own safety, leave "Enable Trading" and "Enable Withdrawals" unchecked, as they are not required.
4. Enter your Poloniex API key details into `credentials.json`.

## How to use

Run `node index.js`.

A table will appear with all your open orders, ie:

```
┌─────────┬─────────────────┬────────────────────┬───────────────────────┬─────────────────────────┬─────────────────────┬──────────────────┬────────────┬────────────────────┬──────────────────────┐
│ (index) │        0        │         1          │           2           │            3            │          4          │        5         │     6      │         7          │          8           │
├─────────┼─────────────────┼────────────────────┼───────────────────────┼─────────────────────────┼─────────────────────┼──────────────────┼────────────┼────────────────────┼──────────────────────┤
│    0    │     'pair'      │ 'total order sell' │ 'total sell quantity' │    'av. sell price'     │ 'lowest sell price' │ 'current value'  │   '24hr'   │     'optimism'     │ 'optimism at lowest' │
│    1    │   'USDT_BTC'    │    18460.14965     │  0.30407731000000005  │    60708.73768910938    │  '57000.00000000'   │ '45905.71895665' │ '-1.91 %'  │ 1.3224656768024539 │  1.2416753575698625  │
│    2    │   'USDT_DOGE'   │    578.93520754    │     964.89201257      │   0.5999999999979272    │    '0.60000000'     │   '0.29933287'   │  '2.44 %'  │ 2.004457445645469  │  2.0044574456523936  │
│    3    │   'USDT_ETH'    │     776.44196      │      0.19411049       │          4000           │   '4000.00000000'   │ '3148.71760000'  │ '-3.61 %'  │ 1.2703584468800886 │  1.2703584468800886  │
```

### To make sense of the table:
* 'total order sell' = Total value of your sell orders for given pair
* 'total sell quantity' = Total quantity of sell orders
* 'av. sell price' = Average sell price of orders
* 'lowest sell price' = The lowest sell price of orders
* 'current value' = Current market rate for given pair
* '24hr' = % change in market value for pair
* 'optimism' = 'av. sell price' divided by 'current value'.
* 'optimism at lowest' = 'lowest sell price' divided by 'current value'.

### Optimism
Basically, the lower the number and closer to 1.000, the more likely the orders will be filled sooner. If a market has a strong 24hr % increase and your optimism value is close to 1, you may want to consider raising the sell price.
