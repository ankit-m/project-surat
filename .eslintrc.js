/*eslint-disable*/
module.exports = {
  'extends': 'airbnb',
  'env': {
      'browser': true
  },
  'globals': {
      'document': true,
      'window': true,
  },
  'rules': {
    'max-len': [
      1,
      120,
      2, {
        ignoreComments: true
      }
    ],
    'quote-props': [
      1, 'consistent-as-needed'
    ],
    'no-cond-assign': [
      2, 'except-parens'
    ],
    'radix': 0,
    'space-infix-ops': 0,
    'no-unused-vars': [
      1, {
        'vars': 'local',
        'args': 'none'
      }
    ],
    'no-console': 1,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 1,
  },
  'parser': 'babel-eslint'
};
