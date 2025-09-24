import { useState } from "react";
import WalletConnectButton from "@/components/WalletConnectButton";
import NetworkSelector from "@/components/NetworkSelector";
import AdvancedTokenForm from "@/components/AdvancedTokenForm";
import ResultCard from "@/components/ResultCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Zap } from "lucide-react";
import "@/types/wallet";

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
  const [connectedWalletType, setConnectedWalletType] = useState<string>("");
  const [tokenResult, setTokenResult] = useState<TokenResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleWalletConnect = (address: string, walletType: string) => {
    setWalletAddress(address);
    setConnectedWalletType(walletType);
    setAppState("connected");
    setError(""); // Clear any previous errors
  };
  
  const handleWalletError = (errorMessage: string) => {
    setError(errorMessage);
    setAppState("disconnected");
  };

  const handleWalletDisconnect = async () => {
    try {
      // Disconnect from the correct wallet based on what was connected
      switch (connectedWalletType) {
        case 'phantom':
          if (window.solana?.disconnect) {
            await window.solana.disconnect();
          }
          break;
        case 'solflare':
          if (window.solflare?.disconnect) {
            await window.solflare.disconnect();
          }
          break;
        case 'backpack':
          if (window.backpack?.disconnect) {
            await window.backpack.disconnect();
          }
          break;
      }
    } catch (error) {
      console.error(`Failed to disconnect from ${connectedWalletType} wallet:`, error);
    }
    
    setWalletAddress("");
    setConnectedWalletType("");
    setAppState("disconnected");
    setTokenResult(null);
  };

  const handleTokenSubmit = async (data: any) => {
    setAppState("creating");
    
    try {
      // Real token creation implementation
      const result = await createSolanaToken(data, walletAddress, network);
      setTokenResult(result);
      setAppState("success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create token';
      setError(errorMessage);
      setAppState("connected"); // Go back to form on error
    }
  };

  const createSolanaToken = async (tokenData: any, walletAddress: string, network: "devnet" | "mainnet"): Promise<TokenResult> => {
    // This will be implemented with real Solana SPL token creation once packages are installed
    // For now, provide user-friendly error message
    throw new Error('Token creation is not yet fully implemented. Please wait while we finish setting up the Solana integration.');
    
    // Future implementation will:
    // 1. Connect to Solana cluster (devnet/mainnet)
    // 2. Create token mint
    // 3. Create token account
    // 4. Mint initial supply
    // 5. Set up metadata if provided
    // 6. Return actual transaction result
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

          {/* Error Display */}
          {error && (
            <Card className="border-red-500/50 bg-red-500/10">
              <CardContent className="p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Wallet Connection */}
          {appState === "disconnected" && (
            <WalletConnectButton 
              onConnect={handleWalletConnect}
              onError={handleWalletError}
            />
          )}

          {/* Connected State - Show wallet info and form */}
          {(appState === "connected" || appState === "creating") && (
            <>
              <WalletConnectButton 
                connected={true}
                walletAddress={walletAddress}
                connectedWalletType={connectedWalletType}
                onDisconnect={handleWalletDisconnect}
              />
              <AdvancedTokenForm 
                onSubmit={handleTokenSubmit}
                isLoading={appState === "creating"}
              />
            </>
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