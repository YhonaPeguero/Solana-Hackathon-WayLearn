import { useReputationNFT } from "../../hooks/useReputationNFT";
import { type FreelancerProfile, type BadgeWithPda } from "../../types/repulink";

interface ReputationCardProps {
  profile: FreelancerProfile;
  badges: BadgeWithPda[];
  walletAddress: string;
}

export function ReputationCard({
  profile,
  badges,
  walletAddress,
}: ReputationCardProps) {
  const { mintReputationCard, isMinting, mintStatus, mintSignature } =
    useReputationNFT();

  const approved = badges.filter((b) => "approved" in b.account.status);
  const score =
    badges.length > 0
      ? Math.round((approved.length / badges.length) * 100)
      : 0;

  const handleMint = async () => {
    try {
      await mintReputationCard(profile, badges);
    } catch {
      // error already set in hook
    }
  };

  return (
    <div className="rounded-2xl border border-border-low bg-card p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">Reputation Card</p>
        <p className="text-xs text-muted">
          Mint your verified reputation as a soulbound NFT on Solana.
        </p>
      </div>

      {/* Card preview */}
      <div className="relative overflow-hidden rounded-xl border border-border-low bg-gradient-to-br from-[#042C53] to-[#185FA5] p-5 text-white space-y-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest opacity-60">
              RepuLink
            </p>
            <p className="mt-0.5 text-lg font-semibold">@{profile.username}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-60">Score</p>
            <p className="text-3xl font-bold">{score}%</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Endorsed", value: approved.length },
            { label: "Total", value: badges.length },
            { label: "On-chain", value: "✓" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white/10 px-3 py-2 space-y-0.5"
            >
              <p className="text-xs opacity-60">{stat.label}</p>
              <p className="text-base font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Wallet */}
        <p className="font-mono text-xs opacity-40">
          {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
        </p>

        {/* Decorative circle */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/5" />
      </div>

      {/* Status */}
      {mintStatus && (
        <div className="rounded-lg border border-border-low bg-cream/50 px-4 py-3 text-sm space-y-2">
          <p className="text-foreground">{mintStatus}</p>
          {mintSignature && (
            <a
              href={
                "https://explorer.solana.com/tx/" +
                mintSignature +
                "?cluster=devnet"
              }
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs text-muted underline underline-offset-2 transition hover:text-foreground"
            >
              View on Solana Explorer →
            </a>
          )}
        </div>
      )}

      {/* Mint button */}
      <button
        onClick={handleMint}
        disabled={isMinting || badges.length === 0}
        className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
      >
        {isMinting
          ? mintStatus ?? "Minting..."
          : badges.length === 0
            ? "Get endorsements first"
            : "Mint Reputation Card"}
      </button>

      {badges.length === 0 && (
        <p className="text-center text-xs text-muted">
          You need at least 1 badge to mint your Reputation Card.
        </p>
      )}
    </div>
  );
}