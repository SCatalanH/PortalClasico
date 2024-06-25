module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false 
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage/your-app-name'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ]
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true,
      files: [
        { pattern: 'src/app/services/auth.service.spec.ts', watched: false }
      ],
      preprocessors: {
        'src/**/*.spec.ts': ['@angular-devkit/build-angular']
      }
    });
  };
  