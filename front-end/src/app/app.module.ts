import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { PrivateItemsComponent } from './private-items/private-items.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DmcaToolsComponent } from './dmca-tools/dmca-tools.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { PublicNoticeComponent } from './public-notice/public-notice.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';


@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    ItemsComponent,
    PrivateItemsComponent,
    LoginFormComponent,
    NewUserComponent,
    ShoppingCartComponent,
    DmcaToolsComponent,
    UpdateUsersComponent,
    PublicNoticeComponent,
    ItemDetailComponent,
    CommentComponent,
    AddCommentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
