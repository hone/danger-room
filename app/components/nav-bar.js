import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NavBarComponent extends Component {
  @service session;

  @action
  login() {
    const authOptions = {
      responseType: 'token id_token',
      scope: 'openid email profile',
      redirectUri: 'http://localhost:4200',
    };

    this.session.authenticate('authenticator:auth0-universal', authOptions);
  }

  @action
  logout() {
    this.session.invalidate();
  }
}
