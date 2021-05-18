pipeline {
  agent any
  stages {

    // STARTING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Print something to the console */
    stage('Say Hello') {
      steps {
        echo 'Hello world!'
      }
    }

    // BUILDING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Build the Docker image */
    stage('Build') {
      steps {
        sh 'docker build -t appsbymatthew-logs:latest .'
      }
    }

    // PUSHING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Push the image to Docker Hub */
    stage('Push to Docker Hub') {
      steps {
        script {
          docker.withRegistry('', 'Docker_Hub') {
            def customImage = docker.build("mfarmer5102/appsbymatthew-logs:latest")
            customImage.push()
          }
        }
      }
    }

  }
}