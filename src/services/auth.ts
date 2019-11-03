import firebase from 'firebase/app';
import configfb from './config';

class AuthController {

	init() {
		firebase.initializeApp(configfb);
	}
}

export const AuthService = new AuthController();