// Conceptos clave para entender ClassHub. Cada uno: qué es, analogía, cómo lo usa ClassHub
// (verificado en el código), pregunta probable y un video en español verificado el 2026-10-18.

window.TABLERO.gruposConceptos = [
  { id: 'web',      nombre: 'La web por dentro',          idea: 'Cómo viaja la información entre el celular y el servidor' },
  { id: 'lenguajes',nombre: 'Lenguajes y herramientas',   idea: 'Con qué está escrito ClassHub' },
  { id: 'datos',    nombre: 'Los datos',                  idea: 'Dónde y cómo se guarda todo' },
  { id: 'seguridad',nombre: 'Seguridad',                  idea: 'Cómo se protege a los usuarios' },
  { id: 'nube',     nombre: 'En la nube',                 idea: 'Cómo llega a internet y se mantiene vivo' },
  { id: 'extras',   nombre: 'Funciones especiales',       idea: 'Lo que hace a ClassHub más que una página' },
];

window.TABLERO.conceptos = [
  // ───────── La web por dentro ─────────
  { id: 'cliente-servidor', grupo: 'web', nombre: 'Cliente-servidor y HTTP',
    que: 'El celular (cliente) le pide cosas a un computador en internet (servidor) usando un idioma común llamado HTTP. HTTPS es lo mismo pero cifrado.',
    analogia: 'Como pedir a domicilio: tú haces el pedido (petición), el restaurante lo prepara y te lo manda (respuesta).',
    enClassHub: 'Cada pantalla de ClassHub hace peticiones HTTPS al servidor en Railway. Por ejemplo, el tablero pide GET /api/v1/tasks?filter=active y recibe la lista de tareas en formato JSON. Los códigos de respuesta dicen qué pasó: 200 bien, 401 sin sesión, 403 sin permiso, 500 error del servidor.',
    pregunta: { p: '¿Qué pasa cuando un estudiante abre ClassHub?', r: 'El navegador pide la página al servidor de Railway por HTTPS; el servidor revisa la sesión, consulta MySQL y responde con los datos; el navegador los dibuja en pantalla.' },
    video: { id: '49zdlyLSwhQ', titulo: 'Modelo Cliente Servidor, Explicación Simple', canal: 'Fazt' },
    extra: { id: 'WlIIkVOWlT4', titulo: '¿Qué es HTTP? Introducción práctica', canal: 'Appdelante' } },

  { id: 'front-back', grupo: 'web', nombre: 'Frontend y backend',
    que: 'El frontend es lo que el usuario ve y toca. El backend es lo que procesa, valida y guarda, y nadie ve.',
    analogia: 'En un restaurante, el frontend es el salón y el menú; el backend es la cocina.',
    enClassHub: 'Frontend: las páginas de app/(app) y app/(auth) y los componentes de components/ (TaskCard, Sidebar). Backend: las rutas de app/api, la lógica de lib/ y la base MySQL. Con Next.js ambos viven en el mismo proyecto.',
    pregunta: { p: '¿ClassHub es frontend o backend?', r: 'Las dos cosas: es una aplicación full-stack. Next.js nos deja tener las páginas (frontend) y la API (backend) en el mismo proyecto y con el mismo lenguaje, TypeScript.' },
    video: { id: '50RbVujPPGs', titulo: '¿Qué es BACKEND y FRONTEND? La mejor explicación en español', canal: 'EDteam' } },

  { id: 'api-rest', grupo: 'web', nombre: 'API REST',
    que: 'Una API es la "ventanilla" por donde un programa le pide cosas a otro. REST es un estilo de API: cada recurso tiene una dirección (URL) y se usan verbos HTTP para leer, crear, cambiar o borrar.',
    analogia: 'Es el mesero: tú no entras a la cocina, le dices al mesero qué quieres y él te lo trae.',
    enClassHub: 'ClassHub tiene su API en /api. Ejemplos reales: GET /api/v1/tasks (listar tareas), POST /api/v1/tasks (crear una), PATCH /api/v1/tasks/{id}/status (cambiar el estado), DELETE /api/v1/tasks/{id} (borrarla). Las respuestas van en JSON. La "v1" es versionado: si algún día cambia, se crea v2 sin romper lo existente.',
    pregunta: { p: '¿Para qué sirve el "v1" en las direcciones?', r: 'Es versionado de API: es el contrato estable. Si se necesita un cambio que rompa la forma de las respuestas, se crea /api/v2 y quien use v1 sigue funcionando. Está documentado en el ADR-008.' },
    video: { id: 'sB6Vc3gze3w', titulo: '¿Qué es API, REST y RESTFul? Explicación simple', canal: 'Bluuweb' } },

  { id: 'cookies', grupo: 'web', nombre: 'Cookies y sesiones',
    que: 'Una cookie es un dato pequeño que el sitio guarda en tu navegador y que se envía en cada petición. Así el servidor sabe que sigues siendo tú.',
    analogia: 'Es la manilla de un evento: te la ponen al entrar y con ella te dejan pasar sin volver a pagar.',
    enClassHub: 'Al iniciar sesión, ClassHub guarda la sesión en la cookie st_session (con el JWT, dura 1 hora) y otra cookie de renovación de 30 días. Son HttpOnly: el JavaScript de la página no las puede leer, lo que protege contra robo por XSS. También son SameSite=Lax y Secure en producción.',
    pregunta: { p: '¿Por qué la sesión no se pierde al recargar?', r: 'Porque queda en una cookie que el navegador envía en cada petición. Cuando vence la de 1 hora, la cookie de renovación de 30 días pide una nueva sin volver a escribir el código.' },
    video: { id: 'zR_UkpPZC4M', titulo: 'Cookies y sesiones - Explicación', canal: 'Carlos Azaustre' } },

  // ───────── Lenguajes y herramientas ─────────
  { id: 'javascript', grupo: 'lenguajes', nombre: 'JavaScript',
    que: 'El lenguaje de programación de la web: el único que los navegadores entienden de forma nativa para darle vida a las páginas.',
    analogia: 'Si HTML es el esqueleto de una página y CSS la ropa, JavaScript son los músculos: lo que hace que se mueva.',
    enClassHub: 'ClassHub no se escribe directamente en JavaScript sino en TypeScript, que se convierte en JavaScript al compilar. Todo lo que corre en el navegador y en el servidor termina siendo JavaScript.',
    pregunta: { p: '¿Qué lenguajes usaron?', r: 'TypeScript (que se convierte en JavaScript) para todo el proyecto, SQL para la base de datos y Java con Spring Boot en un microservicio de estadísticas que quedó sin terminar.' },
    video: { id: 'oCSMjOkBcLE', titulo: '¿Qué es JavaScript? Serie para principiantes #01', canal: 'Glaucia Lemos' } },

  { id: 'typescript', grupo: 'lenguajes', nombre: 'TypeScript',
    que: 'JavaScript con "tipos": se le dice a cada dato qué es (texto, número, lista) y el editor avisa los errores antes de ejecutar.',
    analogia: 'Como la corrección ortográfica de Word: te subraya el error mientras escribes, no cuando ya imprimiste.',
    enClassHub: 'Todo ClassHub está en TypeScript (archivos .ts y .tsx). La CI corre "tsc --noEmit" en cada cambio: si hay un error de tipos, el cambio no entra. Ejemplo: lib/types.ts define cómo es una tarea, y si alguien escribe mal un campo, no compila.',
    pregunta: { p: '¿Por qué TypeScript y no JavaScript normal?', r: 'Porque atrapa errores antes de que lleguen al usuario. En un proyecto con más de 30 rutas de API y muchas pantallas, saber exactamente qué forma tiene cada dato evita fallos.' },
    video: { id: 'P8ky7241Ndg', titulo: '¿Qué es TypeScript y por qué debes aprenderlo?', canal: 'EDteam' } },

  { id: 'nodejs', grupo: 'lenguajes', nombre: 'Node.js',
    que: 'Un programa que permite ejecutar JavaScript fuera del navegador, en un servidor. Gracias a él, JavaScript sirve también para el backend.',
    analogia: 'Es el motor que deja que un carro de juguete (JavaScript) ande por la calle de verdad (el servidor).',
    enClassHub: 'El servidor de ClassHub corre sobre Node.js 20 dentro de Docker en Railway (el Dockerfile parte de la imagen node:20-alpine). npm, el gestor de paquetes de Node, instala las librerías: Next.js, React, mysql2, jose, zod y otras.',
    pregunta: { p: '¿Qué es Node.js y dónde lo usan?', r: 'Es el entorno que ejecuta JavaScript en el servidor. El backend de ClassHub (las rutas /api y el middleware) corre en Node.js 20, empaquetado con Docker en Railway.' },
    video: { id: 'iacIRCY1mgw', titulo: '¿Qué es Node.js y para qué sirve?', canal: 'Arsys' },
    extra: { id: 'xJzzu7MVZXw', titulo: '¿Qué es Node.js? Breve explicación animada', canal: 'Bitech Studio' } },

  { id: 'react', grupo: 'lenguajes', nombre: 'React',
    que: 'Una librería para construir interfaces con "componentes": piezas reutilizables que se actualizan solas cuando cambian los datos.',
    analogia: 'Como fichas de LEGO: se arma la pantalla con piezas, y si cambia una pieza no hay que rehacer todo.',
    enClassHub: 'Cada parte de la pantalla es un componente de React 19: TaskCard (la tarjeta de una tarea), TaskStatusButton (el botón de estado), Sidebar (el menú), CreateTaskModal (el formulario de nueva tarea). Cuando el estudiante cambia el estado, solo se vuelve a dibujar esa tarjeta.',
    pregunta: { p: '¿Qué es un componente?', r: 'Una pieza de interfaz reutilizable. Por ejemplo, TaskCard se escribe una vez y se usa para cada una de las tareas de la lista.' },
    video: { id: '8WH0wlVw1DY', titulo: '¿Qué es React? En menos de 10 minutos', canal: 'Carlos Master Web' },
    extra: { id: '1-2eyS0k-IA', titulo: '¿Qué es React JS? Breve explicación animada', canal: 'Bitech Studio' } },

  { id: 'nextjs', grupo: 'lenguajes', nombre: 'Next.js',
    que: 'Un framework construido sobre React que permite tener páginas y servidor (API) en el mismo proyecto. Las carpetas definen las rutas.',
    analogia: 'Si React son las fichas de LEGO, Next.js es la caja con las instrucciones, la base y el motor incluidos.',
    enClassHub: 'ClassHub usa Next.js 15 con el App Router: la carpeta app/(app)/dashboard es la página /dashboard; app/api/tasks/route.ts es la API /api/tasks. El middleware.ts de Next.js revisa la sesión antes de cada página. Es la decisión del ADR-001.',
    pregunta: { p: '¿Por qué Next.js?', r: 'Porque une frontend y backend en un solo proyecto, con un solo lenguaje y un solo despliegue. Para un equipo pequeño eso reduce mucho la complejidad.' },
    video: { id: 'fzLE4Z07Irk', titulo: '¿Qué es Next.js? Framework FullStack de React', canal: 'Fazt Code' },
    extra: { id: 'kRV23b1hYzw', titulo: 'NEXTJS EN 5 MINUTOS', canal: 'Vida MRR' } },

  { id: 'tailwind', grupo: 'lenguajes', nombre: 'Tailwind CSS',
    que: 'Una forma de dar estilo (colores, tamaños, espacios) escribiendo clases cortas directamente en el HTML, en vez de hojas de estilo largas.',
    analogia: 'Como vestir a alguien con prendas ya hechas (camisa azul, talla M) en vez de coser cada prenda desde cero.',
    enClassHub: 'Todas las pantallas usan Tailwind 3. Por ejemplo, "rounded-xl bg-blue-600 text-white" hace un botón azul redondeado. Las clases con "md:" cambian el diseño en pantallas grandes: así ClassHub se adapta al celular.',
    pregunta: { p: '¿Cómo hicieron que se viera bien en el celular?', r: 'Diseño responsive con Tailwind: las clases se adaptan según el ancho de la pantalla, y la app se pensó primero para celular.' },
    video: { id: 'E-GEWM6DCTY', titulo: 'Qué es Tailwind CSS', canal: 'Trinchera WP' } },

  { id: 'java', grupo: 'lenguajes', nombre: 'Java y Spring Boot',
    que: 'Java es un lenguaje muy usado en empresas. Spring Boot es su framework más popular para crear servidores y APIs.',
    analogia: 'Si Next.js es una navaja suiza ligera, Spring Boot es una caja de herramientas industrial.',
    enClassHub: 'Se empezó un microservicio de estadísticas en Java 17 con Spring Boot 3.2 (classhub-stats, con controladores y repositorios JPA conectados a MySQL). Quedó sin terminar y no está desplegado; está en la carpeta Historial.',
    pregunta: { p: '¿Usaron Java?', r: 'Sí, se empezó un microservicio de estadísticas con Spring Boot, pero quedó como trabajo futuro y no está en producción. La app principal está en TypeScript.' },
    video: { id: '6GoZGwTjUsQ', titulo: 'Spring Boot: qué es, cuándo usarlo y cuándo no', canal: '3digits' } },

  // ───────── Los datos ─────────
  { id: 'relacional', grupo: 'datos', nombre: 'Base de datos relacional y SQL',
    que: 'Una base de datos que guarda la información en tablas (filas y columnas) que se conectan entre sí con llaves. SQL es el lenguaje para consultarlas.',
    analogia: 'Como un archivador con carpetas que se citan entre sí: la carpeta de una tarea dice a qué grupo y a qué materia pertenece.',
    enClassHub: 'ClassHub tiene 17 tablas. Relaciones clave: users.group_id apunta a groups, tasks.subject_id a subjects, y task_status une usuario y tarea (relación muchos a muchos). Las llaves foráneas impiden datos huérfanos: si se borra un grupo, se borran sus tareas (ON DELETE CASCADE).',
    pregunta: { p: '¿Qué es una llave foránea? Den un ejemplo.', r: 'Una columna que apunta a otra tabla. En tasks, la columna group_id apunta a groups.id: así cada tarea sabe a qué grupo pertenece y no puede existir una tarea de un grupo inexistente.' },
    video: { id: 'LCOE-iBuMRY', titulo: 'Qué son las bases de datos relacionales y las tablas en SQL', canal: 'Educar es la clave' } },

  { id: 'mysql', grupo: 'datos', nombre: 'MySQL',
    que: 'Uno de los sistemas de bases de datos relacionales más usados del mundo. Es gratis y de código abierto.',
    analogia: 'Es la despensa del restaurante: todo guardado en su estante, con etiqueta.',
    enClassHub: 'ClassHub usa MySQL 8 en Railway, con la librería mysql2 y un pool de 10 conexiones (lib/db.ts). Las consultas usan parámetros (?) para evitar inyección SQL. Hoy tiene 90 grupos, 622 materias y 49 cuentas reales.',
    pregunta: { p: '¿Cómo evitan la inyección SQL?', r: 'Nunca se pega el texto del usuario dentro de la consulta: se usan consultas preparadas con parámetros (?), y mysql2 se encarga de escaparlos.' },
    video: { id: 'GSGFMbri3B0', titulo: 'MySQL ¿qué es y para qué sirve?', canal: 'Arsys' } },

  { id: 'migraciones', grupo: 'datos', nombre: 'Migraciones y respaldos',
    que: 'Una migración es un script numerado que cambia la estructura de la base de forma controlada. Un respaldo (backup) es una copia completa para recuperar los datos si algo sale mal.',
    analogia: 'Las migraciones son las actas de cada remodelación de la casa; el respaldo es la foto de cómo estaba todo, por si hay que reconstruir.',
    enClassHub: 'Las migraciones están en database/migrations (001 a 008), y la tabla schema_migrations registra cuáles se aplicaron. GitHub Actions saca un respaldo con mysqldump todos los días a la 1:00 a. m. y lo guarda 30 días. Lo verificamos el 18 de octubre restaurándolo: 49 usuarios y 30 tareas, igual que producción.',
    pregunta: { p: '¿Cómo saben que el respaldo sirve?', r: 'Porque lo restauramos en una base aparte y contamos: 49 usuarios, 30 tareas, 118 estados, 90 grupos y 622 materias, igual que en producción. Un respaldo que nunca se ha restaurado no está comprobado.' },
    video: null },

  // ───────── Seguridad ─────────
  { id: 'jwt', grupo: 'seguridad', nombre: 'JWT (JSON Web Token)',
    que: 'Un "carnet digital" que el servidor entrega al iniciar sesión. Dice quién eres y qué rol tienes, y está firmado: nadie lo puede falsificar sin la clave secreta del servidor.',
    analogia: 'Como un carnet con holograma: cualquiera puede leerlo, pero solo el colegio puede hacer uno válido.',
    enClassHub: 'lib/auth.ts crea el JWT con la librería jose, firmado con HS256 y JWT_SECRET. Lleva el id, el rol, el grupo y el nombre, y dura 1 hora. Se guarda en la cookie HttpOnly st_session. El middleware lo verifica en cada petición.',
    pregunta: { p: '¿Qué guarda el token y es seguro?', r: 'Guarda id, rol, grupo y nombre, nunca el código de acceso. Está firmado, así que si alguien lo modifica la firma deja de coincidir y el servidor lo rechaza. Dura 1 hora para limitar el daño si se roba.' },
    video: { id: '3o4vEIkiRgE', titulo: 'Qué es JWT, cómo funciona y buenas prácticas', canal: 'CodelyTV' } },

  { id: 'roles', grupo: 'seguridad', nombre: 'Middleware, roles y permisos',
    que: 'El middleware es código que se ejecuta antes de cada página o API, como un portero. Los roles definen qué puede hacer cada tipo de usuario.',
    analogia: 'El portero del colegio: revisa el carnet y, según si eres estudiante o profesor, te deja entrar a la sala de profesores o no.',
    enClassHub: 'middleware.ts revisa el token en cada petición y redirige según el rol: un estudiante que intenta abrir /admin o /staff-chat vuelve al tablero. Además, cada ruta de la API vuelve a revisar con requireSession() o requireRole("moderator"). Son dos capas: si una falla, la otra protege.',
    pregunta: { p: '¿Qué pasa si un estudiante escribe /admin en la barra?', r: 'El middleware ve en su token que su rol es student y lo redirige a /dashboard. Y aunque llamara a la API directamente, la ruta respondería 403: sin permiso.' },
    video: null },

  { id: 'hash', grupo: 'seguridad', nombre: 'Hash de contraseñas (bcrypt)',
    que: 'Una forma de guardar claves para que no se puedan leer: se transforman en un texto irreconocible que no se puede devolver al original. Para verificar, se vuelve a transformar lo que escribe el usuario y se compara.',
    analogia: 'Como moler café: del café molido no puedes volver al grano, pero puedes moler otro grano y comparar.',
    enClassHub: 'El código de ClassHub ya sabe usar bcrypt: al entrar, si el código sigue en texto plano, lo convierte a hash (bcrypt, costo 12). Pero en la base de producción la columna para el hash nunca se creó, así que los códigos siguen en texto plano. Es una deuda de seguridad que reconocemos.',
    pregunta: { p: '¿Las claves están cifradas?', r: 'Seamos honestos: el sistema tiene preparado el hash con bcrypt, pero en producción la migración que crea esa columna no se aplicó, así que los códigos de estudiante están en texto plano. Es lo primero que corregiríamos.' },
    video: { id: 'mscYpZYKKuo', titulo: '¿Qué tan seguro es bcrypt?', canal: 'Parzibyte' } },

  { id: 'limites', grupo: 'seguridad', nombre: 'Límite de intentos y validación',
    que: 'El límite de intentos (rate limiting) bloquea a quien prueba muchas claves seguidas. La validación revisa que cada dato que llega tenga la forma correcta antes de usarlo.',
    analogia: 'El cajero que retiene la tarjeta después de 3 claves malas, y el portero que no deja entrar con el formulario mal llenado.',
    enClassHub: 'lib/rate-limit.ts: 10 intentos fallidos en 15 minutos desde la misma dirección bloquean el inicio de sesión. lib/schemas.ts usa Zod para validar cada formulario (por ejemplo, que el estado sea pendiente, en_proceso o completada). Además hay encabezados de seguridad: CSP, HSTS y X-Frame-Options.',
    pregunta: { p: '¿Qué pasa si alguien intenta adivinar códigos?', r: 'Después de 10 intentos fallidos en 15 minutos el servidor responde 429 (demasiadas peticiones) y le dice cuántos minutos esperar.' },
    video: null },

  // ───────── En la nube ─────────
  { id: 'railway', grupo: 'nube', nombre: 'Railway',
    que: 'Una plataforma en la nube donde se suben aplicaciones y bases de datos para que funcionen en internet todo el día, sin tener un servidor propio.',
    analogia: 'Es como arrendar un local en un centro comercial: ellos ponen la luz, la seguridad y el espacio; tú pones tu negocio.',
    enClassHub: 'ClassHub vive en el proyecto "heartfelt-endurance" de Railway, con el servicio classhub (la app, construida con Docker) y el servicio MySQL (la base). La dirección es classhub-production.up.railway.app. Cada vez que se sube un cambio a la rama main de GitHub, Railway lo vuelve a construir y lo publica solo. Cuesta entre 0 y 5 dólares al mes.',
    pregunta: { p: '¿Qué es Railway y qué significa "deployar"?', r: 'Railway es la nube donde vive ClassHub. Deployar (desplegar) es publicar la aplicación en internet: Railway toma el código de GitHub, lo empaqueta con Docker, lo ejecuta y le da una dirección pública con HTTPS.' },
    video: { id: 'C3NhmT__Mn4', titulo: 'Node.js y MySQL: deploy gratuito en Railway', canal: 'Fazt' },
    extra: { id: '7BQe4UPNcpY', titulo: 'Deploy en Railway de React, Node.js y MySQL', canal: 'SocraTech' } },

  { id: 'docker', grupo: 'nube', nombre: 'Docker',
    que: 'Una herramienta que empaqueta una aplicación con todo lo que necesita en un "contenedor", para que funcione igual en cualquier computador.',
    analogia: 'Como un contenedor de barco: no importa qué lleve adentro ni en qué barco vaya, se carga y se descarga igual en cualquier puerto.',
    enClassHub: 'El Dockerfile construye ClassHub en tres etapas (dependencias, compilación y ejecución) sobre Node 20. Railway usa ese Dockerfile. Y el modo offline usa docker-compose.yml para levantar dos contenedores en el computador: MySQL con datos de prueba y la app en localhost:3000.',
    pregunta: { p: '¿Cómo funciona el modo offline?', r: 'Con Docker Compose: un archivo describe dos contenedores, la base MySQL (que se llena sola con la estructura real y datos de prueba) y la app. Con un doble clic en ARRANCAR OFFLINE.bat, todo corre en el computador sin internet.' },
    video: { id: '3cvQjDRDWoU', titulo: 'Docker explicado fácil: qué es y para qué sirve', canal: 'You like Code' } },

  { id: 'git', grupo: 'nube', nombre: 'Git y GitHub',
    que: 'Git guarda el historial de cada cambio del código (commits) y permite trabajar en ramas. GitHub es el sitio en internet donde se guarda ese historial y se colabora.',
    analogia: 'Git es el historial de versiones de un documento de Google; GitHub es el Drive donde está guardado y compartido.',
    enClassHub: 'ClassHub tiene 74 commits en el repositorio privado JeronimooUribe/classhub, desde el 17 de mayo de 2026. Los cambios grandes van en una rama y entran por pull request: por ejemplo, el PR #16 del 18 de octubre (limpieza para la exposición) pasó la CI antes de unirse.',
    pregunta: { p: '¿Qué es un commit y qué es un pull request?', r: 'Un commit es una foto del código con un mensaje que explica qué cambió. Un pull request es la propuesta de unir los cambios de una rama a la principal; ahí corren las pruebas automáticas y se revisa antes de aceptarlo.' },
    video: { id: 'DinilgacaWs', titulo: '¿Qué es Git y GitHub? Repositorios, ramas y más', canal: 'Platzi' },
    extra: { id: 'jGehuhFhtnE', titulo: '¿Qué es Git y cómo funciona?', canal: 'EDteam' } },

  { id: 'cicd', grupo: 'nube', nombre: 'Integración continua (CI/CD)',
    que: 'CI: cada vez que se sube un cambio, un robot lo revisa y lo prueba automáticamente. CD: si todo pasa, se publica solo.',
    analogia: 'Un control de calidad en la fábrica: ningún producto sale a la tienda sin pasar la inspección.',
    enClassHub: '.github/workflows/ci.yml corre en GitHub Actions en cada cambio: instala, revisa estilo (lint), revisa tipos (tsc), corre las 140 pruebas, compila y audita las dependencias. Si algo falla, el cambio se marca en rojo y no se publica. Railway hace el despliegue (CD) cuando el cambio llega a main.',
    pregunta: { p: '¿Cómo evitan subir algo roto?', r: 'Con la CI: ningún cambio entra a main sin pasar lint, tipos, 140 pruebas y la compilación en GitHub Actions. Esa es nuestra regla: cero despliegues sin CI verde.' },
    video: { id: '88bnb9eTRNo', titulo: '¿Qué es CI/CD? Integración y despliegue continuos', canal: 'Amin Espinoza' } },

  // ───────── Funciones especiales ─────────
  { id: 'pwa', grupo: 'extras', nombre: 'PWA (aplicación web progresiva)',
    que: 'Una página web que se puede instalar en el celular como si fuera una app, sin pasar por la Play Store ni la App Store.',
    analogia: 'Es una página web disfrazada de app: tiene ícono, pantalla completa y se abre como cualquier aplicación.',
    enClassHub: 'public/manifest.json le dice al celular el nombre (ClassHub), el ícono, los colores y que se abra en pantalla completa (display: standalone). public/sw.js es el service worker, que recibe las notificaciones.',
    pregunta: { p: '¿Por qué no hicieron una app nativa?', r: 'Porque una PWA funciona en Android, iPhone y computador con un solo código, se actualiza sola y no hay que publicarla en ninguna tienda. Para un colegio es más fácil de distribuir: basta un enlace o un QR.' },
    video: { id: 'LIvhoCPV5KU', titulo: '¿Qué es una PWA o Aplicación Web Progresiva?', canal: 'ABAMobile' } },

  { id: 'push', grupo: 'extras', nombre: 'Notificaciones push y service worker',
    que: 'Un service worker es un pequeño programa que el navegador mantiene en segundo plano. Gracias a él, el servidor puede mandar notificaciones aunque la página esté cerrada.',
    analogia: 'Como el timbre de la casa: aunque estés en otro cuarto, te enteras de que llegó alguien.',
    enClassHub: 'Cuando el estudiante acepta, su navegador se suscribe (tabla push_subscriptions) con claves VAPID. lib/push-server.ts envía avisos de tarea nueva, de entrega hoy y de entrega mañana con la librería web-push. Ojo: los recordatorios automáticos necesitan una tarea programada que hoy no está activa.',
    pregunta: { p: '¿Cómo llegan las notificaciones si la app está cerrada?', r: 'El service worker (sw.js) queda registrado en el navegador. El servidor envía el mensaje al servicio de notificaciones del navegador, y el service worker lo muestra aunque ClassHub esté cerrado.' },
    video: { id: '7UOhZSjfWA4', titulo: 'Service Workers y Notificaciones Push', canal: 'DevTeam504' } },

  { id: 'cloudinary', grupo: 'extras', nombre: 'Cloudinary (imágenes en la nube)',
    que: 'Un servicio que guarda imágenes en la nube y las entrega rápido desde servidores repartidos por el mundo (una CDN).',
    analogia: 'Como una bodega de fotos con sucursales en todas las ciudades: la foto te llega desde la más cercana.',
    enClassHub: 'Cuando el monitor adjunta una imagen a una tarea, al horario o a un aviso, app/api/upload/route.ts la sube a Cloudinary (carpeta classhub/tasks), con un máximo de 5 MB y límite de subidas. En la base solo se guarda la dirección de la imagen, no la imagen.',
    pregunta: { p: '¿Por qué no guardan las imágenes en la base de datos?', r: 'Porque las imágenes pesan mucho y volverían lenta la base. Cloudinary las guarda y las entrega optimizadas; la base solo guarda el enlace.' },
    video: { id: 'nmmBPqeMqWk', titulo: '¿Qué es Cloudinary? Hosting de imágenes y videos', canal: 'Fazt Code' } },

  { id: 'ia', grupo: 'extras', nombre: 'Inteligencia artificial (API de Claude)',
    que: 'Una API de inteligencia artificial permite que un programa le envíe texto a un modelo de IA y reciba una respuesta. Se paga por uso.',
    analogia: 'Es tener un asistente al otro lado del teléfono: le dictas algo desordenado y te lo devuelve organizado.',
    enClassHub: 'app/api/ai/assist/route.ts envía el texto que escribe el monitor (por ejemplo: "para el viernes taller de mate ejercicios 1 al 12") al modelo claude-haiku-4-5 de Anthropic, con instrucciones de devolver un JSON con título, descripción, materia, prioridad, tipo y dónde se entrega. Esos campos llenan el formulario. La clave de la API vive en las variables de Railway, nunca en el código.',
    pregunta: { p: '¿La IA crea las tareas sola?', r: 'No. La IA solo convierte el texto del monitor en los campos del formulario. El monitor revisa, corrige si hace falta y es quien publica.' },
    video: { id: 'LAB4XwYX-ig', titulo: 'Cómo usar la API de Claude: tutorial práctico', canal: 'Miguel TEP' } },

  { id: 'pruebas', grupo: 'extras', nombre: 'Pruebas automáticas',
    que: 'Código que revisa que otro código funcione. Se ejecuta en segundos y avisa si un cambio rompió algo.',
    analogia: 'Como la lista de chequeo del piloto antes de despegar: se revisa siempre, igual, todas las veces.',
    enClassHub: '140 pruebas con Vitest en __tests__: sesión, tokens, validaciones, límite de intentos, aislamiento entre grupos y permisos del middleware. La prueba del middleware se escribió el 18 de octubre para reproducir el bug de las tareas invisibles: primero falló (6 fallos) y, tras el arreglo, pasó.',
    pregunta: { p: '¿Qué tipo de pruebas tienen?', r: 'Pruebas unitarias y de rutas con Vitest: 140 en total. Simulan la base de datos para correr rápido, y corren en cada cambio en GitHub Actions.' },
    video: { id: 'UwoCR0eJNgo', titulo: 'Aprende en 3 minutos: pruebas unitarias y de integración', canal: 'yo soy dev' } },
];

// Conceptos que conviene repasar en cada esfera.
window.TABLERO.conceptosPorEsfera = {
  1: ['front-back', 'pwa'], 2: ['cliente-servidor'], 3: ['pwa', 'roles'],
  4: ['pwa', 'ia', 'push'], 5: ['roles', 'cookies'], 6: ['docker', 'railway'],
  7: ['cliente-servidor', 'front-back', 'api-rest', 'nextjs'], 8: ['typescript', 'nodejs', 'react', 'nextjs', 'tailwind', 'java'],
  9: ['relacional', 'mysql', 'migraciones'], 10: ['git', 'cicd'], 11: ['pruebas', 'jwt', 'hash', 'limites', 'roles'],
  12: ['railway'], 13: ['javascript', 'cookies', 'api-rest'], 14: ['jwt', 'api-rest', 'cicd'],
  15: ['docker', 'git', 'nodejs'], 16: ['docker', 'railway'],
};
