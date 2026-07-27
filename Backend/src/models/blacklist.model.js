const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        required: [true, 'Token is required'],
        unique: true
    },
},{
    timestamps: true
}
);

const blacklistTokenModel = mongoose.model('blacklistToken', blacklistTokenSchema);


module.exports = blacklistTokenModel;