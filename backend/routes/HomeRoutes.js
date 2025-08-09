const router = require('express').Router();
const checkAuth = require('../middleware/Authuser');
const { addData, getUserVault, deleteVaultItem, updateVaultItem } = require('../controller/dataController');

// Test route
router.get('/', checkAuth, (req, res) => {
    res.status(200).json({ message: "JWT Token Found" });
});

// Add vault data
router.post('/add_data', addData);

// Get all vault data for a user
router.get('/:user_id',  getUserVault);

// Delete vault item (by vault_id)
router.delete('/:vault_id',  deleteVaultItem);

// Update vault item (by vault_id)
router.put('/:vault_id',  updateVaultItem);

module.exports = router;