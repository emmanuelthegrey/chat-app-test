import { Component, h } from '@stencil/core';
import { AuthService } from '../../services/auth';
//import {  } from '../../services/database';



@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

	componentWillLoad() {
		AuthService.init();
		
	}

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-login" />
          <ion-route url="/chat" component="app-home" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
