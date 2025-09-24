import { useState } from "react";
import WalletConnectButton from "@/components/WalletConnectButton";
import NetworkSelector from "@/components/NetworkSelector";
import AdvancedTokenForm from "@/components/AdvancedTokenForm";
import ResultCard from "@/components/ResultCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Zap } from "lucide-react";

type AppState = "disconnected" | "connected" | "creating" | "success";

interface TokenResult {
  mintAddress: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  decimals: number;
  transactionSignature: string;
  explorerUrl: string;
  network: "devnet" | "mainnet";
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("disconnected");
  const [network, setNetwork] = useState<"devnet" | "mainnet">("devnet");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [tokenResult, setTokenResult] = useState<TokenResult | null>(null);

  const handleWalletConnect = (walletType: string) => {
    // todo: remove mock functionality - replace with real wallet connection
    const mockAddress = "H8k9v2zJ3L4m1N6p9Q8r7S5t4U3w2X1y0Z9a8B7c6D5e";
    setWalletAddress(mockAddress);
    setAppState("connected");
  };

  const handleWalletDisconnect = () => {
    setWalletAddress("");
    setAppState("disconnected");
    setTokenResult(null);
  };

  const handleTokenSubmit = (data: any) => {
    setAppState("creating");
    
    // todo: remove mock functionality - replace with real token creation
    setTimeout(() => {
      const mockResult: TokenResult = {
        mintAddress: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        tokenName: data.name,
        tokenSymbol: data.symbol,
        totalSupply: data.totalSupply * Math.pow(10, data.decimals),
        decimals: data.decimals,
        transactionSignature: "3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J",
        explorerUrl: `https://solscan.io/token/9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM?cluster=${network}`,
        network: network,
      };
      
      setTokenResult(mockResult);
      setAppState("success");
    }, 3000);
  };

  const handleCreateAnother = () => {
    setAppState("connected");
    setTokenResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Coins className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Token Creator</h1>
                <p className="text-sm text-gray-500">Create Solana SPL tokens</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Network Selector - Always visible */}
          <NetworkSelector 
            selectedNetwork={network}
            onNetworkChange={setNetwork}
          />

          {/* Wallet Connection */}
          {appState === "disconnected" && (
            <WalletConnectButton onConnect={handleWalletConnect} />
          )}

          {/* Connected State - Show form directly */}
          {(appState === "connected" || appState === "creating") && (
            <AdvancedTokenForm 
              onSubmit={handleTokenSubmit}
              isLoading={appState === "creating"}
            />
          )}

          {/* Success State */}
          {appState === "success" && tokenResult && (
            <ResultCard 
              result={tokenResult}
              onCreateAnother={handleCreateAnother}
            />
          )}
          </div>
        </div>
      </main>
    </div>
  );
}