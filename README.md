1. React3l là gì?

    React3l là viết tắt của React Three Layers. Đây là một mô hình kiến trúc dành cho front-end của ứng dụng web và mobile sử dụng React/React Native. Cái tên "Three layers" bắt nguồn từ mô hình Repositories - Services - Controllers của nhiều back-end framework, được thay lớp Controllers bằng Views để dành cho giao diện (Do đây là front-end mà :D)

2. Đâu là 3 lớp?
    
    Đó là:
    - Views (Tầng giao diện): bao gồm các React components được xây dựng để hiển thị giao diện cho người dùng. Ở tầng này, component chỉ nhận vào những props và chứa những state liên quan đến hiển thị giao diện mà không xử lý các logic của ứng dụng
    - Services (Tầng nghiệp vụ): bao gồm các [hook functions](https://reactjs.org/docs/hooks-intro.html), được viết tách biệt với component nhằm tập trung xử lý logic.
    - Repositories (Tầng dữ liệu): bao gồm các phương thức chỉ dùng để gửi/nhận dữ liệu. Các phương thức liên quan sẽ được gộp nhóm lại thành 1 class và tạo 1 instance duy nhất từ class đó để xử lý dữ liệu cho một trang, một view, ... tùy theo thiết kế của dự án.

3. Làm sao để phân biệt đâu là state dành cho view đâu là state dành cho service?
    
    Điều này mang tính tương đối. Chúng ta đưa ra những quy tắc sau:
    - State dành cho view là state được sinh ra chỉ nhằm mục đích hoàn thiện giao diện mà không hề tham gia vào nghiệp vụ.
    - State dành cho service là state được sinh ra để tham gia làm đầu vào (input) hoặc là đầu ra (output) của một service.
    - Đừng bắt bẻ nếu ông sếp bạn bảo visible là state dành cho nghiệp vụ, ừ thì đó là nghiệp vụ vì ông ấy muốn thế.
    - Làm đi rồi biết.

    Ví dụ:
    - State dùng để xác định việc đóng mở một modal, đóng mở sidebar, ... là state dành cho giao diện, vì không có nó không làm sai nghiệp vụ, trừ khi nghiệp vụ yêu cầu như thế :))
    - Bạn có một danh sách phần tử, admin được phép xem hết còn dân thường thì chỉ được xem một nửa, đây là nghiệp vụ, vì vậy state này là state dành cho service.

4. Làm sao để viết được ứng dụng 3 lớp với React?
    - Học cách viết hook
    - Nhìn code mẫu
    - Đọc lại điều trên
