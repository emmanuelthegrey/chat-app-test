import { Component, h, State} from '@stencil/core';


@Component({
	tag: "app-login",
	styleUrl: "app-login.css"
})

export class AppLogin {
	@State() authenticating: boolean = false;
	private navCtrl: HTMLIonRouterElement = document.querySelector("ion-router");

	render() {
		return [
			<ion-content class="ion-padding">
				<div class="login-container">
					<img src="/assets/Logo.png" alt="logo"/>
					<div style={{textAlign: `center`}}>
						<ion-item>
							<ion-label position='floating'>Enter a display name...</ion-label>
							<ion-input type='text'/>
						</ion-item>
						<ion-button
						disabled={this.authenticating}
						color='tertiary'
						expand='full'
						>
							<ion-spinner hidden={!this.authenticating} 
							name='crescent' />
							<span hidden={this.authenticating}> Start Chatting</span>
						</ion-button>
						<small>
							Other users will be able to see your display name,
							 but providing on is optional
						</small>
					</div>
				</div>
			</ion-content>
		]
	}
}