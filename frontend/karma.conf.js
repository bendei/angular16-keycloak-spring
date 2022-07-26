// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-firefox-launcher'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reports: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'cobertura' },
        { type: 'lcovonly' },
      ],
      // https://github.com/karma-runner/karma-coverage/blob/HEAD/docs/configuration.md#check
      check: {
        // global coverage requirements
        global: {
          statements: 60,
          branches: 50,
          functions: 50,
          lines: 50,
          excludes: []
        },
        // coverage requirement for each file
        each: {
          excludes: [],
        }
      },
    },
    reporters: ['progress', 'junit', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    junitReporter: {
      outputDir: '../target/unit-tests/reports',
      outputFile: 'unit-test-webchannel.xml',
      suite: 'webchannel',
      useBrowserName: true,
      nameFormatter: undefined,
      classNameFormatter: undefined
    },
  },
    );

};
