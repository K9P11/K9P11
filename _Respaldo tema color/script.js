// ==========================================================================
// CONFIGURACIÓN INICIAL DE TEMA (LIGHT/DARK) 
// ==========================================================================
const themeBtn = document.querySelector('#theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});















// ==========================================================================
// PRECISION SCROLL (TARGETING SECTION TAG + 2REM OFFSET)
// ==========================================================================

const initPrecisionScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    // Detectamos el header para restar su altura
    const header = document.querySelector('.header') || document.querySelector('header') || document.getElementById('main-header');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id === "#" || id === "") return;

            const section = document.querySelector(id);
            if (section) {
                e.preventDefault();

                /**
                 * PRIORIDAD DE TARGET:
                 * 1. El tag de acento (// 01...)
                 * 2. El título h2
                 * 3. La sección misma
                 */
                const targetElement = section.querySelector('.accent-color') || 
                                    section.querySelector('h2') || 
                                    section;
                
                // 1. Calculamos la altura real del header
                const headerHeight = header ? header.offsetHeight : 0;
                
                // 2. Calculamos 2rem de forma dinámica (32px por defecto)
                const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;

                // 3. Calculamos la posición absoluta del elemento respecto al documento
                const targetPos = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // 4. Posición final: Posición del tag - altura del header - respiro de 2rem
                const finalPosition = targetPos - headerHeight - gap;

                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });

                // Feedback técnico en consola
                console.log(`Scrolling to tag in ${id} with ${headerHeight}px header offset.`);
            }
        });
    });
};

// Inicialización que garantiza que el DOM y el Header estén listos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrecisionScroll);
} else {
    initPrecisionScroll();
}

















// ==========================================================================
// CONFIGURACIÓN DE IDIOMAS Y TRADUCCIONES
// ==========================================================================
const langBtn = document.querySelector('#lang-toggle');
let currentLang = localStorage.getItem('language') || 'es';

