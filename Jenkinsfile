pipeline {
    agent any 
    stages {
        stage ('github connection') {
            steps {
               git branch: 'main', url: 'https://github.com/saisuresh8179/NODEJS_APPLICATION.git' 
            }
        }
        stage ('create docker image') {
            steps {
                sh '''
                docker stop nodjs_con && docker rm nodejs_con
                docker image rm nodejs saisuresh1/nodejs:v1
                docker build -t nodejs . '''
            }
        }
        stage ('create docker hub repo tag for image') {
            steps {
                sh ''' docker tag nodejs saisuresh1/nodejs:v1 '''
            }
        }
        stage ('run the container using image ') {
            steps {
                sh ''' docker run --name nodejs_con -d -p 3001:3000 nodejs '''

            }
        }
        stage ('push to docker hub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        sh ''' docker push saisuresh1/nodejs:v1 '''
                    }
                }
            }
        }

    }
}
