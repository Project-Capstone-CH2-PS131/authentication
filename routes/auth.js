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

    res.status(201)
      .json({
        'error': false,
        'message': 'Register Success',
        'user': {
          'name': username,
          'email': email,
          'token': await auth.currentUser.getIdToken(),
        },
      })
      .end();
  } catch (error) {
    res.status(400)
      .json({
        'error': true,
        'message': error.message,
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
    const { displayName } = auth.currentUser;
    res.status(200)
      .json({
        'error': false,
        'message': 'Login Success',
        'user': {
          'name': displayName,
          'email': email,
          'token': await auth.currentUser.getIdToken(),
        },
      })
      .end();
  } catch (error) {
    res.status(400)
      .json({
        'error': true,
        'message': error.message,
      })
      .end()
  }
});

module.exports = router;
