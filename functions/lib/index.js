"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStatus = exports.initializeFirstAdmin = exports.setAdminClaim = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
// Set admin claim for a user (callable function)
exports.setAdminClaim = functions.https.onCall(async (request) => {
    var _a;
    // Check if request is made by an authenticated user
    if (!request.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated to set admin claims.');
    }
    // Check if current user is already an admin
    const currentUser = await admin.auth().getUser(request.auth.uid);
    if (!((_a = currentUser.customClaims) === null || _a === void 0 ? void 0 : _a.admin)) {
        throw new functions.https.HttpsError('permission-denied', 'Must be an admin to set admin claims.');
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
    }
    catch (error) {
        throw new functions.https.HttpsError('internal', 'Error setting admin claim: ' + error);
    }
});
// Initialize first admin (only works once, then disable this function)
exports.initializeFirstAdmin = functions.https.onCall(async (request) => {
    const { email, secretKey } = request.data;
    // Use a secret key to protect this function
    if (secretKey !== 'keith-does-web-stuff') {
        throw new functions.https.HttpsError('permission-denied', 'Invalid secret key.');
    }
    try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });
        return {
            success: true,
            message: `First admin initialized for ${email}`
        };
    }
    catch (error) {
        throw new functions.https.HttpsError('internal', 'Error initializing first admin: ' + error);
    }
});
// Get user's admin status
exports.getAdminStatus = functions.https.onCall(async (request) => {
    var _a;
    if (!request.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated.');
    }
    const user = await admin.auth().getUser(request.auth.uid);
    return {
        isAdmin: ((_a = user.customClaims) === null || _a === void 0 ? void 0 : _a.admin) === true
    };
});
