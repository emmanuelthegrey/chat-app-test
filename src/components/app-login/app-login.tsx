import { Component, h, State} from '@stencil/core';
import { AuthService } from '../../services/auth';

@Component({
	tag: "app-login",
	styleUrl: "app-login.css"
})

export class AppLogin {
	@State() authenticating: boolean = false;
	private navCtrl: HTMLIonRouterElement = document.querySelector("ion-router");

	private formData = {
		displayName: "Anonymous"
	};

	handleChange(event) {
		this.formData.displayName = event.target.value;
	}

	async login() {
		this.authenticating = true;

		await AuthService.loginAnonymously(this.formData.displayName);
		await AuthService.waitForAuth();

		this.authenticating = false;
		this.navCtrl.push("/chat", "forward");
	}

	render() {
		return [
			<ion-content class="ion-padding">
				<div class="login-container">
					<img src="/assets/Logo.png" alt="logo"/>
					<div style={{textAlign: `center`}}>
						<ion-item>
							<ion-label position='floating'>Enter a display name...</ion-label>
							<ion-input
							onInput={event => { this.handleChange(event)}}
							type='text'/>
						</ion-item>
						<ion-button
						disabled={this.authenticating}
						color='tertiary'
						onClick={() => this.login()}
						expand='full'
						>
							<ion-spinner hidden={!this.authenticating} 
							name='crescent' />
							<span hidden={this.authenticating}> Start Chatting</span>
						</ion-button>
						<small>
							Other users will be able to see your display name,
							 but providing one is optional
						</small>
					</div>
				</div>
			</ion-content>
		]
	}
}