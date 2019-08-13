module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "codeceptjs/codeceptjs": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-actor-in-scenario": 2
    },
    "plugins": [
        "codeceptjs"
    ]
};