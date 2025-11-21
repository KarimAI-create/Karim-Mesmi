import React, { useEffect } from 'react';
import { AdFormat } from '../types';

interface AdUnitProps {
  format: AdFormat;
  slotId: string; // This would be your data-ad-slot ID from Google AdSense
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ format, slotId, className = '' }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Dimensions for placeholder
  let dimensions = "w-full h-24"; // Banner default
  if (format === AdFormat.Rectangle) dimensions = "w-[300px] h-[250px]";
  if (format === AdFormat.Vertical) dimensions = "w-[160px] h-[600px]";

  useEffect(() => {
    if (isProduction) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, [isProduction]);

  return (
    <div className={`flex justify-center items-center my-4 ${className}`}>
      {isProduction ? (
        /* Actual AdSense Code Structure */
        <ins className="adsbygoogle block"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-4401807132031899" 
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      ) : (
        /* Development Placeholder */
        <div className={`${dimensions} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-gray-400 p-4 text-center`}>
          <span className="font-bold text-xs uppercase tracking-widest mb-1">Ad Space ({format})</span>
          <span className="text-xs">ID: {slotId}</span>
          <span className="text-[10px] mt-2 text-gray-400">Visible in Production</span>
        </div>
      )}
    </div>
  );
};