const translations = {
    es: { 
        // Nombre página
        "nameTuali": "Proyecto: Tuali | Arca continental",
        // Navegación
        "nav-projects": "Proyectos",
        "nav-lab": "Laboratorio",
        "nav-edu": "Formación",
        "nav-about": "Sobre mí",
        "nav-contact": "Contacto",
        
        // Hero
        "hero-title": "Donde la visión del usuario se une <span class='text-accent'>a la precisión técnica.</span>",
        "btn-projects": "Explorar Proyectos",
        "btn-cv": "Contacto",
        
        // Controles Lottie
        "ctrl-play": "Reproducir",
        "ctrl-pause": "Pausar",
        "ctrl-reboot": "Reiniciar",
        "ctrl-speed-label": "Vel:",

        // SECCIÓN PROYECTOS
        "section-prj-tag": "// 01. PORTAFOLIO DE PROYECTOS",
        "section-prj-title": "Proyectos destacados",
        "section-prj-desc": "Soluciones de diseño donde la complejidad técnica se transforma en experiencias intuitivas y escalables.",
        
        "prj-1-title": "Ecosistema Transaccional B2B",
        "prj-1-desc": "Rediseño de la interfaz de pedidos masivos para Arca Continental, optimizando la jerarquía visual para reducir el tiempo de levantamiento de inventario en campo.",
        "prj-1-cta": "Explorar Caso de estudio",

        "prj-2-title": "Autogestión de Pólizas Complejas",
        "prj-2-desc": "Simplificación del flujo de cotización y gestión aseguradora, transformando burocracia en experiencias digitales seguras y fluidas.",
        "prj-2-cta": "Explorar Caso de estudio",

        // SECCIÓN LABORATORIO
        "section-lab-tag": "// 02. LABORATORIO CREATIVO",
        "section-lab-title": "Creación de artefactos",
        "section-lab-desc": "Exploraciones en diseño y prototipado interactivo para optimizar el impacto visual.",
        
        "lab-swipe-hint": "Desliza para explorar",
        "lab-btn-aria": "Ver detalles",
        "btn-archive": "VER ARCHIVO COMPLETO",

        "lab-1-tag": "[Psicología UX y Motion Design]",
        "lab-1-title": "Mitigación de Carga Cognitiva",
        "lab-1-desc": "Este artefacto surge de un análisis profundo sobre la percepción del tiempo y la ansiedad del usuario durante procesos de carga prolongados. Utilizando principios de la Psicología de la Gestalt, se implementó una micro-interacción basada en físicas de fluidos que proporciona un estímulo visual constante y no repetitivo. Desde la perspectiva de branding, el comportamiento del líquido actúa como un refuerzo sutil de la identidad visual, transformando un 'punto de dolor' técnico en una experiencia de deleite que reduce la tasa de abandono al optimizar la visibilidad del estado del sistema.",

        "lab-2-tag": "[Arquitectura de Información]",
        "lab-2-title": "Optimización de Flujos",
        "lab-2-desc": "Modelado de procesos complejos para la estandarización de flujos críticos dentro de la plataforma. A través del mapeo de estados asíncronos y la reducción de pasos redundantes, este esquema optimiza la arquitectura de información para minimizar la carga cognitiva del usuario. El análisis se centró en identificar cuellos de botella operativos, traduciéndolos en soluciones visuales que agilizan la toma de decisiones y mejoran la eficiencia del ecosistema digital.",

        "lab-3-tag": "[UX Asíncrona y Diseño Transaccional]",
        "lab-3-title": "Visibilidad en Checkout",
        "lab-3-desc": "Basado en la heurística de visibilidad del estado del sistema, este componente resuelve la incertidumbre durante la latencia de respuesta del servidor en el flujo de pago. El diseño se centró en un análisis de flujo donde el usuario suele experimentar fricción; al visualizar el 'empaquetado' del pedido, se crea un puente mental entre la acción digital y la logística física real de Tuali. La animación garantiza un alto rendimiento en dispositivos móviles sin sacrificar la claridad, fortaleciendo la confianza del usuario mediante un feedback transaccional humano y transparente.",

        "lab-4-tag": "[Gamificación e Identidad 3D]",
        "lab-4-title": "Refuerzo y Gamificación",
        "lab-4-desc": "Diseño de un activo 3D optimizado para web que funciona como el eje central del sistema de recompensas de Tuali. El análisis de usuario reveló la necesidad de un 'momento de gloria' tangible tras completar transacciones críticas; por ello, el motion de la moneda fue calibrado para transmitir valor y exclusividad mediante reflejos y rotaciones dinámicas. Esta pieza integra el lenguaje visual de la marca en un entorno tridimensional, funcionando como una herramienta de retención que utiliza el refuerzo positivo para incentivar la recurrencia y elevar el valor percibido del producto.",

        // SECCIÓN FORMACIÓN (NUEVO: TRADUCCIÓN COMPLETA DE CURSOS)
        "edu-tag": "// 03. Formación académica",
        "edu-title": "Títulos y certificados",
        "edu-subtitle": "Sustento teórico y rigor técnico detrás de cada decisión de producto.",
        "edu-verify": "Ver certificado",
        "edu-name-eng": "Ingeniería en Comunicaciones y Electrónica",
        "edu-name-maven": "Programa Avanzado de Figma (AFTP)",
        "edu-name-norman": "Diseño para el Siglo XXI — Don Norman",
        "edu-name-mgmt": "Gestión de UX: Estrategia y Táctica",
        "edu-name-hci": "Interacción Humano-Computadora (HCI)",
        "edu-name-a11y": "Accesibilidad: Cómo diseñar para todos",
        
        "edu-btn-more": "Ver 20 certificados más",
        "edu-btn-less": "Ver menos",

        // Lista Secundaria (Asegúrate de poner estos data-key en tu HTML)
        "edu-list-tech": "Técnico en Procesos Industriales",
        "edu-list-ai": "IA para Diseñadores",
        "edu-list-mobile-ux": "Estrategia de UX Móvil",
        "edu-list-memory": "Percepción y Memoria en HCI",
        "edu-list-emotional": "Diseño Emocional",
        "edu-list-vr": "UX para Realidad Virtual",
        "edu-list-gestalt": "Psicología de la Gestalt para Web",
        "edu-list-usability": "Diseño Web para Usabilidad",
        "edu-list-journey": "Mapeo de Trayectoria (Journey Mapping)",
        "edu-list-mobile-ui": "Diseño de UI Móvil",
        "edu-list-affordance": "Affordances: UI Intuitiva",
        "edu-list-howtoCrea": "Creación de productos intuitivos mediante la fisicalidad",
        "edu-list-thought": "Diseño para el Pensamiento y la Emoción",
        "edu-list-visual-perc": "Guía Definitiva de Percepción Visual y Diseño",
        "edu-list-ux-guide": "Experiencia de Usuario: Guía para Principiantes",
        "edu-list-visual-guide": "Diseño Visual: La Guía Definitiva",
        "edu-list-research": "Investigación de Usuario: Métodos y Prácticas",
        "edu-list-patterns": "Patrones de UI para Software Exitoso",
        "edu-list-data": "Diseño Basado en Datos: Investigación Cuantitativa",
        "edu-list-agile": "Métodos Ágiles para el Diseño de UX",
        
        //ABOUT
        "about-num": "// 04. Sobre mí",
        "about-lead": "Mentalidad de producto, lenguaje transversal e impacto estratégico.",
        "about-p1": "Me especializo en crear sistemas visuales donde la estética no es solo un objetivo, sino una herramienta para resolver problemas de negocio. Mi enfoque me permite basar cada decisión en objetivos de producto y una arquitectura de información coherente, asegurando productos que priorizan la claridad y el rendimiento.",
        "about-p2": "Valoro enormemente la fluidez en el handoff técnico. Entender las posibilidades de los stacks modernos me permite proponer soluciones que son, por naturaleza, viables y consistentes, permitiendo que el producto crezca sin comprometer su integridad técnica.",
        "foundation-1-title": "Lógica de Sistemas",
        "foundation-1-desc": "Creación de Design Systems con arquitectura modular y tokens que facilitan la implementación.",
        "foundation-2-title": "Empatía Técnica",
        "foundation-2-desc": "Dominio de las limitaciones del navegador, performance web y estándares de accesibilidad (a11y).",
        "foundation-3-title": "Rigor de Producto",
        "foundation-3-desc": "Estrategia basada en datos y prototipado de alta fidelidad que reduce el retrabajo en construcción.",
        "tools-label": "Arsenal Tecnológico & Herramientas",

        //CONTACTO
        "contact-num": "// 05. Contacto",
        "contact-title": "Hablemos de tu proyecto",
        "contact-lead": "Ya sea para resolver un reto técnico, colaborar en el diseño de un producto o simplemente saludar, mi bandeja de entrada siempre está abierta.",
        "contact-status": "Disponible para nuevos proyectos",
        "contact-copy": "Copiar",
        "contact-vcard": "Guardar contacto",
        "assets-title": "Documentación técnica",
        "assets-cv": "CV",
        "assets-portfolio": "Portafolio",
        "footer-built": "Construido con Vanilla JS, HTML5 y CSS3.",
        "footer-no-frameworks": "Sin frameworks, arquitectura pura.",
        
        
        
        
        
        
        
        
        
        
        //TUALI: HERO
        "brand-parent": "Arca Continental",
        "tuali-hero-title":"Tuali: Ecosistema B2B",
        "tuali-hero-title":"Tuali: Ecosistema B2B",
        "tuali-hero-desc":"Digitalización del canal tradicional para maximizar el",
        "ltv-meaning": "(Valor de Vida del Cliente)",
        "tuali-hero-desc-2":"y la eficiencia operativa en campo.",
        "kpi-adoption": "Adopción",
        "kpi-aov": "AOV",
        "kpi-friction": "Fricción",
        
        "challenge_title": "01. La Misión",
        "challenge_desc": "El reto consistió en transformar un modelo comercial tradicional de visitas físicas en un ecosistema de autoservicio B2B. El objetivo fue garantizar la operatividad técnica en zonas de baja conectividad sin comprometer la relación de confianza con el usuario final.",
        "challenge_card_1_title": "Adopción e Inclusión Digital",
        "challenge_card_1_desc": "Diseño de interfaces optimizadas para dispositivos de gama baja, eliminando barreras tecnológicas y facilitando la transición al canal digital.",
        "challenge_card_2_title": "Arquitectura y Sincronización",
        "challenge_card_2_desc": "Gestión de más de 1,500 SKUs con reglas de precio dinámicas y control de stock en tiempo real para soportar picos masivos de transacciones.",
        "challenge_card_3_title": "Escalabilidad Multiregión",
        "challenge_card_3_desc": "Localización en México, Argentina, Perú y Ecuador; gestionando multidivisas y adaptando el UX Writing al contexto cultural de cada mercado.",
    },
    en: { 
        // Nombre página
        "nameTuali": "Proyec: Tuali | Arca continental",    
        // Navigation
        "nav-projects": "Projects",
        "nav-lab": "Creative Lab",
        "nav-edu": "Education",
        "nav-about": "About me",
        "nav-contact": "Contact",
        
        // Hero
        "hero-title": "Where user insight meets <span class='text-accent'>technical precision.</span>",
        "btn-projects": "Explore Projects",
        "btn-cv": "Contact",
        
        // Lottie Controls
        "ctrl-play": "Play",
        "ctrl-pause": "Pause",
        "ctrl-reboot": "Reboot",
        "ctrl-speed-label": "Spd:",

        // SECCIÓN PROYECTOS
        "section-prj-tag": "// 01. PROJECT PORTFOLIO",
        "section-prj-title": "Featured Projects",
        "section-prj-desc": "Design solutions where technical complexity is transformed into intuitive, scalable user experiences.",
        "prj-1-title": "B2B Transactional Ecosystem",
        "prj-1-desc": "Redesigning the high-volume ordering interface for Arca Continental, optimizing visual hierarchy to reduce field inventory turnaround time.",
        "prj-1-cta": "View Case Study",
        "prj-2-title": "Complex Policy Self-Service",
        "prj-2-desc": "Simplifying the insurance quoting and management flow, transforming bureaucratic processes into secure, seamless digital experiences.",
        "prj-2-cta": "View Case Study",

        // CREATIVE LAB SECTION
        "section-lab-tag": "// 02. CREATIVE LAB",
        "section-lab-title": "Artifact Creation",
        "section-lab-desc": "Explorations in design and interactive prototyping to optimize visual impact.",
        
        "lab-swipe-hint": "Swipe to explore",
        "lab-btn-aria": "View details",
        "btn-archive": "VIEW FULL ARCHIVE",

        "lab-1-tag": "[UX Psychology & Motion Design]",
        "lab-1-title": "Cognitive Load Mitigation",
        "lab-1-desc": "This artifact stems from a deep analysis of time perception and user anxiety during prolonged loading processes. Applying Gestalt Psychology principles, a fluid-physics micro-interaction was implemented to provide a constant, non-repetitive visual stimulus. From a branding perspective, the liquid's behavior acts as a subtle reinforcement of visual identity, transforming a technical 'pain point' into a delightful experience that reduces bounce rates by optimizing system status visibility.",

        "lab-2-tag": "[Information Architecture]",
        "lab-2-title": "Flow Optimization",
        "lab-2-desc": "Modeling of complex processes for the standardization of critical flows within the platform. By mapping asynchronous states and reducing redundant steps, this schema optimizes the information architecture to minimize user cognitive load. The analysis focused on identifying operational bottlenecks, translating them into visual solutions that streamline decision-making and enhance the overall efficiency of the digital ecosystem.",

        "lab-3-tag": "[Asynchronous UX & Transactional Design]",
        "lab-3-title": "Checkout Visibility",
        "lab-3-desc": "Based on the 'visibility of system status' heuristic, this component resolves uncertainty during server response latency in the payment flow. The design focused on flow analysis where users typically experience friction; by visualizing the 'packaging' of the order, a mental bridge is created between the digital action and Tuali's real physical logistics. The animation ensures high performance on mobile devices without sacrificing clarity, strengthening user trust through human and transparent transactional feedback.",

        "lab-4-tag": "[Gamification & 3D Identity]",
        "lab-4-title": "Reward & Gamification",
        "lab-4-desc": "Design of a web-optimized 3D asset that serves as the centerpiece for Tuali's reward system. User analysis revealed the need for a tangible 'moment of glory' after completing critical transactions; thus, the coin's motion was calibrated to convey value and exclusivity through dynamic reflections and rotations. This piece integrates the brand's visual language into a three-dimensional environment, serving as a retention tool that uses positive reinforcement to incentivize recurrence and elevate the product's perceived value.",

        // EDUCATION SECTION
        "edu-tag": "// 03. Academic Background",
        "edu-title": "Degrees & Certifications",
        "edu-subtitle": "Theoretical foundation and technical rigor behind every product decision.",
        "edu-verify": "View certificate",
        "edu-name-eng": "Communications and Electronics Engineering",
        "edu-name-maven": "Advanced Figma Training Program",
        "edu-name-norman": "Design for the 21st Century — Don Norman",
        "edu-name-mgmt": "UX Management: Strategy and Tactics",
        "edu-name-hci": "Human-Computer Interaction (HCI)",
        "edu-name-a11y": "Accessibility: How to Design for All",
        
        "edu-btn-more": "View 20 more certificates",
        "edu-btn-less": "View less",

        // Secondary List
        "edu-list-tech": "Industrial Processes Technician",
        "edu-list-ai": "AI for Designers",
        "edu-list-mobile-ux": "Mobile UX Strategy",
        "edu-list-memory": "Perception & Memory in HCI",
        "edu-list-emotional": "Emotional Design",
        "edu-list-vr": "UX for Virtual Reality",
        "edu-list-gestalt": "Gestalt Psychology for Web",
        "edu-list-usability": "Web Design for Usability",
        "edu-list-journey": "Journey Mapping",
        "edu-list-mobile-ui": "Mobile UI Design",
        "edu-list-affordance": "Affordances: Intuitive UI",
        "edu-list-howtoCrea": "Intuitive Products by Imitating Physicality",
        "edu-list-thought": "Design for Thought and Emotion",
        "edu-list-visual-perc": "Ultimate Guide to Visual Perception & Design",
        "edu-list-ux-guide": "User Experience: The Beginner’s Guide",
        "edu-list-visual-guide": "Visual Design: The Ultimate Guide",
        "edu-list-research": "User Research: Methods and Best Practices",
        "edu-list-patterns": "UI Design Patterns for Successful Software",
        "edu-list-data": "Data-Driven Design: Quantitative Research",
        "edu-list-agile": "Agile Methods for UX Design",

        //ABOUT
        "about-num": "// 04. About me",
        "about-lead": "Product mindset, cross-functional language, and strategic impact.",
        "about-p1": "I specialize in creating visual systems where aesthetics are not just a goal, but a tool for solving business problems. My approach allows me to base every decision on product objectives and coherent information architecture, ensuring products that prioritize clarity and performance.",
        "about-p2": "I place a high value on seamless technical handoffs. Understanding the possibilities of modern stacks enables me to propose solutions that are inherently viable and consistent, allowing the product to scale without compromising technical integrity.",
        "foundation-1-title": "Systems Logic",
        "foundation-1-desc": "Architecting Design Systems with modular structures and tokens to streamline implementation.",
        "foundation-2-title": "Technical Empathy",
        "foundation-2-desc": "Deep understanding of browser constraints, web performance, and accessibility standards (a11y).",
        "foundation-3-title": "Product Rigor",
        "foundation-3-desc": "Data-driven strategy and high-fidelity prototyping to minimize development rework.",
        "tools-label": "Tech Arsenal & Tools",

        //Connect
        "contact-num": "// 05. Contact",
        "contact-title": "Let's talk about your project",
        "contact-lead": "Whether it's solving a technical challenge, collaborating on product design, or just saying hi, my inbox is always open.",
        "contact-status": "Available for new projects",
        "contact-copy": "Copy",
        "contact-vcard": "Save contact",
        "assets-title": "Technical Documentation",
        "assets-cv": "Resume (CV)",
        "assets-portfolio": "Portfolio Deck",
        "footer-built": "Built with Vanilla JS, HTML5 & CSS3.",
        "footer-no-frameworks": "No frameworks, pure architecture.",
        
        
        
        
        
        
        
        
        
        
        //TUALI: HERO
        "brand-parent": "Arca Continental",
       "tuali-hero-title":"Test",
        "ltv-meaning": "(Lifetime Value)",
        "kpi-adoption": "Adoption",
        "kpi-aov": "AOV",
        "kpi-friction": "Friction",
        "":"",
        "":"",
        "":"",
        "":"",
        //TUALI: CHALLENGUE
        "challenge_title": "01. The Mission",
        "challenge_desc": "The challenge consisted of transforming a traditional business model based on physical visits into a B2B self-service ecosystem. The goal was to ensure technical operability in low-connectivity areas without compromising the relationship of trust with the end user.",
        "challenge_card_1_title": "Digital Adoption & Inclusion",
        "challenge_card_1_desc": "Design of optimized interfaces for low-end devices, removing technological barriers and facilitating the transition to the digital channel.",
        "challenge_card_2_title": "Architecture & Synchronization",
        "challenge_card_2_desc": "Management of over 1,500 SKUs with dynamic pricing rules and real-time stock control to support massive B2B transaction peaks.",
        "challenge_card_3_title": "Multi-region Scalability",
        "challenge_card_3_desc": "Localization in Mexico, Argentina, Peru, and Ecuador; managing multi-currency and adapting UX Writing to the cultural context of each market.",
    }
};

