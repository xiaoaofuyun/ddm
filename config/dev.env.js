'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//const path='http://192.168.0.192:8777'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'/api/',
})
