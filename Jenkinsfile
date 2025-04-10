pipeline {
    agent any

    stages {
        stage('Generate Changelog') {
            steps {
                script {
                    // Lấy changelog dạng string từ Git Changelog Plugin
                    def changelogString = gitChangelog(
                        returnType: 'STRING',
                        from: [type: 'REF', value: 'git-changelog-1.50'],
                        to: [type: 'REF', value: 'master'],
                        template: """
                        Changelog Template:
                        - From: ${from}
                        - To: ${to}
                        """
                    )

                    // Đặt mô tả cho build để hiển thị changelog
                    currentBuild.description = changelogString
                }
            }
        }

        stage('Publish Changelog') {
            steps {
                script {
                    // Nếu cần, bạn có thể lưu changelog vào tệp CHANGELOG.md hoặc thực hiện công việc khác với changelog
                    writeFile(file: 'CHANGELOG.md', text: currentBuild.description)
                    echo "Changelog has been saved to CHANGELOG.md"
                }
            }
        }
    }
}
