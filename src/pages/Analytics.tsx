import { Box, Typography, Paper } from '@mui/material';

export const Analytics: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Detailed stock performance analysis
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                    Analytics charts will be implemented in next commits
                </Typography>
            </Paper>
        </Box>
    );
};