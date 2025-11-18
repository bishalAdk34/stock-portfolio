
import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance, ShowChart } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { usePortfolioStore } from '../store/portfolioStore';
import { StockPriceChart } from '../components/charts/StockPriceChart';
import { VolumeChart } from '../components/charts/VolumeChart';
import { fetchStockPriceData, fetchVolumeData } from '../services/mockStockData';

export const Dashboard: React.FC = () => {
    const { stocks, getPortfolioSummary } = usePortfolioStore();
    const summary = getPortfolioSummary();

    const { data: priceData = [], isLoading: isPriceLoading } = useQuery({
        queryKey: ['stockPrice'],
        queryFn: fetchStockPriceData,
    });

    const { data: volumeData = [], isLoading: isVolumeLoading } = useQuery({
        queryKey: ['volumeData'],
        queryFn: fetchVolumeData,
    });

    const statCards = [
        {
            title: 'Total Value',
            value: `$${summary.totalValue.toFixed(2)}`,
            icon: <AccountBalance sx={{ fontSize: 40 }} />,
            color: '#1976d2',
        },
        {
            title: 'Total Stocks',
            value: summary.totalStocks,
            icon: <ShowChart sx={{ fontSize: 40 }} />,
            color: '#9c27b0',
        },
        {
            title: 'Total Gain/Loss',
            value: `$${summary.totalGainLoss.toFixed(2)}`,
            icon: summary.totalGainLoss >= 0
                ? <TrendingUp sx={{ fontSize: 40 }} />
                : <TrendingDown sx={{ fontSize: 40 }} />,
            color: summary.totalGainLoss >= 0 ? '#2e7d32' : '#d32f2f',
        },
        {
            title: 'Gain/Loss %',
            value: `${summary.totalGainLossPercentage.toFixed(2)}%`,
            icon: summary.totalGainLossPercentage >= 0
                ? <TrendingUp sx={{ fontSize: 40 }} />
                : <TrendingDown sx={{ fontSize: 40 }} />,
            color: summary.totalGainLossPercentage >= 0 ? '#2e7d32' : '#d32f2f',
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Portfolio Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Welcome to your stock portfolio management system
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statCards.map((stat, index) => (
                    <Grid xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h5" fontWeight={600} color={stat.color}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ color: stat.color }}>
                                        {stat.icon}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>
                            Stock Price Trends
                        </Typography>
                        <StockPriceChart data={priceData} isLoading={isPriceLoading} />
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>
                            Volume Analysis
                        </Typography>
                        <VolumeChart data={volumeData} isLoading={isVolumeLoading} />
                    </Paper>
                </Grid>
            </Grid>

            {stocks.length === 0 && (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No stocks in portfolio yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Go to Portfolio page to add your first stock
                    </Typography>
                </Box>
            )}
        </Box>
    );
};