// ==========================================================================
// ALGORITMO PERFECT TEXT FIT
// ==========================================================================
function fitTextToBox() {
    const container = document.querySelector('.h1adjuts');
    const textEl = document.getElementById('hero-title');
    if (!container || !textEl) return;

    const availableWidth = container.clientWidth;
    const availableHeight = container.clientHeight;
    if (availableWidth <= 0 || availableHeight <= 0) return;

    const originalOpacity = textEl.style.opacity;
    textEl.style.opacity = '0'; 
    textEl.style.fontSize = '10px'; 
    textEl.style.display = 'inline-block'; 
    
    let min = 16, max = 160, bestFit = min;
    while (min <= max) {
        let mid = Math.floor((min + max) / 2);
        textEl.style.fontSize = mid + 'px';
        if (textEl.scrollWidth <= availableWidth && textEl.scrollHeight <= availableHeight) {
            bestFit = mid;
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }
    textEl.style.fontSize = bestFit + 'px';
    textEl.style.display = ''; 
    textEl.style.opacity = originalOpacity; 
    // Sincronización para escalar el tamaño de imagen en la sección About me
    syncAboutDimensions();
}

// ==========================================================================
// LÓGICA DE ACTUALIZACIÓN DE INTERFAZ
// ==========================================================================
const updateLanguage = (lang) => {
    // 1. Hero Title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.innerHTML = translations[lang]["hero-title"];
    
    // 2. Elementos data-key (Texto plano o spans internos)
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            // Buscamos si hay un span interno para no pisar iconos SVG
            const innerSpan = el.querySelector('span');
            if (innerSpan) {
                innerSpan.innerText = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    // 3. Aria-Labels
    document.querySelectorAll('[data-key-aria]').forEach(el => {
        const key = el.getAttribute('data-key-aria');
        if (translations[lang][key]) el.setAttribute('aria-label', translations[lang][key]);
    });

    // 4. Switch visual
    if (langBtn) {
        langBtn.innerHTML = lang === 'en' 
            ? '<span class="lang-label">ES</span> / <span class="lang-label current">EN</span>' 
            : '<span class="lang-label current">ES</span> / <span class="lang-label">EN</span>';
    }

    localStorage.setItem('language', lang);
    currentLang = lang;
    fitTextToBox();
};

// ==========================================================================
// MANEJO DE EVENTOS (Delegación)
// ==========================================================================
document.addEventListener('click', (e) => {
    // Cambio de idioma
    if (e.target.closest('#lang-toggle')) {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(newLang);
    }

    // Toggle de certificados de Educación
    const eduToggle = e.target.closest('.edu-toggle-btn');
    if (eduToggle) {
        const container = document.getElementById('edu-secondary-container');
        if (container) {
            container.classList.toggle('is-visible');
            // Si cerramos, volvemos arriba de la sección educación para no perder el foco
            if (eduToggle.classList.contains('secondary-toggle') && !container.classList.contains('is-visible')) {
                document.getElementById('education').scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ==========================================================================
// INICIALIZADORES
// ==========================================================================
const resizeObserver = new ResizeObserver(() => fitTextToBox());

document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
    const container = document.querySelector('.h1adjuts');
    if (container) resizeObserver.observe(container);
});

















// ==========================================================================
// "LAMPARA"
// ==========================================================================
const spotlight = document.querySelector('.spotlight-overlay');
// Solo ejecutamos si el dispositivo tiene mouse
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
            spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    });
}









// ==========================================================================
// MENÚ MÓVIL (Hamburguesa y Navegación)
// ==========================================================================
const mobileBtn = document.querySelector('#mobile-btn');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

mobileBtn.addEventListener('click', () => {
    // Activa animación de la "X" en el CSS
    mobileBtn.classList.toggle('active');
    // Abre/Cierra el menú lateral
    navMenu.classList.toggle('active');
    // Bloquea el scroll del body para mejorar la UX en móvil
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Cerrar menú automáticamente al hacer clic en un enlace (Anclaje)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});









// ==========================================================================
// EFECTOS DE SCROLL (Header y Revelación)
// ==========================================================================
const header = document.querySelector('#main-header');
// Observer para revelar secciones suavemente
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
// Inicializar el observer y el evento de scroll
window.addEventListener('scroll', () => {
    // Cambia el estado del header al bajar Xpx
    header.classList.toggle('header-scrolled', window.scrollY > 10);
});
// Aplicar el efecto de revelación a todos los elementos con la clase
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));









