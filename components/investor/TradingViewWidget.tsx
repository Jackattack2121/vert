'use client'

import { useEffect, useRef, useState, memo } from 'react'

interface TradingViewWidgetProps {
  symbol?: string
  width?: string
  height?: string
}

function TradingViewWidget({
  symbol = '', // No default - should be passed as prop for client companies
  width = '100%',
  height = '100%',
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasError, setHasError] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Calculate actual container dimensions
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    // Initial dimension calculation
    updateDimensions()

    // Create ResizeObserver to handle container size changes
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // Initialize TradingView widget with calculated dimensions
  useEffect(() => {
    const container = containerRef.current
    if (!container || dimensions.width === 0 || dimensions.height === 0) return

    const widgetContainer = document.createElement('div')
    widgetContainer.className = 'tradingview-widget-container__widget'
    container.appendChild(widgetContainer)

    // TradingView widget configuration with enhanced styling
    const widgetConfig = {
      lineWidth: 2,
      lineType: 0,
      chartType: 'area',
      fontColor: 'rgb(106, 109, 120)',
      gridLineColor: 'rgba(46, 46, 46, 0.06)',
      volumeUpColor: 'rgba(34, 171, 148, 0.5)',
      volumeDownColor: 'rgba(247, 82, 95, 0.5)',
      backgroundColor: '#ffffff',
      widgetFontColor: 'rgba(49, 121, 245, 1)',
      upColor: '#22ab94',
      downColor: '#f7525f',
      borderUpColor: '#22ab94',
      borderDownColor: '#f7525f',
      wickUpColor: '#22ab94',
      wickDownColor: '#f7525f',
      colorTheme: 'light',
      isTransparent: true,
      locale: 'en',
      chartOnly: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      symbols: [[symbol]],
      dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
      fontSize: '10',
      headerFontSize: 'medium',
      autosize: false,
      dateFormat: 'qq yyyy',
      width: dimensions.width,
      height: dimensions.height,
      noTimeScale: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
    }

    // Create script element
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify(widgetConfig)

    // Handle script load error
    script.onerror = () => {
      console.error('Failed to load TradingView widget')
      setHasError(true)
    }

    // Append script to widget container
    widgetContainer.appendChild(script)

    // Cleanup function
    return () => {
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild)
        }
      }
    }
  }, [symbol, dimensions.width, dimensions.height])

  // Fallback UI if widget fails to load
  // Extract ASX code from symbol for links (e.g., 'ASX:CODE|1M|AUD' -> 'CODE')
  const asxCode = symbol ? symbol.split(':')[1]?.split('|')[0] : ''

  if (hasError || !symbol) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-2">Live market data unavailable</p>
        {asxCode && (
          <a
            href={`https://www.asx.com.au/markets/company/${asxCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline font-semibold"
          >
            View share price on ASX →
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ width, height }}>
      {/* Widget container is created dynamically in useEffect */}
      <div className="tradingview-widget-copyright">
        {asxCode && (
          <a 
            href={`https://www.tradingview.com/symbols/ASX-${asxCode}/`} 
            rel="noopener nofollow" 
            target="_blank"
          >
            <span className="blue-text">{asxCode} stock price</span>
          </a>
        )}
        <span className="trademark">&nbsp;by TradingView</span>
      </div>
    </div>
  )
}

export default memo(TradingViewWidget)
