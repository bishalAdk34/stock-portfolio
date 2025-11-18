export interface StockPriceData {
    date: string;
    price: number;
}

export interface VolumeData {
    date: string;
    volume: number;
    gainLoss: number;
}

// Generate mock stock price data for the last 30 days
export const generateMockPriceData = (): StockPriceData[] => {
    const data: StockPriceData[] = [];
    const basePrice = 150;
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Random price fluctuation
        const randomChange = (Math.random() - 0.5) * 10;
        const price = basePrice + randomChange + (Math.sin(i / 5) * 5);
        
        data.push({
            date: date.toISOString().split('T')[0],
            price: parseFloat(price.toFixed(2)),
        });
    }

    return data;
};

// Generate mock volume data for the last 30 days
export const generateMockVolumeData = (): VolumeData[] => {
    const data: VolumeData[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Random volume between 1M and 5M
        const volume = Math.floor(Math.random() * 4000000) + 1000000;
        
        // Random gain/loss between -5% and +5%
        const gainLoss = (Math.random() - 0.5) * 10;
        
        data.push({
            date: date.toISOString().split('T')[0],
            volume,
            gainLoss: parseFloat(gainLoss.toFixed(2)),
        });
    }

    return data;
};

export const fetchStockPriceData = async (): Promise<StockPriceData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockPriceData();
};

export const fetchVolumeData = async (): Promise<VolumeData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockVolumeData();
};
