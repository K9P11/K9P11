/* ==========================================================================
   1. AÑO DINÁMICO EN EL FOOTER
   Actualiza automáticamente el año en los elementos con la clase .current-year
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    console.log(`Buscando años: Se encontraron ${yearElements.length} elementos.`);
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});


/* ==========================================================================
   2. TABS Y ACORDEÓN PRINCIPAL (MÓDULOS) + INTERNACIONALIZACIÓN
   Controla la navegación entre los módulos principales (Core, Loyalty, Credit).
   Incluye lógica para cambiar textos (Ver más/menos) según el idioma del HTML.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const accordionItems = document.querySelectorAll('.accordion-item');

    const getLanguage = () => {
        const htmlLang = document.documentElement.lang || 'es';
        return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'es';
    };

    const uiTexts = {
        es: { seeMore: 'Ver más', seeLess: 'Ver menos' },
        en: { seeMore: 'View more', seeLess: 'View less' }
    };

    const activateModule = (targetId) => {
        const currentLang = getLanguage();

        // Actualizar estado de las Tabs (Desktop)
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            if (tab.dataset.target === targetId) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            }
        });

        // Actualizar estado de los Acordeones (Mobile/Tablet)
        accordionItems.forEach(item => {
            const isTarget = item.id === targetId;
            const ctaText = item.querySelector('.cta-text');

            if (isTarget) {
                item.classList.add('active');
                if (ctaText) {
                    ctaText.textContent = uiTexts[currentLang].seeLess;
                    ctaText.setAttribute('data-key', 'cta_see_less');
                }
            } else {
                item.classList.remove('active');
                if (ctaText) {
                    ctaText.textContent = uiTexts[currentLang].seeMore;
                    ctaText.setAttribute('data-key', 'cta_see_more');
                }
            }
        });
    };

    // Eventos para Tabs en Desktop
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateModule(tab.dataset.target);
        });
    });

    // Eventos para Acordeón en Mobile
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                if (!isActive) {
                    activateModule(item.id);
                    // Scroll suave para enfocar el módulo abierto
                    setTimeout(() => {
                        item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 120); 
                } else {
                    // Cerrar el acordeón si ya estaba activo
                    item.classList.remove('active');
                    const ctaText = item.querySelector('.cta-text');
                    if (ctaText) {
                        ctaText.textContent = uiTexts[getLanguage()].seeMore;
                        ctaText.setAttribute('data-key', 'cta_see_more');
                    }
                    tabs.forEach(t => t.classList.remove('active'));
                }
            });
        }
    });
});


/* ==========================================================================
   3. VISUALIZADOR DE MOCKUPS (MODAL FULLSCREEN)
   Clona el dispositivo seleccionado y lo inyecta en un modal para verlo en grande.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('mockup-modal');
    
    // Validación de seguridad para evitar errores si no existe el modal en el DOM
    if (!modal) {
        console.error("❌ ERROR: El JavaScript no encuentra el <div id='mockup-modal'> en tu HTML.");
        return; 
    }

    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close-btn');
    const devices = document.querySelectorAll('.device-container');

    console.log(`✅ Sistema Listo: Se detectaron ${devices.length} mockups y el contenedor del modal está activo.`);

    devices.forEach((device) => {
        device.style.cursor = 'pointer'; 

        device.addEventListener('click', (e) => {
            console.log("📱 Clic detectado. Abriendo modal...");
            e.stopPropagation(); // Evita que el clic se propague y cierre el acordeón de fondo
            
            // Clonación e inyección del mockup
            modalBody.innerHTML = '';
            const clonedDevice = device.cloneNode(true);
            modalBody.appendChild(clonedDevice);
            
            // Mostrar modal
            modal.classList.add('is-active');
            document.body.classList.add('modal-open');
        });
    });

    // Lógica para cerrar el modal
    const closeModal = () => {
        modal.classList.remove('is-active');
        document.body.classList.remove('modal-open');
        setTimeout(() => { modalBody.innerHTML = ''; }, 300); // Limpiar DOM tras la animación
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); // Cerrar si se hace clic fuera del teléfono
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal();
    });
});


/* ==========================================================================
   4. CONTROL DE MÓDULOS DESDE LA SECCIÓN "MI ROL" (ENLACES ANCLA)
   Permite hacer clic en las tarjetas de "Flujos Críticos" para navegar 
   y abrir automáticamente el tab o acordeón correspondiente.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const flowLinks = document.querySelectorAll(".flow-card-link[data-to-tab]");

    flowLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            const targetModuleId = link.getAttribute("data-to-tab");
            const targetSection = document.querySelector(link.getAttribute("href"));

            if (targetSection) {
                // 1. Activar la Tab en Desktop
                const desktopTabBtn = document.querySelector(`.tab-btn[data-target="${targetModuleId}"]`);
                if (desktopTabBtn && !desktopTabBtn.classList.contains("active")) {
                    desktopTabBtn.click(); 
                }

                // 2. Activar el Acordeón en Mobile
                const mobileAccordionItem = document.getElementById(targetModuleId);
                if (mobileAccordionItem && !mobileAccordionItem.classList.contains("active")) {
                    const accordionHeader = mobileAccordionItem.querySelector(".accordion-header");
                    if (accordionHeader) accordionHeader.click();
                }

                // 3. Scroll suave hacia la sección
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});


/* ==========================================================================
   5. ANIMACIONES SCROLL REVEAL (INTERSECTION OBSERVER)
   Agrega la clase 'is-visible' a los elementos cuando entran en la pantalla.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Solo se anima la primera vez
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));
});


/* ==========================================================================
   6. CARRUSEL ESTÁTICO DE PANTALLAS (CONTROL MANUAL)
   Navegación controlada exclusivamente por el usuario (sin transiciones automáticas).
   Sincroniza múltiples contenedores visuales y controles de puntos.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const screenContainers = document.querySelectorAll('.screen-content');
    
    if(!prevBtn || !nextBtn) return; // Validación de seguridad

    let currentIndex = 0;
    const totalSlides = 3;

    function changeSlide(targetIndex) {
        currentIndex = targetIndex;

        // Sincronizar imágenes
        screenContainers.forEach(container => {
            const slides = container.querySelectorAll('.slide');
            slides.forEach((slide, idx) => {
                if (idx === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        });

        // Actualizar puntos de navegación
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        let index = currentIndex - 1;
        if (index < 0) index = totalSlides - 1;
        changeSlide(index);
    });

    nextBtn.addEventListener('click', () => {
        let index = currentIndex + 1;
        if (index >= totalSlides) index = 0;
        changeSlide(index);
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            changeSlide(idx);
        });
    });
});


/* ==========================================================================
   7. INTERACTIVE BLUEPRINT LOGIC (MOBILE PANEL HANDLER)
   Maneja los puntos interactivos en mobile, inyectando su información 
   en el panel descriptivo con animaciones fade-in/fade-out.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const hotspots = document.querySelectorAll('.hotspot');
    const mobileTitle = document.getElementById('mobile-title');
    const mobileDesc = document.getElementById('mobile-desc');
    const panelTextContainer = document.querySelector('.panel-text');

    if (!hotspots.length || !mobileTitle) return;

    hotspots.forEach(spot => {
        spot.addEventListener('click', (e) => {
            // Solo actuar en pantallas móviles (Desktop usa CSS Hover)
            if (window.innerWidth > 768) return;

            hotspots.forEach(h => h.classList.remove('active'));
            spot.classList.add('active');

            const tooltipH4 = spot.querySelector('.hotspot-tooltip h4');
            const tooltipP = spot.querySelector('.hotspot-tooltip p');

            if (tooltipH4 && tooltipP) {
                panelTextContainer.classList.add('fade-text');
                
                setTimeout(() => {
                    mobileTitle.innerHTML = tooltipH4.innerHTML;
                    mobileDesc.innerHTML = tooltipP.innerHTML;
                    panelTextContainer.classList.remove('fade-text');
                }, 300); // 300ms sincronizado con el CSS
            }
        });
    });
});


/* ==========================================================================
   8. TABS SECUNDARIOS DE VISUALIZADORES MANUALES
   Componente extra para controlar contenedores específicos '.visualizer-screen'
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.module-tab');
    const screens = document.querySelectorAll('.visualizer-screen');

    if(tabs.length > 0 && screens.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                screens.forEach(s => s.classList.remove('active'));

                tab.classList.add('active');
                const targetId = tab.getAttribute('data-target');
                const targetScreen = document.getElementById(targetId);
                
                if(targetScreen) {
                    targetScreen.classList.add('active');
                }
            });
        });
    }
});


/* ==========================================================================
   9. GLOBAL: CONTROL DE IDIOMA PARA VISORES FAKE-PDF
   Función accesible globalmente para ser invocada desde el switcher de idiomas.
   ========================================================================== */
function switchPortfolioLanguage(lang) {
    const pdfContainers = document.querySelectorAll('.wrapper-pdf');
    
    pdfContainers.forEach(wrapper => {
        wrapper.setAttribute('data-current-lang', lang);
        
        // Actualiza el link del botón externo según el idioma
        const externalBtn = wrapper.querySelector('.btn-open-pdf');
        if (externalBtn) {
            const pathTarget = externalBtn.getAttribute(`data-pdf-${lang}`);
            if (pathTarget) {
                externalBtn.setAttribute('href', pathTarget);
            }
        }
    });
}