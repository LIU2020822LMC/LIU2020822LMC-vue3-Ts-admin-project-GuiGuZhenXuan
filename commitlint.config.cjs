module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      1,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [1, 'always', 'lower-case'],
    'type-empty': [1, 'never'],
    'scope-empty': [1, 'never'],
    'scope-case': [1, 'always', 'lower-case'],
    'subject-empty': [1, 'never'],
    'subject-full-stop': [1, 'never'],
    'subject-case': [1, 'never'],
    'header-max-length': [1, 'always', 72],
  },
}
