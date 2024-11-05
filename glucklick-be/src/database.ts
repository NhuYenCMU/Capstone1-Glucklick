import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/glucklick'); // Bỏ `useNewUrlParser` và `useUnifiedTopology`
        console.log("Đã kết nối thành công tới MongoDB");
    } catch (error) {
        console.error("Lỗi kết nối MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
