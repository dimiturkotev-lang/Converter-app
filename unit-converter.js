// ==========================================
// Unit Converter - Main Application
// ==========================================

class UnitConverter {
    constructor() {
        this.currentConverter = 'length';
        this.initializeEventListeners();
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
