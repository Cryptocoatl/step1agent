
// Generated file - provides the frontend with the interface to the backend canister
export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    // Define your canister methods here
    greeting: IDL.Func([], [IDL.Text], ['query']),
    setGreeting: IDL.Func([IDL.Text], [], []),
    
    // Digital ID Methods
    registerDigitalID: IDL.Func([IDL.Text], [IDL.Bool], []),
    getDigitalID: IDL.Func([], [IDL.Opt(
      IDL.Record({
        displayName: IDL.Text,
        wallets: IDL.Vec(IDL.Text),
        daoMemberships: IDL.Vec(IDL.Text),
        createdAt: IDL.Int
      })
    )], ['query']),
    linkWallet: IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    
    // Reward Methods
    earnReward: IDL.Func([IDL.Text, IDL.Int, IDL.Text], [IDL.Bool], []),
    getRewards: IDL.Func([], [IDL.Vec(
      IDL.Record({
        rewardType: IDL.Text,
        amount: IDL.Int,
        description: IDL.Text,
        earnedAt: IDL.Int
      })
    )], ['query']),
    
    // Content Completion Methods
    markContentCompleted: IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    getCompletedContent: IDL.Func([], [IDL.Vec(
      IDL.Record({
        contentId: IDL.Text,
        contentType: IDL.Text,
        completedAt: IDL.Int
      })
    )], ['query']),
    
    // System Methods
    heartbeat: IDL.Func([], [IDL.Text], [])
  });
};
