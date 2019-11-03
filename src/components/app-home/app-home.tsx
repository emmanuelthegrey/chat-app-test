import { Component, h, State, Element } from '@stencil/core';
import { loadingController } from '@ionic/core';
import { AuthService } from '../../services/auth';
import { DatabaseService } from '../../services/database';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

	@Element() el: HTMLElement;
	@State() addingChat: boolean = false;
	@State() message: string = "";
	@State() messages: firebase.firestore.DocumentData[] = [];

	private navCtrl: HTMLIonRouterElement = document.querySelector('ion-router');

	async componentDidLoad() {
		let loading = await this.createLoadingOverlay();
		loading.present();

		let isSignedIn = await AuthService.getCurrentAuth();

		if(isSignedIn) {
			DatabaseService.watchMessages(messages => {
				loading.dismiss();
				this.messages = messages.reverse();
				setTimeout(() => {
					this.scrollChat();
				}, 200);
			});
		}else{
			loading.dismiss();
			this.navCtrl.push("/", "back");
		}
	}

	async createLoadingOverlay(){
		return await loadingController.create({
			message: 'Authenticating',
			spinner: 'crescent'
		});
	}

	handleChange(event) {
		this.message = event.target.value;
	}

	async scrollChat() {
		let contentArea = this.el.querySelector("ion-content");
		contentArea.scrollToBottom(400);
	}

	async sendChat() {
		if (this.message.length > 0) {
			this.addingChat = true;
			await DatabaseService.addMessage(this.message);
			this.addingChat = false;
			this.message = "";
		}
	}

	async logOut() {
		DatabaseService.detachListener();
		await AuthService.logOut();
		this.navCtrl.push("/", "back");
	}

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>TYMTC Stencil Chat</ion-title>
		  <ion-buttons slot="start">
			  <ion-button onClick={ () => this.logOut()}>
				  <ion-icon slot="icon-only" name="log-out" />
			  </ion-button>
		  </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
		  {this.messages.map(message => (
			  <my-adorable-message
			  key={message.id}
			  mam_id={message.uid}
			  author={message.author}
			  side={AuthService.user.uid === message.uid ? "right" : "left"}
			  >
				  {message.message}
			  </my-adorable-message>
		  ))}
	  </ion-content>,
	  
	  <ion-footer>
		  <ion-toolbar>
			  <ion-textarea 
			  onInput={event => this.handleChange(event)}
			  onKeyPress={event => {
				  if (event.key === "Enter") {
					  this.sendChat();
				  }
			  }}
			  value={this.message}
			  class="chat-input"
			  placeholder="type message..."
			  />
			  <ion-buttons slot='primary'>
				  <ion-button
				  color="tertiary"
				   disabled={this.addingChat}
				   onClick={() => {
					   this.sendChat();
				   }}
				   >
					  <ion-icon hidden={this.addingChat} slot="icon-only"
					  name='send' />
					  <ion-spinner hidden={!this.addingChat} name='crescent' />
				  </ion-button>
			  </ion-buttons>
		  </ion-toolbar>
	  </ion-footer>
    ];
  }
}
