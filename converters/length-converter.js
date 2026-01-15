// ==========================================
// Length Converter Module
// ==========================================

class LengthConverter {
    /**
     * Initialize length converter event listeners
     */
    static initialize() {
        const lengthInput = document.getElementById('lengthInput');
        const lengthFromUnit = document.getElementById('lengthFromUnit');
        const lengthToUnit = document.getElementById('lengthToUnit');

        if (lengthInput && lengthFromUnit && lengthToUnit) {
            // Add event listeners for real-time conversion
            lengthInput.addEventListener('input', () => LengthConverter.convert());
            lengthFromUnit.addEventListener('change', () => LengthConverter.convert());
            lengthToUnit.addEventListener('change', () => LengthConverter.convert());

            // Perform initial conversion
            LengthConverter.convert();
        }
    }

    /**
     * Convert length values between different units
     */
    static convert() {
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
}
