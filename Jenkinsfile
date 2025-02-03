pipeline {
    agent { label 'master' }
    environment {
        AWS_REGION = 'ap-southeast-1'  
        INSTANCE_NAME = 'jenkins-agent' 
    }
    stages {
        stage('Start EC2 Instance') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                        sh '''
                        INSTANCE_ID=$(aws ec2 describe-instances \
                            --filters "Name=tag:Name,Values=${INSTANCE_NAME}" "Name=instance-state-name,Values=stopped" \
                            --query "Reservations[*].Instances[*].InstanceId" --output text)

                        if [ -n "$INSTANCE_ID" ]; then
                            echo "Starting EC2 instance: $INSTANCE_ID"
                            aws ec2 start-instances --instance-ids $INSTANCE_ID
                            echo "EC2 instance started successfully."
                        else
                            echo "No stopped EC2 instance found with name ${INSTANCE_NAME}."
                        fi
                        '''
                    }
                }
            }
        }
    }
}
