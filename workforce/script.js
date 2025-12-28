
  document.addEventListener('DOMContentLoaded', () => {
            // --- Page Loader Logic ---
            function showLoader() {
                const loader = document.getElementById('loader');
                return loader;
            }

            function initLoader() {
                const loader = showLoader();
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 1500);
            }

            initLoader();

            // --- DOM Elements ---
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const iframe = document.getElementById('content-iframe');
            const sidebarNavButtons = document.querySelectorAll('.sidebar-nav-button');
            const agentInfoButtons = document.querySelectorAll('.agent-info-btn');
            const profileButton = document.getElementById('profile-button');
            const settingsModal = document.getElementById('settings-modal');
            const modalClose = document.getElementById('modal-close');
            const agentModalCloses = document.querySelectorAll('.agent-modal-close');
            const saveSettingsBtn = document.getElementById('save-settings-btn');
            const resetSettingsBtn = document.getElementById('reset-settings-btn');
            const greetingMessage = document.getElementById('greeting-message');
            const greetingSubtitle = document.getElementById('greeting-subtitle');
            const profileImage = document.getElementById('profile-image');
            const profilePreview = document.getElementById('profile-preview');
            const profileImageInput = document.getElementById('profile-image-input');
            const sidebarLogo = document.getElementById('sidebar-logo');
            const logoPreview = document.getElementById('logo-preview');
            const logoImageInput = document.getElementById('logo-image-input');
            const userNameInput = document.getElementById('user-name');
            const languageSelect = document.getElementById('language-select');
            const profileName = document.getElementById('profile-name');
            const primaryColorPicker = document.getElementById('primary-color');
            const sidebarColorPicker = document.getElementById('sidebar-color');
            const containerColorPicker = document.getElementById('container-color');
            const primaryColorValue = document.getElementById('primary-color-value');
            const sidebarColorValue = document.getElementById('sidebar-color-value');
            const containerColorValue = document.getElementById('container-color-value');
            const mainContent = document.getElementById('dashboard-main-content');
            
            // Agent modals
            const agentModals = {
                agent1: document.getElementById('agent1-modal'),
                agent2: document.getElementById('agent2-modal'),
                agent3: document.getElementById('agent3-modal'),
                agent4: document.getElementById('agent4-modal'),
                agent5: document.getElementById('agent5-modal'),
                agent6: document.getElementById('agent6-modal')
            };

            // Translation dictionary
            const translations = {
                en: {
                    greeting: (name) => `Hello ${name},`,
                    subtitle: "Welcome to your AI assistant dashboard. All systems are operational.",
                    profile: "User Profile",
                    modalTitle: "Profile Settings",
                    languageTitle: "Language",
                    profileTitle: "Profile",
                    logoTitle: "Logo",
                    colorsTitle: "Colors",
                    uploadProfile: "Upload",
                    uploadLogo: "Upload",
                    resetBtn: "Reset to Default",
                    saveBtn: "Save Changes",
                    sidebarSubtitle: "Meet your Intelligent Workforce."
                },
                es: {
                    greeting: (name) => `Hola ${name},`,
                    subtitle: "Bienvenido a tu panel de asistencia IA. Todos los sistemas están operativos.",
                    profile: "Perfil de Usuario",
                    modalTitle: "Configuración del Perfil",
                    languageTitle: "Idioma",
                    profileTitle: "Perfil",
                    logoTitle: "Logo",
                    colorsTitle: "Colores",
                    uploadProfile: "Subir",
                    uploadLogo: "Subir",
                    resetBtn: "Restablecer Predeterminados",
                    saveBtn: "Guardar Cambios",
                    sidebarSubtitle: "Conoce tu Fuerza Laboral Inteligente."
                }
            };

            // --- Default Settings ---
            const defaultSettings = {
                userName: "User",
                language: "en",
                primaryColor: "#ff5011",
                sidebarColor: "#1a1a1a",
                containerColor: "#0d0d0d",
                profileImage: "https://ui-avatars.com/api/?name=User&background=ff5011&color=fff",
                sidebarLogo: "https://bucket.mlcdn.com/a/3336/3336910/images/4258edc9566675e609085514462830fbe2e1b905.png"
            };

            // --- Active Agent Tracking ---
            let activeAgent = null;

            // --- Load Settings from Local Storage ---
            function loadSettings() {
                const savedSettings = JSON.parse(localStorage.getItem('dashboardSettings')) || defaultSettings;
                
                // Apply settings
                userNameInput.value = savedSettings.userName;
                languageSelect.value = savedSettings.language;
                primaryColorPicker.value = savedSettings.primaryColor;
                sidebarColorPicker.value = savedSettings.sidebarColor;
                containerColorPicker.value = savedSettings.containerColor;
                
                // Update UI
                updateUI(savedSettings);
                
                return savedSettings;
            }

            // --- Save Settings to Local Storage ---
            function saveSettings() {
                const settings = {
                    userName: userNameInput.value || defaultSettings.userName,
                    language: languageSelect.value,
                    primaryColor: primaryColorPicker.value,
                    sidebarColor: sidebarColorPicker.value,
                    containerColor: containerColorPicker.value,
                    profileImage: profileImage.src,
                    sidebarLogo: sidebarLogo.src
                };
                
                localStorage.setItem('dashboardSettings', JSON.stringify(settings));
                updateUI(settings);
                return settings;
            }

            // --- Update UI with Settings ---
            function updateUI(settings) {
                const lang = settings.language;
                const t = translations[lang];
                
                // Update greeting
                greetingMessage.textContent = t.greeting(settings.userName);
                greetingSubtitle.textContent = t.subtitle;
                
                // Update profile
                profileName.textContent = t.profile;
                profileImage.src = settings.profileImage;
                profilePreview.src = settings.profileImage;
                
                // Update sidebar logo
                sidebarLogo.src = settings.sidebarLogo;
                logoPreview.src = settings.sidebarLogo;
                
                // Update subtitle
                document.querySelector('.sidebar-subtitle').textContent = t.sidebarSubtitle;
                
                // Update modal text
                document.getElementById('modal-title').textContent = t.modalTitle;
                document.getElementById('language-title').textContent = t.languageTitle;
                document.getElementById('profile-title').textContent = t.profileTitle;
                document.getElementById('logo-title').textContent = t.logoTitle;
                document.getElementById('colors-title').textContent = t.colorsTitle;
                document.getElementById('upload-profile-btn').textContent = t.uploadProfile;
                document.getElementById('upload-logo-btn').textContent = t.uploadLogo;
                document.getElementById('reset-settings-btn').textContent = t.resetBtn;
                document.getElementById('save-settings-btn').textContent = t.saveBtn;
                
                // Update colors
                document.documentElement.style.setProperty('--skin-color', settings.primaryColor);
                document.documentElement.style.setProperty('--box-color', settings.sidebarColor);
                document.documentElement.style.setProperty('--body-color', settings.containerColor);
                
                // Update color value displays
                primaryColorValue.textContent = settings.primaryColor;
                sidebarColorValue.textContent = settings.sidebarColor;
                containerColorValue.textContent = settings.containerColor;
            }

            // --- Reset to Default Settings ---
            function resetSettings() {
                userNameInput.value = defaultSettings.userName;
                languageSelect.value = defaultSettings.language;
                primaryColorPicker.value = defaultSettings.primaryColor;
                sidebarColorPicker.value = defaultSettings.sidebarColor;
                containerColorPicker.value = defaultSettings.containerColor;
                
                profileImage.src = defaultSettings.profileImage;
                profilePreview.src = defaultSettings.profileImage;
                sidebarLogo.src = defaultSettings.sidebarLogo;
                logoPreview.src = defaultSettings.sidebarLogo;
                
                saveSettings();
            }

            // --- Image Upload Handlers ---
            function handleImageUpload(inputElement, previewElement, targetElement) {
                return function(event) {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            previewElement.src = e.target.result;
                            if (targetElement) {
                                targetElement.src = e.target.result;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                };
            }

            // --- Sidebar Toggle Logic ---
            function toggleSidebar() {
                const isMobile = window.innerWidth < 768;
                
                if (isMobile) {
                    sidebar.classList.toggle('mobile-open');
                    mobileMenuToggle.classList.toggle('active');
                    
                    // Crucial fix: Ensure collapsed is removed on mobile when opening
                    if (sidebar.classList.contains('mobile-open')) {
                        sidebar.classList.remove('collapsed');
                        document.body.style.overflow = 'hidden'; // Lock scroll
                    } else {
                        document.body.style.overflow = 'auto'; // Unlock scroll
                    }
                } else {
                    sidebar.classList.toggle('collapsed');
                    mainContent.classList.toggle('sidebar-collapsed');
                }
            }

            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', toggleSidebar);
            }

            // --- Mobile Menu Toggle ---
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', toggleSidebar);
            }

            // --- Swipe Detection for Mobile ---
            let touchStartX = 0;
            let touchEndX = 0;

            document.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);

            document.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);

            function handleSwipe() {
                const swipeThreshold = 50;
                if (window.innerWidth < 768) {
                    // Swipe Right to Open
                    if (touchEndX - touchStartX > swipeThreshold) {
                        if (!sidebar.classList.contains('mobile-open')) {
                            toggleSidebar();
                        }
                    }
                    // Swipe Left to Close
                    if (touchStartX - touchEndX > swipeThreshold) {
                        if (sidebar.classList.contains('mobile-open')) {
                            toggleSidebar();
                        }
                    }
                }
            }

            // --- Iframe Content Loading Logic ---
            if (iframe && sidebarNavButtons) {
                sidebarNavButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        // Check if the click target or its parent is the info button
                        if (e.target.closest('.agent-info-btn')) return;
                        
                        sidebarNavButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        activeAgent = button.dataset.agent;
                        
                        const url = button.dataset.url;
                        if (url) {
                            iframe.src = url;
                            if (window.innerWidth < 768 && sidebar.classList.contains('mobile-open')) {
                                toggleSidebar();
                            }
                        }
                    });
                });
            }

            // --- Agent Info Button Logic ---
            if (agentInfoButtons) {
                agentInfoButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation(); // Stops the parent button click
                        const agentId = button.dataset.agent;
                        if (agentId && agentModals[agentId]) {
                            agentModals[agentId].classList.add('active');
                            document.body.style.overflow = 'hidden';
                            
                            // Close sidebar on mobile if open to show modal better
                            if (window.innerWidth < 768 && sidebar.classList.contains('mobile-open')) {
                                toggleSidebar();
                            }
                        }
                    });
                });
            }

            // --- Close Agent Modals ---
            if (agentModalCloses) {
                agentModalCloses.forEach(button => {
                    button.addEventListener('click', () => {
                        const agentId = button.dataset.agent;
                        if (agentId && agentModals[agentId]) {
                            agentModals[agentId].classList.remove('active');
                            document.body.style.overflow = 'auto';
                        }
                    });
                });
            }

            // --- Close Modals when clicking outside ---
            function setupModalClose(modal) {
                modal.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            Object.values(agentModals).forEach(setupModalClose);
            if (settingsModal) setupModalClose(settingsModal);

            // --- Settings Modal Logic ---
            if (profileButton && settingsModal) {
                profileButton.addEventListener('click', () => {
                    settingsModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    if (window.innerWidth < 768 && sidebar.classList.contains('mobile-open')) {
                        toggleSidebar();
                    }
                });
            }

            if (modalClose) {
                modalClose.addEventListener('click', () => {
                    settingsModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }

            if (saveSettingsBtn) {
                saveSettingsBtn.addEventListener('click', () => {
                    saveSettings();
                    settingsModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }

            if (resetSettingsBtn) {
                resetSettingsBtn.addEventListener('click', resetSettings);
            }

            if (profileImageInput) {
                profileImageInput.addEventListener('change', handleImageUpload(
                    profileImageInput, 
                    profilePreview, 
                    profileImage
                ));
            }

            if (logoImageInput) {
                logoImageInput.addEventListener('change', handleImageUpload(
                    logoImageInput, 
                    logoPreview, 
                    sidebarLogo
                ));
            }

            function setupColorPicker(picker, valueElement) {
                picker.addEventListener('input', (e) => {
                    valueElement.textContent = e.target.value;
                });
            }

            if (primaryColorPicker) setupColorPicker(primaryColorPicker, primaryColorValue);
            if (sidebarColorPicker) setupColorPicker(sidebarColorPicker, sidebarColorValue);
            if (containerColorPicker) setupColorPicker(containerColorPicker, containerColorValue);

            // --- Back to Top Button Logic ---
            const toTopButton = document.getElementById('back-to-top');
            if (toTopButton) {
                // Determine scroll target based on device
                const scrollTarget = window.innerWidth < 768 ? window : mainContent;
                
                const scrollListener = () => {
                    const scrollPos = window.innerWidth < 768 ? window.scrollY : mainContent.scrollTop;
                    if (scrollPos > 300) {
                        toTopButton.classList.add('show');
                    } else {
                        toTopButton.classList.remove('show');
                    }
                };

                if (window.innerWidth < 768) {
                    window.addEventListener('scroll', scrollListener);
                } else {
                    mainContent.addEventListener('scroll', scrollListener);
                }

                toTopButton.addEventListener('click', function() {
                    if (window.innerWidth < 768) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            }

            // --- Handle Window Resize ---
            function handleResize() {
                const isMobile = window.innerWidth < 768;
                if (!isMobile) {
                    sidebar.classList.remove('mobile-open', 'hidden');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    mobileMenuToggle.style.display = 'none';
                    if (sidebar.classList.contains('collapsed')) {
                        mainContent.classList.add('sidebar-collapsed');
                        mainContent.classList.remove('sidebar-hidden');
                    } else {
                        mainContent.classList.remove('sidebar-collapsed', 'sidebar-hidden');
                    }
                } else {
                    // Forcefully remove collapsed on mobile so text/icons show when opened
                    sidebar.classList.remove('collapsed');
                    
                    sidebar.classList.add('hidden');
                    mainContent.classList.add('sidebar-hidden');
                    mainContent.classList.remove('sidebar-collapsed');
                    mobileMenuToggle.style.display = 'flex';
                }
                if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('sidebar-collapsed');
                }
            }

            window.addEventListener('resize', handleResize);
            loadSettings();
            handleResize();
            
            if (sidebarNavButtons.length > 0) {
                sidebarNavButtons[0].classList.add('active');
                activeAgent = sidebarNavButtons[0].dataset.agent;
            }
        });
