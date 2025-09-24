import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, ArrowLeft } from "lucide-react";
import CopyButton from "./CopyButton";

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

interface ResultCardProps {
  result: TokenResult;
  onCreateAnother: () => void;
}

export default function ResultCard({ result, onCreateAnother }: ResultCardProps) {
  const formatSupply = (supply: number, decimals: number) => {
    return new Intl.NumberFormat().format(supply / Math.pow(10, decimals));
  };

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <CheckCircle className="h-5 w-5" />
          Token Created Successfully!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Details */}
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{result.tokenName}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{result.tokenSymbol}</Badge>
              <Badge variant="outline">
                {result.network === "devnet" ? "Devnet" : "Mainnet"}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Supply</p>
              <p className="font-mono">{formatSupply(result.totalSupply, result.decimals)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Decimals</p>
              <p className="font-mono">{result.decimals}</p>
            </div>
          </div>
        </div>

        {/* Mint Address */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Token Mint Address</Label>
          <div className="flex items-center gap-2 p-3 bg-card border rounded-md">
            <code className="flex-1 text-sm font-mono break-all">
              {result.mintAddress}
            </code>
            <CopyButton text={result.mintAddress} data-testid="copy-mint-address" />
          </div>
        </div>

        {/* Transaction Signature */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Transaction Signature</Label>
          <div className="flex items-center gap-2 p-3 bg-card border rounded-md">
            <code className="flex-1 text-sm font-mono break-all">
              {result.transactionSignature}
            </code>
            <CopyButton text={result.transactionSignature} data-testid="copy-transaction" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(result.explorerUrl, '_blank')}
            data-testid="button-view-explorer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Solscan
          </Button>
          <Button
            variant="default"
            className="flex-1"
            onClick={onCreateAnother}
            data-testid="button-create-another"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create Another Token
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}