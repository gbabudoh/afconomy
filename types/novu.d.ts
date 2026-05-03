declare module '@novu/notification-center' {
  export const NovuProvider: any;
  export const PopoverNotificationCenter: any;
  export const NotificationBell: any;
  export interface IMessage {
    cta?: {
      data?: {
        url?: string;
      };
    };
  }
}
