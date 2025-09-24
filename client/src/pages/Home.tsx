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
    <div className="min-h-screen relative">
      {/* Crypto Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(96, 165, 250, 0.3) 1px, transparent 0)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>
      
      {/* Crypto Header */}
      <header className="relative z-10 crypto-glass border-b border-primary/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 crypto-gradient rounded-xl crypto-glow">
                <Coins className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Solana Token Creator
                </h1>
                <p className="text-muted-foreground">Create SPL tokens on the blockchain</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="crypto-glow border-primary/30 text-primary">
                <Zap className="h-3 w-3 mr-1" />
                DeFi
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
          
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