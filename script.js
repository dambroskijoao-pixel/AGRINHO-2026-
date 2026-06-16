/**
 * PROJETO AGRINHO 2026 - VERSÃO 2 (MODERNA)
 * Arquivo: script.js
 * 
 * Foco: Programação funcional, Dark Mode, e Interatividade Imersiva.
 */

const AgrinhoApp = (() => {
    'use strict';

    // Estado da Aplicação
    const state = {
        isDarkMode: localStorage.getItem('theme') === 'dark',
        lastScrollTop: 0,
        isMenuOpen: false
    };

    // --- MÓDULO: TEMA (DARK/LIGHT) ---
    const ThemeModule = {
        init() {
            const themeToggle = document.querySelector('#theme-switch');
            if (!themeToggle) return;

            this.applyTheme();
            themeToggle.addEventListener('click', () => this.toggle());
        },

        toggle() {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
            this.applyTheme();
        },

        applyTheme() {
            document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light');
            const icon = document.querySelector('.theme-icon');
            if (icon) icon.textContent = state.isDarkMode ? '☀️' : '🌙';
        }
    };

    // --- MÓDULO: INTERATIVIDADE DE SCROLL ---
    const ScrollModule = {
        init() {
            window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 100));
            this.setupParallax();
        },

        handleScroll() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const header = document.querySelector('.navbar');

            // Header desaparece ao rolar para baixo, aparece ao rolar para cima
            if (st > state.lastScrollTop && st > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            state.lastScrollTop = st <= 0 ? 0 : st;
        },

        setupParallax() {
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            window.addEventListener('scroll', () => {
                const offset = window.pageYOffset;
                parallaxElements.forEach(el => {
                    el.style.backgroundPositionY = (offset * 0.5) + 'px';
                });
            });
        },

        throttle(fn, wait) {
            let time = Date.now();
            return function() {
                if ((time + wait - Date.now()) < 0) {
                    fn();
                    time = Date.now();
                }
            }
        }
    };

    // --- MÓDULO: GALERIA E FILTROS ---
    const GalleryModule = {
        init() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const items = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.dataset.filter;
                    
                    // Atualiza botões ativos
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Filtra itens com animação
                    items.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            if (category === 'all' || item.dataset.category === category) {
                                item.style.display = 'block';
                                setTimeout(() => {
                                    item.style.opacity = '1';
                                    item.style.transform = 'scale(1)';
                                }, 50);
                            } else {
                                item.style.display = 'none';
                            }
                        }, 300);
                    });
                });
            });
        }
    };

    // --- MÓDULO: NOTIFICAÇÕES CUSTOMIZADAS ---
    const NotificationModule = {
        show(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <div class="toast-content">
                    <span>${message}</span>
                </div>
            `;
            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }
    };

    // --- INICIALIZAÇÃO GERAL ---
    const init = () => {
        ThemeModule.init();
        ScrollModule.init();
        GalleryModule.init();

        // Exemplo de uso da notificação no clique de botões de "Saiba Mais"
        document.querySelectorAll('.btn-learn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                NotificationModule.show('Explorando o futuro do Agrinho 2026...', 'success');
            });
        });

        console.log('🚀 Agrinho 2026 Engine v2.0 iniciada!');
    };

    return { init, notify: NotificationModule.show };
})();

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', AgrinhoApp.init);

