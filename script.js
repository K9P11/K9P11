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
const initAll = () => {
    initPrecisionScroll();
    initActiveNav(); 
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
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
        "nameSMNYL": "Proyecto: Oficina Virtual | SMNYL",

        //Botón volver
        "nav-back": "Volver",

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
        
        "prj-1-meta": "2023 - Actualidad",
        "prj-1-title": "Tuali: E-commerce B2B",
        "prj-1-desc": "Diseño de una experiencia de usuario escalable e intuitiva. A través de un sistema de diseño robusto, optimizamos la navegación del core, impulsamos la retención con Rewards y facilitamos las finanzas del usuario con Créditos.",
        "prj-1-cta": "Explorar Caso de estudio",
        

        "prj-2-title": "Autogestión de Pólizas Complejas",
        "prj-2-desc": "Simplificación del flujo de cotización y gestión aseguradora, transformando burocracia en experiencias digitales seguras y fluidas.",
        "prj-2-cta": "Explorar Caso de estudio",
        "prj-2-meta": "2022 - 2023",

        // SECCIÓN LABORATORIO
        "section-lab-tag": "// 02. LABORATORIO CREATIVO",
        "section-lab-title": "Creación de artefactos",
        "section-lab-desc": "Exploraciones en diseño y prototipado interactivo para optimizar el impacto visual.",
        
        "lab-swipe-hint": "Desliza para explorar",
        "lab-btn-aria": "Ver detalles",
        "btn-archive": "Ver archivo completo",

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

        // SECCIÓN FORMACIÓN
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
        
        "edu-btn-more": "Ver 23 certificados más",
        "edu-btn-less": "Ver menos",

        // Lista Secundaria
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
        "tuali-hero-title":"Tuali: E-commerce B2B",
        "tuali-hero-desc":"Diseño de una experiencia de usuario escalable e intuitiva. A través de un sistema de diseño robusto, optimizamos la navegación del core, impulsamos la retención con Rewards y facilitamos las finanzas del usuario con Créditos.",
        "kpi-adoption": "Adopción",
        "kpi-aov": "AOV",
        "kpi-friction": "Fricción",

        //TUALI: Mi Rol
        "role_title": "01. Mi Rol y Enfoque",
        "role_lead": "Me integré al proyecto como Senior UX/UI Designer con la misión de transformar un modelo comercial tradicional en un ecosistema e-commerce B2B fluido, omnicanal y de alto impacto. Lideré el diseño end-to-end de la aplicación móvil y la versión web responsive, priorizando la adopción digital y la retención del tendero.",
        "role_subtitle_flows": "Módulos Diseñados:",
        "flow_core_title": "Flujo Core:",
        "flow_core_desc": "Optimización del flujo transaccional y el pedido diario.",
        "flow_rewards_title": "Programa de Lealtad:",
        "flow_rewards_desc": "Estrategia de lealtad e incentivos para el comercio local.",
        "flow_credit_title": "Gestión de Créditos:",
        "flow_credit_desc": "Inclusión financiera y flujos de financiamiento integrados.",

        //TUALI: El Reto        
        "challenge_title": "02. El Desafío UX",
        "challenge_desc": "El reto fue transformar un modelo comercial basado en visitas físicas en un ecosistema B2B de autoservicio. Mi objetivo principal fue garantizar la usabilidad y la confianza en un segmento de usuarios con baja adopción digital, asegurando una experiencia fluida incluso en condiciones técnicas limitadas.",
        "separadorDesafio": "Retos de Diseño UX",
        "challenge_card_1_title": "Inclusión Digital y Usabilidad",
        "challenge_card_1_desc": "Diseñé interfaces optimizadas para dispositivos de gama baja, eliminando barreras tecnológicas y facilitando la adopción del canal digital mediante flujos de navegación intuitivos.",
        "challenge_card_2_title": "Consistencia Visual Escalable",
        "challenge_card_2_desc": "Desarrollé una estrategia de diseño unificada para gestionar una plataforma de gran escala, garantizando coherencia en la interacción y consistencia visual a través de múltiples variables de producto.",
        "challenge_card_3_title": "Educación y Confianza del Usuario",
        "challenge_card_3_desc": "Superé la barrera de desconfianza ante el canal digital mediante una comunicación estratégica que educó al usuario, demostrando la seguridad y beneficios directos de la plataforma.",
        
        //TUALI: Descubrimientos
        "cta_see_more": "Ver más",
        "cta_see_less": "Ver menos",
        "insights_title": "03. Módulos Diseñados",
        "insights_statement": "Aunque intervine de forma transversal en la experiencia general de la aplicación, enfoqué mis esfuerzos principales en estructurar y diseñar tres pilares críticos para el negocio y el usuario.",
        "separadorDescubrimientos": "Áreas de Enfoque Principal",
        "insights_diag_th_concept": "Módulo",
        "insights_diag_th_problem": "Mi Aporte",
        "insights_diag_th_solution": "Objetivo",
        "insights_card_1_title": "Flujo Core",
        "insights_user_1": "Estructuración de la arquitectura de compra y el catálogo principal enfocado en la eficiencia de pedido. Optimizando el embudo de conversión mediante módulos predictivos de reabastecimiento, reduciendo el tiempo de navegación y mitigando el abandono en el checkout.",
        "insights_detail_1": "Estructura del Home:\n• Header (Sticky): Selector de punto de venta, buscador central y acceso al carrito.\n• Selectores de Negocio: Pestañas de alternancia rápida entre marcas disponibles.\n• Accesos Rápidos: Atajos directos a las categorías de mayor demanda.\n• Carrusel de Comunicación: Banners interactivos para trade marketing y avisos.\n• Módulos de Conversión: Bloques dinámicos de reabastecimiento predictivo, sugerencias regionales y ofertas con selectores de compra masiva.\n• Navbar (Bottom Sticky): Navegación inferior persistente optimizada para ergonomía móvil.",
        "scroll_hint": "🖱️ Haz scroll dentro del dispositivo para ver todo el contenido.",
        "insights_card_2_title": "Programa de Lealtad",
        "insights_user_2": "Diseño del ecosistema de fidelización y gamificación enfocado en la retención del comerciante para incrementar la frecuencia de compra mediante dinámicas de recompensas y retos comerciales específicos que elevan el Lifetime Value (LTV).",
        "insights_detail_2": "Estructura del módulo \"Gana\":\n• Navegación Contextual: Header y Navbar persistentes que mantienen el control global y la ergonomía móvil durante la exploración.\n• Gamificación Activa: El Balance de Puntos y el Módulo de Retos actúan como el motor visual, incentivando compras repetitivas a través de barras de progreso en tiempo real.\n• Sentido de Urgencia: Las Tarjetas de Participación muestran misiones comerciales activas con fechas límite claras para acelerar la conversión y mitigar el abandono.\n• Retención y Soporte: El Bloque Informativo y el Centro de Soporte resuelven dudas complejas sobre el canje de recompensas, reduciendo la fricción y asegurando la adopción digital.",
        "insights_card_3_title": "Gestión de Créditos",
        "insights_user_3": "Diseño de interfaz para el control y visualización de financiamientos. Brinda una experiencia transparente y segura para la aplicación de líneas de crédito sin fricción financiera.",

        //TUALI: Solución
        "solution_title": "04. Solución y Ejecución",
        "solution_desc": "Mi enfoque se centró en construir una infraestructura de diseño escalable y procesos de validación que garantizaron un lanzamiento exitoso y una adopción efectiva.",
        "solution_separator": "Procesos Estratégicos",
        "solution_card_1_title": "Sistema de Diseño Escalable",
        "solution_card_1_desc": "Desarrollé un Design System robusto con documentación exhaustiva y guías de estilo, garantizando la consistencia visual y acelerando el hand-off con desarrollo.",
        "pdfTitle-1": "Ejemplo DS",
        "solution_card_2_title": "Validación y Mejora Continua",
        "solution_card_2_desc": "Lideré la validación de prototipos integrando el feedback directo de usuarios y stakeholders para iterar ágilmente sobre las soluciones.",
        "pdfTitle-2": "Ejemplo de Research",
        "solution_card_3_title": "Estrategia de Adopción",
        "solution_card_3_desc": "Produje recursos de comunicación de alto impacto (assets visuales, tutoriales y guías) para educar a los usuarios sobre las nuevas funcionalidades.",
        "pdfTitle-3": "Ejemplo de Onboarding",
        "hint_desktop_explore": "Mueve el cursor para explorar",
        "hint_mobile_explore": "Desliza tu dedo para explorar",

        //TUALI: Resultados
        "impact_title": "05. Impacto y Resultados",
        "impact_desc": "El éxito del proyecto se consolidó a través de resultados cuantificables que validaron mis decisiones de diseño y mejoraron la eficiencia operativa de la plataforma.",
        "impact_label_1": "Adopción Digital",
        "impact_detail_1": "Incremento en la migración de tenderos del canal físico al digital tras la implementación del rediseño.",
        "impact_label_2": "Crecimiento en AOV",
        "impact_detail_2": "Crecimiento en el valor promedio de orden impulsado por la optimización de flujos y las nuevas funcionalidades de Rewards.",
        "impact_label_3": "Reducción de Fricción",
        "impact_detail_3": "Disminución en consultas de soporte y abandono de carrito al simplificar la arquitectura de información y el checkout.",
        "insights_detail_3": "Estructura del módulo \"Mis créditos\":\n• Navegación de Control: Header de retorno rápido con acceso a soporte de ayuda y Navbar inferior persistente que ancla el ecosistema financiero de la app.\n• Indicadores de Salud Financiera: Tarjeta principal con el balance de crédito disponible, uso de línea y fechas límite de pago para evitar el sobreendeudamiento del negocio.\n• Operatividad y Transacción: Módulo generador de códigos dinámicos para el pago en efectivo de pedidos, facilitando la recaudación física en campo de forma digital.\n• Trazabilidad Comercial: Historial de últimos movimientos con etiquetas de estado en tiempo real (Activo, Pagado, En proceso) para el control diario de las finanzas del comercio.",











        //SMNYL
        "smnyl-hero-title": "Oficina Virtual: SMNYL",
        "smnyl-hero-desc": "Diseño de una plataforma web responsiva para la fuerza de ventas líder en México. A través de un sistema de diseño escalable, optimizamos la gestión de carteras de clientes, agilizamos las transacciones operativas y transformamos flujos administrativos complejos en una experiencia digital fluida, intuitiva y accesible desde cualquier dispositivo.",
        //SMNYL 01. ROL
        "SMNYL_role_lead": "Me integré al proyecto como Senior UX/UI Designer con la misión de transformar la operación analógica de la fuerza de ventas en una plataforma web responsiva, unificada y de alta productividad. Lideré el diseño end-to-end de la Oficina Virtual, traduciendo reglas de negocio complejas en módulos intuitivos para la gestión de carteras, emisión de pólizas y seguimiento de siniestros, priorizando la adopción digital y la eficiencia del asesor en campo.",
        //SMNYL: 02. El Reto
        "SMNYL_challenge_desc": "El reto fue transformar una operación analógica y fragmentada en un ecosistema web responsivo y unificado. Mi objetivo principal fue garantizar la usabilidad y la eficiencia en la gestión de flujos transaccionales de alta complejidad, asegurando que herramientas densas en datos e información se sientan fluidas, intuitivas y accesibles desde cualquier dispositivo.",
        "SMNYL_challenge_card_1_title": "Simplificación de Datos Complejos",
        "SMNYL_challenge_card_1_desc": "Diseñé interfaces optimizadas para la gestión de carteras y pólizas densas en información, eliminando la carga cognitiva y facilitando la toma de decisiones mediante arquitecturas de información claras y componentes responsivos.",
        "SMNYL_challenge_card_2_title": "Consistencia Visual Escalable",
        "SMNYL_challenge_card_2_desc": "Desarrollé y mantuve un sistema de diseño unificado para gestionar una plataforma de gran escala, garantizando la coherencia en la interacción, la accesibilidad financiera (WCAG) y la eficiencia en los flujos de trabajo cross-functional.",
        "SMNYL_challenge_card_3_title": "Adopción Operativa y Confianza",
        "SMNYL_challenge_card_3_desc": "Superé la barrera de la resistencia al cambio en la fuerza de ventas mediante prototipos interactivos validados con usuarios reales, asegurando que la plataforma redujera los tiempos de operación y se convirtiera en un aliado diario para el asesor.",
        //SMNYL: 03. Ecosistema Responsivo,
        "SMNYL_insights_title": "03. Ecosistema Responsivo",
        "SMNYL_insights_statement": "Con el fin de asegurar la continuidad operativa del asesor en campo, el diseño se articuló bajo una estrategia multi-dispositivo. Utilizando las pantallas clave disponibles (Desktop, Tablet y Mobile), se estructuró una experiencia unificada que adapta dashboards analíticos complejos, tablas de datos densas y formularios de registro sin perder jerarquía visual ni funcionalidad en pantallas reducidas.",
        "SMNYL_insights_user_1": "Diseñamos una experiencia que reduce al mínimo la carga cognitiva. Al priorizar una jerarquía estricta, el asesor puede gestionar movimientos urgentes y validar saldos remanentes de manera segura. El objetivo fue asegurar que la complejidad normativa no frene la velocidad de respuesta operativa frente al cliente.",
        "SMNYL_insights_detail": "➔ La pantalla visualizada corresponde a un Retiro tradicional en el cual se realizan 5 movimientos:\n1. Transferencia bancaria\n2. Pago de primas\n3. Compra de AVES\n4. Transferencia de plan flexible\n5. Pago de préstamo",
        "SMNYL_insights_user_2": "Interfaz optimizada para el acompañamiento uno a uno. Adaptamos las tablas y formularios para permitir la edición fluida de importes cruzados, facilitando la revisión conjunta del desglose operativo y fortaleciendo la confianza durante la asesoría presencial.",
        "SMNYL_insights_user_3": "Arquitectura orientada a tareas para dominar flujos corporativos. Integramos steppers progresivos y tablas expansivas para auditar asignaciones de capital complejas con control absoluto y sin saturación visual.",
        //SMNYL: 04. Decisiones de Diseño
        "SMNYL_solution_title": "04. Decisiones de Diseño",
        "SMNYL_solution_desc": "Mi enfoque se centró en definir una lógica de componentes modulares y patrones de interacción que optimizaran el procesamiento de datos complejos, garantizando la consistencia del sistema en cualquier resolución.",
        "SMNYL_solution_card_1_title": "Modularidad y Escalabilidad Visual",
        "SMNYL_solution_card_1_desc": "Estructuré un sistema de componentes cohesivo capaz de absorber la densidad informativa de los trámites financieros. El uso de retículas flexibles y componentes unificados aceleró la producción y aseguró un handoff técnico eficiente con desarrollo.",
        "SMNYL_pdfTitle-1": "",
        "SMNYL_solution_card_2_title": "Reducción de la Carga Cognitiva",
        "SMNYL_solution_card_2_desc": "Frente a flujos administrativos densos como el \"Retiro Tradicional\", implementé una arquitectura orientada a tareas mediante guías secuenciales (steppers). Esto fragmenta formularios extensos en pasos claros, reduciendo el error del usuario y la fricción transaccional.",
        "SMNYL_pdfTitle-2": "",
        "SMNYL_solution_card_3_title": "Optimización de Espacios y Datos",
        "SMNYL_solution_card_3_desc": "Diseñé patrones de visualización adaptativos para el manejo de capital (Bolsas y Movimientos). Prioricé el uso de contenedores jerárquicos y tablas con scroll horizontal optimizado, logrando que datos complejos sean legibles y editables desde dispositivos móviles hasta pantallas de escritorio.",
        "SMNYL_pdfTitle-3": "",
        //SMNYL: 05. 
    },
    en: { 
        // Nombre página
        "nameTuali": "Proyect: Tuali | Arca continental",
        "nameSMNYL": "Proyect: Virtual Office | SMNYL",    
        
        //Botón volver
        "nav-back": "Back",

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
        
        "prj-1-meta": "2023 - Present",
        "prj-1-title": "Tuali: B2B E-commerce",
        "prj-1-desc": "Design of a scalable and intuitive user experience. Through a robust design system, we optimized core navigation, boosted retention with Rewards, and facilitated user finances with Credits.",
        "prj-1-cta": "View Case Study",
        
        "prj-2-meta": "2022 - 2023",
        "prj-2-title": "Complex Policy Self-Service",
        "prj-2-desc": "Simplifying the insurance quoting and management flow, transforming bureaucratic processes into secure, seamless digital experiences.",
        "prj-2-cta": "View Case Study",

        // CREATIVE LAB SECTION
        "section-lab-tag": "// 02. CREATIVE LAB",
        "section-lab-title": "Artifact Creation",
        "section-lab-desc": "Explorations in design and interactive prototyping to optimize visual impact.",
        
        "lab-swipe-hint": "Swipe to explore",
        "lab-btn-aria": "View details",
        "btn-archive": "View full archive",

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
        
        "edu-btn-more": "View 23 more certificates",
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
        "assets-cv": "Resume",
        "assets-portfolio": "Portfolio",
        "footer-built": "Built with Vanilla JS, HTML5 & CSS3.",
        "footer-no-frameworks": "No frameworks, pure architecture.",









        
        //TUALI: HERO
        "brand-parent": "Arca Continental",
        "tuali-hero-title": "Tuali: B2B E-commerce",
        "tuali-hero-desc": "Design of a scalable and intuitive user experience. Through a robust design system, we optimized core navigation, boosted retention with Rewards, and facilitated user finances with Credits.",
        "kpi-adoption": "Adoption",
        "kpi-aov": "AOV",
        "kpi-friction": "Friction",

        //TUALI: Mi Rol
        "role_title": "01. My Role & Approach",
        "role_lead": "I joined the project as a Senior UX/UI Designer with the mission to transform a traditional commercial model into a seamless, omni-channel B2B e-commerce ecosystem. I led the end-to-end design of both the mobile app and responsive web versions, prioritizing digital adoption and shopkeeper retention.",
        "role_subtitle_flows": "Designed Modules:",
        "flow_core_title": "Core Flow:",
        "flow_core_desc": "Optimization of the transactional flow and daily ordering.",
        "flow_rewards_title": "Loyalty Program:",
        "flow_rewards_desc": "Loyalty and incentive strategy for local merchants.",
        "flow_credit_title": "Credit Management:",
        "flow_credit_desc": "Financial inclusion and integrated financing flows.",

        //TUALI: El Reto        
        "challenge_title": "02. The UX Challenge",
        "challenge_desc": "The challenge was to transform a commercial model based on physical visits into a B2B self-service ecosystem. My main goal was to ensure usability and trust for a user segment with low digital adoption, guaranteeing a seamless experience even under technical limitations.",
        "separadorDesafio": "UX Design Challenges",
        "challenge_card_1_title": "Digital Inclusion & Usability",
        "challenge_card_1_desc": "I designed interfaces optimized for low-end devices, removing technological barriers and facilitating the adoption of the digital channel through intuitive navigation flows.",
        "challenge_card_2_title": "Scalable Visual Consistency",
        "challenge_card_2_desc": "I developed a unified design strategy to manage a large-scale platform, ensuring interaction and visual consistency across multiple product variables.",
        "challenge_card_3_title": "User Education & Trust",
        "challenge_card_3_desc": "I overcame the barrier of distrust towards the digital channel through strategic communication that educated users, demonstrating the security and direct benefits of the platform.",
        
        //TUALI: Descubrimientos
        "cta_see_more": "View more",
        "cta_see_less": "View less",
        "insights_title": "03. Designed Modules",
        "insights_statement": "Although I contributed transversally to the overall application experience, I focused my main efforts on structuring and designing three critical pillars for both the business and the user.",
        "separadorDescubrimientos": "Core Focus Areas",
        "insights_diag_th_concept": "Module",
        "insights_diag_th_problem": "My Contribution",
        "insights_diag_th_solution": "Objective",
        "insights_card_1_title": "Core Flow",
        "insights_user_1": "Structuring of the shopping architecture and main catalog focused on order efficiency. Optimizing the conversion funnel through predictive replenishment modules, reducing browsing time, and mitigating checkout abandonment.",
        "insights_detail_1": "Home Screen UI Structure:\n• Sticky Header: Point-of-sale selector, search bar, and direct cart access.\n• Business Unit Selectors: Quick-toggle tabs between available brands.\n• Quick Actions: Direct shortcuts to high-demand categories.\n• Communication Carousel: Interactive banners for trade marketing and updates.\n• Conversion Modules: Dynamic blocks integrating predictive replenishment, regional suggestions, and deals with bulk purchase selectors.\n• Bottom Sticky Navbar: Persistent lower navigation tailored for mobile ergonomics.",
        "scroll_hint": "🖱️ Scroll inside the device to view all the content.",
        "insights_card_2_title": "Loyalty Program",
        "insights_user_2": "Design of the loyalty and gamification ecosystem focused on merchant retention to increase purchase frequency through reward mechanics and specific business challenges that elevate Lifetime Value (LTV).",
        "insights_detail_2": "Structure of the \"Gana\" Module:\n• Contextual Navigation: Persistent Header and Navbar maintain global control and mobile ergonomics throughout the user journey.\n• Active Gamification: Points Overview and the Challenges Module act as the visual engine, driving repeat purchases via real-time progress tracking.\n• Urgency Optimization: Participation Cards display active business milestones with clear deadlines to accelerate conversion and prevent drop-offs.\n• Retention & Support: The Informational Block and Support Center resolve complex questions regarding reward redemption, reducing friction and ensuring digital adoption.",
        "insights_card_3_title": "Credit Management",
        "insights_user_3": "UI design for financing control and visualization. Provides a transparent and secure experience for applying credit lines, eliminating financial friction.",
        "insights_detail_3": "Structure of the \"Mis créditos\" Module:\n• Control Navigation: Quick-return Header with help support access and a persistent lower Navbar that anchors the app's financial ecosystem.\n• Financial Health Indicators: Main card displaying available credit, line utilization, and payment deadlines to prevent merchant over-indebtedness.\n• Transactional Operation: Dynamic code generator module for cash order payments, streamlining physical cash collection through digital channels.\n• Commercial Traceability: Recent transaction history with real-time status labels (Active, Paid, In progress) for daily merchant financial control.",

        //TUALI: Solución
        "solution_title": "04. Solution & Execution",
        "solution_desc": "My focus was on building a scalable design infrastructure and validation processes that ensured a successful launch and effective product adoption.",
        "solution_separator": "Strategic Processes",
        "solution_card_1_title": "Scalable Design System",
        "solution_card_1_desc": "I developed a robust Design System with comprehensive documentation and style guides, ensuring visual consistency and accelerating hand-off with engineering.",
        "pdfTitle-1": "DS Example",
        "solution_card_2_title": "Validation & Continuous Improvement",
        "solution_card_2_desc": "I led prototyping validation by integrating direct feedback from users and stakeholders to iterate agilely on the solutions.",
        "pdfTitle-2": "Research Example",
        "solution_card_3_title": "Adoption Strategy",
        "solution_card_3_desc": "I produced high-impact communication resources (visual assets, tutorials, and guides) to educate users on new functionalities.",
        "pdfTitle-3": "Onboarding Example",
        "hint_desktop_explore": "Move cursor to explore",
        "hint_mobile_explore": "Swipe to explore",
        
        //TUALI: Resultados
        "impact_title": "05. Impact & Results",
        "impact_desc": "The project's success was solidified through quantifiable results that validated my design decisions and improved the platform's operational efficiency.",
        "impact_label_1": "Digital Adoption",
        "impact_detail_1": "Increase in the migration of merchants from the physical channel to the digital ecosystem following the redesign implementation.",
        "impact_label_2": "AOV Growth",
        "impact_detail_2": "Growth in order value driven by the optimization of purchasing flows and new Rewards features.",
        "impact_label_3": "Reduced Friction",
        "impact_detail_3": "Decrease in support inquiries and cart abandonment after simplifying the information architecture and checkout process.",











        //SMNYL
        "smnyl-hero-title": "Virtual Office: SMNYL",
        "smnyl-hero-desc": "Designing a responsive web platform for Mexico’s leading insurance sales force. Driven by a scalable design system, we optimized client portfolio management, streamlined operational transactions, and transformed complex administrative workflows into a seamless, user-centered digital experience accessible across all devices.",
        //SMNYL 01. ROL       
        "SMNYL_role_lead": "I joined the project as a Senior UX/UI Designer with the mission of transforming the sales force's traditional operations into a unified, high-productivity responsive web platform. I led the end-to-end design of the Virtual Office, translating complex business rules into intuitive modules for portfolio management, policy issuance, and claims tracking, prioritizing digital adoption and on-the-field advisor efficiency.",
        //SMNYL: 02. El Reto
        "SMNYL_challenge_desc": "The challenge was to transform a fragmented, analog operation into a unified responsive web ecosystem. My main goal was to ensure usability and efficiency across highly complex transactional workflows, making data-dense tools feel seamless, intuitive, and accessible from any device.",
        "SMNYL_challenge_card_1_title": "Simplifying Complex Data",
        "SMNYL_challenge_card_1_desc": "Designed optimized interfaces for data-heavy portfolio and policy management, reducing cognitive load and facilitating decision-making through clear information architecture and responsive components.",
        "SMNYL_challenge_card_2_title": "Scalable Visual Consistency",
        "SMNYL_challenge_card_2_desc": "Developed and maintained a unified design system to manage a large-scale platform, guaranteeing interaction coherence, financial accessibility (WCAG), and efficiency across cross-functional workflows.",
        "SMNYL_challenge_card_3_title": "Operational Adoption & Trust",
        "SMNYL_challenge_card_3_desc": "Overcame sales force resistance to change through interactive prototypes validated with real users, ensuring the platform reduced operational time and became a trusted daily tool for advisors.",
        //SMNYL: 03. Ecosistema Responsivo,
        "SMNYL_insights_title": "03. Responsive Ecosystem",
        "SMNYL_insights_statement": "To ensure the advisor's operational continuity in the field, the design was articulated under a multi-device strategy. Utilizing the available key screens (Desktop, Tablet, and Mobile), a unified experience was structured to adapt complex analytical dashboards, dense data tables, and registration forms without losing visual hierarchy or functionality on smaller screens.",
        "SMNYL_insights_user_1": "We designed an experience that minimizes cognitive load. By prioritizing a strict visual hierarchy, the advisor can manage urgent transactions and validate remaining balances securely. The goal was to ensure that regulatory complexity never slows down operational response times when facing the client.",
        "SMNYL_insights_detail": "➔ The displayed screen corresponds to a Traditional Withdrawal (Retiro tradicional) consisting of 5 transactions:\n1. Bank transfer (Transferencia bancaria)\n2. Premium payment (Pago de primas)\n3. AVES purchase (Compra de AVES)\n4. Flexible plan transfer (Transferencia de plan flexible)\n5. Loan payment (Pago de préstamo)",
        "SMNYL_insights_user_2": "An interface optimized for one-on-one advisory. We adapted tables and forms to allow seamless editing of cross-amounts, facilitating the joint review of operational breakdowns and building trust during face-to-face client meetings.",
        "SMNYL_insights_user_3": "A task-oriented architecture built to master corporate workflows. We integrated progressive steppers and expansive tables to audit complex capital allocations with absolute control and zero visual clutter.",
        //SMNYL: 04. Decisiones de Diseño
        "SMNYL_solution_title": "04. Design Decisions",
        "SMNYL_solution_desc": "My focus centered on defining modular component logic and interaction patterns that optimized complex data processing, guaranteeing system consistency across all resolutions.",
        "SMNYL_solution_card_1_title": "Modularity and Visual Scalability",
        "SMNYL_solution_card_1_desc": "I structured a cohesive component system capable of absorbing the informational density of financial workflows. The use of flexible grids and unified components accelerated production and ensured an efficient technical handoff with development.",
        "SMNYL_pdfTitle-1": "",
        "SMNYL_solution_card_2_title": "Reducing Cognitive Load",
        "SMNYL_solution_card_2_desc": "Faced with dense administrative workflows like the \"Traditional Withdrawal,\" I implemented a task-oriented architecture using progressive steppers. This breaks down extensive forms into clear steps, reducing user error and transactional friction.",
        "SMNYL_pdfTitle-2": "",
        "SMNYL_solution_card_3_title": "Data and Space Optimization",
        "SMNYL_solution_card_3_desc": "I designed adaptive visualization patterns for capital management (Balances and Movements). I prioritized the use of hierarchical containers and tables with optimized horizontal scrolling, ensuring complex data remains readable and editable from mobile devices to desktop displays.",
        "SMNYL_pdfTitle-3": "",
        //SMNYL: 05.
    }
};















