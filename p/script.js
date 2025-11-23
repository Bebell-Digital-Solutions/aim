document.addEventListener('DOMContentLoaded', () => {
            // --- Back to Top Button Logic ---
            const toTopButton = document.getElementById('back-to-top');
            
            window.onscroll = function() {
                if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                    toTopButton.classList.add('show');
                } else {
                    toTopButton.classList.remove('show');
                }
            };

            toTopButton.onclick = function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // --- Dropdown Menu Click Logic (Courses Submenu) ---
            const coursesLink = document.getElementById('courses-link');
            const coursesSubmenu = document.getElementById('courses-submenu');
            const navBar = document.getElementById('nav-bar');

            // 1. Toggle Courses Submenu visibility on click
            coursesLink.addEventListener('click', (e) => {
                e.preventDefault(); 
                coursesSubmenu.classList.toggle('active');
                e.stopPropagation(); 
            });

            // --- Mobile Menu Toggle Logic (Full Screen Overlay) ---
            const mobileToggle = document.getElementById('mobile-menu-toggle');
            const navMenu = document.getElementById('nav-menu');
            const mobileIcon = document.getElementById('mobile-menu-icon');

            // Toggle main mobile menu visibility
            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpening = !navMenu.classList.contains('mobile-open');
                
                navMenu.classList.toggle('mobile-open', isOpening);

                // Toggle icon: bars to X, or X to bars
                mobileIcon.classList.toggle('fa-bars', !isOpening);
                mobileIcon.classList.toggle('fa-xmark', isOpening);
                
                // Prevent body scrolling when menu is open
                document.body.style.overflow = isOpening ? 'hidden' : '';

                // If opening, ensure courses submenu is closed by default
                if (isOpening) {
                    coursesSubmenu.classList.remove('active');
                }
            });


            // 2. Global Close Handler: Close both the Courses Submenu and the Mobile Menu
            document.addEventListener('click', (e) => {
                // If the mobile menu overlay is open and click is outside the fixed header, close it
                if (navMenu.classList.contains('mobile-open') && !navBar.contains(e.target)) {
                    navMenu.classList.remove('mobile-open');
                    mobileIcon.classList.remove('fa-xmark');
                    mobileIcon.classList.add('fa-bars');
                    document.body.style.overflow = ''; // Restore scrolling
                    coursesSubmenu.classList.remove('active'); // Close submenu too
                }
                // Handle closing the courses submenu if the main menu is NOT open (desktop scenario)
                else if (coursesSubmenu.classList.contains('active') && !coursesLink.contains(e.target) && !coursesSubmenu.contains(e.target)) {
                    coursesSubmenu.classList.remove('active');
                }
            });

            // 3. Prevent clicks inside the Courses Submenu from closing it immediately
            coursesSubmenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });









