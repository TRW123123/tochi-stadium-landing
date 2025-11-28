// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    // The close button might be inside the overlay, let's check if we need to add one or if clicking links closes it.
    // The overlay has links that should close it.
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (mobileMenuToggle && mobileMenuOverlay) {
        // Open mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        // Close menu when clicking on links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });

        // Close menu with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenuOverlay.classList.contains('translate-x-full')) {
                mobileMenuOverlay.classList.add('translate-x-full');
                document.body.style.overflow = '';
            }
        });

        // Close on click outside (optional, but good UX)
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('translate-x-full');
                document.body.style.overflow = '';
            }
        });
    }
});
