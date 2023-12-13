const express = require('express');
const router = express.Router();
const {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} = require('firebase/auth');

router.post('/register', async function (req, res) {
  const auth = getAuth();

  const {
    username,
    email,
    password,
  } = req.body;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    return res.status(201)
      .json({
        'error': false,
        'message': `User Created`,
        'token': await auth.currentUser.getIdToken(),
      })
      .end();
  } catch (error) {
    return res.status(400)
      .json({
        'error': true,
        'message': error.code,
      })
      .end();
  }
});

router.post('/login', async function (req, res) {
  const auth = getAuth();

  const {
    email,
    password,
  } = req.body;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    return res.status(200)
      .json({
        'error': false,
        'message': 'User Logged In',
        'token': await auth.currentUser.getIdToken(),
      })
      .end();
  } catch (error) {
    return res.status(400)
      .json({
        'error': true,
        'message': error.code,
      })
      .end()
  }
});

module.exports = router;
