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
        stage ('npm install the dependices') {
            steps {
                sh ''' npm install '''
            }
        }
         stage ('tar the strapitodo directory ') {
            steps {
                sh ''' tar -czf /var/lib/jenkins/strapitodo-v1.tar.gz /var/lib/jenkins/workspace/pipeline'''
            }
        }
           stage ('upload the tar file to nexus')
        {
            steps {
                sh ''' curl -v -u admin:admin  --upload-file /var/lib/jenkins/strapitodo-v1.tar.gz http://18.219.64.251:8081/repository/nodejs/ '''
            }
        }
    }
}
