const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  listUsers, getUserbyId, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/', listUsers);

router.get('/me', getUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(/https?:\/\/(www\.)*[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/i),
    }),
  }),
  updateAvatar,
);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserbyId);

module.exports = router;
