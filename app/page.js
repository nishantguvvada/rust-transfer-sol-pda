"use client";
import { Wallet } from "@/components/Wallet";
import { TransferPDA } from "@/components/TransferPDA";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const endpoint = "https://api.devnet.solana.com";
  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Wallet/>
            <TransferPDA/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <Toaster/>
    </div>
  );
}