// ==========================================================================
// MARQUEE
// ==========================================================================
const syncMarqueeWidth = () => {
    const heroTitle = document.querySelector('#hero h1');
    const marquee = document.querySelector('.hero-marquee-container');
    
    if (heroTitle && marquee) {
        // Creamos un Range para medir exactamente dónde termina el texto real
        const range = document.createRange();
        range.selectNodeContents(heroTitle);
        const rects = range.getClientRects();        
        // Buscamos el ancho máximo de todas las líneas renderizadas
        let maxWidth = 0;
        for (let rect of rects) {
            if (rect.width > maxWidth) maxWidth = rect.width;
        }
        // Aplicamos el ancho al Marquee mediante una variable CSS
        document.documentElement.style.setProperty('--hero-content-width', `${maxWidth}px`);
    }
};
// Ejecutar al cargar y al redimensionar la pantalla
window.addEventListener('load', syncMarqueeWidth);
window.addEventListener('resize', syncMarqueeWidth);









// ==========================================================================
// LOTTIE INTERACTIVITY LOGIC (OPTIMIZED)
// ==========================================================================
const player = document.getElementById('hero-lottie');
const playBtn = document.getElementById('lp-play-pause');
const timeline = document.getElementById('lp-timeline');
const speedVal = document.getElementById('speed-val');

