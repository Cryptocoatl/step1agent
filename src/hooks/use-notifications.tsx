
import { useState, useEffect } from "react";
import { NotificationItemProps } from "@/components/notifications/NotificationItem";

// Mock data for the notifications
const initialNotifications: NotificationItemProps[] = [
  {
    id: "notif-1",
    type: "transaction",
    title: "ICP Transfer Completed",
    message: "Your transfer of 5 ICP to wallet 2ABC...Z3F has been confirmed on the blockchain.",
    timestamp: "10m ago",
    read: false,
    actionText: "View Transaction",
    actionUrl: "#view-transaction"
  },
  {
    id: "notif-2",
    type: "security",
    title: "New Device Login",
    message: "A new device was used to access your wallet. If this wasn't you, please secure your account immediately.",
    timestamp: "1h ago",
    read: false,
    actionText: "Secure Account",
    actionUrl: "#security-settings"
  },
  {
    id: "notif-3",
    type: "mission",
    title: "Mission Completed!",
    message: "You've successfully completed the 'Connect Your First Wallet' mission and earned 50 STEP1 tokens.",
    timestamp: "3h ago",
    read: true,
    actionText: "View Rewards",
    actionUrl: "#rewards"
  },
  {
    id: "notif-4",
    type: "transaction",
    title: "ckBTC Staking Reward",
    message: "You've received 0.0025 ckBTC as a staking reward.",
    timestamp: "5h ago",
    read: true
  },
  {
    id: "notif-5",
    type: "system",
    title: "Wallet Synchronized",
    message: "Your wallet data has been successfully synchronized across all connected chains.",
    timestamp: "1d ago",
    read: true
  },
  {
    id: "notif-6",
    type: "security",
    title: "Security Check Recommended",
    message: "It's been 30 days since your last security check. We recommend reviewing your security settings.",
    timestamp: "2d ago",
    read: true,
    actionText: "Review Settings",
    actionUrl: "#security-settings"
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItemProps[]>(initialNotifications);

  const addNotification = (notification: Omit<NotificationItemProps, "id" | "timestamp">) => {
    const newNotification: NotificationItemProps = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: "Just now",
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  };
}
