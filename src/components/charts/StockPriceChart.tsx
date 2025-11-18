import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, CircularProgress, Typography } from '@mui/material';

interface StockPriceChartProps {
    data: { date: string; price: number }[];
    isLoading?: boolean;
}

export const StockPriceChart: React.FC<StockPriceChartProps> = ({ data, isLoading }) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        if (chartRef.current && data.length > 0) {
            chartRef.current.chart.reflow();
        }
    }, [data]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    height: 350,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box
                sx={{
                    height: 350,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography color="text.secondary">No data available</Typography>
            </Box>
        );
    }

    const options: Highcharts.Options = {
        chart: {
            type: 'line',
            height: 350,
            backgroundColor: 'transparent',
        },
        title: {
            text: undefined,
        },
        xAxis: {
            categories: data.map(item => item.date),
            labels: {
                rotation: -45,
                style: {
                    fontSize: '10px',
                },
            },
            tickInterval: Math.floor(data.length / 6), 
        },
        yAxis: {
            title: {
                text: 'Price ($)',
            },
            gridLineColor: '#e0e0e0',
        },
        series: [
            {
                type: 'line',
                name: 'Stock Price',
                data: data.map(item => item.price),
                color: '#1976d2',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 4,
                        },
                    },
                },
                lineWidth: 2,
            },
        ],
        tooltip: {
            shared: true,
            formatter: function (this: any) {
                const index = this.point?.index ?? this.index ?? 0;
                const date = data[index]?.date || '';
                const yVal = this.y ?? this.point?.y;
                const price = yVal != null ? yVal.toFixed(2) : '0.00';
                return `<b>${date}</b><br/>Price: $${price}`;
            },
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            line: {
                animation: {
                    duration: 1000,
                },
            },
        },
    };

    return (
        <Box sx={{ width: '100%' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
            />
        </Box>
    );
};
