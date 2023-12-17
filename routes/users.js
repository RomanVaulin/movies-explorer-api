const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getMeUser, editUserData,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMeUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUserData);

module.exports = router;
