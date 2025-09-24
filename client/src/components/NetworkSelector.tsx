import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, TestTube } from "lucide-react";
import { useState } from "react";

interface NetworkSelectorProps {
  selectedNetwork?: "devnet" | "mainnet";
  onNetworkChange: (network: "devnet" | "mainnet") => void;
}

export default function NetworkSelector({
  selectedNetwork = "devnet",
  onNetworkChange,
}: NetworkSelectorProps) {
  const [switching, setSwitching] = useState(false);

  const handleNetworkSwitch = (network: "devnet" | "mainnet") => {
    if (network === selectedNetwork) return;
    
    setSwitching(true);
    setTimeout(() => {
      onNetworkChange(network);
      setSwitching(false);
      console.log(`Switched to ${network}`);
    }, 800);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-md">
              {selectedNetwork === "devnet" ? (
                <TestTube className="h-4 w-4" />
              ) : (
                <Globe className="h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">Network</p>
              <div className="flex items-center gap-2">
                <Badge variant={selectedNetwork === "devnet" ? "secondary" : "default"}>
                  {selectedNetwork === "devnet" ? "Devnet" : "Mainnet"}
                </Badge>
                {switching && (
                  <span className="text-xs text-muted-foreground">Switching...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              variant={selectedNetwork === "devnet" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNetworkSwitch("devnet")}
              disabled={switching}
              data-testid="button-network-devnet"
            >
              <TestTube className="h-3 w-3 mr-1" />
              Devnet
            </Button>
            <Button
              variant={selectedNetwork === "mainnet" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNetworkSwitch("mainnet")}
              disabled={switching}
              data-testid="button-network-mainnet"
            >
              <Globe className="h-3 w-3 mr-1" />
              Mainnet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}