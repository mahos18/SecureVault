const UserModel = require('../models/user');
const VaultModel = require("../models/vault");
const CryptoJS = require("crypto-js");

const addData = async (req, res) => {
    try {
        const { user_id, type, title, data } = req.body;

        if (!user_id || !type || !title || !data) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false 
            });
        }

        const user = await UserModel.findById(user_id);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found", 
                success: false 
            });
        }

        const encryptedData = CryptoJS.AES.encrypt(
            data,
            user.key
        ).toString();

        const vaultEntry = new VaultModel({
            user_id,
            type,
            title,
            encrypted_data: encryptedData
        });

        await vaultEntry.save();

        res.status(201).json({
            message: `${type} added successfully`,
            success: true,
            vault_id: vaultEntry._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error: " + error.message,
            success: false
        });
    }
};

const getUserVault = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find vault items for this user
    const data = await VaultModel.find({ user_id });

    res.status(200).json({
      success: true,
      vault: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
};
const deleteVaultItem = async (req, res) => {
  try {
    const { vault_id } = req.params;
    if (!vault_id) {
      return res.status(400).json({ success: false, message: "vault_id required" });
    }

    // Find the vault item
    const item = await VaultModel.findById(vault_id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Vault item not found" });
    }

    // Ownership check - requires checkAuth middleware to populate req.user
    

    // Delete the document
    await  VaultModel.findByIdAndDelete(vault_id)

    return res.status(200).json({ success: true, message: "Vault item deleted successfully" });
  } catch (error) {
    console.error("deleteVaultItem error:", error);
    return res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }
};

// Update
const updateVaultItem = async (req, res) => {
    try {
        const { vault_id } = req.params;
        const { title, data } = req.body;

        if (!title || !data) {
            return res.status(400).json({ message: "Title and data are required", success: false });
        }

        // Find vault item
        const vaultItem = await VaultModel.findById(vault_id);
        if (!vaultItem) {
            return res.status(404).json({ message: "Vault item not found", success: false });
        }

        // Check if logged-in user owns it
        if (vaultItem.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized", success: false });
        }

        // Get user's AES key
        const user = await UserModel.findById(req.user._id);

        // Encrypt new data
        const encryptedData = CryptoJS.AES.encrypt(data, user.key).toString();

        // Update vault item
        vaultItem.title = title;
        vaultItem.encrypted_data = encryptedData;
        await vaultItem.save();

        res.status(200).json({ message: "Vault item updated successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: "Internal server error: " + error.message, success: false });
    }
};



module.exports = {addData,getUserVault,deleteVaultItem,updateVaultItem}