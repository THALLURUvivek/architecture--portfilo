document.addEventListener('DOMContentLoaded', () => {

    /* ========== ACTIVE NAV LINK ========== */
    (function activeNav() {
        const navLinks = document.querySelectorAll('#mainNav .nav-link');
        if (!navLinks.length) return;
        const page = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === page) {
                link.classList.add('active');
            }
        });
    })();

    /* ========== HERO PARTICLES ========== */
    (function heroParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'hero-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (Math.random() * 6 + 6) + 's';
            p.style.opacity = Math.random() * 0.4 + 0.1;
            container.appendChild(p);
        }
    })();

    /* ========== NAVBAR SCROLL EFFECT ========== */
    (function navbarScroll() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                nav.style.padding = '8px 0';
                nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
            } else {
                nav.style.padding = '12px 0';
                nav.style.boxShadow = 'none';
            }
        });
    })();

    /* ========== HERO SLIDER (Home page only) ========== */
    (function heroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        if (!slides.length) return;
        let current = 0;
        let interval;

        function goTo(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            current = index;
        }

        function nextSlide() {
            goTo((current + 1) % slides.length);
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(interval);
                goTo(parseInt(dot.dataset.index));
                interval = setInterval(nextSlide, 5000);
            });
        });

        interval = setInterval(nextSlide, 5000);
    })();

    /* ========== COUNTER ANIMATION ========== */
    (function counters() {
        const counters = document.querySelectorAll('.counter, .stat-number[data-target], .counter-num[data-target]');
        if (!counters.length) return;

        const groups = new Map();

        counters.forEach(c => {
            const parent = c.closest('section') || c.closest('.stats-ribbon') || document.body;
            if (!groups.has(parent)) groups.set(parent, []);
            groups.get(parent).push(c);
        });

        function animateGroup(group, trigger) {
            const rect = trigger.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                if (group._animated) return;
                group._animated = true;
                group.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const suffix = counter.dataset.suffix || '';
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = current + suffix;
                    }, 25);
                });
            }
        }

        function checkCounters() {
            groups.forEach((group, trigger) => animateGroup(group, trigger));
        }

        window.addEventListener('scroll', checkCounters);
        checkCounters();
    })();

    /* ========== PROJECT FILTER (Projects page) ========== */
    (function projectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.project-item');
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                items.forEach(item => {
                    const match = filter === 'all' || item.dataset.category === filter;
                    if (match) {
                        item.classList.remove('hide');
                        item.style.display = '';
                    } else {
                        item.classList.add('hide');
                        item.style.display = 'none';
                    }
                });
            });
        });
    })();

    /* ========== LIGHTBOX (Projects page) ========== */
    (function lightbox() {
        const lb = document.getElementById('lightbox');
        if (!lb) return;

        const projectImages = [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop'
        ];

        let currentIndex = 0;

        window.openLightbox = function(index) {
            currentIndex = index;
            document.getElementById('lightboxImg').src = projectImages[currentIndex];
            document.getElementById('lightbox').classList.add('active');
            document.getElementById('lightboxCounter').textContent = (currentIndex + 1) + ' / ' + projectImages.length;
        };

        window.closeLightbox = function() {
            document.getElementById('lightbox').classList.remove('active');
        };

        window.changeImage = function(dir) {
            currentIndex = (currentIndex + dir + projectImages.length) % projectImages.length;
            document.getElementById('lightboxImg').src = projectImages[currentIndex];
            document.getElementById('lightboxCounter').textContent = (currentIndex + 1) + ' / ' + projectImages.length;
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        });

        lb.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeLightbox();
        });
    })();

    /* ========== TESTIMONIAL CAROUSEL ========== */
    (function testimonials() {
        const track = document.getElementById('testimonialTrack');
        if (!track) return;
        const slides = track.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        if (!slides.length) return;
        let current = 0;

        function goTo(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            track.style.transform = `translateX(-${index * 100}%)`;
            current = index;
        }

        window.nextTestimonial = function() {
            goTo((current + 1) % slides.length);
        };

        window.prevTestimonial = function() {
            goTo((current - 1 + slides.length) % slides.length);
        };

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goTo(parseInt(dot.dataset.index));
            });
        });

        let autoSlide = setInterval(() => nextTestimonial(), 5000);

        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
            carousel.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => nextTestimonial(), 5000);
            });
        }
    })();

    /* ========== SERVICE MODAL DYNAMIC (Services page) ========== */
    (function serviceModal() {
        const modal = document.getElementById('serviceModal');
        if (!modal) return;

        const serviceData = {
            residential: {
                title: 'Residential Design',
                desc: 'We create bespoke residential spaces that balance aesthetics, functionality, and comfort. Our team works closely with clients to understand their lifestyle needs, delivering homes that are both beautiful and practical. From initial concept through to final construction, we manage every detail to ensure your vision is realized with precision and care.',
                icon: 'house-heart',
                features: ['Custom home design & planning', 'Interior space optimization', 'Sustainable material selection', 'Construction documentation', 'Vastu-compliant designs']
            },
            commercial: {
                title: 'Commercial Architecture',
                desc: 'Our commercial architecture division specializes in creating dynamic workspaces that enhance productivity and brand identity. We design offices, retail spaces, hotels, and mixed-use developments that are functional, sustainable, and visually striking.',
                icon: 'building',
                features: ['Corporate office design', 'Retail & hospitality spaces', 'Mixed-use developments', 'Facade engineering', 'LEED certification consulting']
            },
            interior: {
                title: 'Interior Design',
                desc: 'Our interior design team transforms spaces with a perfect blend of aesthetics and functionality. We create environments that reflect your personality while optimizing space utilization, lighting, and material selection.',
                icon: 'lamp',
                features: ['Space planning & layout', 'Furniture & fixture selection', 'Lighting design', 'Color consultation', 'Custom joinery design']
            },
            landscape: {
                title: 'Landscape Architecture',
                desc: 'We design outdoor environments that connect people with nature. Our landscape architecture services cover everything from residential gardens to public parks, creating sustainable, beautiful outdoor spaces.',
                icon: 'flower1',
                features: ['Garden & courtyard design', 'Rooftop terraces', 'Public park planning', 'Sustainable drainage solutions', 'Native plant selection']
            },
            urban: {
                title: 'Urban Planning',
                desc: 'Our urban planning practice shapes cities and communities for a better future. We provide comprehensive master planning services that balance density, green space, infrastructure, and community needs.',
                icon: 'map',
                features: ['Master planning', 'Transportation integration', 'Public space design', 'Zoning & regulation advisory', 'Community engagement']
            },
            consulting: {
                title: 'Consulting & Supervision',
                desc: 'We offer expert architectural consulting services to guide your project from feasibility through completion. Our supervision ensures quality control, budget adherence, and timely delivery.',
                icon: 'clipboard-check',
                features: ['Feasibility studies', 'Construction supervision', 'Quality control', 'Budget management', 'Permit & approval assistance']
            }
        };

        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function() {
                const key = this.dataset.service;
                const data = serviceData[key];
                if (!data) return;

                modal.querySelector('.service-modal-icon i').className = `bi bi-${data.icon} fs-1 text-accent`;
                modal.querySelector('#modalTitle').textContent = data.title;
                modal.querySelector('#modalDesc').textContent = data.desc;
                modal.querySelector('#modalFeatures').innerHTML = data.features.map(f =>
                    `<li class="mb-2"><i class="bi bi-check-circle-fill text-accent me-2"></i> ${f}</li>`
                ).join('');
            });
        });
    })();

    /* ========== CONTACT FORM ========== */
    (function contactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const fields = {
            name: form.querySelector('#contactName'),
            email: form.querySelector('#contactEmail'),
            phone: form.querySelector('#contactPhone'),
            project: form.querySelector('#contactProject'),
            message: form.querySelector('#contactMessage')
        };

        function setError(input, show) {
            if (!input) return;
            if (show) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        }

        function validateField(input) {
            if (!input) return true;
            if (input.hasAttribute('required') && !input.value.trim()) {
                setError(input, true);
                return false;
            }
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    setError(input, true);
                    return false;
                }
            }
            if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
                if (!phoneRegex.test(input.value.trim())) {
                    setError(input, true);
                    return false;
                }
            }
            if (input.tagName === 'SELECT' && input.hasAttribute('required') && !input.value) {
                setError(input, true);
                return false;
            }
            setError(input, false);
            return true;
        }

        function validateForm() {
            let valid = true;
            for (const key of ['name', 'email', 'project', 'message']) {
                if (!validateField(fields[key])) valid = false;
            }
            if (fields.phone && fields.phone.value.trim()) {
                validateField(fields.phone);
            }
            return valid;
        }

        function clearError(e) {
            const input = e.target;
            if (input.classList.contains('is-invalid')) {
                validateField(input);
            }
        }

        Object.values(fields).forEach(f => {
            if (f) {
                f.addEventListener('input', clearError);
                f.addEventListener('change', clearError);
                f.addEventListener('blur', () => validateField(f));
            }
        });

        function showToast() {
            if (document.getElementById('contactToast')) return;
            const toast = document.createElement('div');
            toast.id = 'contactToast';
            toast.className = 'contact-toast';
            toast.innerHTML =
                '<div class="contact-toast-icon"><i class="bi bi-check-circle-fill"></i></div>' +
                '<div class="contact-toast-body">' +
                    '<div class="contact-toast-title">Message Sent!</div>' +
                    '<div class="contact-toast-msg">Thank you. We\'ll get back to you shortly.</div>' +
                '</div>' +
                '<button class="contact-toast-close" onclick="this.parentElement.remove()"><i class="bi bi-x"></i></button>' +
                '<div class="contact-toast-progress"></div>';
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, 4000);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = original;
                btn.disabled = false;
                form.reset();
                Object.values(fields).forEach(f => { if (f) setError(f, false); });
                showToast();
            }, 1200);
        });
    })();

    /* ========== AUTH FORMS (Sign In / Sign Up) ========== */
    (function authForms() {
        const roleUrls = {
            client: 'client-dashboard.html',
            architect: 'architect-dashboard.html',
            admin: 'admin-dashboard.html'
        };

        function getSelectedRole(form) {
            const checked = form.querySelector('input[name="role"]:checked');
            return checked ? checked.value : 'client';
        }

        function saveCurrentSession(name, email, role) {
            const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userInitials', initials);
        }

        function getStoredUsers() {
            try { return JSON.parse(localStorage.getItem('users')) || []; } catch { return []; }
        }

        function saveStoredUsers(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        /* ---- Validation helpers ---- */
        function showError(errBox, msg) {
            errBox.innerHTML = msg;
            errBox.style.display = 'block';
        }

        function isValidEmail(v) {
            return /^[^\s@]+@[^\s@]+\.com$/.test(v);
        }

        function isValidName(v) {
            return /^[A-Za-z\s]+$/.test(v);
        }

        function isValidPassword(v) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,}$/.test(v);
        }

        function getPasswordChecks(v) {
            return {
                length: v.length >= 8,
                lowercase: /[a-z]/.test(v),
                uppercase: /[A-Z]/.test(v),
                number: /\d/.test(v),
                special: /[!@#$%^&*(),.?":{}|<>_\-]/.test(v)
            };
        }

        /* ---- Sign In ---- */
        const signinForm = document.getElementById('signinForm');
        if (signinForm) {
            const errBox = document.getElementById('signinError');

            function roleLabel(r) {
                return r.charAt(0).toUpperCase() + r.slice(1);
            }

            signinForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = signinForm.querySelector('button[type="submit"]');
                const email = document.getElementById('signinEmail').value.trim().toLowerCase();
                const password = document.getElementById('signinPassword').value.trim();
                const selectedRole = getSelectedRole(signinForm);

                if (!isValidEmail(email)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Sign In';
                    btn.disabled = false;
                    showError(errBox, 'Email must end with <strong>.com</strong>.');
                    return;
                }

                if (!isValidPassword(password)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Sign In';
                    btn.disabled = false;
                    showError(errBox, 'Password must be 8+ characters with uppercase, lowercase, a number &amp; a special character.');
                    return;
                }

                const users = getStoredUsers();
                const user = users.find(u => u.email === email);

                if (!user) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Sign In';
                    btn.disabled = false;
                    showError(errBox, 'No account found with this email. Please <a href="signup.html" style="color:#ef4444;font-weight:600;">sign up</a> first.');
                    return;
                }

                if (user.password !== password) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Sign In';
                    btn.disabled = false;
                    showError(errBox, 'Incorrect password. Please try again.');
                    return;
                }

                if (user.role !== selectedRole) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Sign In';
                    btn.disabled = false;
                    showError(errBox, 'You registered as <strong>' + roleLabel(user.role) + '</strong>. Please select the correct role above and try again.');
                    return;
                }

                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Signing In...';
                btn.disabled = true;
                errBox.style.display = 'none';

                setTimeout(() => {
                    btn.innerHTML = '<i class="bi bi-check-circle me-2"></i> Signed In!';
                    saveCurrentSession(user.name, user.email, user.role);
                    setTimeout(() => {
                        window.location.href = roleUrls[user.role] || roleUrls.client;
                    }, 1000);
                }, 1500);
            });
        }

        /* ---- Field-level error helpers ---- */
        function showFieldError(fieldId, msg) {
            const el = document.getElementById('error-' + fieldId);
            const input = document.getElementById(fieldId);
            if (el) { el.textContent = msg; el.style.display = 'block'; }
            if (input) input.classList.add('is-invalid');
        }

        function clearFieldErrors() {
            document.querySelectorAll('.field-error').forEach(el => {
                el.textContent = ''; el.style.display = 'none';
            });
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
        }

        /* ---- Sign Up ---- */
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            const errBox = document.getElementById('signupError');
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                clearFieldErrors();
                const btn = signupForm.querySelector('button[type="submit"]');
                const firstName = document.getElementById('signupFirstName').value.trim();
                const lastName = document.getElementById('signupLastName').value.trim();
                const email = document.getElementById('signupEmail').value.trim().toLowerCase();
                const password = document.getElementById('signupPassword').value.trim();
                const confirm = document.getElementById('signupConfirmPassword').value.trim();
                const role = getSelectedRole(signupForm);

                if (!isValidName(firstName)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Create Account';
                    showFieldError('signupFirstName', 'Only letters and spaces allowed.');
                }
                if (!isValidName(lastName)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Create Account';
                    showFieldError('signupLastName', 'Only letters and spaces allowed.');
                }
                if (!isValidName(firstName) || !isValidName(lastName)) return;

                if (!isValidEmail(email)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Create Account';
                    showFieldError('signupEmail', 'Email must end with <strong>.com</strong>.');
                    return;
                }

                if (!isValidPassword(password)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Create Account';
                    showFieldError('signupPassword', 'Must be 8+ characters with uppercase, lowercase, a number &amp; a special character.');
                    return;
                }

                if (password !== confirm) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Create Account';
                    showFieldError('signupConfirmPassword', 'Passwords do not match.');
                    return;
                }

                const users = getStoredUsers();
                if (users.some(u => u.email === email)) {
                    btn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Create Account';
                    showFieldError('signupEmail', 'An account with this email already exists.');
                    return;
                }

                const name = (firstName + ' ' + lastName).trim() || email.split('@')[0].replace(/[.\-_0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();

                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Creating Account...';
                btn.disabled = true;
                errBox.style.display = 'none';

                setTimeout(() => {
                    users.push({ name, email, password, role });
                    saveStoredUsers(users);
                    signupForm.style.display = 'none';
                    document.getElementById('signupSuccess').style.display = 'block';
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 2000);
                }, 1500);
            });

            /* ---- Live password requirements ---- */
            const pwInput = document.getElementById('signupPassword');
            const reqContainer = document.getElementById('passwordRequirements');
            if (pwInput && reqContainer) {
                pwInput.addEventListener('input', () => {
                    const checks = getPasswordChecks(pwInput.value);
                    reqContainer.querySelectorAll('.req-item').forEach(item => {
                        const req = item.dataset.req;
                        item.classList.toggle('valid', checks[req]);
                    });
                });
            }
        }
    })();

    /* ========== BACK TO TOP ========== */
    (function backToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

    /* ========== SCROLL REVEAL ANIMATION ========== */
    (function scrollReveal() {
        const elements = document.querySelectorAll('.service-card, .team-card, .blog-card, .project-item');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    })();

    /* ========== ENHANCED REVEAL (reveal-left, reveal-right, etc.) ========== */
    (function enhancedReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });

        els.forEach(el => observer.observe(el));
    })();

    /* ========== SCROLL PROGRESS BAR ========== */
    (function scrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        });
    })();

    /* ========== CURSOR GLOW EFFECT ========== */
    (function cursorGlow() {
        const glow = document.getElementById('cursorGlow');
        if (!glow) return;

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            glow.style.opacity = '1';
        });
    })();

    /* ========== TYPEWRITER EFFECT ========== */
    (function typewriter() {
        const el = document.getElementById('typewriter-text');
        if (!el) return;

        const text = el.textContent;
        el.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50 + Math.random() * 40);
            }
        }

        setTimeout(type, 500);
    })();

    /* ========== BUTTON RIPPLE EFFECT ========== */
    (function buttonRipple() {
        document.querySelectorAll('.btn-ripple').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
                this.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    })();

    /* ========== PROCESS STEP COUNTER (staggered reveal) ========== */
    (function processSteps() {
        const steps = document.querySelectorAll('.process-step');
        if (!steps.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = Array.from(steps).indexOf(entry.target);
                    entry.target.style.transitionDelay = (idx * 0.15) + 's';
                    entry.target.style.opacity = '';
                    entry.target.style.transform = '';
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        steps.forEach(step => {
            observer.observe(step);
        });
    })();

    /* ========== PASSWORD TOGGLE ========== */
    window.togglePassword = function(id, el) {
        const input = document.getElementById(id);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        el.querySelector('i').className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
    };

    /* ========== PARALLAX MOUSE ON HERO ========== */
    (function heroParallax() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            hero.querySelectorAll('.hero-slide').forEach(slide => {
                slide.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            hero.querySelectorAll('.hero-slide').forEach(slide => {
                slide.style.transform = '';
            });
        });
    })();

});
