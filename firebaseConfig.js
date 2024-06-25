import { firebase } from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, analytics };
