'use client';

import { useEffect } from 'react';

export default function SharePriceWidget() {
  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [['ASX:YUG']],
      chartOnly: false,
      width: '100%',
      height: '400',
      locale: 'en',
      colorTheme: 'light',
      autosize: false,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      maLineColor: '#2962FF',
      maLineWidth: 1,
      maLength: 9,
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M']
    });

    const container = document.getElementById('tradingview-widget');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Share Price</h2>
        <p className="text-sm text-gray-600 mt-1">ASX:YUG - Real-time market data</p>
      </div>

      <div className="p-6">
        <div id="tradingview-widget" className="tradingview-widget-container">
          <div className="flex items-center justify-center h-96 text-gray-400">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p>Loading chart...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
