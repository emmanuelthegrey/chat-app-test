import { Component, h, State, Element } from '@stencil/core';
import { loadingController } from '@ionic/core';
import { AuthService } from '../../services/auth';

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
			loading.dismiss();
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

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>TYMTC Stencil Chat</ion-title>
		  <ion-buttons slot="start">
			  <ion-button>
				  <ion-icon slot="icon-only" name="log-out" />
			  </ion-button>
		  </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
		  <my-adorable-message
		  id="234"
		  author="MannyFresh"
		  side="right"
		  >
			  Wazup Wassup wzup
		  </my-adorable-message>
	  </ion-content>,
	  
	  <ion-footer>
		  <ion-toolbar>
			  <ion-textarea class='chat-input' placeholder='type message...' />
			  <ion-buttons slot='primary'>
				  <ion-button disabled={this.addingChat}>
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
