export default function Overview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-app-text mb-2">My Profile</h1>
      <p className="text-app-text-muted mb-6">Welcome back, User!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Firebase goes here */}
        <div className="p-4 rounded-xl bg-app-bg border border-app-border">
            <h3 className="text-sm text-app-text-muted">Email</h3>
            <p className="text-app-text">user@example.com</p>
        </div>
      </div>
    </div>
  );
}
