import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Define interfaces for the data parameters
interface SetAdminClaimData {
  email: string;
  isAdmin: boolean;
}

interface InitializeFirstAdminData {
  email: string;
  secretKey: string;
}

// Set admin claim for a user (callable function)
export const setAdminClaim = functions.https.onCall(async (request: functions.https.CallableRequest<SetAdminClaimData>) => {
  // Check if request is made by an authenticated user
  if (!request.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be authenticated to set admin claims.'
    );
  }

  // Check if current user is already an admin
  const currentUser = await admin.auth().getUser(request.auth.uid);
  if (!currentUser.customClaims?.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Must be an admin to set admin claims.'
    );
  }

  const { email, isAdmin } = request.data;

  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: isAdmin });
    
    return { 
      success: true, 
      message: `Admin claim ${isAdmin ? 'granted' : 'revoked'} for ${email}` 
    };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Error setting admin claim: ' + error
    );
  }
});

// Initialize first admin (only works once, then disable this function)
export const initializeFirstAdmin = functions.https.onCall(async (request: functions.https.CallableRequest<InitializeFirstAdminData>) => {
  const { email, secretKey } = request.data;
  
  // Use a secret key to protect this function
  if (secretKey !== 'keith-does-web-stuff') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Invalid secret key.'
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    return { 
      success: true, 
      message: `First admin initialized for ${email}` 
    };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Error initializing first admin: ' + error
    );
  }
});

// Get user's admin status
export const getAdminStatus = functions.https.onCall(async (request: functions.https.CallableRequest<any>) => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be authenticated.'
    );
  }

  const user = await admin.auth().getUser(request.auth.uid);
  return { 
    isAdmin: user.customClaims?.admin === true 
  };
}); 