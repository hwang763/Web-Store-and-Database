import { Component } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {NewUserComponent} from './new-user/new-user.component';
import {ItemsComponent} from './items/items.component';
import {PrivateItemsComponent} from './private-items/private-items.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {DmcaToolsComponent} from './dmca-tools/dmca-tools.component';
import {UpdateUsersComponent} from './update-users/update-users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Se 3316 Lab 5';
}
