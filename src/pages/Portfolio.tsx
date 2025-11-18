
import { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { usePortfolioStore } from '../store/portfolioStore';
import { PortfolioTable } from '../components/tables/PortfolioTable';
import { StockFormModal } from '../components/forms/StockFormModal';
import { DeleteConfirmDialog } from '../components/dialogs/DeleteConfirmDialog';
import type { Stock, StockFormData } from '../types/stock.types';

export const Portfolio: React.FC = () => {
    const { stocks, addStock, editStock, deleteStock } = usePortfolioStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const handleAddStock = (data: StockFormData) => {
        addStock(data);
        setSnackbar({
            open: true,
            message: `${data.ticker} added successfully!`,
            severity: 'success',
        });
    };

    const handleEditClick = (stock: Stock) => {
        setSelectedStock(stock);
        setIsEditModalOpen(true);
    };

    const handleEditStock = (data: StockFormData) => {
        if (selectedStock) {
            editStock(selectedStock.id, data);
            setSnackbar({
                open: true,
                message: `${data.ticker} updated successfully!`,
                severity: 'success',
            });
            setSelectedStock(null);
        }
    };

    const handleDeleteClick = (stock: Stock) => {
        setSelectedStock(stock);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedStock) {
            deleteStock(selectedStock.id);
            setSnackbar({
                open: true,
                message: `${selectedStock.ticker} deleted successfully!`,
                severity: 'success',
            });
            setIsDeleteDialogOpen(false);
            setSelectedStock(null);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h4" gutterBottom fontWeight={600}>
                        My Portfolio
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your stock investments
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddModalOpen(true)}
                    size="large"
                >
                    Add Stock
                </Button>
            </Box>

            <PortfolioTable
                stocks={stocks}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />

            <StockFormModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddStock}
                mode="add"
            />

            <StockFormModal
                open={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedStock(null);
                }}
                onSubmit={handleEditStock}
                stock={selectedStock ?? undefined}
                mode="edit"
            />

            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedStock(null);
                }}
                onConfirm={handleDeleteConfirm}
                stock={selectedStock}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};