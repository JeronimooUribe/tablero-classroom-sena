// "Lo esencial" de cada esfera: lo mínimo que hay que saberse, en puntos cortos y con datos reales.
// Va primero en cada esfera; la explicación larga queda plegada.

(() => {
  const E = {
    1: [
      'ClassHub: app web para que ningún estudiante pierda una tarea.',
      'Hecha para el INEM José Félix de Restrepo (Medellín), media técnica con el SENA.',
      'Equipo: Jerónimo, Juan Sebastián, Miguel Ángel y Diego.',
      'Gancho: "¿Cuántos se enteraron de una tarea el mismo día de entregarla?"',
      'Orden: problema → qué hace y demo → cómo está hecho → proceso y resultados.',
    ],
    2: [
      'Pregunta de origen: ¿cómo logramos que nadie se pierda una tarea?',
      'Las tareas se dictaban en clase y no quedaban escritas en un lugar común.',
      'No había seguimiento de qué estaba hecho y qué pendiente.',
      'WhatsApp mezcla todo; ClassHub separa por grupo y materia.',
      'Afecta a estudiantes, docentes y papás.',
    ],
    3: [
      'Objetivo general: tareas y avisos de cada grupo en un solo lugar, en el celular.',
      'Objetivo 1: publicar tareas por materia y grupo, con fecha y prioridad.',
      'Objetivo 2: cada estudiante marca pendiente, en proceso o completada.',
      'Objetivo 3: ingreso con correo institucional y permisos por rol.',
      'Objetivo 4: funciona en el celular sin instalar nada (PWA).',
      'No hace: no califica ni recibe entregas. Dice dónde se entrega.',
    ],
    4: [
      'Tareas con materia, fecha, prioridad, tipo, dónde se entrega, imágenes y enlaces.',
      'Estados por estudiante: pendiente, en proceso, completada.',
      'Calendario, avisos del grupo y foto del horario.',
      'Puntos: +2 por entrar al día, +3 al empezar y +10 al completar. Seis rangos, de Novato a Leyenda.',
      'IA: convierte el texto libre del docente en una tarea con sus campos llenos.',
    ],
    5: [
      'Tres roles: estudiante, docente (moderador) y administrador.',
      'El docente crea tareas, avisos, horario y materias, y usa el chat de docentes.',
      'El admin gestiona usuarios, grupos, materias, pagos y la configuración.',
      'Registro con correo @inemjose.edu.co, código y grupo.',
      'Permisos revisados dos veces: en el middleware y en cada ruta de la API.',
    ],
    6: [
      'Público: QR → estudiante@classhub.demo, código demo2026.',
      'Mostrar: tablero → marcar "En proceso" → calendario → avisos.',
      'Docente (cuenta del equipo) crea una tarea y aparece al instante en el estudiante.',
      'Datos de prueba en el grupo "Demo SENA", separado de los estudiantes reales.',
      'Sin internet: ARRANCAR OFFLINE.bat (Docker) en el computador.',
    ],
    7: [
      'Analogía: la mesa (celular), la cocina (servidor Next.js) y la despensa (MySQL).',
      'Frontend React + backend con la API de Next.js en un solo proyecto.',
      'Base de datos MySQL 8 en Railway.',
      'Servicios externos: Cloudinary (imágenes), Resend (correos), Claude (IA) y Web Push.',
      'Viaje de un dato: tocar "Completada" → API → middleware → Zod → MySQL → +10 puntos.',
    ],
    8: [
      'Lenguaje: TypeScript en todo el proyecto (más SQL).',
      'Next.js 15 + React 19 + Tailwind CSS.',
      'Node.js 20 corre el servidor; Docker lo empaqueta.',
      'Seguridad: jose (JWT), bcryptjs y Zod. Pruebas con Vitest.',
      'Java + Spring Boot: microservicio de estadísticas sin terminar.',
      'Por qué: un solo lenguaje, herramientas de industria y plan gratuito.',
    ],
    9: [
      '17 tablas en MySQL.',
      'Principales: groups, users, subjects, tasks, task_status y announcements.',
      'task_status une estudiante y tarea (muchos a muchos), con su propio estado.',
      'Llaves foráneas: si se borra un grupo, se borran sus tareas.',
      'Respaldo diario automático, verificado: 49 usuarios, 30 tareas y 118 estados.',
    ],
    10: [
      'Fases SENA: análisis → planeación → ejecución → evaluación.',
      '74 commits en git, desde el 17 de mayo de 2026.',
      'Por versiones: V1 (17 de mayo), V2–V8 (20–23 de mayo), sprints 11–13 (junio).',
      'Septiembre: recuperación del código por correo. Octubre: limpieza y modo offline.',
      'Antes de mayo de 2026: lo cuenta el equipo con sus fechas reales.',
    ],
    11: [
      '140 pruebas automáticas con Vitest.',
      'CI en GitHub Actions: lint, tipos, pruebas, compilación y auditoría en cada cambio.',
      'Sesión: JWT de 1 hora en una cookie HttpOnly, renovable 30 días.',
      'Límite: 10 intentos fallidos en 15 minutos y luego bloqueo.',
      'Bug real: desde junio los estudiantes no veían tareas. Una prueba lo reprodujo y se arregló.',
      'Deuda reconocida: códigos de estudiante en texto plano.',
    ],
    12: [
      'Los 4 objetivos se cumplieron.',
      'Uso real: 49 cuentas (44 estudiantes, 3 docentes, 2 admins), 30 tareas y 118 seguimientos.',
      'Capacidad cargada: 90 grupos y 622 materias. No decir "600 estudiantes".',
      'Futuro: cifrar códigos, activar recordatorios y terminar las estadísticas.',
      'Cierre: volver a la pregunta de origen y mostrar el QR.',
    ],
    13: [
      'Frontend: lo que se ve. Backend: lo que procesa y guarda.',
      'API: la ventanilla entre los dos (por ejemplo, /api/v1/tasks).',
      'JWT: carnet digital firmado. Middleware: el portero.',
      'Railway: la nube. Docker: la caja que corre igual en cualquier lado.',
      'CI: revisión automática de cada cambio.',
    ],
    14: [
      'Escuchar → repetir la pregunta → responder: idea, porqué y ejemplo.',
      'Si no se sabe: decirlo y explicar cómo se averiguaría.',
      'Responde el dueño del bloque; los demás complementan en una frase.',
      'Temas que más preguntan: arquitectura, seguridad, pruebas, base de datos y despliegue.',
    ],
    15: [
      'Carpeta: Proyecto_tareas → ClassHub - Codigo / Exposicion / Historial.',
      'Online: classhub-production.up.railway.app (o el QR).',
      'Offline: Docker Desktop abierto + ARRANCAR OFFLINE.bat → localhost:3000.',
      'Código clave: middleware.ts, app/api, lib/ y __tests__/.',
    ],
    16: [
      'Probar el QR antes de entrar.',
      'Dejar abiertas la sesión de estudiante y la de docente.',
      'Modo offline arrancado como respaldo, más cargador y adaptador HDMI.',
      'Si falla el internet, usar localhost:3000. Si vamos tarde, acortar las esferas 5 y 10.',
    ],
  };
  for (const [n, puntos] of Object.entries(E)) {
    const e = window.TABLERO.esferas.find(x => x.n === Number(n));
    if (e) e.esencial = puntos;
  }
})();
