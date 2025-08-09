const mongoose = require('mongoose');
const mongo_url=process.env.MONGO_URL;
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
}).catch((error) => {
    console.error("Database connection failed:", error);
});