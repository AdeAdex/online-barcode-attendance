//  /scr/react-qr-scanner.d.ts


declare module "react-qr-scanner" {
  import * as React from "react";

  interface QrScannerProps {
    delay?: number;
    onError?: (error: any) => void;
    onScan?: (result: any) => void;
    style?: React.CSSProperties;
    facingMode?: string;
    legacyMode?: boolean;
    maxImageSize?: number;
    className?: string;
  }

  const QrScanner: React.FC<QrScannerProps>;

  export default QrScanner;
}
