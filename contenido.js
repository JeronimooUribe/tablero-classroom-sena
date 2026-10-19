// Contenido real de ClassHub para cada esfera. Verificado contra el código, el historial de git
// y la base de producción el 2026-10-18. Se mezcla sobre la estructura de data.js.

(() => {
  const T = window.TABLERO;
  const URL_APP = 'classhub-production.up.railway.app';

  T.actualizado = '2026-10-18';
  T.proyecto.frase = 'Una aplicación web para que los estudiantes del INEM no pierdan ninguna tarea: el monitor de tareas de cada salón las publica, los estudiantes las ven en el celular y marcan su avance.';
  T.proyecto.preguntaOrigen = '¿Cómo logramos que ningún estudiante se pierda una tarea, si las tareas se dictan en clase y no quedan escritas en ningún lugar común?';

  T.checklist = [
    { titulo: 'Investigar cómo se hace una exposición excelente y cómo aprenderla rápido', estado: 'hecho',
      detalle: 'Las pautas están en Exponer, Estudiar y NotebookLM.' },
    { titulo: 'Encontrar ClassHub, limpiarlo y dejarlo funcionando', estado: 'hecho',
      detalle: 'Arreglado, publicado en Railway, con cuentas de prueba, QR y modo offline. Ver la esfera 15.' },
    { titulo: 'Llenar las 16 esferas con ClassHub', estado: 'hecho',
      detalle: 'Cada esfera tiene contenido, frases y preguntas del jurado. Faltan los videos de NotebookLM.' },
  ];

  const llenar = (n, datos) => Object.assign(T.esferas.find(e => e.n === n), { estado: 'lista' }, datos);

  // ───────────────────────── El porqué ─────────────────────────
  llenar(1, {
    contenido:
`ClassHub es una aplicación web para organizar las tareas del colegio desde el celular. La construimos para el INEM José Félix de Restrepo, de Medellín, dentro de la media técnica articulada con el SENA.

Somos Jerónimo Uribe Garcés, Juan Sebastián Carmona, Juan Diego Gaviria y Miguel Ángel Valencia.

Gancho sugerido: "¿Cuántos de ustedes han llegado a clase y se enteraron ahí mismo de que había una tarea para hoy?". Se deja un segundo de silencio y se sigue: "Eso nos pasaba a todos. Por eso hicimos ClassHub."

Mapa de la exposición, en una frase: primero el problema, después lo que hace ClassHub y la demo, luego cómo está construido por dentro, y al final cómo lo hicimos y qué logramos.`,
    arranque: 'Buenos días. ¿Cuántos de ustedes se han enterado de una tarea el mismo día que había que entregarla?',
    relevo: 'Para entender por qué existe ClassHub, primero hay que ver el problema que vivíamos en el salón.',
    preguntas: [
      { p: '¿Qué es ClassHub en una sola frase?', r: 'Una aplicación web donde el monitor de tareas de cada salón publica las tareas de cada grupo y los estudiantes las ven y marcan su avance desde el celular.' },
      { p: '¿Por qué se llama ClassHub?', r: '"Class" es clase y "hub" es punto central: el lugar donde se reúne todo lo de la clase. Antes se llamaba SchoolTasks; se cambió el 18 de mayo de 2026.' },
    ],
  });

  llenar(2, {
    contenido:
`La pregunta que lo empezó todo: ¿cómo logramos que ningún estudiante se pierda una tarea, si las tareas se dictan en clase y no quedan escritas en ningún lugar común?

El problema que vivíamos:
• Las tareas se decían en voz alta o en el tablero, y quien faltaba o no anotaba se quedaba sin saber.
• No había un solo lugar donde ver las tareas de todas las materias del grupo.
• Los monitores de tareas de cada salón no tenían una forma sencilla de publicarlas en digital para su grupo: todo terminaba perdido en los grupos de WhatsApp.
• Nadie sabía qué tareas tenía hechas y cuáles pendientes.
• Los avisos del salón se perdían entre los chats de WhatsApp.

A quién le duele: a los estudiantes, que pierden notas por olvidos; a los profesores, que repiten lo mismo varias veces; y a los papás, que no saben qué hay pendiente.

Cómo se resolvía antes: cuadernos, fotos del tablero y grupos de WhatsApp donde la información se pierde entre mensajes.`,
    arranque: 'Todo empezó con una pregunta muy simple: ¿cómo hacemos para que nadie se pierda una tarea?',
    relevo: 'Con ese problema claro, nos pusimos unos objetivos concretos.',
    preguntas: [
      { p: '¿Cómo saben que el problema era real?', r: 'Lo vivíamos todos los días en nuestro propio salón: tareas dictadas en clase que no quedaban escritas en ningún lado. Ese es el origen. Si hicieron encuesta o entrevistas, este es el momento de mencionarlo con el dato exacto.' },
      { p: '¿Por qué no usar Google Classroom o WhatsApp?', r: 'WhatsApp mezcla las tareas con todo lo demás y no lleva el estado de cada una. Classroom depende de que cada profesor lo adopte y no está pensado para ver todas las materias del grupo juntas. ClassHub está hecho a la medida del INEM: los 90 grupos del colegio, el correo institucional y el seguimiento por estudiante.' },
    ],
  });

  llenar(3, {
    contenido:
`Objetivo general: crear una aplicación web, a la medida del INEM, donde los monitores de tareas publiquen las tareas y avisos de cada grupo y los estudiantes los consulten y hagan seguimiento desde cualquier celular.

Objetivos específicos:
1. Publicar tareas por materia y grupo, con fecha de entrega y prioridad (normal o urgente).
2. Que cada estudiante marque su avance en cada tarea: pendiente, en proceso o completada.
3. Que cada persona entre con su correo institucional y vea solo lo que le corresponde según su rol.
4. Que funcione en el celular sin instalar nada, y que se pueda instalar como app.

Qué sí hace: tareas, calendario, avisos, horario del grupo, puntos por constancia, chat interno de monitores, panel de administración, control de acceso y asistente de IA para redactar tareas.

Qué no hace, a propósito: no califica ni reemplaza la plataforma de notas del colegio, no recibe archivos de entrega (la tarea dice dónde se entrega: Classroom, Moodle, Teams, correo o en físico) y no es una red social.`,
    arranque: 'Nuestro objetivo general fue uno: que las tareas de cada grupo estuvieran en un solo lugar, en el celular de cada estudiante.',
    relevo: 'Ya saben por qué existe y qué buscábamos. Ahora les mostramos qué hace ClassHub.',
    preguntas: [
      { p: '¿Cumplieron todos los objetivos?', r: 'Sí, los cuatro están funcionando y se pueden ver en la demo. Lo que no alcanzamos fue el microservicio de estadísticas en Java ni el panel de analíticas; quedaron como trabajo futuro.' },
      { p: '¿Por qué no reciben las entregas de los trabajos?', r: 'Fue una decisión de alcance: cada profesor ya usa su plataforma (Classroom, Moodle, Teams). ClassHub organiza y recuerda; no compite con esas herramientas. Cada tarea indica dónde se entrega.' },
    ],
  });

  // ───────────────────────── El qué ─────────────────────────
  llenar(4, {
    contenido:
`ClassHub es una página web que funciona como una app. Se abre desde el celular o el computador, sin instalar nada, aunque también se puede instalar en la pantalla de inicio (es una PWA).

Funciones principales:
• Tareas: el monitor publica título, materia, descripción, fecha de entrega, prioridad, tipo (taller, evaluación, exposición, proyecto o grupal), dónde se entrega, imágenes y enlaces.
• Seguimiento: cada estudiante marca cada tarea como pendiente, en proceso o completada. Las urgentes y las vencidas se destacan.
• Calendario: todas las entregas del mes en una vista.
• Avisos y horario: el monitor publica avisos con imagen y la foto del horario del grupo.
• Puntos y rangos: el estudiante gana puntos por entrar cada día (2), por empezar una tarea (3) y por completarla (10), y sube de rango: Novato, Estudiante, Destacado, Avanzado, Élite y Leyenda.
• Asistente de IA: el monitor escribe la tarea como la dijo en clase ("para el viernes taller de mate, ejercicios 1 al 12") y la IA llena el formulario sola: título, descripción, materia, prioridad, tipo y dónde se entrega.

Por qué esta solución: es web, así que funciona en cualquier celular; es gratis para el estudiante; y cada grupo ve solo lo suyo.`,
    arranque: 'ClassHub es, en pocas palabras, la agenda del salón, pero en el celular y siempre al día.',
    relevo: 'Esto lo usan tres tipos de personas distintas, y cada una tiene sus propios permisos.',
    preguntas: [
      { p: '¿Hay que descargarla de la Play Store?', r: 'No. Es una página web que se abre en el navegador. Como es una PWA, también se puede agregar a la pantalla de inicio y se ve como una app, sin pasar por ninguna tienda.' },
      { p: '¿Para qué sirven los puntos?', r: 'Son una motivación: premian la constancia (entrar cada día, empezar y terminar tareas). Se llama gamificación. No afectan notas.' },
    ],
  });

  llenar(5, {
    contenido:
`Tres roles:
• Estudiante: ve las tareas de su grupo, marca su avance, consulta el calendario, los avisos y el horario, y gana puntos.
• Monitor de tareas (en el sistema se llama "moderador"; es un estudiante elegido por el grupo): todo lo del estudiante, más crear, editar y borrar tareas y avisos de su grupo, publicar el horario, administrar las materias y usar el chat interno de monitores.
• Administrador: todo lo anterior, más gestionar usuarios, grupos, materias, pagos de acceso y la configuración general.

Historias de usuario principales:
• "Como estudiante, quiero ver todas mis tareas en un solo lugar para no olvidar ninguna."
• "Como monitor de tareas, quiero publicar una tarea una sola vez para que todo mi grupo la vea."
• "Como administrador, quiero controlar quién entra para que solo usen la plataforma estudiantes del colegio."

Requisitos funcionales (lo que hace): iniciar sesión, listar y filtrar tareas, cambiar el estado, crear tareas, publicar avisos y administrar usuarios.

Requisitos no funcionales (cómo lo hace): funciona en celular, carga rápido, es seguro (sesión protegida, límite de intentos) y aguanta los 90 grupos del colegio.`,
    arranque: 'ClassHub tiene tres tipos de usuario, y cada uno ve una aplicación distinta según su rol.',
    relevo: 'Mejor que contarlo es verlo. Vamos a la demo.',
    preguntas: [
      { p: '¿Cómo se controla qué ve cada rol?', r: 'En dos lugares. El middleware revisa la sesión antes de abrir cada página y saca a quien no tiene permiso. Y cada ruta del servidor vuelve a revisar el rol antes de responder. Por ejemplo, un estudiante que intenta abrir el chat de monitores es redirigido a su tablero.' },
      { p: '¿Cómo se registra un estudiante?', r: 'En /register, con su correo institucional (@inemjose.edu.co), su código de estudiante y su grupo. El sistema solo acepta el dominio del colegio y máximo 5 registros por dirección cada 15 minutos. Con el control de acceso activo, la cuenta nueva queda pendiente hasta que el administrador la active.' },
    ],
  });

  llenar(6, {
    contenido:
`La demo se hace en la versión real: ${URL_APP}. Si no hay internet, se usa la copia offline (ARRANCAR OFFLINE.bat en el computador de Jerónimo).

Guion fijo, en orden:
1. Mostrar el QR y decirle al público que entre con estudiante@classhub.demo y el código demo2026.
2. Entrar como estudiante: el tablero con las 6 tareas del grupo "Demo SENA" y las 2 urgentes destacadas arriba.
3. Marcar "Presentar el proyecto de grado" como "En proceso" (por dentro suma 3 puntos).
4. Abrir el calendario y después los avisos.
5. Entrar como monitor (cuenta solo del equipo) y crear una tarea nueva en vivo.
6. Volver al celular del estudiante y mostrar que la tarea apareció al instante.
7. (Solo offline) Entrar como administrador y mostrar el panel de usuarios y grupos.

Qué decir mientras tanto: describir lo que pasa y el beneficio, no los botones. Por ejemplo: "Esta tarea es urgente, por eso aparece primero."

Respaldo: modo offline listo en el computador. Si falla también, se muestran capturas.`,
    arranque: 'Ahora lo van a ver funcionando, y si escanean este QR lo pueden probar desde su propio celular.',
    relevo: 'Eso es lo que ven los usuarios. Ahora les mostramos lo que pasa por dentro.',
    preguntas: [
      { p: '¿Los datos de la demo son reales?', r: 'No. La demo usa un grupo aparte, "Demo SENA", con cuentas y tareas de prueba. Los estudiantes reales no ven nada de eso, y desde esas cuentas no se ven los datos de nadie más.' },
      { p: '¿Qué pasa si se cae el internet durante la demo?', r: 'Tenemos el modo offline: la aplicación y su base de datos corren en el computador con Docker, con los mismos datos de prueba.' },
    ],
  });

  // ───────────────────────── El cómo ─────────────────────────
  llenar(7, {
    contenido:
`Una forma fácil de entenderlo: un restaurante.
• El celular es la mesa: ahí el cliente pide y recibe.
• El servidor de Next.js es el mesero y la cocina: recibe el pedido, revisa que el cliente tenga permiso y prepara la respuesta.
• MySQL es la despensa: donde se guarda todo de forma ordenada.

Las piezas reales:
1. Lo que ve el usuario: páginas hechas con React y Next.js, que se adaptan al celular.
2. El servidor: Next.js con rutas de API (por ejemplo /api/v1/tasks). Valida la sesión, el rol y los datos antes de tocar la base.
3. La base de datos: MySQL 8 en Railway.
4. Servicios externos: Cloudinary (imágenes), Resend (correos), Anthropic Claude (IA) y Web Push (notificaciones).

El viaje de un dato, con un ejemplo: el estudiante toca "Completada". El celular envía la petición a /api/v1/tasks/{id}/status. El middleware revisa que la sesión sea válida, el servidor valida los datos con Zod, MySQL guarda el estado en la tabla task_status, se suman 10 puntos y la pantalla se actualiza.

Dónde vive: en Railway, en internet, todo el día. Cada cambio que se sube a GitHub pasa por pruebas automáticas y Railway lo publica solo.`,
    arranque: 'Por dentro, ClassHub funciona como un restaurante: la mesa, la cocina y la despensa.',
    relevo: 'Esa arquitectura la construimos con unas tecnologías concretas, y cada una tiene su razón.',
    preguntas: [
      { p: '¿Por qué frontend y backend en el mismo proyecto?', r: 'Next.js permite tener las páginas y la API juntas. Para un equipo pequeño es más simple: un solo proyecto, un solo despliegue y TypeScript en ambos lados. Esa decisión quedó documentada en el ADR-001.' },
      { p: '¿Qué es el middleware?', r: 'Un portero que se ejecuta antes de cada página o API: revisa si hay sesión y si el rol tiene permiso. Si no, redirige al inicio de sesión o al tablero.' },
      { p: 'Dibujen la arquitectura.', r: 'Celular → (HTTPS) → Railway: servicio "classhub" (Next.js en Docker) → servicio "MySQL". A un lado: Cloudinary, Resend, Claude y Web Push.' },
    ],
  });

  llenar(8, {
    contenido:
`Lenguajes:
• TypeScript: todo el proyecto (páginas y servidor). Es JavaScript con tipos, que atrapa errores antes de ejecutar.
• SQL: para crear las tablas y consultar la base de datos.
• Java (Spring Boot): se empezó un microservicio de estadísticas (classhub-stats) que quedó sin terminar.

Frameworks y herramientas:
• Next.js 15 y React 19: páginas y servidor en un solo proyecto.
• Tailwind CSS: estilos rápidos y adaptables al celular.
• MySQL 8 con mysql2: la base de datos y su conexión.
• jose (JWT) y bcryptjs: sesiones seguras.
• Zod: valida cada dato que llega al servidor.
• Vitest: pruebas automáticas.
• Docker: empaqueta la app para Railway y para el modo offline.
• GitHub Actions: revisa cada cambio y saca respaldos diarios.
• Cloudinary, Resend, Anthropic Claude (modelo claude-haiku-4-5) y Web Push.

Por qué estas: son tecnologías que se usan hoy en la industria, tienen planes gratuitos y Next.js deja hacer todo con un solo lenguaje.
Alternativas descartadas: PHP con Laravel (dos mundos distintos, front y back); Firebase (menos control de los datos y relaciones); y Vercel y Netlify como hosting (se terminó en Railway para tener la app y la base en el mismo lugar).`,
    arranque: 'ClassHub está escrito casi todo en un solo lenguaje: TypeScript.',
    relevo: 'Toda esa tecnología existe para guardar y mover datos. Veamos cómo están organizados.',
    preguntas: [
      { p: '¿Por qué TypeScript y no JavaScript?', r: 'Porque los tipos atrapan errores antes de ejecutar el código. Por ejemplo, si una función espera un número y le mandan un texto, el editor avisa de inmediato.' },
      { p: '¿Por qué MySQL y no MongoDB?', r: 'Los datos de ClassHub son muy relacionales: usuarios pertenecen a grupos, tareas a materias, estados a usuario y tarea. Una base relacional con llaves foráneas lo maneja de forma natural y segura.' },
      { p: '¿Usaron IA para programar?', r: 'Sí, como herramienta de apoyo, igual que hoy se usa en la industria. Las instrucciones de cada versión (V2 a V8) están guardadas en el historial del proyecto. Las decisiones, las pruebas y la revisión fueron nuestras. Respondan con honestidad.' },
    ],
  });

  llenar(9, {
    contenido:
`ClassHub guarda los datos en MySQL, en tablas relacionadas entre sí.

Las tablas principales:
• groups: los grupos del colegio (90, como 11-1 o 6-3).
• users: estudiantes, monitores y administradores, con su grupo, rol, puntos y rango.
• subjects: las materias de cada grupo, con el nombre del profesor de la materia.
• tasks: las tareas (título, materia, descripción, prioridad, tipo, fecha de entrega e imágenes).
• task_status: el estado de cada tarea para cada estudiante. Es una tabla intermedia: un estudiante tiene muchas tareas y una tarea tiene muchos estudiantes.
• announcements: los avisos de cada grupo.
• user_payment_status: el control de acceso de cada cuenta (PENDING, ACTIVE o SUSPENDED).
• app_config: la configuración general, como el modo de acceso o si se permiten cuentas nuevas.
• staff_chat, schedules, push_subscriptions, refresh_tokens, login_attempts y password_reset_tokens: chat de monitores, horarios, notificaciones, sesiones, seguridad y recuperación.

Relaciones clave (modelo entidad-relación): un grupo tiene muchos usuarios, materias, tareas y avisos. Una tarea pertenece a un grupo y a una materia. task_status une usuario y tarea.

Cómo se protege: las llaves foráneas evitan datos huérfanos. Los cambios de estructura van en migraciones numeradas (001 a 008). Y GitHub Actions saca un respaldo completo todos los días. Lo verificamos restaurándolo: 49 usuarios, 30 tareas y 118 estados.`,
    arranque: 'Todo lo que ven en ClassHub está guardado en una base de datos MySQL, organizada en tablas que se relacionan entre sí.',
    relevo: 'Hasta aquí el cómo. Ahora les contamos cómo lo construimos en el tiempo.',
    preguntas: [
      { p: '¿Por qué existe la tabla task_status?', r: 'Porque el estado de una tarea depende de cada estudiante: la misma tarea puede estar completada para uno y pendiente para otro. Es la tabla intermedia de una relación muchos a muchos entre users y tasks.' },
      { p: '¿Qué pasa si se borra la base de datos?', r: 'Hay un respaldo automático diario con mysqldump en GitHub Actions, que se guarda 30 días. Lo probamos restaurándolo en una base aparte y los conteos coincidieron con producción.' },
      { p: '¿Cómo guardan las contraseñas?', r: 'El ingreso es con correo y código de estudiante. Hoy esos códigos están en texto plano en la base: el código para guardarlos con hash bcrypt existe, pero la migración nunca se aplicó en producción. Es una deuda de seguridad que reconocemos.' },
    ],
  });

  // ───────────────────────── El proceso ─────────────────────────
  llenar(10, {
    contenido:
`Fases del proyecto formativo SENA:
• Análisis: identificamos el problema en nuestro salón y definimos los roles y requisitos.
• Planeación: elegimos las tecnologías, diseñamos la base de datos y la lista de funciones por versiones.
• Ejecución: construimos por versiones.
• Evaluación: pruebas automáticas, revisión de seguridad y ahora la sustentación.

Línea de tiempo según el historial de git (74 commits):
• 17 de mayo de 2026: ClassHub v1 en línea.
• 18 de mayo: control de acceso (pagos) y corrección de zona horaria de Colombia.
• 20 a 23 de mayo: versiones V2 a V8 (filtros, enlaces, horario, gamificación, logo, PWA, imágenes, chat interno y notificaciones push).
• 11 de junio: landing comercial, CI, pruebas, monitoreo con Sentry, encabezados de seguridad y límite de intentos.
• 19 de junio: API v1, capa de servicios y respaldo diario de la base.
• 22 de septiembre: recuperación del código por correo y demo de verificación en dos pasos (6 commits de la cuenta dasanmos).
• 18 de octubre: limpieza para la exposición, arreglo de un bug grave, modo offline y cuentas de prueba.

Importante: el código en git empieza en mayo de 2026. El trabajo de los meses anteriores (análisis, diseño y prototipos) lo cuenta el equipo con sus propias fechas.

Cómo nos organizamos: Git y GitHub para el código, ramas y pull requests para los cambios, y un documento de instrucciones por cada versión.`,
    arranque: 'ClassHub no salió de un día para otro: lo construimos por versiones, siguiendo las fases del proyecto formativo del SENA.',
    relevo: 'Construir es la mitad. La otra mitad es asegurarse de que funcione bien y sea seguro.',
    preguntas: [
      { p: '¿Qué metodología usaron?', r: 'Desarrollo incremental por versiones, parecido a sprints de una metodología ágil: cada versión (V1 a V8 y luego los sprints 11 a 13) tenía una lista cerrada de mejoras. El SENA lo enmarca en sus fases: análisis, planeación, ejecución y evaluación.' },
      { p: '¿Cómo trabajaron en equipo sobre el mismo código?', r: 'Con Git y GitHub. Cada cambio se registra en un commit; los cambios grandes van en una rama y entran por pull request, que corre las pruebas automáticas antes de unirse.' },
      { p: '¿Quién hizo qué?', r: 'Respondan con lo real de cada uno. En git: Jerónimo, creador y autor de la mayoría de los commits; la cuenta dasanmos hizo la recuperación por correo y la demo de verificación en dos pasos (confirmen de quién es).' },
    ],
  });

  llenar(11, {
    contenido:
`Pruebas: 140 pruebas automáticas con Vitest, que revisan sesión, permisos, validación de datos, límite de intentos, tokens y el aislamiento entre grupos. GitHub Actions corre en cada cambio: lint, revisión de tipos, pruebas, compilación y auditoría de dependencias. Si algo falla, el cambio no entra.

Seguridad:
• Sesión con JWT firmado, en una cookie HttpOnly que JavaScript no puede leer. Dura 1 hora y se renueva con un token de 30 días.
• Middleware y validación de rol en cada ruta.
• Límite de intentos: 10 intentos fallidos en 15 minutos bloquean temporalmente.
• Zod valida cada dato que llega al servidor.
• Encabezados de seguridad: CSP, HSTS y protección contra iframes.
• Las claves secretas viven en variables de entorno, nunca en el código.

Retos que vencimos:
1. La zona horaria de Colombia (UTC-5): las tareas vencían a la hora equivocada.
2. Integrar el control de pagos sin romper el ingreso normal.
3. Un bug grave encontrado en la revisión final: desde el 19 de junio, una regla del servidor bloqueaba a estudiantes y monitores en la API v1 y no veían sus tareas. Lo encontramos, escribimos una prueba que reproducía el fallo y lo corregimos.

Qué haríamos diferente: pruebas de punta a punta desde el principio, y aplicar el cifrado de los códigos de estudiante.`,
    arranque: 'Para nosotros no bastaba con que funcionara una vez: tenía que funcionar siempre y ser seguro.',
    relevo: 'Con todo eso, cerramos con lo que logramos y lo que viene.',
    preguntas: [
      { p: '¿Cómo probaron que funciona?', r: 'Con 140 pruebas automáticas que corren en cada cambio, más un recorrido manual con las tres cuentas de prueba en una copia local de la base y en producción.' },
      { p: 'Cuéntenos un error real que hayan tenido.', r: 'Desde junio, el middleware bloqueaba la API v1 a todos menos al administrador, y los estudiantes veían el tablero vacío. Primero escribimos una prueba que reproducía el fallo y lo vimos fallar. Después quitamos la regla, la prueba pasó, y lo verificamos en producción.' },
      { p: '¿Qué es un JWT?', r: 'Un "carnet digital" firmado por el servidor que dice quién eres y qué rol tienes. Como está firmado, nadie lo puede falsificar sin la clave secreta del servidor.' },
      { p: '¿Qué pasa si alguien intenta adivinar códigos?', r: 'Después de 10 intentos fallidos en 15 minutos desde la misma dirección, el servidor lo bloquea temporalmente.' },
    ],
  });

  llenar(12, {
    contenido:
`Resultados contra los objetivos:
1. Publicar tareas por grupo y materia: cumplido.
2. Seguimiento por estudiante: cumplido (pendiente, en proceso o completada, más los puntos).
3. Ingreso seguro por rol: cumplido.
4. Funciona en celular sin instalar nada: cumplido (PWA).

Datos reales: la plataforma tiene cargados los 90 grupos del colegio y 622 materias. Hubo 49 cuentas reales (44 estudiantes, 3 monitores y 2 administradores) en 4 grupos, con 30 tareas y 118 seguimientos. No digan "600 estudiantes": esa es la capacidad pensada para el colegio, no el uso real.

Lo que aprendimos: a construir una aplicación completa de punta a punta, a trabajar con Git, a escribir pruebas, a desplegar en la nube y a revisar con honestidad lo que no funcionaba.

Futuro: aplicar el cifrado de los códigos, activar los recordatorios automáticos, terminar las estadísticas y abrirlo a más colegios.

Cierre: volver a la pregunta de origen. "Empezamos preguntándonos cómo hacer que nadie se perdiera una tarea. Hoy cualquiera de ustedes puede escanear el QR y ver la respuesta funcionando."`,
    arranque: 'Volvamos a los cuatro objetivos que les mostramos al principio.',
    relevo: 'Gracias. Quedamos atentos a sus preguntas.',
    preguntas: [
      { p: '¿Cuántas personas lo usaron de verdad?', r: '49 cuentas reales: 44 estudiantes, 3 monitores y 2 administradores, en 4 grupos. Crearon 30 tareas con 118 seguimientos. La plataforma tiene cargados los 90 grupos del colegio.' },
      { p: '¿Qué le falta para usarse en todo el colegio?', r: 'Cifrar los códigos de estudiante, activar el programador de recordatorios y que cada salón tenga su monitor de tareas con cuenta. La infraestructura ya soporta los 90 grupos.' },
      { p: '¿Cuánto cuesta mantenerlo?', r: 'Entre 0 y unos 5 dólares al mes: Railway para la app y la base, y los planes gratuitos de Cloudinary y Resend. La IA se paga por uso y es muy poco.' },
    ],
  });

  // ───────────────────────── Bastidores ─────────────────────────
  llenar(13, {
    contenido:
`• Aplicación web: programa que se usa desde el navegador, sin instalar.
• PWA (aplicación web progresiva): web que se puede instalar en el celular como una app.
• Frontend: lo que ve y toca el usuario.
• Backend o servidor: lo que procesa y guarda, y el usuario no ve.
• API: la "ventanilla" por donde el frontend le pide cosas al servidor (por ejemplo /api/v1/tasks).
• Base de datos relacional (MySQL): tablas que se conectan entre sí con llaves.
• Llave foránea: columna que conecta una tabla con otra (por ejemplo, tasks.group_id apunta a groups).
• Next.js y React: herramientas para construir las páginas y el servidor con JavaScript.
• TypeScript: JavaScript con tipos, que atrapa errores antes.
• JWT: carnet digital firmado que prueba quién eres.
• Cookie HttpOnly: donde se guarda la sesión, a salvo de JavaScript malicioso.
• Middleware: el portero que revisa permisos antes de cada página.
• Rol: el tipo de usuario (estudiante, monitor o administrador).
• Hash (bcrypt): forma de guardar claves para que no se puedan leer.
• Migración: script numerado que cambia la estructura de la base de forma controlada.
• Despliegue: publicar la app en internet.
• Railway: la nube donde vive ClassHub.
• Docker: "caja" que empaqueta la app para que corra igual en cualquier computador.
• Git y GitHub: historial de cambios del código y el sitio donde se guarda.
• CI (integración continua): revisión automática de cada cambio.
• Prueba automática: código que verifica que otro código funciona.
• Respaldo (backup): copia de seguridad de la base de datos.
• Gamificación: puntos y rangos para motivar.
• IA (Claude de Anthropic): modelo que convierte el texto libre del monitor en una tarea con sus campos llenos.`,
    preguntas: [
      { p: '¿Qué diferencia hay entre frontend y backend?', r: 'El frontend es lo que ves (botones y listas en el celular). El backend es lo que no ves: el servidor que revisa permisos, guarda en la base y responde.' },
    ],
  });

  llenar(14, {
    contenido:
`Cómo responder: escuchar la pregunta completa, repetirla en una frase y contestar en tres partes: la idea, el porqué y un ejemplo de ClassHub. Si no saben, lo dicen con honestidad y explican cómo lo averiguarían.

Quién responde: el dueño del bloque de esa pregunta. Problema y objetivos: bloque 1. Funciones y demo: bloque 2. Tecnología y base de datos: bloque 3. Proceso, pruebas y seguridad: bloque 4.

Abajo están las preguntas probables, con su respuesta modelo. Cada esfera tiene además sus propias preguntas.`,
    preguntas: [
      { p: '¿Cuál fue la mayor dificultad técnica?', r: 'Dos: manejar bien la zona horaria de Colombia en las fechas de entrega, y el bug de permisos de la API v1 que encontramos al final. Este último lo resolvimos con una prueba que reproducía el fallo.' },
      { p: '¿Por qué eligieron esta arquitectura?', r: 'Next.js une frontend y backend en un solo proyecto y un solo lenguaje, ideal para un equipo pequeño. MySQL porque los datos son relacionales. Railway porque aloja la app y la base juntas.' },
      { p: '¿Cómo garantizan la seguridad de los datos de los estudiantes?', r: 'Sesión firmada en una cookie HttpOnly, permisos por rol revisados dos veces, validación de datos, límite de intentos, encabezados de seguridad y respaldo diario. Y reconocemos una deuda: los códigos de estudiante aún no están cifrados en la base.' },
      { p: '¿Qué es una API REST y dónde la usan?', r: 'Es una forma de comunicar el frontend con el servidor por medio de direcciones y métodos HTTP. En ClassHub, GET /api/v1/tasks lista las tareas, POST crea una y PATCH /api/v1/tasks/{id}/status cambia el estado.' },
      { p: '¿Qué pasa si dos estudiantes marcan la misma tarea al tiempo?', r: 'No hay conflicto: el estado se guarda por estudiante en task_status, con una llave compuesta (tarea y usuario). Cada uno tiene su propia fila.' },
      { p: '¿Cómo publican una nueva versión?', r: 'Subimos el cambio a GitHub. GitHub Actions corre lint, tipos, pruebas, compilación y auditoría. Si todo pasa, Railway construye la imagen de Docker y la publica sola.' },
      { p: '¿Qué hace la inteligencia artificial?', r: 'Le ahorra tiempo al monitor: escribe la tarea en lenguaje normal, como la dijo en clase, y la IA (Claude de Anthropic, modelo claude-haiku-4-5) devuelve los campos del formulario llenos: título, descripción, materia, prioridad, tipo y dónde se entrega. El monitor revisa y publica.' },
      { p: '¿Funciona sin internet?', r: 'La versión pública necesita internet. Para exponer tenemos un modo offline: la app y su base corren en el computador con Docker.' },
      { p: '¿Cómo escala si lo usa todo el colegio?', r: 'La app no guarda estado en memoria (la sesión va en el token), así que se pueden agregar más servidores. La base tiene índices por grupo y por fecha. El límite de hoy es el plan de Railway, no el diseño.' },
      { p: '¿Qué aprendieron de este proyecto?', r: 'Que construir es solo una parte: probar, documentar, desplegar y revisar con honestidad lo que no funciona es lo que lo vuelve un producto real.' },
      { p: '¿Por qué quitaron funciones antes de exponer?', r: 'Porque había módulos a medio hacer (multi-colegio y analíticas) que nunca llegaron a la base real y siempre fallaban. Preferimos mostrar menos funciones, pero que todas funcionen.' },
      { p: '¿Qué es el control de acceso o pagos?', r: 'Un módulo para que el administrador decida quién entra: cada cuenta puede estar PENDING, ACTIVE o SUSPENDED, con fecha de vencimiento. Hay un modo general (abierto, normal o mantenimiento). Pensado para un modelo de suscripción.' },
    ],
  });

  llenar(15, {
    contenido:
`Dónde está en el computador de Jerónimo:
Escritorio\\Programacion\\Proyectos_programacion\\Proyecto_tareas\\
• ClassHub - Codigo: el código (repositorio de git).
• ClassHub - Exposicion: QR, presentación de mayo, imágenes y la guía "LEEME - Como abrir ClassHub", con las cuentas y el código del monitor.
• ClassHub - Historial: versiones viejas, instrucciones V2 a V8 y el microservicio Java sin terminar.

Qué hay en el código:
• app/: las páginas y la API. (auth) es el ingreso, (app) es la aplicación, landing es la página de presentación y api es el servidor.
• components/: piezas de interfaz (tarjeta de tarea, menú lateral).
• lib/: lógica compartida (base de datos, sesión, validación, puntos, límites).
• database/: migraciones y datos del modo offline.
• docs/: decisiones de arquitectura (ADR), seguridad, modelo de amenazas y respaldo.
• __tests__/: las 140 pruebas.
• middleware.ts: el portero de permisos.

Cómo se abre:
• Online: ${URL_APP} (o el QR). Público: estudiante@classhub.demo con el código demo2026.
• Offline: abrir Docker Desktop y hacer doble clic en ClassHub - Codigo\\ARRANCAR OFFLINE.bat. Se abre localhost:3000 con las cuentas estudiante, monitor y admin @classhub.demo, todas con el código demo2026.
• Para programar: npm install, después npm run dev, y abrir localhost:3000.

Si no arranca: Docker debe decir "running". Si sale un error, se cierra con APAGAR OFFLINE.bat y se vuelve a intentar. Si no, se usa la versión online.`,
    preguntas: [
      { p: 'Muéstrenos el código de una parte.', r: 'Buenas opciones: middleware.ts (cómo se protegen las rutas), app/api/tasks/[id]/status/route.ts (cambiar estado y sumar puntos) o lib/ranks.ts (los 6 rangos). Ábranlo en VS Code dentro de ClassHub - Codigo.' },
    ],
  });

  llenar(16, {
    contenido:
`Antes de entrar:
• Probar el QR con un celular.
• Dejar abierta la versión online con la sesión de estudiante, y en otra pestaña la de monitor.
• Tener el modo offline ya arrancado como respaldo (Docker abierto y ARRANCAR OFFLINE.bat ejecutado).
• Cargador, adaptador HDMI y datos en el celular por si falla el wifi.
• Cerrar notificaciones y chats del computador.

Roles durante la exposición: el que no habla maneja el computador. Uno se encarga del celular de la demo.

Si algo falla:
• Si no hay internet, se cambia a localhost:3000 (offline) y se dice: "les mostramos la copia local, que es idéntica".
• Si la app no responde, se muestran las capturas de la carpeta Imagenes.
• Si vamos tarde, se acortan las esferas 5 y 10.

Después de exponer: Jerónimo revoca la clave de la IA (ver la guía de la carpeta de exposición).`,
    preguntas: [],
  });
})();
