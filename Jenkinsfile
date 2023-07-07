pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Dependencies') {
      agent {
        docker {
          image 'node:18.3.0-alpine3.14'
        }
      }
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      agent {
        docker {
          image 'node:18.3.0-alpine3.14'
        }
      }
      steps {
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        sh 'docker build . -t sstepanov97/cicd-test:latest'
      }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push Image') {
      steps {
        sh 'docker push sstepanov97/cicd-test:latest'
      }
    }
  }
  post {
    always {
      sh 'docker logout'
      sh 'docker image prune -f'
    }
  }
}