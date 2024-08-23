
pipeline {
    agent any

	// tools {
    //     maven "mvn"
    //     jdk "jdk17"
    // }

    options {
    	buildDiscarder(logRotator(daysToKeepStr: '5', artifactNumToKeepStr: '10'))
	    disableConcurrentBuilds()
	}

    environment {
		repoAPI2branch = 'master'
		gitCommit = "${env.GIT_COMMIT}"
		jobName = "${env.JOB_NAME}"

		//githubCred
		githubCred= 'lho28'
		memberRecipients= ''
		cluster_name = 'VNInsurance-cluster'
		task_name = 'workbench-application'
		ecs_subnet = 'subnet-088852fa830509beb'
		ecs_sg = 'sg-0bcbaa3c939572bf4'
		reponsitory = '441176660097.dkr.ecr.ap-southeast-1.amazonaws.com'
		bucketName = 'workbenchs3dev'
		distFolder = 'workbench-app'

    } // define required environment variables

 stages {   
		stage('Stage 1 Getting build number') { 
		// this stage will get build number
			steps {
				script {		
					def now = new Date()
					build_version =  now.format("yyyy.MM.dd.HHmm", TimeZone.getTimeZone('GMT+7'))
					currentBuild.displayName = "${build_version}"
					env.buildVersion = "${build_version}"
				} // end script
			} // end steps
		} // end stage 1
		stage('stage 2 Get Change Logs') {
			steps {
				script {
					def changes = ''
					if (currentBuild.number != '1') {
						for (changeLog in currentBuild.changeSets) {
							for(entry in changeLog.items) {                
								changes += "<tr><td><span style='color: blue;'>${entry.author}</span></td> <td><span style='color: blue;'>${entry.msg}</span></td><td><span style='color: blue;'>${entry.affectedPaths}</span></td><td><span style='color: blue;'>${new Date(entry.timestamp)}</span></td></tr>"
							}
						}
					}
					env.changedCodeList = "${changes}"
					env.userTrigger = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause').userName[0]
					if (userTrigger == '' || userTrigger == 'null') {
						env.userTrigger = 'Github Push Event'
					}
					echo "${changedCodeList}"
                    def jobName = env.JOB_NAME
					def parts = jobName.split('/')
					env.REPO_NAME = parts.length > 1 ? parts[1] : jobName
					echo "Repository name: ${env.REPO_NAME}"
				}
			}
		}

		// stage('Stage 3 Prepare Package') { 
		// // this stage will build JAR package
		// 	steps {
		// 		script {
		// 			sh """
		// 				mv -f $WORKSPACE/src/environments/aws-exports.js.deploy $WORKSPACE/src/aws-exports.js
		// 				cat $WORKSPACE/src/aws-exports.js
		// 				echo "$buildVersion:$gitCommit" > $WORKSPACE/src/assets/version.html
		// 			"""
		// 		} // end script
		// 	} // end steps
		// } // end stage 3

		// stage('Stage 3 Build Images') { 
		// // this stage will build JAR package
		// 	steps {
		// 		script {
		// 			sh """
		// 				aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin ${reponsitory}
		// 				docker rmi ${task_name} || true
		// 				docker build -t ${task_name} .
		// 				docker tag ${task_name} ${reponsitory}/${task_name}:${buildVersion}
		// 				docker tag ${task_name} ${reponsitory}/${task_name}:latest
		// 				docker push ${reponsitory}/${task_name}:${buildVersion}
		// 				docker push ${reponsitory}/${task_name}:latest
		// 				docker rmi ${reponsitory}/${task_name}:${buildVersion}
		// 				docker rmi ${reponsitory}/${task_name}:latest
		// 			"""
		// 		} // end script
		// 	} // end steps
		// } // end stage 3
		stage('Stage 4 Trigger ECS Task Build') { 
		// this stage will upload JAR packages to PDXC 
			steps {
				script {
					sh """	
						echo "=== start fargate task ==="

					"""
				} // end script
			} // end steps
		} // end stage 4
    } // end stages
 
post {
		always {
			script {
				if (env.memberRecipients) {
					emailext (
						attachLog: true,
						subject: "[ ${currentBuild.result} ] ${env.REPO_NAME} ${env.buildVersion}",
						body: """
						<head>
						<meta http-equiv="Content-Type" content="text/html; charset=us-ascii"><style>
						table {border-collapse: collapse;}
						table, td, th {border: 1px solid black;}
						</style>
						</head>
						<div><div><strong><span style="color: red;">*** This is an automatically generated email. Please do not reply ***</span></strong></div></div>
						<p>Dear team,</p>
						<p>Kindly be informed that the Jenkins job <b style="color:red">${env.REPO_NAME}</b> #<b>${env.buildVersion}</b> was <b style="color:red;text-transform:uppercase">${currentBuild.result}!</b>. Packages will be deployed after 5-20 minutes, please save data and close your session.</p>

						<h2>Please review your change below:</h2>
						<h4><strong>Environment Details:</strong></h4>
						<ul>
						<li><strong>Organization account: </strong><span style="color: blue;">VNInsurance</span></li>
						<li><strong>Branch: </strong><span style="color: blue;">${env.repoAPI2branch}</span></li>
						<li><strong>Version: </strong><span style="color: blue;">${env.buildVersion}</span></li>
						<li><strong>Trigger By: </strong><span style="color: blue;">${env.userTrigger}</span></li>
						<li><strong>Changed Code Details:</strong></li>
						<table style="border-color: black;" border="1" width="100%">
						<tbody>
						<tr><td><strong>Author</strong></td><td><strong>Commit</strong></td><td><strong>Changed Files</strong></td><td><strong>Time</strong></td></tr>
						${env.changedCodeList}
						</tbody>
						</table>
						</ul>
						<p>Regards,</p>
						<p><b>DevOps Team</b></p>
						<p><hr></p>
						<p>Contact Point:  <a href="mailto:longhn0710@gmail.com">Long Ho</a></p>
						<p><em>Thank you for your kind cooperation.</em></p>
						""",
						mimeType: 'text/html',
						to: env.memberRecipients,
						recipientProviders: [[$class: 'CulpritsRecipientProvider']]
					)
					echo 'One way or another, I have finished'	
					deleteDir() /* clean up our workspace */
				}
            }
    }
}  

}