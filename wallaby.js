module.exports = () => {
  const wallabyWebpack = require('wallaby-webpack');

  const wallabyPostprocessor = wallabyWebpack({
      entryPatterns: [
        'src/main.test.js',
        'src/**/*.spec.js'
      ]
    }
  );

  return {
    debug: true,
    files: [
      {pattern: 'src/main.test.ts', load: false, instrument: false},
      {pattern: 'src/polyfill.ts', load: false, instrument: false},
      {pattern: 'src/app/**/*.ts', load: false},
      {pattern: 'src/app/**/*.spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/app/**/*.spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    env: {
      kind: 'electron',
      runner: require('electron')
    },

    postprocessor: wallabyPostprocessor,

    bootstrap: (w) => {
      window.__moduleBundler.loadTests();
    }
  };
};