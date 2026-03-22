import { useWalletConnection } from "@solana/react-hooks";
import { Layout } from "../components/layout/Layout";

const KNOWN_WALLETS = [
  { name: "Phantom", url: "https://phantom.app/" },
  { name: "Backpack", url: "https://backpack.app/" },
  { name: "Solflare", url: "https://solflare.com/" },
];

export function HomePage() {
  const { connectors, connect, status } = useWalletConnection();

  const notInstalled = KNOWN_WALLETS.filter(
    (w) =>
      !connectors.some((c) =>
        c.name.toLowerCase().includes(w.name.toLowerCase())
      )
  );

  return (
    <Layout>
      <div className="flex flex-col items-center gap-12 py-16 text-center">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block rounded-full bg-cream px-4 py-1 text-xs font-semibold uppercase tracking-widest text-muted">
            Built on Solana
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Your reputation,
            <br />
            <span className="text-primary">portable forever.</span>
          </h1>
          <p className="text-base leading-relaxed text-muted">
            RepuLink lets freelancers collect verified badges from real clients.
            Soulbound on-chain, shareable anywhere, owned by you — not the
            platform.
          </p>
        </div>

        {status !== "connected" ? (
          <div className="w-full max-w-sm space-y-3">
            <p className="text-sm text-muted">
              Connect your wallet to get started
            </p>
            <div className="grid gap-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect(connector.id)}
                  disabled={status === "connecting"}
                  className="flex items-center justify-between rounded-xl border border-border-low bg-card px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50"
                >
                  <span>{connector.name}</span>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </button>
              ))}

              {notInstalled.map((wallet) => (
                <a
                  key={wallet.name}
                  href={wallet.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border-low bg-card px-4 py-3 text-sm font-medium opacity-50 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <span>{wallet.name}</span>
                  <span className="text-xs text-muted">Install →</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <a
            href="/dashboard"
            className="rounded-xl bg-foreground px-8 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Go to Dashboard
          </a>
        )}

        <div className="grid w-full max-w-3xl gap-4 text-left sm:grid-cols-3">
          {[
            {
              title: "Verified by real clients",
              description:
                "Clients approve badges by signing on-chain with their wallet and identity.",
            },
            {
              title: "Soulbound & permanent",
              description:
                "Badges cannot be transferred or faked. Your reputation is yours forever.",
            },
            {
              title: "Shareable anywhere",
              description:
                "Share your public profile link with anyone. No wallet required to view.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border-low bg-card p-5 space-y-2"
            >
              <p className="text-sm font-semibold text-foreground">
                {feature.title}
              </p>
              <p className="text-xs leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}