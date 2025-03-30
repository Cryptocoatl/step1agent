
import { Check, AlertTriangle, Bell, MessageSquare, Calendar, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type NotificationType = "transaction" | "security" | "mission" | "system";

export interface NotificationItemProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionText?: string;
  actionUrl?: string;
}

export const NotificationItem = ({ 
  type, 
  title, 
  message, 
  timestamp, 
  read, 
  actionText, 
  actionUrl 
}: NotificationItemProps) => {
  const getIcon = () => {
    switch (type) {
      case "transaction":
        return <Wallet className="text-blue-500" size={16} />;
      case "security":
        return <AlertTriangle className="text-amber-500" size={16} />;
      case "mission":
        return <Calendar className="text-green-500" size={16} />;
      case "system":
        return <Bell className="text-purple-500" size={16} />;
      default:
        return <MessageSquare className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className={cn(
      "p-3 border-b last:border-b-0 transition-colors hover:bg-accent/10",
      !read && "bg-accent/5"
    )}>
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className={cn("text-sm font-medium", !read && "font-semibold")}>{title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{timestamp}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message}</p>
          
          {actionText && actionUrl && (
            <div className="mt-2">
              <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                <a href={actionUrl}>{actionText}</a>
              </Button>
            </div>
          )}
        </div>
        {!read && (
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
        )}
      </div>
    </div>
  );
};
