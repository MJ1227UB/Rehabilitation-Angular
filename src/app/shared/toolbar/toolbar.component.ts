import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/shared/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'rehab-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isCollapsed = true;

  constructor(private router: Router,
              private authService: AuthService) {
  }


  ngOnInit() {
  }

  /**
   * Sign out and clear localStorage.
   */
  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('login');
      });
  }

  /**
   * Checks if the user is logged in.
   * @returns {boolean}
   */
  isUserLoggedIn() {
    return this.authService.userIsLoggedIn();
  }

  /**
   * Checks if we are in Client or Therapist mode.
   * @returns {boolean}
   */
  isClientMode(): boolean {
    // Checks if the uid is the same as the Therapist's UID.
    if (this.authService.userIsTherapist()) {
      environment.clientMode = false;
      return false;
    } else {
      environment.clientMode = true;
      return true;
    }
  }
}
