# RepuLink

> **Your reputation, portable forever.**  
> On-chain endorsement badges for freelancers — verified by real clients, owned by you, shareable anywhere.

Built on **Solana** · Submitted to **WayLearn x Solana Foundation Hackathon 2026**

---

## What is RepuLink?

Freelancers in LATAM and globally build their reputation across Upwork, Fiverr, and direct clients — but that reputation is trapped in each platform. When they switch platforms or work directly, they start from zero.

RepuLink fixes that. When a freelancer completes a project, they send the client a verification link. The client approves it on-chain with their identity (wallet, LinkedIn, Twitter, email). The result is a **soulbound badge** — permanently on Solana, owned by the freelancer, verifiable by anyone with a public profile link.

No wallet required for clients. No crypto knowledge needed. The blockchain is invisible.

---

## Features

| Feature | Description |
|---|---|
| **Freelancer profile** | Create an on-chain identity with a username and avatar |
| **Endorsement requests** | Send clients a link to verify your completed work |
| **Client approval** | Clients approve or reject via a simple link — no wallet required |
| **Soulbound badges** | Non-transferable NFTs that cannot be faked or sold |
| **Client identity on-chain** | Approvals store wallet address, LinkedIn, Twitter, and email |
| **Public profile** | Share a `repulink.app/your-address` link — verifiable by anyone |
| **Profile editor** | Update username, upload avatar, delete account |
| **Solana Explorer** | Every badge links directly to the on-chain transaction |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│         Next.js · React · TailwindCSS               │
│                                                     │
│  HomePage  →  Dashboard  →  CreateBadge             │
│                    ↓                                │
│            ApproveBadge  ←  (client link)           │
│                    ↓                                │
│            PublicProfile  (shareable)               │
└──────────────────────┬──────────────────────────────┘
                       │  @solana/react-hooks
                       │  @solana/kit
                       │  Codama (generated types)
┌──────────────────────▼──────────────────────────────┐
│                 Solana Devnet                        │
│                                                     │
│  Program: EQEWMBEtLZE7L2WS3iWo88rk8tQ4o8P9djmEJkG8gTFw  │
│                                                     │
│  PDAs:                                              │
│  ├── FreelancerProfile  [seeds: "profile" + owner]  │
│  └── Badge              [seeds: "badge" + owner + index] │
│                                                     │
│  Instructions:                                      │
│  ├── initialize_profile(username)                   │
│  ├── update_profile(username)                       │
│  ├── close_profile()                                │
│  ├── create_badge(title, description, client_*)     │
│  ├── approve_badge(index, linkedin, twitter, email) │
│  └── reject_badge(index)                            │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                 Helius RPC                          │
│   getAccountInfo · getProgramAccounts (badge fetch) │
└─────────────────────────────────────────────────────┘
```

---

## Endorsement Flow

```
Freelancer                    Client
    │                            │
    │  1. Create endorsement     │
    │     request (on-chain)     │
    │                            │
    │  2. Copy approval link ──► │  Opens link (no wallet needed)
    │                            │  Privy creates embedded wallet
    │                            │  Fills identity (LinkedIn, email...)
    │                            │  Signs approval on-chain
    │                            │
    │  ◄── Badge appears ────────│
    │      in dashboard          │
    │      (soulbound NFT)       │
```

---

## Tech Stack

**Backend (on-chain)**
- Rust + Anchor framework
- Token Extensions (soulbound / non-transferable logic)
- PDA accounts for profile and badge state
- Deployed on Solana Devnet

**Frontend**
- React + Vite + TypeScript
- TailwindCSS
- `@solana/react-hooks` + `@solana/kit`
- Codama (auto-generated program client from IDL)
- Helius RPC (on-chain data fetching)
- Privy (embedded wallet for clients — no extension required)

---

## Getting Started

### Prerequisites

- Node.js 18+
- Rust + Cargo
- Solana CLI
- Anchor CLI

### 1. Clone and setup

```bash
git clone https://github.com/YhonaPeguero/Solana-Hackathon-WayLearn.git
cd Solana-Hackathon-WayLearn/template_codespaces
npm install
```

### 2. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_HELIUS_API_KEY=your_helius_api_key
VITE_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_helius_api_key
VITE_PROGRAM_ID=EQEWMBEtLZE7L2WS3iWo88rk8tQ4o8P9djmEJkG8gTFw
```

Get your Helius API key at [dashboard.helius.dev](https://dashboard.helius.dev).

### 3. Build the Anchor program

```bash
cd anchor
anchor build
anchor deploy
```

### 4. Regenerate Codama types

```bash
cd ..
npm run setup
```

### 5. Run the frontend

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Using Codespaces

The repo includes a full Codespaces setup. Just open it in GitHub and click **Create codespace** — Rust, Solana CLI, Anchor, and Node are installed automatically.

After the setup finishes, run:

```bash
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
cd template_codespaces
npm install && npm run dev
```

---

## Program ID

```
EQEWMBEtLZE7L2WS3iWo88rk8tQ4o8P9djmEJkG8gTFw
```

[View on Solana Explorer →](https://explorer.solana.com/address/EQEWMBEtLZE7L2WS3iWo88rk8tQ4o8P9djmEJkG8gTFw?cluster=devnet)

---

## Project Structure

```
template_codespaces/
├── anchor/
│   ├── programs/repulink/src/lib.rs   ← Anchor program
│   ├── tests/repulink.ts              ← Integration tests
│   └── Anchor.toml
├── src/
│   ├── pages/                         ← Route-level components
│   │   ├── HomePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── CreateBadgePage.tsx
│   │   ├── ApproveBadgePage.tsx
│   │   └── PublicProfilePage.tsx
│   ├── components/
│   │   ├── badge/                     ← BadgeCard, BadgeList
│   │   ├── layout/                    ← Header, Layout
│   │   ├── profile/                   ← ProfileEditor
│   │   └── ui/                        ← StatusBadge
│   ├── hooks/
│   │   ├── useRepulink.ts             ← On-chain instructions
│   │   └── useOnChainData.ts          ← Profile + badge fetching
│   ├── generated/repulink/            ← Codama auto-generated client
│   └── types/repulink.ts              ← Shared TypeScript types
└── .env.example
```

---

## Running Tests

```bash
cd anchor
anchor test --skip-deploy
```

4 tests cover the full badge lifecycle:
1. Creates a freelancer profile
2. Creates a badge with Pending status
3. Client approves the badge → status becomes Approved
4. Cannot approve an already approved badge → expects `BadgeNotPending` error

---

## Built with

- [Solana](https://solana.com) — The fastest blockchain for this use case
- [Anchor](https://anchor-lang.com) — Rust framework for Solana programs
- [Helius](https://helius.dev) — RPC and DAS API
- [Codama](https://github.com/codama-idl/codama) — Type-safe program client generation
- [WayLearn](https://waylearn.io) — Hackathon organizer

---

*RepuLink — Solana LATAM Hackathon 2026 by: [Yhona Peguero](https://www.linkedin.com/in/yhonatan-peguero/)*