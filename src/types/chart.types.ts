
export interface PriceDataPoint {
    date: string; 
    price: number;
    timestamp?: number;
}


export interface VolumeDataPoint {
    date: string;
    volume: number;
    change?: number; 
    changePercent?: number;
}

export interface StockHistoricalData {
    ticker: string;
    companyName: string;
    priceData: PriceDataPoint[];
    volumeData: VolumeDataPoint[];
    lastUpdated: string;
}

export interface ChartConfig {
    title?: string;
    height?: number;
    showLegend?: boolean;
    showGrid?: boolean;
    dateFormat?: string;
}