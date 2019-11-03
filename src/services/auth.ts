import firebase from 'firebase/app';
import configfb from './config';
import "firebase/auth";

class AuthController {
public user: firebase.User;
public detachListener: Function;
	init() {
		firebase.initializeApp(configfb);
	}

	async waitForAuth(): Promise<firebase.User> {
		return new Promise(resolve => {
			this.detachListener = firebase.auth().onAuthStateChanged(user => {
				if (user) {
					this.user = user;
					this.detachListener();
					resolve(user);
				}
			});
		});
	}

	async getCurrentAuth(): Promise<firebase.User> {
		return new Promise(resolve => {
			this.detachListener = firebase.auth().onAuthStateChanged(user => {
				this.user = user;
				this.detachListener();
				resolve(user);
			});
		});
	}

	async loginAnonymously(displayName?: string): Promise<firebase.auth.UserCredential> {
		try {
			const userCredential = await firebase.auth().signInAnonymously();
			if(displayName) {
				await userCredential.user.updateProfile({
					displayName: displayName
				});
			}
			return userCredential;
		}catch (err){
			console.error(err, 'login failed')
		}
	}

	async logOut(): Promise<void> {
		return  await firebase.auth().signOut();
	}
}

export const AuthService = new AuthController();