import * as admin from 'firebase-admin';

var serviceAccount = require('../../serviceAccountKey.json');
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { firebaseAdmin };
