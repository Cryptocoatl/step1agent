
// Generated file - provides the frontend with the interface to the backend canister
export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    // Define your canister methods here
    greeting: IDL.Func([], [IDL.Text], ['query']),
    setGreeting: IDL.Func([IDL.Text], [], []),
  });
};
