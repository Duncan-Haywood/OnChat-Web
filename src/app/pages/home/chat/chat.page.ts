import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MessageType } from 'src/app/common/enum';
import { DateUtil } from 'src/app/common/utils/date.util';
import { ChatItem, Result } from 'src/app/models/onchat.model';
import { OnChatService } from 'src/app/services/onchat.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  subject: Subject<unknown> = new Subject();
  /** 消息类型枚举 */
  msgType = MessageType;

  @ViewChildren(IonItemSliding) ionItemSlidings: QueryList<IonItemSliding>;

  constructor(
    public onChatService: OnChatService,
    private route: ActivatedRoute,
    private socketService: SocketService,
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

  /**
   * 用于提升性能
   * 一般情况下，当数组内有变更时，
   * Angular将会对整个DOM树加以重新渲染。
   * 如果加上trackBy方法，Angular将会知道具体的变更元素，
   * 并针对性地对此特定元素进行DOM刷新，提升页面渲染性能。
   */
  trackByFn(index: number, item: ChatItem): number {
    return item.id;
  }

  refresh(complete?: CallableFunction) {
    this.onChatService.getChatList().subscribe((result: Result<ChatItem[]>) => {
      this.onChatService.chatList = result.data;
      complete && complete();
    });
  }

  doRefresh(event: any) {
    this.refresh(() => {
      event.target.complete();
    });
  }

  /**
   * 是否在同一周
   * @param date
   */
  isSameWeek(date: number) {
    return DateUtil.isSameWeek(new Date(date));
  }

  /**
   * 移除聊天列表子项
   * @param index
   */
  removeChatItem(index: number) {
    // 使用setTimeout解决手指点击后 还未来得及松开 后面的列表项跑上来 触发点击的问题
    setTimeout(() => {
      this.onChatService.chatList.splice(index, 1);
    }, 15);
  }

  /**
   * 置顶聊天列表子项
   * @param item
   * @param i
   */
  doSticky(item: ChatItem, i: number) {
    if (item.sticky) {
      return this.onChatService.unstickyChatItem(item.id).subscribe((result: Result) => {
        if (result.code == 0) {
          item.sticky = false;
          this.onChatService.chatList = this.onChatService.chatList;

          this.closeIonItemSliding(i);
        }
      });
    }

    this.onChatService.stickyChatItem(item.id).subscribe((result: Result) => {
      if (result.code == 0) {
        item.sticky = true;
        this.onChatService.chatList = this.onChatService.chatList;

        this.closeIonItemSliding(i);
      }
    });
  }

  /**
   * 将聊天列表子项设置为已读
   * @param item
   * @param i
   */
  doRead(item: ChatItem, i: number) {
    if (item.unread == 0) {
      return this.onChatService.unread(item.chatroomId).subscribe((result: Result) => {
        if (result.code == 0) {
          item.unread = 1;
          this.onChatService.chatList = this.onChatService.chatList;

          this.closeIonItemSliding(i);
        }
      });
    }

    this.onChatService.readed(item.chatroomId).subscribe((result: Result) => {
      if (result.code == 0) {
        item.unread = 0;
        this.onChatService.chatList = this.onChatService.chatList;

        this.closeIonItemSliding(i);
      }
    });
  }

  /**
   * 合上IonItemSliding
   * @param i
   */
  closeIonItemSliding(i: number) {
    this.ionItemSlidings.forEach((item: IonItemSliding, index: number) => {
      index == i && item.close();
    });
  }

}
