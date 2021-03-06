import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BubbleToolbarComponent } from 'src/app/components/bubble-toolbar/bubble-toolbar.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { MsgListComponent } from '../../components/msg-list/msg-list.component';
import { ChatPageRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    SharedModule
  ],
  declarations: [
    ChatPage,
    MsgListComponent,
    BubbleToolbarComponent
  ],
  entryComponents: [
    BubbleToolbarComponent
  ],
})
export class ChatPageModule { }