// Sincronizar Timeline
player.addEventListener('ready', () => {
    timeline.max = player.getLottie().totalFrames;
});

player.addEventListener('frame', (e) => {
    timeline.value = e.detail.frame;
});

timeline.addEventListener('input', () => {
    player.seek(Math.round(timeline.value));
});

// Play/Pause con Morphing corregido
playBtn.addEventListener('click', () => {
    const lottie = player.getLottie();
    if (lottie.isPaused) {
        player.play();
        playBtn.classList.remove('is-paused'); // Muestra barras de pausa (||)
    } else {
        player.pause();
        playBtn.classList.add('is-paused'); // Muestra triángulo de play (>)
    }
});

// Reiniciar
document.getElementById('lp-restart').addEventListener('click', () => {
    player.stop();
    player.play();
    playBtn.classList.remove('is-paused');
});

// Velocidades
let speeds = [0.5, 1, 2, 3, 5];
let currentSpeedIndex = 1;

document.getElementById('lp-speed').addEventListener('click', () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    let newSpeed = speeds[currentSpeedIndex];
    player.setSpeed(newSpeed);
    speedVal.textContent = newSpeed.toFixed(1);
});









/* ==========================================================================
   Pestaña descripción assets Laboratorio
   ========================================================================== */
// Manejo de detalles en el Lab
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lab-toggle-btn');
    if (!btn) return;

    const item = btn.closest('.lab-item');
    if (item) {
        item.classList.toggle('is-expanded');
    }
});










