const router = require('express').Router();
const {
  listUsers, getUserbyId, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', listUsers);

router.get('/:userId', getUserbyId);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
