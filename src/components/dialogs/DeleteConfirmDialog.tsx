import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import type { Stock } from '../../types/stock.types';

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    stock: Stock | null;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    stock,
}) => {
    if (!stock) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningIcon color="error" />
                    <Typography variant="h6">Delete Stock</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to delete this stock from your portfolio?
                </Typography>
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: 'grey.100',
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        <strong>Ticker:</strong> {stock.ticker}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Company:</strong> {stock.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Quantity:</strong> {stock.quantity}
                    </Typography>
                </Box>
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
