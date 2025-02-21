"use client";

import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const EthereumWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  const generateWallet = () => {
    try {
      const seed = mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const keypair = Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);

      const newWallet = {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString("hex"),
      };

      setWallets([...wallets, newWallet]);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl bg-gray-900 p-6 shadow-xl rounded-lg space-y-4 border border-gray-700">
      <button
        onClick={generateWallet}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add Wallet
      </button>

      {wallets.length > 0 && (
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4 text-white text-center">Generated Wallets</h3>
          <div className="space-y-4">
            {wallets.map((wallet, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg shadow border border-gray-700">
                <p className="text-sm text-gray-300 font-mono">
                  <span className="font-semibold text-white">Public Key:</span> {wallet.publicKey}
                </p>
                <p className="text-sm text-gray-300 font-mono mt-2">
                  <span className="font-semibold text-white">Private Key:</span>{" "}
                  <span className="bg-gray-700 p-1 rounded text-xs break-words">{wallet.privateKey}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EthereumWallet;
