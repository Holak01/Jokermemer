/**
 * This is the main configuration file for the Hive developer Javascript tutorials
 *
 * In this configuration file we use 'address' to refer to what in many other contexts are called
 * user,
 * author,
 * account,
 * account name
 *
 * Address is a fairly accurate term, and hasn't been overloaded, it also has at-least exactly the properties of addresses on other blockchains.
 *
 */

export const TestnetHive = {
    accounts: [
        {
            address: 'demo',
            privActive: '5Jtbfge4Pk5RyhgzvmZhGE5GeorC1hbaHdwiM7pb5Z5CZz2YKUC',
        },
        {
            address: 'demo1',
            privActive: '5Ju3fhTY25Tsseyk4c1PUpH2bTLC8eLbdFRjytmnvU9ZLEQBmsf',
        },
        {
            address: 'demo2',
            privActive: '5JZDEAXjANq9isYa66g9tYbeuo4wWXhwXPfujwt9s4DaK4b38R9',
        },
        {
            address: 'demo3',
            privActive: '5J6bzy9TM3kBRibXmFi7ZvThrWGMN3epg7aCXLKazTLsJnmw6Mq',
        },
        {
            address: 'demo4',
            privActive: '5KQQKVHJBpygcBrqKF6TLQSBX5zHbPRgNEAuojb6fK2C94NX3kJ',
        },
        {
            address: 'demo5',
            privActive: '5K7QWGuAAX27yvQRPBMBDA4BbXVpdtmALxoM8CoRdZAsPew5hJd',
        },
    ],
    url: 'http://127.0.0.1:8090',
    net: {
        addressPrefix: 'TST',
        chainId:
            '18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e',
    },
};

export const TestnetAlt = {
    accounts: [
        {
            address: 'demo01',
            privPosting: '5KNckabfv4i793ymx4NWrTLDQZMjhgQTJbPSTroeBY4Bh5Eg6Tm',
            privActive: '5HxTntgeoLm4trnTz94YBsY6MpAap1qRVXEKsU5n1v2du1gAgVH',
        },
        {
            address: 'demo02',
            privPosting: '5KHUais1mfUn7A3M6pLZw1WF1v6WetFGCB1YDNctcPizLyCT1vW',
            privActive: '5KgMKfnTQTzrmZP3RxrQs3CEckHTPXxFzJWHV3cJjetmXwLUWZj',
        },
    ],
    url: 'http://127.0.0.1:8090',
    net: {
        addressPrefix: 'TST',
        chainId:
            '18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e',
    },
};

export const PublicTestnetHive = {
    url: 'https://testnet.openhive.network',
    net: {
        addressPrefix: 'TST',
        chainId:
            '18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e',
    },
};

export const Testnet = TestnetHive;

export const Mainnet = {
    accounts: [],
    url: 'https://api.hive.blog',
    net: {
        addressPrefix: 'STM',
        chainId:
            'beeab0de00000000000000000000000000000000000000000000000000000000',
    },
};

export default {};