// ==========================================================================
// LOTTIE LOOP REVERSE (Botella)
// ==========================================================================
const bottlePlayer = document.getElementById('tester');

if (bottlePlayer) {
    const startBounceLogic = () => {
        // El uso de ?. asegura que si getLottie no existe aún, no rompa el script
        const lottie = bottlePlayer.getLottie?.();
        
        if (!lottie) return;

        lottie.loop = false;
        let direction = 1; 

        setInterval(() => {
            const currentFrame = lottie.currentFrame;
            const totalFrames = lottie.totalFrames;

            if (direction === 1 && currentFrame >= totalFrames - 1) {
                direction = -1;
                bottlePlayer.setDirection(-1);
                bottlePlayer.play();
            } 
            else if (direction === -1 && currentFrame <= 0.5) {
                direction = 1;
                bottlePlayer.setDirection(1);
                bottlePlayer.play();
            }

            if (lottie.isPaused) {
                bottlePlayer.play();
            }
        }, 32); 
    };

    // Escuchamos el evento 'ready' (forma oficial)
    bottlePlayer.addEventListener('ready', startBounceLogic);

    // Si por alguna razón el evento 'ready' ya pasó, intentamos ejecutarlo 
    // pero solo si la función existe para evitar el error de tu captura
    setTimeout(() => {
        if (typeof bottlePlayer.getLottie === 'function') {
            startBounceLogic();
        }
    }, 500);
}
























