// Guía del líder (versión técnica): todo ClassHub pieza por pieza, para que Jerónimo lo explique con nombres exactos.
// Verificado contra el código (rama guia-exposicion) y la base de producción el 2026-10-18.

window.TABLERO.lider = {
  nombre: 'Jerónimo Uribe Garcés',
  frase: 'ClassHub es una aplicación web full-stack hecha en Next.js con TypeScript, base de datos MySQL y desplegada en Railway. El monitor de tareas de cada salón publica las tareas y los estudiantes las ven y marcan su avance desde el celular.',

  // Cada pieza: qué es · para qué la usa ClassHub · cómo reconocerla en el código · dónde está
  stack: [
    { n: 'TypeScript', que: 'Lenguaje de programación: JavaScript con tipos (dice si un dato es texto, número, lista…).', uso: 'Todo el proyecto está escrito en TypeScript, frontend y backend.', reconocer: 'Archivos .ts y .tsx (la x significa que tiene HTML de React adentro).', donde: 'Todo el proyecto' },
    { n: 'JavaScript', que: 'El lenguaje de la web. TypeScript se convierte en JavaScript al compilar.', uso: 'Lo que finalmente corre en el navegador y en Node.js.', reconocer: 'Archivos .js (ej. public/sw.js). Lo demás es TypeScript que se vuelve JavaScript.', donde: 'public/sw.js; el resultado compilado en .next/' },
    { n: 'Node.js', que: 'Programa que ejecuta JavaScript FUERA del navegador, en un servidor.', uso: 'Corre el backend de ClassHub (la API, el middleware, la conexión a MySQL). Versión 20.', reconocer: 'Todo lo que NO tiene \'use client\': archivos route.ts, middleware.ts, lib/. En el Dockerfile: FROM node:20-alpine.', donde: 'app/api, lib, middleware.ts' },
    { n: 'npm', que: 'El gestor de paquetes de Node.js: instala librerías y corre comandos.', uso: 'npm install (instalar), npm run dev (desarrollo), npm test (pruebas), npm run build (compilar).', reconocer: 'package.json (lista de librerías) y package-lock.json (versiones exactas).', donde: 'package.json' },
    { n: 'React 19', que: 'Librería para construir pantallas con componentes (piezas reutilizables).', uso: 'Cada pantalla y cada pieza (tarjeta de tarea, menú, botones).', reconocer: 'Funciones que devuelven HTML (JSX): return ( <div>…</div> ). Usan useState, useEffect. Archivos .tsx con \'use client\'.', donde: 'components/, app/(app)/, app/(auth)/' },
    { n: 'Next.js 15', que: 'Framework sobre React que junta frontend y backend en un solo proyecto. Las carpetas definen las direcciones.', uso: 'Organiza las pantallas (page.tsx) y la API (route.ts) y el middleware. Usa el "App Router".', reconocer: 'Carpeta app/ con page.tsx, layout.tsx y route.ts. next.config.ts. Imports de \'next/server\' o \'next/navigation\'.', donde: 'app/, next.config.ts, middleware.ts' },
    { n: 'Tailwind CSS 3', que: 'Forma de dar estilo con clases cortas dentro del HTML.', uso: 'Todos los colores, tamaños y el diseño adaptable al celular.', reconocer: 'className="rounded-xl bg-blue-600 text-white px-4" dentro de los .tsx.', donde: 'tailwind.config.ts, app/globals.css' },
    { n: 'MySQL 8', que: 'Base de datos relacional: guarda la información en tablas conectadas con llaves.', uso: 'Guarda usuarios, grupos, materias, tareas, estados, avisos… (17 tablas).', reconocer: 'Archivos .sql y consultas SQL dentro del código: SELECT, INSERT, UPDATE, DELETE.', donde: 'database/, lib/db.ts' },
    { n: 'SQL', que: 'El lenguaje para hablar con la base de datos.', uso: 'Crear tablas (CREATE TABLE) y leer/guardar datos (SELECT, INSERT…).', reconocer: 'Texto en mayúsculas como SELECT * FROM tasks WHERE group_id = ?', donde: 'database/*.sql y dentro de lib/ y app/api' },
    { n: 'mysql2', que: 'La librería de Node.js que se conecta a MySQL.', uso: 'Crea un pool de 10 conexiones y ejecuta las consultas con parámetros "?" (evita inyección SQL).', reconocer: 'import mysql from \'mysql2/promise\'; funciones query() y mutate().', donde: 'lib/db.ts' },
    { n: 'JWT (librería jose)', que: 'JSON Web Token: un "carnet digital" firmado que dice quién eres y tu rol.', uso: 'La sesión: se crea al iniciar sesión, dura 1 hora y va en la cookie st_session.', reconocer: 'signToken(), verifyToken(), import { SignJWT, jwtVerify } from \'jose\'.', donde: 'lib/auth.ts, middleware.ts' },
    { n: 'Cookies HttpOnly', que: 'Datos que el navegador guarda y envía en cada petición; HttpOnly = el JavaScript de la página no las puede leer.', uso: 'Guardan el JWT (st_session) y el token de renovación de 30 días.', reconocer: 'res.cookies.set(…), httpOnly: true.', donde: 'lib/auth.ts, lib/tokens.ts' },
    { n: 'Zod', que: 'Librería para validar datos: revisa que lo que llega tenga la forma correcta.', uso: 'Valida el login, las tareas, los estados, los avisos antes de tocar la base.', reconocer: 'z.object({ … }), Schema.safeParse(body).', donde: 'lib/schemas.ts' },
    { n: 'bcryptjs', que: 'Librería para guardar claves como hash (irreversible).', uso: 'Preparada para los códigos de estudiante; en producción la columna del hash no se creó (deuda).', reconocer: 'bcrypt.hash(), bcrypt.compare().', donde: 'app/api/auth/login/route.ts' },
    { n: 'Cloudinary', que: 'Servicio en la nube que guarda imágenes y las entrega rápido (CDN).', uso: 'Imágenes de tareas, avisos, horario y chat. En MySQL solo se guarda la URL.', reconocer: 'La función uploadToCloudinary() con await import(\'cloudinary\'); variables CLOUDINARY_*; carpeta classhub/tasks.', donde: 'app/api/upload/route.ts' },
    { n: 'Resend', que: 'Servicio para enviar correos desde una aplicación.', uso: 'Correo de recuperación del código y formulario de demo.', reconocer: 'new Resend(apiKey).emails.send(…)', donde: 'app/api/auth/forgot-password, app/api/demo' },
    { n: 'Claude (Anthropic)', que: 'Modelo de inteligencia artificial, usado por API (se paga por uso).', uso: 'Convierte el texto libre del monitor en los campos de una tarea. Modelo claude-haiku-4-5.', reconocer: 'import Anthropic from \'@anthropic-ai/sdk\'; messages.create({ model, system, messages }).', donde: 'app/api/ai/assist/route.ts' },
    { n: 'Web Push + Service Worker', que: 'Notificaciones del navegador al celular, aunque la app esté cerrada. El service worker es un script que queda en segundo plano.', uso: 'Avisos de tarea nueva. Los recordatorios automáticos no tienen hoy un programador activo.', reconocer: 'webpush.sendNotification(…) en el servidor; self.addEventListener(\'push\') en sw.js.', donde: 'lib/push-server.ts, lib/push-client.ts, public/sw.js' },
    { n: 'PWA', que: 'Progressive Web App: página web instalable en el celular como si fuera app.', uso: 'ClassHub se puede agregar a la pantalla de inicio, con ícono y pantalla completa.', reconocer: 'public/manifest.json ("display": "standalone").', donde: 'public/manifest.json, public/sw.js' },
    { n: 'Vitest', que: 'Herramienta de pruebas automáticas.', uso: '140 pruebas: sesión, permisos, validaciones, límites. Simulan la base.', reconocer: 'describe(…), it(…), expect(…). Archivos .test.ts.', donde: '__tests__/' },
    { n: 'ESLint', que: 'Revisor de estilo y errores comunes del código.', uso: 'Se corre en la CI (npm run lint).', reconocer: '.eslintrc.json', donde: 'raíz del proyecto' },
    { n: 'Docker', que: 'Empaqueta la app con todo lo que necesita en un "contenedor" que corre igual en cualquier computador.', uso: 'Railway construye ClassHub con el Dockerfile; el modo offline usa docker-compose.', reconocer: 'Dockerfile (FROM, COPY, RUN, CMD) y docker-compose.yml.', donde: 'Dockerfile, docker-compose.yml' },
    { n: 'Railway', que: 'Plataforma en la nube (PaaS) donde se publican apps y bases de datos sin manejar servidores propios.', uso: 'Aloja el servicio classhub (la app) y el servicio MySQL. Publica solo cada cambio de la rama main.', reconocer: 'railway.toml; la dirección classhub-production.up.railway.app.', donde: 'railway.toml + el panel de Railway (proyecto heartfelt-endurance)' },
    { n: 'Git', que: 'Sistema de control de versiones: guarda cada cambio (commit) y permite ramas.', uso: '74 commits desde el 17 de mayo de 2026; ramas para cambios grandes.', reconocer: 'Carpeta oculta .git; comandos git commit, git push.', donde: 'todo el proyecto' },
    { n: 'GitHub', que: 'Sitio en internet que guarda el repositorio de Git y permite colaborar (pull requests).', uso: 'Repositorio privado JeronimooUribe/classhub; Railway lee de ahí.', reconocer: 'Carpeta .github/', donde: 'github.com/JeronimooUribe/classhub' },
    { n: 'GitHub Actions (CI)', que: 'Robots que corren tareas automáticas en GitHub.', uso: 'CI: en cada cambio corre lint, tipos, 140 pruebas, compilación y auditoría. También el respaldo diario de la base.', reconocer: 'Archivos .yml con on:, jobs:, steps:.', donde: '.github/workflows/ci.yml y db-backup.yml' },
    { n: 'Variables de entorno', que: 'Datos de configuración y claves que viven FUERA del código.', uso: 'DB_HOST, DB_PASSWORD, JWT_SECRET, ANTHROPIC_API_KEY… configuradas en Railway.', reconocer: 'process.env.NOMBRE en el código; .env.example lista los nombres sin valores.', donde: '.env.example, lib/env.ts' },
  ],

  division: [
    ['FRONTEND (navegador)', "Pantallas y componentes. Empiezan con 'use client'. Carpetas app/(app), app/(auth), app/landing y components/. Tecnologías: React, Next.js, Tailwind."],
    ['BACKEND (servidor Node.js)', 'La API y la lógica. Archivos route.ts en app/api, middleware.ts y lib/. Tecnologías: Next.js Route Handlers, Node.js, mysql2, jose, Zod.'],
    ['BASE DE DATOS', 'MySQL 8 en Railway. Estructura en database/. El backend se conecta con lib/db.ts.'],
    ['NUBE Y DESPLIEGUE', 'Railway (aloja), Docker (empaca), GitHub (guarda el código), GitHub Actions (prueba y respalda).'],
    ['CÓMO SE HABLAN', "El frontend llama al backend con fetch('/api/...'); el backend consulta MySQL y responde en JSON."],
  ],

  carpetas: [
    ['app/(app)/', 'Pantallas con sesión: dashboard, calendar, announcements, horario, moderator, staff-chat, admin'],
    ['app/(auth)/', 'Pantallas sin sesión: login, register, forgot-password, reset-password'],
    ['app/api/', 'La API (backend): una carpeta por dirección, cada una con su route.ts'],
    ['app/landing/', 'Página de presentación comercial'],
    ['components/', 'Piezas de pantalla: TaskCard, TaskStatusButton, CreateTaskModal, Sidebar…'],
    ['lib/', 'Lógica compartida: db, auth, schemas, points, rate-limit, services/tasks…'],
    ['middleware.ts', 'El portero de permisos'],
    ['database/', 'Estructura de la base, migraciones y datos del modo offline'],
    ['public/', 'Logo, manifest.json (PWA) y sw.js (service worker)'],
    ['__tests__/', 'Las 140 pruebas'],
    ['.github/workflows/', 'CI y respaldo diario'],
    ['Dockerfile · railway.toml · docker-compose.yml', 'Empaque y despliegue'],
  ],

  funciones: [
    { n: 'Iniciar sesión', pasos: ['Pantalla app/(auth)/login/page.tsx envía correo + código a POST /api/auth/login', 'Zod valida el formato (LoginSchema)', 'rate-limit revisa 10 intentos en 15 min', 'Busca el usuario en la tabla users y compara el código', 'Revisa el acceso (user_payment_status)', 'signToken crea el JWT de 1 hora → cookie st_session; más un token de 30 días'] },
    { n: 'Ver las tareas', pasos: ['dashboard/page.tsx hace fetch(\'/api/v1/tasks?filter=active\')', 'middleware.ts verifica el JWT', 'app/api/tasks/route.ts → getTasksForGroup', 'SQL: SELECT de tasks + JOIN subjects + JOIN task_status del estudiante', 'Se dibuja un TaskCard por tarea'] },
    { n: 'Marcar una tarea', pasos: ['TaskStatusButton envía PATCH /api/v1/tasks/{id}/status', 'Zod: estado pendiente, en_proceso o completada', 'INSERT … ON DUPLICATE KEY UPDATE en task_status', 'addPoints: +3 (en proceso) o +10 (completada)'] },
    { n: 'Crear una tarea (monitor)', pasos: ['Formulario CreateTaskModal', 'POST /api/v1/tasks → requireRole("moderator")', 'createTask: INSERT en tasks con id UUID', '+5 puntos al monitor y notifyNewTask avisa al grupo por push'] },
    { n: 'Imágenes', pasos: ['El monitor elige la foto en el formulario', 'POST /api/upload (app/api/upload/route.ts)', 'Revisa tamaño (máx. 5 MB), que sea JPEG, PNG o WebP mirando sus primeros bytes reales (magic bytes), y el límite de subidas', 'La sube a Cloudinary (carpeta classhub/tasks)', 'Cloudinary devuelve una URL; en MySQL solo se guarda la URL'] },
    { n: 'Asistente de IA', pasos: ['El monitor escribe la tarea en lenguaje normal (AITaskAssistant)', 'POST /api/ai/assist', 'Se envía a Claude (claude-haiku-4-5) con instrucciones (SYSTEM) de devolver JSON', 'El JSON (título, materia, prioridad, tipo, entrega) llena el formulario', 'El monitor revisa y publica'] },
    { n: 'Notificaciones push', pasos: ['El celular acepta y se suscribe (lib/push-client.ts → /api/push/subscribe)', 'Se guarda en push_subscriptions', 'Al crear tarea, lib/push-server.ts envía con web-push (claves VAPID)', 'public/sw.js la muestra aunque la app esté cerrada'] },
    { n: 'Horario, avisos y chat', pasos: ['Horario: foto → Cloudinary → tabla schedules (+3 puntos)', 'Avisos: POST /api/announcements → tabla announcements (+4 puntos)', 'Chat de monitores: /api/staff-chat → tabla staff_chat (solo monitores y admin)'] },
    { n: 'Panel de administración', pasos: ['app/(app)/admin/page.tsx con 5 pestañas: Usuarios, Materias, Grupos, Acceso, Sistema', 'Usa las API de app/api/admin/*', 'Solo rol admin (middleware + requireRole)'] },
    { n: 'Registro y recuperar código', pasos: ['Registro: /api/auth/register solo acepta @inemjose.edu.co; máx. 5 registros cada 15 min', 'Recuperar: /api/auth/forgot-password crea un token (se guarda su hash) y lo envía por Resend', '/api/auth/reset-password cambia el código'] },
    { n: 'Permisos (dos capas)', pasos: ['Capa 1: middleware.ts revisa el rol en el JWT antes de cada página', 'Capa 2: cada API llama requireSession o requireRole', 'Roles: student (0), moderator (1), admin (2)'] },
  ],

  tablas: [
    ['groups', 'Los 90 grupos (id, name, grade)'],
    ['users', 'Usuarios: email, student_code, full_name, role, group_id, points, rank_level'],
    ['subjects', 'Materias por grupo, con el nombre del profesor de la materia'],
    ['tasks', 'Tareas: título, materia, prioridad, tipo, entrega, imágenes, due_at'],
    ['task_status', 'Estado de cada tarea por estudiante (une users y tasks)'],
    ['announcements', 'Avisos del grupo'],
    ['schedules', 'Foto del horario de cada grupo'],
    ['staff_chat', 'Mensajes del chat de monitores'],
    ['user_payment_status', 'Acceso de cada estudiante: PENDING, ACTIVE o SUSPENDED'],
    ['app_config', 'Configuración general (modo de acceso)'],
    ['refresh_tokens · login_attempts · rate_limit_events · password_reset_tokens', 'Seguridad y sesiones'],
    ['push_subscriptions', 'Celulares suscritos a notificaciones'],
    ['schema_migrations', 'Qué migraciones ya se aplicaron'],
  ],

  despliegue: [
    'Se programa en VS Code y se guarda con Git (commit).',
    'Se sube a GitHub (git push).',
    'GitHub Actions corre la CI: lint, tipos, 140 pruebas, compilación, auditoría.',
    'Al llegar a la rama main, Railway lee el Dockerfile y construye la imagen (Node 20).',
    'Railway la publica en classhub-production.up.railway.app y revisa /api/health.',
    'La app se conecta a MySQL por la red interna de Railway con las variables de entorno.',
    'Cada noche, GitHub Actions saca un respaldo de la base (mysqldump).',
  ],

  numeros: [
    ['17', 'tablas en MySQL'], ['140', 'pruebas automáticas'], ['105', 'archivos de código'], ['37', 'rutas de la API'],
    ['74', 'commits (desde el 17-may-2026)'], ['3', 'roles'], ['49', 'cuentas reales'], ['90', 'grupos'],
    ['1 h / 30 días', 'sesión / renovación'], ['10 en 15 min', 'intentos antes del bloqueo'], ['5 MB', 'máximo por imagen'], ['0–5 USD', 'costo al mes'],
  ],

  apertura: `Buenos días. Somos Jerónimo Uribe, Juan Sebastián García, Miguel Ángel Valencia y Diego. ¿Cuántos se han enterado de una tarea el mismo día de entregarla? Para eso hicimos ClassHub: una aplicación web full-stack para que nadie pierda una tarea. Les mostramos el problema, la app funcionando (pueden probarla con el QR), cómo está construida y cómo la publicamos.`,
  cierre: `Empezamos preguntando cómo hacer que nadie pierda una tarea. Hoy la respuesta está funcionando: Next.js y TypeScript, MySQL, desplegada en Railway, con 140 pruebas automáticas y respaldo diario. Gracias. Respondemos sus preguntas.`,

  reparto: [
    ['Problema, objetivos, alcance', 'Quien expone El porqué'], ['Funciones, roles, demo', 'Quien expone El qué'],
    ['Tecnologías, arquitectura, base de datos', 'Quien expone El cómo'], ['Proceso, pruebas, seguridad', 'Quien expone El proceso'],
    ['"¿Por qué decidieron…?"', 'Tú, como líder y creador'],
  ],
  frases: [
    ['Pasar una pregunta', '"Eso lo trabajó [nombre], que les explica."'],
    ['Si no saben', '"No lo medimos; lo haríamos así: …"'],
    ['Si falla la demo', '"Les mostramos la copia local, idéntica" → localhost:3000'],
  ],
};
