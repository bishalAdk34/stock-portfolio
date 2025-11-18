import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography } from '@mui/material';

interface StockPriceChartProps {
    data: Array<{ date: string; price: number }>;
}

export const StockPriceChart: React.FC<StockPriceChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
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
            categories: data.map(d => d.date),
            crosshair: true,
            labels: {
                rotation: -45,
                style: {
                    fontSize: '10px',
                },
            },
            tickInterval: Math.max(1, Math.floor(data.length / 6)),
        },
        yAxis: {
            title: {
                text: 'Stock Price ($)',
            },
            gridLineColor: '#e0e0e0',
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: 'Price: ${point.y:.2f}',
            shared: false,
        },
        plotOptions: {
            line: {
                animation: {
                    duration: 1000,
                },
                dataLabels: {
                    enabled: false,
                },
            },
        },
        series: [
            {
                name: 'Stock Price Trend',
                data: data.map(d => d.price),
                type: 'line',
                color: '#1976d2',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 5,
                        },
                    },
                },
                lineWidth: 2,
            },
        ],
        credits: {
            enabled: false,
        },
        legend: {
            enabled: true,
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};
