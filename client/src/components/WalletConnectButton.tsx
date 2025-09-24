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
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Wallet Connected</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
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
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground">
            Choose a wallet to connect to Solana and start creating tokens
          </p>
        </div>

        <div className="space-y-3">
          {WALLET_OPTIONS.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleConnect(wallet.id)}
              disabled={isConnecting}
              data-testid={`button-connect-${wallet.id}`}
            >
              <span className="text-lg">{wallet.icon}</span>
              <span>{wallet.name}</span>
              {isConnecting && <span className="ml-auto text-xs">Connecting...</span>}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}