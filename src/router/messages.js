// ! PATH: api/messages
const { Router } = require('express');
const { verifyJwt } = require('../middlewares/verifyJwt');
const { getMessages } = require('../controllers/messagesController');

const router = Router();

// * GET api/messages/:id -> get messages
router.get('/:id', verifyJwt, getMessages);

module.exports = router;
