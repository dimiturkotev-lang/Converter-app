// ==========================================
// Unit Converter - Main Application
// ==========================================

// Conversion factors (base unit: meters)
const CONVERSION_FACTORS = {
    length: {
        m: 1,
        cm: 0.01,
        inch: 0.0254,
        mile: 1609.34
    }
};

class UnitConverter {
    constructor() {
        this.currentConverter = 'length';
        this.initializeEventListeners();
        this.initializeLengthConverter();
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
