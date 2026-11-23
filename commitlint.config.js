export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'header-max-length': [2, 'always', 100],
    'scope-enum': [2, 'always', [
      'api',
      'config',
      'db',
      'deps',
      'docs',
      'models',
      'services',
      'tests',
      'ci',
      'ui',
    ]],
  },
};
