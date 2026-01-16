
        document.addEventListener('DOMContentLoaded', () => {
            // --- Navigation Dropdown Logic ---
            const coursesLink = document.getElementById('courses-link');
            const submenu = document.getElementById('courses-submenu');
            const navBar = document.getElementById('nav-bar');

            if (coursesLink && submenu && navBar) {
                coursesLink.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    submenu.classList.toggle('active');
                    e.stopPropagation(); 
                });

                document.addEventListener('click', (e) => {
                    if (!navBar.contains(e.target)) {
                        submenu.classList.remove('active');
                    }
                });

                submenu.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            // --- Mobile Menu Logic (With Fix) ---
            const mobileToggle = document.getElementById('mobile-menu-toggle');
            const navMenu = document.getElementById('nav-menu');
            const toggleIcon = document.getElementById('toggle-icon');

            if (mobileToggle && navMenu && toggleIcon) {
                mobileToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navMenu.classList.toggle('mobile-open');
                    
                    if (navMenu.classList.contains('mobile-open')) {
                        toggleIcon.classList.remove('fa-bars');
                        toggleIcon.classList.add('fa-xmark');
                        document.body.style.overflow = 'hidden';
                    } else {
                        toggleIcon.classList.remove('fa-xmark');
                        toggleIcon.classList.add('fa-bars');
                        document.body.style.overflow = 'auto';
                        if (submenu) submenu.classList.remove('active');
                    }
                });
                
                navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth <= 980) { // UPDATED: Changed from 768 to 980
                            // FIX: Do not close menu if clicking the "Courses" toggle (courses-link)
                            // or if clicking a link inside the submenu
                            if (!link.classList.contains('submenu-link') && link.id !== 'courses-link') {
                                navMenu.classList.remove('mobile-open');
                                toggleIcon.classList.remove('fa-xmark');
                                toggleIcon.classList.add('fa-bars');
                                document.body.style.overflow = 'auto';
                            }
                        }
                    });
                });
                
                document.addEventListener('click', (e) => {
                    if (window.innerWidth <= 980 && // UPDATED: Changed from 768 to 980
                        navMenu.classList.contains('mobile-open') &&
                        !navMenu.contains(e.target) && 
                        e.target !== mobileToggle) {
                        navMenu.classList.remove('mobile-open');
                        toggleIcon.classList.remove('fa-xmark');
                        toggleIcon.classList.add('fa-bars');
                        document.body.style.overflow = 'auto';
                        if (submenu) submenu.classList.remove('active');
                    }
                });
            }



            // --- Tab Layout / Filter Logic ---
            const filterButtons = document.querySelectorAll('.filter-button');
            const contentItems = document.querySelectorAll('.tab-content-item');
            const visualItems = document.querySelectorAll('.tab-visual-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active to clicked
                    button.classList.add('active');

                    const filterValue = button.getAttribute('data-filter');

                    // Filter Content Items
                    contentItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === filterValue) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });

                    // Filter Visual Items
                    visualItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === filterValue) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                });
            });

        });






        // Winter Theme
    const now = new Date();
    const month = now.getMonth() + 1;
    
    if (month === 12 || month === 1 || month === 2) {
        const snow = document.createElement('div');
        snow.className = 'snowflakes-blurry';
        document.body.appendChild(snow);
    }


