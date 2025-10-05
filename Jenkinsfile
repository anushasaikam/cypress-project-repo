pipeline {
  agent {
    docker {
      image 'cypress/included:13.5.0'
      args '-u root:root' // allow writing artifacts
    }
  }
  options { timestamps(); ansiColor('xterm') }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install deps') {
      steps {
        sh 'npm ci' // uses package-lock.json
      }
    }

    stage('Run E2E') {
      steps {
        // default electron, or add --browser chrome/firefox if present in the image
        sh 'npx cypress run --headless'
      }
    }
  }

  post {
    always {
      // Publish JUnit results for test trend
      junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'

      // Keep videos/screenshots and HTML report (if you enabled mochawesome)
      archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**, reports/**/*', allowEmptyArchive: true
    }
  }
}
