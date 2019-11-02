import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

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