// ==========================================================================
// CREATIVE LAB: MANUAL NAVIGATION MODULE (Static)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    const track = document.getElementById('lab-track');
    if (!track) return; 

    const labSection = document.querySelector('.lab-unified-card');
    const mockupZone = document.querySelector('.phone-mockup');
    const dotsContainer = document.getElementById('lab-dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    const infoBox = document.getElementById('dynamic-info-box');
    const textItems = infoBox ? infoBox.querySelectorAll('.lab-text-item') : [];
    const prevBtn = document.getElementById('lab-prev');
    const nextBtn = document.getElementById('lab-next');
    const slides = track.querySelectorAll('.lab-slide');

    let currentIndex = 1; 
    let isTransitioning = false;
    const totalRealItems = 4; 

    // Rendimiento Lottie: Solo reproduce el que está a la vista
    function manageLottiePerformance(activeIndex) {
        slides.forEach((slide, idx) => {
            const player = slide.querySelector('dotlottie-player');
            if (player) {
                const instance = player.getLottie && player.getLottie();
                
                if (idx === activeIndex) {
                    if (instance) {
                        instance.goToAndPlay(0, true);
                    } else if (typeof player.play === 'function') {
                        player.play();
                    }
                } else {
                    if (instance) {
                        instance.pause();
                    } else if (typeof player.pause === 'function') {
                        player.pause();
                    }
                }
            }
        });
    }

    function updateCarousel(index, animate = true) {
        if (animate) track.style.transition = "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)";
        else track.style.transition = "none";

        track.style.transform = `translateX(-${index * 100}%)`;

        if (animate) {
            setTimeout(() => {
                let realIndex = index - 1;
                if (realIndex < 0) realIndex = totalRealItems - 1;
                if (realIndex >= totalRealItems) realIndex = 0;

                if(dots.length) dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
                if(textItems.length) textItems.forEach((item, i) => item.classList.toggle('active', i === realIndex));
                
                manageLottiePerformance(index);
            }, 300); 
        } else {
            manageLottiePerformance(index);
        }
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex === totalRealItems + 1) {
            currentIndex = 1;
            updateCarousel(currentIndex, false);
        }
        if (currentIndex === 0) {
            currentIndex = totalRealItems;
            updateCarousel(currentIndex, false);
        }
    });

    function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel(currentIndex);
    }

    function movePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel(currentIndex);
    }

    // Navegación Manual (Flechas y Puntos)
    if (nextBtn) nextBtn.addEventListener('click', moveNext);
    if (prevBtn) prevBtn.addEventListener('click', movePrev);
    
    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                if (isTransitioning || currentIndex === i + 1) return;
                currentIndex = i + 1;
                updateCarousel(currentIndex);
            });
        });
    }

    // Teclado
    if (labSection) {
        labSection.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') movePrev();
            if (e.key === 'ArrowRight') moveNext();
        });
    }

    // Swipe Táctil (Mantenemos el swipe para mejor UX en móvil)
    if (mockupZone) {
        let touchStartX = 0;
        let touchStartY = 0;

        mockupZone.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: true});

        mockupZone.addEventListener('touchend', e => {
            let touchEndX = e.changedTouches[0].screenX;
            let touchEndY = e.changedTouches[0].screenY;
            let diffX = Math.abs(touchEndX - touchStartX);
            let diffY = Math.abs(touchEndY - touchStartY);

            if (diffX > diffY && diffX > 40) {
                if (touchEndX < touchStartX) moveNext();
                if (touchEndX > touchStartX) movePrev();
            }
        }, {passive: true});
    }

    // Iniciar visualmente en el primer elemento
    manageLottiePerformance(currentIndex);
}); 

// ==========================================================================
// LOTTIE LOOP REVERSE (Botella - Se mantiene igual)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const bottlePlayer = document.getElementById('tester');

    if (bottlePlayer) {
        const startBounceLogic = () => {
            const lottie = bottlePlayer.getLottie?.();
            if (!lottie) return;

            lottie.loop = false;
            let direction = 1; 

            setInterval(() => {
                const currentFrame = lottie.currentFrame;
                const totalFrames = lottie.totalFrames;

                if (direction === 1 && currentFrame >= totalFrames - 1) {
                    direction = -1;
                    bottlePlayer.setDirection(-1);
                    bottlePlayer.play();
                } 
                else if (direction === -1 && currentFrame <= 0.5) {
                    direction = 1;
                    bottlePlayer.setDirection(1);
                    bottlePlayer.play();
                }

                if (lottie.isPaused) {
                    bottlePlayer.play();
                }
            }, 32); 
        };

        bottlePlayer.addEventListener('ready', startBounceLogic);

        setTimeout(() => {
            if (typeof bottlePlayer.getLottie === 'function') {
                startBounceLogic();
            }
        }, 500);
    }
});





















// COLAPSO Certificaciones
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.edu-toggle-btn');
    const eduContainer = document.getElementById('edu-secondary-container');
    const mainToggleBtn = document.querySelector('.main-toggle');
    const mainToggleSpan = mainToggleBtn?.querySelector('span');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = eduContainer.classList.toggle('is-open');
            
            if (mainToggleBtn && mainToggleSpan) {
                mainToggleBtn.classList.toggle('is-active', isOpen);
                
                // 1. Identificar el idioma actual justo al hacer click
                const activeLang = localStorage.getItem('language') || 'es';
                const key = isOpen ? 'edu-btn-less' : 'edu-btn-more';

                // 2. Cambiar el data-key (para que el switch de idioma lo reconozca después)
                mainToggleSpan.setAttribute('data-key', key);

                // 3. Actualizar el texto inmediatamente
                if (window.translations && window.translations[activeLang]) {
                    mainToggleSpan.textContent = window.translations[activeLang][key];
                } else {
                    // Fallback manual por si el objeto translations no está disponible
                    mainToggleSpan.textContent = isOpen ? 
                        (activeLang === 'es' ? 'Ver menos' : 'See less') : 
                        (activeLang === 'es' ? 'Ver 20 certificados más' : 'View 20 more certificates');
                }

                mainToggleBtn.setAttribute('aria-expanded', isOpen);
            }

            if (!isOpen && btn.classList.contains('secondary-toggle')) {
                mainToggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});










/**
 * Sincroniza altura de imagen cuadrada con bloque de texto
 */
