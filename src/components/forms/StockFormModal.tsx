import { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockFormSchema, type StockFormInput } from '../../schemas/stockSchema';
import type { Stock, StockFormData } from '../../types/stock.types';

interface StockFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: StockFormData) => void;
    stock?: Stock;
    mode: 'add' | 'edit';
}

export const StockFormModal: React.FC<StockFormModalProps> = ({
    open,
    onClose,
    onSubmit,
    stock,
    mode,
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<StockFormInput>({
        resolver: zodResolver(stockFormSchema),
        defaultValues: stock
            ? {
                  ticker: stock.ticker,
                  companyName: stock.companyName,
                  quantity: stock.quantity,
                  purchasePrice: stock.purchasePrice,
                  currentPrice: stock.currentPrice,
                  dateOfPurchase: stock.dateOfPurchase,
              }
            : {
                  ticker: '',
                  companyName: '',
                  quantity: 1,
                  purchasePrice: 0,
                  currentPrice: undefined,
                  dateOfPurchase: new Date().toISOString().split('T')[0],
              },
    });

    useEffect(() => {
        reset(
            stock
                ? {
                      ticker: stock.ticker,
                      companyName: stock.companyName,
                      quantity: stock.quantity,
                      purchasePrice: stock.purchasePrice,
                      currentPrice: stock.currentPrice,
                      dateOfPurchase: stock.dateOfPurchase,
                }
                : {
                      ticker: '',
                      companyName: '',
                      quantity: 1,
                      purchasePrice: 0,
                      currentPrice: undefined,
                      dateOfPurchase: new Date().toISOString().split('T')[0],
                  }
        );
    }, [stock, mode, reset]);

    const handleFormSubmit = (data: StockFormInput) => {
        onSubmit(data as StockFormData);
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {mode === 'add' ? 'Add New Stock' : 'Edit Stock'}
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                        <Controller
                            name="ticker"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ticker Symbol"
                                    fullWidth
                                    error={!!errors.ticker}
                                    helperText={errors.ticker?.message}
                                    placeholder="e.g., AAPL"
                                    autoFocus
                                />
                            )}
                        />

                        <Controller
                            name="companyName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Company Name"
                                    fullWidth
                                    error={!!errors.companyName}
                                    helperText={errors.companyName?.message}
                                    placeholder="e.g., Apple Inc."
                                />
                            )}
                        />

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <TextField
                                            {...field}
                                            value={value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                onChange(val === '' ? 0 : Number(val));
                                            }}
                                            label="Quantity"
                                            type="number"
                                            fullWidth
                                            error={!!errors.quantity}
                                            helperText={errors.quantity?.message}
                                            inputProps={{ min: 1, step: 1 }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="dateOfPurchase"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <DatePicker
                                            {...field}
                                            label="Date of Purchase"
                                            value={value ? dayjs(value) : null}
                                            onChange={(newValue: Dayjs | null) => {
                                                onChange(newValue ? newValue.format('YYYY-MM-DD') : '');
                                            }}
                                            maxDate={dayjs()}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: !!errors.dateOfPurchase,
                                                    helperText: errors.dateOfPurchase?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="purchasePrice"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <TextField
                                            {...field}
                                            value={value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                onChange(val === '' ? 0 : Number(val));
                                            }}
                                            label="Purchase Price"
                                            type="number"
                                            fullWidth
                                            error={!!errors.purchasePrice}
                                            helperText={errors.purchasePrice?.message}
                                            inputProps={{ min: 0.01, step: 0.01 }}
                                            placeholder="0.00"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="currentPrice"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <TextField
                                            {...field}
                                            value={value ?? ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                onChange(val === '' ? undefined : Number(val));
                                            }}
                                            label="Current Price (Optional)"
                                            type="number"
                                            fullWidth
                                            error={!!errors.currentPrice}
                                            helperText={
                                                errors.currentPrice?.message ||
                                                'Leave empty to use purchase price'
                                            }
                                            inputProps={{ min: 0.01, step: 0.01 }}
                                            placeholder="0.00"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                    >
                        {mode === 'add' ? 'Add Stock' : 'Update Stock'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
