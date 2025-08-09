const mongoose = require('mongoose');

const schema = mongoose.Schema;

const vaultSchema = new schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['password', 'link', 'note'], 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    encrypted_data: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const VaultModel = mongoose.model('VaultData', vaultSchema);

module.exports = VaultModel;
