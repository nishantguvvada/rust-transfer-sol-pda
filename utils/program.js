import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import IDL from "./systemPDA.json";

export const getProgram = (connection, wallet) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);

    const programId = new PublicKey("HR3KkmXMGwHobw4FkWHULDCuS5uLpd4o96PQroTw9fWb");
    const program = new Program(IDL, programId, provider);

    return program;
}