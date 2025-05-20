graph TD
    A[Developer Push Code] --> B[GitLab triggers Jenkins]
    B --> C[Build + Unit Test + Static Analysis]
    C -->|Fail| Z[Stop Pipeline]
    C -->|Pass| D[Deploy to UAT]
    D --> E[Run Selenium Automation Test]
    E -->|Pass| F[Mark MR as Passed ✅]
    E -->|Fail| G[Trigger Rollback]
    G --> H[Rollback to Previous Stable Release]
