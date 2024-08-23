pipeline {
    agent {
        docker {
            image 'localhub.vn:5000/jdk17-maven3-9-1-docker-awscli:latest'  // Sử dụng hình ảnh Docker có cài đặt sẵn AWS CLI
            args '-v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""' // Mount thư mục AWS credentials vào container
        }
    }
    
    options {
        buildDiscarder(logRotator(daysToKeepStr: '5', artifactNumToKeepStr: '10'))
        disableConcurrentBuilds()
    }
    options {
        buildDiscarder(logRotator(daysToKeepStr: '5', artifactNumToKeepStr: '10'))
        disableConcurrentBuilds()
    }
    //triggers {
    //    cron('TZ=Asia/Ho_Chi_Minh\nH(00-05) 9 18-29 3 1-5')
    //}

    stages {
        stage('Getting build number') { 
            steps {
                script {        
                  def now = new Date()
                  build_version =  now.format("yyyy.MM.dd.HHmm", TimeZone.getTimeZone('GMT+7'))
                  currentBuild.displayName = "${build_version}"
                  env.buildVersion = "${build_version}"
                } 
            } 
        } 
        stage('Force Update Service') {
            steps {
                script {
                    sh """
                    echo "ok"
                    aws --version
                    """
                }
            }
        }
    }
}
