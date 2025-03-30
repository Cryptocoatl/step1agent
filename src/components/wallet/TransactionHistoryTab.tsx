
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NotificationItemProps } from "@/components/notifications/NotificationItem";

interface Transaction {
  id: string;
  type: "send" | "receive" | "swap" | "stake";
  amount: string;
  token: string;
  address: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

interface TransactionHistoryTabProps {
  transactionNotifications?: NotificationItemProps[];
}

export const TransactionHistoryTab = ({ transactionNotifications = [] }: TransactionHistoryTabProps) => {
  const [transactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      type: "send",
      amount: "5",
      token: "ICP",
      address: "2ABC...Z3F",
      timestamp: "Today, 14:32",
      status: "completed"
    },
    {
      id: "tx-2",
      type: "receive",
      amount: "0.0025",
      token: "ckBTC",
      address: "3DEF...Y4G",
      timestamp: "Today, 10:15",
      status: "completed"
    },
    {
      id: "tx-3",
      type: "swap",
      amount: "10.5",
      token: "ICP → Cycles",
      address: "Internal",
      timestamp: "Yesterday, 17:45",
      status: "completed"
    }
  ]);

  // If there are no transactions and no transaction notifications, show the empty state
  if (transactions.length === 0 && transactionNotifications.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="font-medium mb-2">Transaction History</h3>
        <p className="text-muted-foreground">Connect your wallets to view transaction history</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Tabs defaultValue="transactions">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications {transactionNotifications.length > 0 && `(${transactionNotifications.length})`}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <div className="space-y-4">
            {transactions.map((tx) => (
              <GlassPanel key={tx.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        tx.type === "receive" ? "text-green-500" : 
                        tx.type === "send" ? "text-amber-500" : 
                        "text-blue-500"
                      }`}>
                        {tx.type === "receive" ? "Received" : 
                         tx.type === "send" ? "Sent" : 
                         tx.type === "swap" ? "Swapped" : "Staked"}
                      </span>
                      <span className="text-xs bg-secondary/50 rounded px-2 py-0.5">
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{tx.amount} {tx.token}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tx.type === "swap" ? tx.address : `Address: ${tx.address}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          {transactionNotifications.length > 0 ? (
            <div className="space-y-4">
              {transactionNotifications.map((notification) => (
                <GlassPanel key={notification.id} className="p-4">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    {notification.actionText && notification.actionUrl && (
                      <a href={notification.actionUrl} className="text-xs text-blue-500 hover:underline">
                        {notification.actionText}
                      </a>
                    )}
                  </div>
                </GlassPanel>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No transaction notifications to display</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