// ==========================================================================
// SCROLL SPY BIDIRECCIONAL (RESALTAR SECCIÓN EN NAVBAR)
// ==========================================================================
const initActiveNav = () => {
    const navContainer = document.querySelector('.nav-links'); // Seleccionamos el <ul>
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href');
        return id !== '#' ? document.querySelector(id) : null;
    }).filter(Boolean);

    // Variable para rastrear qué sección estaba activa en el cálculo anterior
    let lastIndex = -1; 

    const updateActiveNav = () => {
        let currentSectionId = '';
        let currentIndex = -1;
        
        const scrollPosition = window.scrollY + 100; 

        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
                currentIndex = index;
            }
        });

        // Calculamos la dirección del scroll basándonos en el índice de la sección
        if (currentIndex !== -1 && currentIndex !== lastIndex) {
            if (lastIndex !== -1) { 
                if (currentIndex > lastIndex) {
                    navContainer.setAttribute('data-dir', 'down');
                } else {
                    navContainer.setAttribute('data-dir', 'up');
                }
            }
            lastIndex = currentIndex;
        }

        // Actualizamos las clases en el menú
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); 
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
    
    if (typeof syncAboutDimensions === "function") {
        syncAboutDimensions();
    }
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

    // 4. Switch visual (Segmented Control)
    if (langBtn) {
        const isEnglish = lang === 'en';
        langBtn.setAttribute('aria-checked', isEnglish);
        const nextLangText = isEnglish ? 'Cambiar idioma a Español' : 'Switch language to English';
        langBtn.setAttribute('aria-label', nextLangText);
    }

    // ==========================================================================
    // EXTENSIÓN: CONEXIÓN INTERNA CON VISOR DE PROCESOS (FAKE-PDF MULTI-IDIOMA)
    // ==========================================================================
    document.querySelectorAll('.wrapper-pdf').forEach(wrapper => {
        // Ejecuta la animación por token en CSS
        wrapper.setAttribute('data-current-lang', lang);
        
        // Re-mapea la ruta del archivo externo para el i18n
        const openPdfBtn = wrapper.querySelector('.btn-open-pdf');
        if (openPdfBtn) {
            const targetHref = openPdfBtn.getAttribute(`data-pdf-${lang}`);
            if (targetHref) {
                openPdfBtn.setAttribute('href', targetHref);
            }
        }
    });

    localStorage.setItem('language', lang);
    currentLang = lang;
    fitTextToBox();
};

// ==========================================================================
// MANEJO DE EVENTOS (Delegación)
// ==========================================================================
document.addEventListener('click', (e) => {
    if (e.target.closest('#lang-toggle')) {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(newLang);
    }

    const eduToggle = e.target.closest('.edu-toggle-btn');
    if (eduToggle) {
        const container = document.getElementById('edu-secondary-container');
        if (container) {
            container.classList.toggle('is-visible');
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

    /* ANIMACIÓN SCROLL REVEAL (Intersection Observer) */
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => scrollObserver.observe(el));
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
    const totalRealItems = 3; 

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
                        (activeLang === 'es' ? 'Ver 23 certificados más' : 'View 23 more certificates');
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

    // 3. Año dinámico en Footer (CORREGIDO)
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    // Esto nos dirá en la consola si JavaScript realmente está viendo tus HTML
    console.log(`Buscando años: Se encontraron ${yearElements.length} elementos.`);
    
    yearElements.forEach(element => {
        element.textContent = currentYear; // textContent es más seguro y directo
    });
});


