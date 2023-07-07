pipeline {
  agent any

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
        withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB_CREDENTIALS')]) {
          sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
        }
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
    }
  }
}