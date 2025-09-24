import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Check } from "lucide-react";
import { useState } from "react";

interface WalletConnectButtonProps {
  connected?: boolean;
  walletAddress?: string;
  onConnect?: (walletType: string) => void;
  onDisconnect?: () => void;
}

const WALLET_OPTIONS = [
  { name: "Phantom", icon: "👻", id: "phantom" },
  { name: "Solflare", icon: "☀️", id: "solflare" },
  { name: "Backpack", icon: "🎒", id: "backpack" },
];

export default function WalletConnectButton({
  connected = false,
  walletAddress,
  onConnect,
  onDisconnect,
}: WalletConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      onConnect?.(walletType);
      setIsConnecting(false);
      console.log(`${walletType} wallet connected`);
    }, 1500);
  };

  const handleDisconnect = () => {
    onDisconnect?.();
    console.log('Wallet disconnected');
  };

  if (connected && walletAddress) {
    return (
      <Card className="crypto-card border-primary/30 crypto-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 crypto-gradient rounded-lg crypto-glow">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Wallet Connected</p>
                <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="border-primary/30 hover:bg-primary/10"
              data-testid="button-disconnect-wallet"
            >
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="crypto-card">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="p-4 crypto-gradient rounded-full w-fit mx-auto mb-6 crypto-glow">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connect Your Wallet
          </h3>
          <p className="text-muted-foreground">
            Choose a wallet to connect to Solana and start creating tokens
          </p>
        </div>

        <div className="space-y-4">
          {WALLET_OPTIONS.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="w-full justify-start gap-4 h-14 border-primary/20 hover:border-primary/40 hover:bg-primary/5 crypto-glow"
              onClick={() => handleConnect(wallet.id)}
              disabled={isConnecting}
              data-testid={`button-connect-${wallet.id}`}
            >
              <span className="text-2xl">{wallet.icon}</span>
              <span className="font-medium">{wallet.name}</span>
              {isConnecting && <span className="ml-auto text-xs text-primary">Connecting...</span>}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}