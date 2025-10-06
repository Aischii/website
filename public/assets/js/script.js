document.addEventListener("DOMContentLoaded", function() {
    const loadComponent = (url, elementId) => {
        return fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`Failed to fetch ${url}`))
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    element.replaceChildren(...doc.body.childNodes);
                }
            })
            .catch(error => console.error('Error loading component:', error));
    };

    const loadMarqueeText = () => {
        fetch('../includes/marquee.txt')
            .then(response => response.text())
            .then(text => {
                const marqueeTextElement = document.getElementById('marquee-text');
                if (marqueeTextElement) {
                    marqueeTextElement.textContent = text;
                    const speed = 100; // pixels per second
                    const duration = marqueeTextElement.scrollWidth / speed;
                    marqueeTextElement.style.animationDuration = duration + 's';
                }
            })
            .catch(error => console.error('Error loading marquee text:', error));
    };

    const mainContent = document.querySelector('.main-content');

    const routes = {
    '/': { path: 'home.html', title: 'achikurimu' },
    '/about': { path: 'about.html', title: 'About - achikurimu' },
    '/contact': { path: 'contact.html', title: 'Contact - achikurimu' },
    '/blog': { path: 'blog.html', title: 'Blog - achikurimu' },
    '/blog/post1': { path: 'blog/posts/post1.html', title: 'Blog Post 1 - achikurimu' },
    '/blog/post2': { path: 'blog/posts/post2.html', title: 'Blog Post 2 - achikurimu' },
    '/games': { path: 'games.html', title: 'Games - achikurimu' },
    '/music': { path: 'music.html', title: 'Music - achikurimu' },
    '/website': { path: 'website.html', title: 'Website - achikurimu' },
    '/links': { path: 'links.html', title: 'Links - achikurimu' },
    '/guestbook': { path: 'guestbook.html', title: 'Guestbook - achikurimu' },
};

    const displayGuestbookMessages = async () => {
        const guestbookMessages = document.getElementById('guestbook-messages');
        if (!guestbookMessages) return;
        try {
            const response = await fetch('/api/messages');
            const messages = await response.json();
            guestbookMessages.innerHTML = '';
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.innerHTML = `
                    <p><strong>${message.name}</strong></p>
                    <p>${message.message}</p>
                    <hr>
                `;
                guestbookMessages.appendChild(messageElement);
            });
        } catch (error) {
            console.error('Error loading guestbook messages:', error);
        }
    };

    const handleGuestbookSubmit = async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('guestbook-name');
        const messageInput = document.getElementById('guestbook-message');
        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    message: messageInput.value,
                }),
            });
            nameInput.value = '';
            messageInput.value = '';
            displayGuestbookMessages();
        } catch (error) {
            console.error('Error submitting guestbook message:', error);
        }
    };

    const loadContent = async (path) => {
        const route = routes[path] || routes['/'];
        try {
            const response = await fetch(route.path);
            if (!response.ok) throw new Error(`Failed to fetch page: ${route.path}`);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            mainContent.replaceChildren(...doc.body.childNodes);
            document.title = route.title;

            mainContent.querySelectorAll('a').forEach(link => {
                if (!link.closest('.main-nav')) {
                    link.addEventListener('click', (e) => {
                        handleNav(e);
                    });
                }
            });

            if (path === '/guestbook') {
                const guestbookForm = document.getElementById('guestbook-form');
                if (guestbookForm) {
                    guestbookForm.addEventListener('submit', handleGuestbookSubmit);
                }
                displayGuestbookMessages();
            }
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.replaceChildren();
            const h1 = document.createElement('h1');
            h1.textContent = 'Page not found';
            mainContent.appendChild(h1);
            document.title = 'Page Not Found';
        }
    };

    const handleNav = (e) => {
        e.preventDefault();
        const path = e.currentTarget.getAttribute('href');
        if (window.location.pathname !== path) {
            history.pushState({}, '', path);
            loadContent(path);
        }
    };

    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });

    // Load initial components and content
    Promise.all([
        loadComponent('../includes/header.html', 'header').then(() => {
            loadMarqueeText();
            const hamburger = document.querySelector('.hamburger');
            const sidebarNav = document.querySelector('.sidebar-nav');
            const sidebarOverlay = document.querySelector('.sidebar-overlay');

            if (hamburger && sidebarNav && sidebarOverlay) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('open');
                    sidebarNav.classList.toggle('open');
                    sidebarOverlay.classList.toggle('active');
                });

                sidebarOverlay.addEventListener('click', () => {
                    sidebarNav.classList.remove('open');
                    sidebarOverlay.classList.remove('active');
                });
            }
        }),
        loadComponent('../includes/footer.html', 'footer'),
        loadComponent('../includes/sidebar.html', 'sidebar').then(() => {
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.addEventListener('click', (e) => {
                    handleNav(e);
                    const sidebarNav = document.querySelector('.sidebar-nav');
                    const sidebarOverlay = document.querySelector('.sidebar-overlay');
                    if (sidebarNav && sidebarOverlay) {
                        sidebarNav.classList.remove('open');
                        sidebarOverlay.classList.remove('active');
                    }
                });
            });
        })
    ]).then(() => {
        loadContent(window.location.pathname);
    });
});