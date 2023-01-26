const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
      .connect(
        "mongodb+srv://mranal2906:mranal123456@cluster0.ivgtt9a.mongodb.net/task?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected!"))
    .catch((err) => console.log(err.message));
