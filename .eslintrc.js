'use strict';

module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'browser': true,
    'jquery': true,
    'jest': true
  },
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'prettier'
  ],
  'parserOptions': {
    'version': 2019,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  'rules': {
    'prettier/prettier': 'error'
  }
};
