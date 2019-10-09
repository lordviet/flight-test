const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\n]{6,}$/.test(v);
            },
            message: pass => `${pass.value} is not a valid password!`
        }
    }
});

module.exports = mongoose.model("User", userSchema);