// ==========================================
// Currency Converter Module
// ==========================================

class CurrencyConverter {
    /**
     * Initialize currency converter event listeners
     */
    static initialize() {
        const currencyInput = document.getElementById('currencyInput');
        const currencyFromUnit = document.getElementById('currencyFromUnit');
        const currencyToUnit = document.getElementById('currencyToUnit');

        if (currencyInput && currencyFromUnit && currencyToUnit) {
            // Add event listeners for real-time conversion
            currencyInput.addEventListener('input', () => CurrencyConverter.convert());
            currencyFromUnit.addEventListener('change', () => CurrencyConverter.convert());
            currencyToUnit.addEventListener('change', () => CurrencyConverter.convert());

            // Perform initial conversion
            CurrencyConverter.convert();
        }
    }

    /**
     * Convert currency values between different units
     */
    static convert() {
        const inputValue = parseFloat(document.getElementById('currencyInput').value);
        const fromCurrency = document.getElementById('currencyFromUnit').value;
        const toCurrency = document.getElementById('currencyToUnit').value;

        if (isNaN(inputValue) || inputValue === '') {
            document.getElementById('currencyResult').textContent = '0';
            document.getElementById('currencyInputDisplay').textContent = '0';
            return;
        }

        // Convert from source currency to USD, then to target currency
        const valueInUSD = inputValue / CURRENCY_RATES[fromCurrency];
        const result = valueInUSD * CURRENCY_RATES[toCurrency];

        // Get currency display names
        const currencyDisplayNames = {
            usd: 'USD',
            eur: 'EUR',
            gbp: 'GBP'
        };

        // Update result display
        document.getElementById('currencyInputDisplay').textContent = inputValue;
        document.getElementById('currencyResult').textContent = result.toFixed(2);
        document.getElementById('currencyFromUnitDisplay').textContent = currencyDisplayNames[fromCurrency];
        document.getElementById('currencyToUnitDisplay').textContent = currencyDisplayNames[toCurrency];
    }
}
