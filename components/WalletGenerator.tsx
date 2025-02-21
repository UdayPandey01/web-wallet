"use client";

import React, { useState } from "react";
import * as bip39 from "bip39";
import EthereumWallet from "./SolanaWallet";

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState("");

  const generateNewMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 bg-gray-950 text-white min-h-screen w-full">
      <h1 className="text-3xl font-bold">Crypto Wallet Generator</h1>

      <button
        onClick={generateNewMnemonic}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Generate Mnemonic
      </button>

      {mnemonic && (
        <div className="w-full max-w-3xl p-4 bg-gray-900 shadow-xl rounded-lg text-white border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Generated Mnemonic</h3>
          <p className="text-sm font-mono break-words bg-gray-800 p-3 rounded-md text-gray-300">
            {mnemonic}
          </p>
        </div>
      )}

      {mnemonic && <EthereumWallet mnemonic={mnemonic} />}
    </div>
  );
};

export default WalletGenerator;
