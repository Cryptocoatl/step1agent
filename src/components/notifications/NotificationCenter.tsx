
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationItem, NotificationItemProps } from "./NotificationItem";

interface NotificationCenterProps {
  notifications: NotificationItemProps[];
  onMarkAllAsRead: () => void;
}

export const NotificationCenter = ({ 
  notifications, 
  onMarkAllAsRead 
}: NotificationCenterProps) => {
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const transactionNotifications = notifications.filter(notification => notification.type === "transaction");
  const securityNotifications = notifications.filter(notification => notification.type === "security");
  const missionNotifications = notifications.filter(notification => notification.type === "mission");
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs" 
              onClick={() => {
                onMarkAllAsRead();
                setOpen(false);
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 rounded-none h-9 border-b">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="transaction" className="text-xs">Transactions</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
            <TabsTrigger value="mission" className="text-xs">Missions</TabsTrigger>
          </TabsList>
          
          <div className="max-h-[300px] overflow-y-auto">
            <TabsContent value="all" className="mt-0">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem key={notification.id} {...notification} />
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications yet
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="transaction" className="mt-0">
              {transactionNotifications.length > 0 ? (
                transactionNotifications.map((notification) => (
                  <NotificationItem key={notification.id} {...notification} />
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No transaction notifications
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              {securityNotifications.length > 0 ? (
                securityNotifications.map((notification) => (
                  <NotificationItem key={notification.id} {...notification} />
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No security notifications
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="mission" className="mt-0">
              {missionNotifications.length > 0 ? (
                missionNotifications.map((notification) => (
                  <NotificationItem key={notification.id} {...notification} />
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No mission notifications
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
