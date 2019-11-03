import firebase from 'firebase/app';
import { AuthService } from "./auth";
import "firebase/firestore";

class DatabaseController {
	private db: firebase.firestore.Firestore;
	public detachListener: Function;

	init() {
		this.db = firebase.firestore();
	}

	watchMessages(handler: Function): void {
		this.detachListener = this.db
		.collection('messages')
		.orderBy("created", "desc")
		.limit(50)
		.onSnapshot(querySnapshot => {
			console.log(querySnapshot);
			let messages = [];
			querySnapshot.forEach(doc => {
				messages.push({
					id:doc.id,
					...doc.data()
				});
			});
			handler(messages);
		});
	}

	async addMessage(message: string): Promise<firebase.firestore.DocumentReference> {
		try {
			return await this.db.collection('messages').add({
				uid: AuthService.user.uid,
				created: Date.now(),
				message: message,
				author: AuthService.user.displayName
			});
		}catch (err){
			console.log("couldn't add message", err)
		}
	}
}

export const DatabaseService = new DatabaseController();
