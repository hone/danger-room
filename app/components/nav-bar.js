import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NavBarComponent extends Component {
  @service session;

  @action
  login() {
    // Check out Auth0 Lock's documentation for all the options:
    // https://auth0.com/docs/libraries/lock/customization
    const lockOptions = {
      auth: {
        params: {
          scope: 'openid email profile',
        },
      },
    };

    this.session.authenticate('authenticator:auth0-lock', lockOptions);
  }

  @action
  logout() {
    this.session.invalidate();
  }
}
