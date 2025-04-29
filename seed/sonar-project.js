const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'https://qube.indexnine.com',
    token: 'sqp_703ebd9967e69b0d37e1793fc890385ef2b0b02a',
    options: {
      'sonar.projectName': 'Avery-frontend',
      'sonar.projectKey': 'Avery-frontend',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      // 'sonar.testExecutionReportPaths': 'reports/test-report.xml',
      'sonar.exclusions':
        '**/*index.js,src/serviceWorker.js,src/polyfill.js,src/setupTests.js',
      'sonar.test.inclusions': 'src/**/*.test.jsx,src/**/*.test.js'
    }
  },
  () => process.exit()
);
