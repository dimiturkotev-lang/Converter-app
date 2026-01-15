// ==========================================
// Temperature Converter Module
// ==========================================

class TemperatureConverter {
    /**
     * Initialize temperature converter event listeners
     */
    static initialize() {
        const temperatureInput = document.getElementById('temperatureInput');
        const temperatureFromUnit = document.getElementById('temperatureFromUnit');
        const temperatureToUnit = document.getElementById('temperatureToUnit');

        if (temperatureInput && temperatureFromUnit && temperatureToUnit) {
            // Add event listeners for real-time conversion
            temperatureInput.addEventListener('input', () => TemperatureConverter.convert());
            temperatureFromUnit.addEventListener('change', () => TemperatureConverter.convert());
            temperatureToUnit.addEventListener('change', () => TemperatureConverter.convert());

            // Perform initial conversion
            TemperatureConverter.convert();
        }
    }

    /**
     * Convert temperature values between different units
     */
    static convert() {
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
}
