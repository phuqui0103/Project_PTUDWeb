const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const userRouter = require("./app/routes/user.route");
const bookRouter = require("./app/routes/book.route");
const staffRouter = require("./app/routes/staff.route");
// const pulisherRouter = require("./app/routes/pulisher.route");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Book Store." });
});

// Xử lý user
app.use("/api/user", userRouter);
//  Nhân viên
app.use("/api/staff", staffRouter);
//Xử lý sách
app.use("/api/book", bookRouter);
//Xử lý nhà xuất bản
// app.use("/api/pulisher", pulisherRouter);

app.use("/static", express.static('app/uploads/'));
// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;