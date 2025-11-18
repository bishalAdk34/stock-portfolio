
import { Box, Typography, Paper } from '@mui/material';

export const Portfolio: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                My Portfolio
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Manage your stock investments
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                    Portfolio table will be implemented in next commits
                </Typography>
            </Paper>
        </Box>
    );
};