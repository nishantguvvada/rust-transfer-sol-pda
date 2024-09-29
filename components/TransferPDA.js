import { getProgram } from "@/utils/program";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BN } from "@coral-xyz/anchor";

export const TransferPDA = () => {
    const [newPDA, setNewPDA] = useState("");
    const [amount, setAmount] = useState(0);
    const { connection } = useConnection();
    const wallet = useWallet();

    const program = useMemo(() => {
        if(wallet.publicKey){
            return getProgram(connection, wallet);
        }
    },[connection, wallet]);

    const generatePDA = async () => {

        const [PDA, bump] = await PublicKey.findProgramAddressSync(
            [Buffer.from("vault")],
            program.programId
        );

        console.log(`PDA: ${PDA}`);
        console.log(`bump: ${bump}`);

        setNewPDA(PDA.toBase58());

    }

    const transferToPDA = async () => {
        try {

            const [PDA, bump] = await PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                program.programId
            );

            console.log(`PDA: ${PDA}`);
            console.log(`bump: ${bump}`);

            const value = new BN(parseInt(amount * LAMPORTS_PER_SOL));

            const transaction = await program.methods.transferToPda(
                value
            ).accounts({
                pda: PDA,
                signer: wallet.publicKey,
                systemProgram: SystemProgram.programId
            }).transaction();

            console.log("Transaction", transaction);
    
            // set fee payer
            transaction.feePayer = wallet.publicKey;
            // get latest blockhash
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            // sign transaction
            const signedTx = await wallet.signTransaction(transaction);
            console.log("Signed Transaction", signedTx);
            // send transaction
            const txId = await connection.sendRawTransaction(signedTx.serialize());
            console.log("Transaction ID", txId);
            // confirmTransaction returns a signature
            const signature = await connection.confirmTransaction(txId, "confirmed");
      
            toast.success("Transferred to PDA");
        } catch(err) {
            console.log("Error: ", err);
            toast.error("Error: ", err);
        }
    }

    const transferFromPDA = async () => {
        try {

            const [PDA, bump] = await PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                program.programId
            );

            console.log(`PDA: ${PDA}`);
            console.log(`bump: ${bump}`);

            const value = new BN(parseInt(amount * LAMPORTS_PER_SOL));

            const transaction = await program.methods.transferFromPda(
                value
            ).accounts({
                pda: PDA,
                signer: wallet.publicKey,
                systemProgram: SystemProgram.programId
            }).transaction();

            console.log("Transaction", transaction);
    
            // set fee payer
            transaction.feePayer = wallet.publicKey;
            // get latest blockhash
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            // sign transaction
            const signedTx = await wallet.signTransaction(transaction);
            console.log("Signed Transaction", signedTx);
            // send transaction
            const txId = await connection.sendRawTransaction(signedTx.serialize());
            console.log("Transaction ID", txId);
            // confirmTransaction returns a signature
            const signature = await connection.confirmTransaction(txId, "confirmed");
      
            toast.success("Transferred from PDA");
        } catch(err) {
            console.log("Error: ", err);
            toast.error("Error: ", err);
        }
    }

    return (
        <div>
            <div className="grid place-items-center gap-4">
                <label className="w-96 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Generate a PDA</label>
                <input value={newPDA} readOnly type="text" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Generated PDA" required />
                <button onClick={generatePDA} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Generate PDA</button>
                <input onChange={(e)=>{setAmount(e.target.value)}} type="text" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1 SOL" required />
                <div className="flex flex-row">
                    <button onClick={transferToPDA} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Transfer To PDA</button>
                    <button onClick={transferFromPDA} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Transfer From PDA</button>
                </div>
            </div>
        </div>
    )
}