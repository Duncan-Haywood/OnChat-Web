// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  captchaUrl: '/onchat/index/captcha',

  userUrl: '/onchat/user/',

  userIdUrl: '/onchat/user/id',
  userLoginUrl: '/onchat/user/login',
  userRegisterUrl: '/onchat/user/register',
  userLogoutUrl: '/onchat/user/logout',
  userCheckLoginUrl: '/onchat/user/checklogin',
  userChatroomsUrl: '/onchat/user/chatrooms',
  userChatListUrl: '/onchat/user/chatlist',
  chatListStickyUrl: '/onchat/user/chatlist/sticky/',
  chatListUnstickyUrl: '/onchat/user/chatlist/unsticky/',
  chatListReadedUrl: '/onchat/user/chatlist/readed/',
  chatListUnreadUrl: '/onchat/user/chatlist/unread/',

  chatroomUrl: '/onchat/chatroom/',

  friendUrl: '/onchat/friend/',

  socketUrl: 'http://localhost:9501',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
