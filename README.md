# nodejs_blog
| Bước | Hành động                                      | Điều kiện tiếp theo           |
|------|------------------------------------------------|-------------------------------|
| 1    | Developer push code lên GitLab                |                              |
| 2    | GitLab trigger Jenkins CI pipeline            |                              |
| 3    | Build + Unit Test + Static Analysis           | Nếu fail → dừng pipeline     |
| 4    | Deploy code lên UAT                           | Nếu pass → tiếp tục          |
| 5    | Run automation test (Selenium trên UAT)       | Nếu pass → đánh dấu MR pass |
| 6    | Nếu test fail → rollback về bản ổn định trước | MR fail + rollback UAT       |

