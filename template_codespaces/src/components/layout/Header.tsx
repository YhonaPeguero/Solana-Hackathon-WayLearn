import { useWalletConnection } from "@solana/react-hooks";

export function Header() {
  const { wallet, status, disconnect, connectors, connect } =
    useWalletConnection();

  const address = wallet?.account.address.toString();
  const shortAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border-low bg-bg1/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Repu<span className="text-primary">Link</span>
          </span>
          <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-muted">
            devnet
          </span>
        </a>

        {/* Wallet */}
        <div className="flex items-center gap-3">
          {status === "connected" && shortAddress ? (
            <>
              <a
                href="/dashboard"
                className="hidden sm:inline-flex items-center rounded-lg border border-border-low bg-card px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                Dashboard
              </a>

              <div className="flex items-center gap-2 rounded-lg border border-border-low bg-cream px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-foreground">
                  {shortAddress}
                </span>
              </div>

              <button
                onClick={() => disconnect()}
                className="rounded-lg border border-border-low bg-card px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={() => connect(connectors[0]?.id)}
              disabled={status === "connecting" || !connectors[0]}
              className="rounded-lg bg-foreground px-4 py-1.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
            >
              {status === "connecting" ? "Connecting..." : "Connect wallet"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}