import React from "react";

const ISO3_TO_ISO2: Record<string, string> = {
  DZA: "dz", AGO: "ao", BEN: "bj", BWA: "bw", BFA: "bf", BDI: "bi",
  CPV: "cv", CMR: "cm", CAF: "cf", TCD: "td", COM: "km", COG: "cg",
  COD: "cd", DJI: "dj", EGY: "eg", GNQ: "gq", ERI: "er", SWZ: "sz",
  ETH: "et", GAB: "ga", GMB: "gm", GHA: "gh", GIN: "gn", GNB: "gw",
  CIV: "ci", KEN: "ke", LSO: "ls", LBR: "lr", LBY: "ly", MDG: "mg",
  MWI: "mw", MLI: "ml", MRT: "mr", MUS: "mu", MAR: "ma", MOZ: "mz",
  NAM: "na", NER: "ne", NGA: "ng", RWA: "rw", STP: "st", SEN: "sn",
  SYC: "sc", SLE: "sl", SOM: "so", ZAF: "za", SSD: "ss", SDN: "sd",
  TZA: "tz", TGO: "tg", TUN: "tn", UGA: "ug", ZMB: "zm", ZWE: "zw"
};

interface FlagProps {
  code: string; // ISO3 or ISO2
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Flag: React.FC<FlagProps> = ({ code, className = "", size = "md" }) => {
  const upperCode = code.toUpperCase();
  const iso2 = ISO3_TO_ISO2[upperCode] || code.toLowerCase();
  
  const sizeMap = {
    sm: "w-4 h-3",
    md: "w-6 h-4.5",
    lg: "w-10 h-7.5",
    xl: "w-20 h-15"
  };

  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded-sm border border-black/5 shadow-xs ${sizeMap[size]} ${className}`}>
      <img 
        src={`https://flagcdn.com/w80/${iso2}.png`}
        alt={`${code} flag`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to a placeholder if flag fails to load
          (e.target as HTMLImageElement).src = `https://placehold.co/80x60/f0f0f0/999999?text=${code}`;
        }}
      />
    </div>
  );
};
