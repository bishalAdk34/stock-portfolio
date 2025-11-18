import { z } from 'zod';

export const stockFormSchema = z.object({
    ticker: z
        .string()
        .min(1, 'Ticker is required')
        .max(10, 'Ticker must be 10 characters or less')
        .regex(/^[A-Z0-9]+$/, 'Ticker must contain only uppercase letters and numbers')
        .transform((val) => val.toUpperCase()),
    
    companyName: z
        .string()
        .min(1, 'Company name is required')
        .max(100, 'Company name must be 100 characters or less'),
    
    quantity: z
        .number({ message: 'Quantity must be a number' })
        .int('Quantity must be a whole number')
        .positive('Quantity must be greater than 0')
        .min(1, 'Quantity must be at least 1'),
    
    purchasePrice: z
        .number({ message: 'Purchase price must be a number' })
        .positive('Purchase price must be greater than 0')
        .min(0.01, 'Purchase price must be at least $0.01'),
    
    currentPrice: z
        .number({ message: 'Current price must be a number' })
        .positive('Current price must be greater than 0')
        .min(0.01, 'Current price must be at least $0.01')
        .optional(),
    
    dateOfPurchase: z
        .string()
        .min(1, 'Date of purchase is required')
        .refine((date) => {
            const purchaseDate = new Date(date);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            return purchaseDate <= today;
        }, 'Date of purchase cannot be in the future'),
});

export type StockFormInput = z.infer<typeof stockFormSchema>;
