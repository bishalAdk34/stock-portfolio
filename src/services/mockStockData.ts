export interface StockPriceData {
    date: string;
    price: number;
}

export interface VolumeData {
    date: string;
    volume: number;
    gainLoss: number;
}

export const generateMockPriceData = (): StockPriceData[] => {
    const data: StockPriceData[] = [];
    const basePrice = 150;
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const randomChange = (Math.random() - 0.5) * 10;
        const price = basePrice + randomChange + (Math.sin(i / 5) * 5);

        data.push({
            date: date.toISOString().split('T')[0],
            price: parseFloat(price.toFixed(2)),
        });
    }

    return data;
};

export const generateMockVolumeData = (): VolumeData[] => {
    const data: VolumeData[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const volume = Math.floor(Math.random() * 4000000) + 1000000;
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