function syncAboutDimensions() {
    const grid = document.querySelector('.about-grid');
    const visual = document.querySelector('.image-wrapper');
    const content = document.querySelector('.about-content');

    if (!grid || !visual || !content) return;

    // Reset y detección de modo (Desktop vs Mobile)
    if (window.innerWidth <= 992) {
        visual.style.removeProperty('--img-side');
        grid.classList.add('is-ready');
        return;
    }

    const containerWidth = grid.offsetWidth;
    const GAP = 16; // 1rem en píxeles (estándar)
    
    // Rango de búsqueda: la imagen no será menor a 150px ni mayor al 50% del total
    let minSide = 150;
    let maxSide = containerWidth * 0.5;
    let bestSide = 300;

    // Ejecutamos 8 iteraciones para precisión de sub-píxel
    for (let i = 0; i < 8; i++) {
        let testSide = (minSide + maxSide) / 2;
        
        // Calculamos cuánto ancho le queda al texto si la imagen mide 'testSide'
        let availableTextWidth = containerWidth - testSide - GAP;
        content.style.width = `${availableTextWidth}px`;
        
        let textHeight = content.offsetHeight;

        // Como la imagen es 1:1, su alto es igual a su ancho (testSide)
        if (testSide > textHeight) {
            maxSide = testSide; // Imagen muy grande, reducimos
        } else {
            minSide = testSide; // Imagen muy pequeña, aumentamos
        }
        bestSide = testSide;
    }

    // Aplicamos el tamaño final
    visual.style.setProperty('--img-side', `${bestSide}px`);
    content.style.width = ''; // Limpiamos el ancho temporal para que fluya normal
    
    // Mostramos la sección sin saltos visuales
    requestAnimationFrame(() => {
        grid.classList.add('is-ready');
    });
}

// --- Listeners de Control ---

// 1. Al cargar la página y todas las fuentes/imágenes
window.addEventListener('load', syncAboutDimensions);

// 2. Al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    clearTimeout(window.aboutResizeTimer);
    window.aboutResizeTimer = setTimeout(syncAboutDimensions, 100);
});








// ABOUT ME MARQUEE// ==========================================================================
// ==========================================================================
const initMarquee = () => {
    const container = document.querySelector('.tools-marquee-container');
    const track = document.getElementById('toolsTicker');

    if (!container || !track) return;

    // Clonar contenido x3 para asegurar bucle infinito
    const content = track.innerHTML;
    track.innerHTML = content + content + content;

    let scrollPos = 0;
    let isDragging = false;
    let startX = 0;
    let currentScrollLeft = 0;
    let isHovering = false;
    const speed = 0.3; // Velocidad exacta

    const getBlockWidth = () => track.scrollWidth / 3;

    // Función de actualización (60fps)
    const update = () => {
        if (!isDragging && !isHovering) {
            const blockWidth = getBlockWidth();
            scrollPos += speed;

            // Si llegamos al final del segundo bloque, reseteamos al primero
            if (scrollPos >= blockWidth * 2) {
                scrollPos -= blockWidth;
            }
            container.scrollLeft = scrollPos;
        }
        requestAnimationFrame(update);
    };

    // --- Interacciones ---
    container.addEventListener('mouseenter', () => isHovering = true);
    container.addEventListener('mouseleave', () => isHovering = false);

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        currentScrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        let nextScroll = currentScrollLeft - walk;

        // Bucle infinito durante el arrastre manual
        const blockWidth = getBlockWidth();
        if (nextScroll <= 0) nextScroll += blockWidth;
        if (nextScroll >= blockWidth * 2) nextScroll -= blockWidth;

        scrollPos = nextScroll;
        container.scrollLeft = nextScroll;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });

    // Iniciar cuando el DOM esté listo
    setTimeout(() => {
        const startPoint = getBlockWidth();
        scrollPos = startPoint;
        container.scrollLeft = startPoint;
        update();
    }, 100);
};

// Ejecutar
document.addEventListener('DOMContentLoaded', initMarquee);
















// ==========================================================================
// SECCIÓN CONTACTO Y FOOTER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica de Copy to Clipboard para Email (Con animación)
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('contact-email')?.innerText;
    const tooltip = document.getElementById('copy-tooltip');

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailText);
                
                const iconCopy = copyBtn.querySelector('.icon-copy');
                const iconCheck = copyBtn.querySelector('.icon-check');
                
                // Feedback visual: Ocultar copy, mostrar check
                if(iconCopy) iconCopy.style.display = 'none';
                if(iconCheck) iconCheck.style.display = 'block';
                copyBtn.classList.add('success');
                
                // Traducción dinámica del tooltip
                const isEnglish = localStorage.getItem('language') === 'en';
                tooltip.innerText = isEnglish ? 'Copied!' : '¡Copiado!';

                // Restaurar estado original (animación) después de 2 segundos
                setTimeout(() => {
                    if(iconCopy) iconCopy.style.display = 'block';
                    if(iconCheck) iconCheck.style.display = 'none';
                    copyBtn.classList.remove('success');
                    tooltip.innerText = isEnglish ? 'Copy' : 'Copiar';
                }, 2000);
            } catch (err) {
                console.error('Error al copiar el email: ', err);
            }
        });
    }

    // 2. Reloj Local Timezone (Formato 12hrs con AM/PM)
    const timeDisplay = document.getElementById('local-time');
    
    const updateLocalTime = () => {
        if (!timeDisplay) return;
        
        // Zona horaria fijada en CDMX con formato de 12 horas
        const options = { 
            timeZone: 'America/Mexico_City', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true // <-- Cambio a 12 hrs
        };
        
        // Usamos 'en-US' para forzar que el sufijo sea un "AM/PM" limpio
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const timeString = formatter.format(new Date());
        
        timeDisplay.innerText = `CDMX, MX — ${timeString}`;
    };

    updateLocalTime();
    setInterval(updateLocalTime, 60000); // Actualiza la hora cada minuto

    // 3. Año dinámico en Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});










































