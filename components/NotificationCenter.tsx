"use client";

import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  IMessage,
} from '@novu/notification-center';
import { useRouter } from 'next/navigation';

export default function NotificationCenter() {
  const router = useRouter();

  function onNotificationClick(message: IMessage) {
    if (message.cta?.data?.url) {
      router.push(message.cta.data.url);
    }
  }

  return (
    <NovuProvider 
      subscriberId={'default_user'} 
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER || ''}
      backendUrl={process.env.NEXT_PUBLIC_NOVU_BACKEND_URL}
    >
      <PopoverNotificationCenter onNotificationClick={onNotificationClick} colorScheme={'light'}>
        {({ unseenCount }: { unseenCount?: number }) => (
          <div className="relative hover:scale-110 transition-all cursor-pointer">
            <NotificationBell unseenCount={unseenCount} />
          </div>
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}