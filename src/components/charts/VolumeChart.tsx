import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, CircularProgress, Typography } from '@mui/material';

interface VolumeChartProps {
    data: { date: string; volume: number; gainLoss: number }[];
    isLoading?: boolean;
}

export const VolumeChart: React.FC<VolumeChartProps> = ({ data, isLoading }) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        // Update chart when data changes
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
            type: 'column',
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
            tickInterval: Math.floor(data.length / 6), // Show ~6 labels
        },
        yAxis: [
            {
                title: {
                    text: 'Volume',
                },
                gridLineColor: '#e0e0e0',
            },
            {
                title: {
                    text: 'Gain/Loss (%)',
                },
                opposite: true,
                gridLineColor: 'transparent',
            },
        ],
        series: [
            {
                type: 'column',
                name: 'Volume',
                data: data.map(item => item.volume),
                color: '#9c27b0',
                yAxis: 0,
            },
            {
                type: 'line',
                name: 'Gain/Loss %',
                data: data.map(item => item.gainLoss),
                color: '#ff9800',
                yAxis: 1,
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
            formatter: function () {
                const index = this.points?.[0]?.index ?? 0;
                const date = data[index]?.date || '';
                let tooltip = `<b>${date}</b><br/>`;
                
                this.points?.forEach(point => {
                    if (point.series.name === 'Volume') {
                        tooltip += `Volume: ${(point.y ?? 0).toLocaleString()}<br/>`;
                    } else {
                        const value = point.y ?? 0;
                        const sign = value >= 0 ? '+' : '';
                        tooltip += `Gain/Loss: ${sign}${value.toFixed(2)}%<br/>`;
                    }
                });
                
                return tooltip;
            },
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
        },
        plotOptions: {
            column: {
                animation: {
                    duration: 1000,
                },
                borderRadius: 4,
            },
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
