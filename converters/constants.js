// ==========================================
// Conversion Constants and Rates
// ==========================================

// Conversion factors (base unit: meters for length)
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
