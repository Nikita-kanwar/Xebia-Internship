const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleMiddleware('admin'), getUsers);

router.get('/:id', getUserById);

router.put('/:id', roleMiddleware('admin'), updateUser);

router.delete('/:id', roleMiddleware('admin'), deleteUser);

module.exports = router;
