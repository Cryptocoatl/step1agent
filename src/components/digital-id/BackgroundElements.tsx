
export const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute w-48 h-48 bg-accent/20 rounded-full blur-3xl top-10 left-20 animate-pulse-soft"></div>
      <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse-soft" style={{ animationDelay: "2s" }}></div>
    </div>
  );
};
