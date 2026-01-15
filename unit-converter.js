// ==========================================
// Unit Converter - Main Application
// ==========================================

// Conversion factors (base unit: meters for length, Celsius for temperature)
const CONVERSION_FACTORS = {
    length: {
        m: 1,
        cm: 0.01,
        inch: 0.0254,
        mile: 1609.34
    }
};

// Temperature conversion functions (base unit: Celsius)
const TEMPERATURE_CONVERTERS = {
    c: (value) => value, // Celsius is base
    f: (celsius) => (celsius * 9/5) + 32, // Celsius to Fahrenheit
    k: (celsius) => celsius + 273.15 // Celsius to Kelvin
};

const TEMPERATURE_TO_CELSIUS = {
    c: (value) => value, // Celsius is base
    f: (fahrenheit) => (fahrenheit - 32) * 5/9, // Fahrenheit to Celsius
    k: (kelvin) => kelvin - 273.15 // Kelvin to Celsius
};

// Currency conversion rates (base unit: USD)
const CURRENCY_RATES = {
    usd: 1,
    eur: 0.92,
    gbp: 0.79
};

class UnitConverter {
    constructor() {
        this.currentConverter = 'length';
        this.initializeEventListeners();
        this.initializeLengthConverter();
        this.initializeTemperatureConverter();
        this.initializeCurrencyConverter();
    }

    /**
     * Initialize event listeners for navigation
     */
    initializeEventListeners() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchConverter(link.getAttribute('data-converter'));
            });
        });
    }

    /**
     * Initialize length converter event listeners and conversions
     */
    initializeLengthConverter() {
        const lengthInput = document.getElementById('lengthInput');
        const lengthFromUnit = document.getElementById('lengthFromUnit');
        const lengthToUnit = document.getElementById('lengthToUnit');

        if (lengthInput && lengthFromUnit && lengthToUnit) {
            // Add event listeners for real-time conversion
            lengthInput.addEventListener('input', () => this.convertLength());
            lengthFromUnit.addEventListener('change', () => this.convertLength());
            lengthToUnit.addEventListener('change', () => this.convertLength());

            // Perform initial conversion
            this.convertLength();
        }
    }

    /**
     * Convert length values between different units
     */
    convertLength() {
        const inputValue = parseFloat(document.getElementById('lengthInput').value);
        const fromUnit = document.getElementById('lengthFromUnit').value;
        const toUnit = document.getElementById('lengthToUnit').value;

        if (isNaN(inputValue) || inputValue === '') {
            document.getElementById('lengthResult').textContent = '0';
            document.getElementById('lengthInputDisplay').textContent = '0';
            return;
        }

        // Convert from source unit to meters, then to target unit
        const valueInMeters = inputValue * CONVERSION_FACTORS.length[fromUnit];
        const result = valueInMeters / CONVERSION_FACTORS.length[toUnit];

        // Update result display
        document.getElementById('lengthInputDisplay').textContent = inputValue;
        document.getElementById('lengthResult').textContent = result.toFixed(6).replace(/\.?0+$/, '');
        document.getElementById('lengthFromUnitDisplay').textContent = fromUnit;
        document.getElementById('lengthToUnitDisplay').textContent = toUnit;
    }

    /**
     * Initialize temperature converter event listeners and conversions
     */
    initializeTemperatureConverter() {
        const temperatureInput = document.getElementById('temperatureInput');
        const temperatureFromUnit = document.getElementById('temperatureFromUnit');
        const temperatureToUnit = document.getElementById('temperatureToUnit');

        if (temperatureInput && temperatureFromUnit && temperatureToUnit) {
            // Add event listeners for real-time conversion
            temperatureInput.addEventListener('input', () => this.convertTemperature());
            temperatureFromUnit.addEventListener('change', () => this.convertTemperature());
            temperatureToUnit.addEventListener('change', () => this.convertTemperature());

            // Perform initial conversion
            this.convertTemperature();
        }
    }

    /**
     * Convert temperature values between different units
     */
    convertTemperature() {
        const inputValue = parseFloat(document.getElementById('temperatureInput').value);
        const fromUnit = document.getElementById('temperatureFromUnit').value;
        const toUnit = document.getElementById('temperatureToUnit').value;

        if (isNaN(inputValue)) {
            document.getElementById('temperatureResult').textContent = '0';
            document.getElementById('temperatureInputDisplay').textContent = '0';
            return;
        }

        // Convert from source unit to Celsius, then to target unit
        const valueInCelsius = TEMPERATURE_TO_CELSIUS[fromUnit](inputValue);
        const result = TEMPERATURE_CONVERTERS[toUnit](valueInCelsius);

        // Get unit display names
        const unitDisplayNames = {
            c: '°C',
            f: '°F',
            k: 'K'
        };

        // Update result display
        document.getElementById('temperatureInputDisplay').textContent = inputValue;
        document.getElementById('temperatureResult').textContent = result.toFixed(2);
        document.getElementById('temperatureFromUnitDisplay').textContent = unitDisplayNames[fromUnit];
        document.getElementById('temperatureToUnitDisplay').textContent = unitDisplayNames[toUnit];
    }

    /**
     * Initialize currency converter event listeners and conversions
     */
    initializeCurrencyConverter() {
        const currencyInput = document.getElementById('currencyInput');
        const currencyFromUnit = document.getElementById('currencyFromUnit');
        const currencyToUnit = document.getElementById('currencyToUnit');

        if (currencyInput && currencyFromUnit && currencyToUnit) {
            // Add event listeners for real-time conversion
            currencyInput.addEventListener('input', () => this.convertCurrency());
            currencyFromUnit.addEventListener('change', () => this.convertCurrency());
            currencyToUnit.addEventListener('change', () => this.convertCurrency());

            // Perform initial conversion
            this.convertCurrency();
        }
    }

    /**
     * Convert currency values between different units
     */
    convertCurrency() {
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

    /**
     * Switch between different converter sections
     * @param {string} converterType - The type of converter to switch to
     */
    switchConverter(converterType) {
        // Remove active class from all sections
        const allSections = document.querySelectorAll('.converter-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        const allNavLinks = document.querySelectorAll('.nav-link');
        allNavLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to selected section
        const selectedSection = document.getElementById(converterType);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }

        // Add active class to selected nav link
        const selectedNavLink = document.querySelector(`[data-converter="${converterType}"]`);
        if (selectedNavLink) {
            selectedNavLink.classList.add('active');
        }

        this.currentConverter = converterType;
        console.log(`Switched to ${converterType} converter`);
    }

    /**
     * Get the current active converter
     * @returns {string} The current converter type
     */
    getCurrentConverter() {
        return this.currentConverter;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new UnitConverter();
    console.log('Unit Converter App initialized');
});
