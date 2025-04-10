pipeline {
    agent any

    stages {
        stage('Checkout Git') {
            steps {
                // Checkout source code từ Git
                checkout scm
            }
        }
        
        stage('Generate Changelog') {
            steps {
                script {
                    // Lấy changelog giữa các commit sử dụng Git Changelog Plugin
                    def changelog = gitChangelog(
                        sinceCommit: "HEAD~5", // Xem changelog từ commit 5 lần build trước
                        untilCommit: "HEAD",   // Đến commit hiện tại
                        commitRange: true      // Chỉ lấy changelog trong phạm vi commit range
                    )

                    // In changelog ra Jenkins console
                    echo "Changelog:\n${changelog}"

                    // Ghi changelog vào tệp CHANGELOG.md
                    writeFile(file: 'CHANGELOG.md', text: changelog)
                }
            }
        }

        stage('Publish Changelog') {
            steps {
                // Publish changelog hoặc làm gì đó với nó, ví dụ: gửi email, lưu trữ, v.v.
                echo "Changelog has been saved to CHANGELOG.md."
            }
        }
    }
}
