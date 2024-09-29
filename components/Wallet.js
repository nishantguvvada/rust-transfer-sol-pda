"use client";
import dynamic from "next/dynamic"
import '@solana/wallet-adapter-react-ui/styles.css';
const WalletMultiButtonDynamic = dynamic(
    async () => (await import ("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);
const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import ("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
    { ssr: false }
);

export const Wallet = () => {
    return (
        <div className="grid place-items-center gap-4 mb-4 mt-4">
            <WalletMultiButtonDynamic/>
            <WalletDisconnectButtonDynamic/>
        </div>
    )
}