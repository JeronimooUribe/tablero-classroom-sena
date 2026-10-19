// Preguntas difíciles del jurado (esfera 14). Cada respuesta se verificó en el código el 2026-10-18;
// entre paréntesis va dónde comprobarlo si piden mostrarlo.

(() => {
  const extra = [
    { p: '¿Por qué los ids son textos largos (UUID) y no números 1, 2, 3?',
      r: 'Porque un UUID no se puede adivinar: con números, alguien podría probar /tasks/1, /tasks/2… Además se genera sin consultar la base. (crypto.randomUUID() en lib/services/tasks.ts, createTask)' },
    { p: '¿Por qué la sesión va en una cookie y no en localStorage?',
      r: 'Porque la cookie es HttpOnly: el JavaScript de la página no la puede leer, así que un script malicioso (XSS) no puede robar la sesión. En localStorage sí podría. (buildSessionCookie en lib/auth.ts)' },
    { p: '¿Qué pasa si se cae la base de datos?',
      r: 'Las rutas detectan el error de conexión con isDbDown y responden 503 "Servicio temporalmente no disponible", en vez de un error genérico. El chequeo /api/health también reporta la base caída. (lib/api-auth.ts, isDbDown)' },
    { p: '¿Un docente puede borrar o editar tareas de otro grupo?',
      r: 'No. deleteTask compara el grupo de la tarea con el del docente y responde "forbidden" si no coinciden; solo el admin puede. updateTask solo actualiza con WHERE id = ? AND group_id = ?. (lib/services/tasks.ts)' },
    { p: '¿Qué pasa al cerrar sesión?',
      r: 'Se revoca el token de renovación en la base (revokeRefreshToken) y se borran las dos cookies. Aunque alguien hubiera copiado el token, ya no sirve. (app/api/auth/logout/route.ts)' },
    { p: '¿Qué es la rotación de tokens?',
      r: 'Cada vez que se usa el token de renovación, se invalida y se entrega uno nuevo de la misma "familia". Si alguien usa un token viejo robado, el sistema lo detecta. (rotateRefreshToken en lib/tokens.ts)' },
    { p: '¿Por qué el token dura solo 1 hora?',
      r: 'Para limitar el daño si alguien lo roba: en una hora deja de servir. La comodidad se mantiene porque la app lo renueva sola con el token de 30 días. (setExpirationTime("1h") en lib/auth.ts)' },
    { p: '¿Qué pasa si dos docentes editan la misma tarea al mismo tiempo?',
      r: 'Gana el último que guarda: no hay bloqueo de edición. En la práctica cada tarea la maneja el docente de su grupo, así que es poco probable. Sería una mejora futura. Respondan con honestidad.' },
    { p: '¿Cómo se enteran si algo falla en producción?',
      r: 'Con los registros de Railway: cada petición lleva un identificador (x-request-id) para seguirla. El chequeo /api/health dice si la base responde. Sentry está programado pero no tiene configurada su clave en Railway, así que hoy no está activo.' },
    { p: '¿Cuántos usuarios aguanta?',
      r: 'No hicimos pruebas de carga, así que no damos un número inventado. Lo que sí sabemos: la sesión va en el token, sin estado en el servidor, así que se pueden agregar servidores. La base tiene índices por grupo y fecha, y un pool de 10 conexiones.' },
    { p: '¿Por qué no hay pruebas de punta a punta (end-to-end)?',
      r: 'Porque no alcanzamos: es lo siguiente que faltaría. Las 140 pruebas son unitarias y de rutas, con la base simulada. El recorrido completo como usuario (estudiante, docente y admin) se probó contra una copia real de la base antes de la exposición.' },
    { p: '¿Por qué hay dos capas de permisos, el middleware y requireRole? ¿No es repetido?',
      r: 'A propósito: se llama defensa en profundidad. Si una capa falla o se configura mal, la otra protege. Justamente el bug de junio fue en el middleware; las rutas seguían validando por su cuenta.' },
    { p: '¿Cómo agregarían una función nueva, por ejemplo calificaciones?',
      r: 'Una migración nueva en database/migrations (009) para la tabla; una ruta en app/api/grades con requireRole; la pantalla en app/(app)/grades; su validación en lib/schemas.ts y sus pruebas. Todo en una rama, con un pull request que pase la CI antes de unirse a main.' },
    { p: '¿Por qué Railway y no Vercel o Netlify?',
      r: 'Empezamos en Netlify, pero la base estaba en Railway y Netlify perdió sus variables de conexión, así que quedó caído. En Railway están la app y la base juntas, se comunican por la red interna y se publica sola desde GitHub.' },
    { p: '¿Qué datos personales guardan y cómo los cuidan?',
      r: 'Nombre, correo institucional, código de estudiante y grupo. No guardamos notas ni datos sensibles. Los protegen la sesión firmada, los permisos por rol, el límite de intentos y el respaldo diario. La deuda: los códigos están en texto plano en la base.' },
    { p: '¿Qué harían diferente si empezaran de nuevo?',
      r: 'Pruebas de punta a punta desde el principio, el hash de los códigos aplicado desde el día uno, y no dejar módulos a medio construir (como el multi-colegio, que tuvimos que quitar).' },
  ];
  const e14 = window.TABLERO.esferas.find(e => e.n === 14);
  const ya = new Set(e14.preguntas.map(q => q.p));
  extra.forEach(q => { if (!ya.has(q.p)) e14.preguntas.push(q); });
})();
