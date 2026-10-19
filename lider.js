// Guía del líder: lo que Jerónimo Uribe necesita para explicar ClassHub como creador y líder del equipo.
// Todas las cifras están verificadas contra el código y la base el 2026-10-18.

window.TABLERO.lider = {
  nombre: 'Jerónimo Uribe Garcés',

  versiones: [
    { titulo: 'En 30 segundos', texto:
`ClassHub es una aplicación web que hicimos para que ningún estudiante del INEM pierda una tarea. El docente publica la tarea una sola vez y todo el grupo la ve en el celular, con su fecha y su prioridad. Cada estudiante marca si la tiene pendiente, en proceso o terminada, y gana puntos por ser constante. Funciona sin instalar nada y está en internet, en Railway.` },
    { titulo: 'En 2 minutos', texto:
`Todo empezó con una pregunta: ¿cómo hacemos para que nadie se pierda una tarea? En nuestro salón las tareas se dictaban en clase y no quedaban escritas en ningún lugar común. Quien faltaba o no anotaba, se quedaba sin saber.

ClassHub resuelve eso. Tiene tres roles. El docente publica tareas, avisos y el horario de su grupo. El estudiante ve todo en el celular, filtra por materia y marca su avance. El administrador gestiona usuarios, grupos y el acceso.

Por dentro es una aplicación full-stack. Next.js con React y TypeScript hace las pantallas y el servidor en un solo proyecto. MySQL guarda los datos en 17 tablas. Vive en Railway, en la nube. La seguridad va con una sesión firmada (JWT) en una cookie protegida, permisos revisados en dos capas y un límite de intentos.

La calidad la cuidamos con 140 pruebas automáticas que corren en cada cambio y un respaldo diario de la base. Hubo 49 cuentas reales en 4 grupos. Y ustedes pueden probarlo ahora mismo con el código QR.` },
    { titulo: 'Para alguien que no sabe nada (una mamá)', texto:
`¿Se acuerda de cuando su hijo llegaba diciendo "no sabía que había tarea"? ClassHub es como una agenda del salón, pero en el celular y siempre al día. El profesor escribe la tarea una vez y le llega a todo el grupo. El estudiante la ve, marca cuando la empieza y cuando la termina, y la app le muestra primero lo urgente y lo que vence pronto.

¿Cómo llega al celular? El programa vive en un computador en internet que está prendido todo el día (eso es Railway). Cuando su hijo abre ClassHub, el celular le pregunta a ese computador "¿qué tareas tengo?" y él le responde en un segundo. Los datos se guardan en una base de datos, que es como un archivador muy ordenado, y se hace una copia de seguridad cada noche.

Lo construimos nosotros desde cero: el diseño, el código, las pruebas y la publicación en internet.` },
  ],

  rol: [
    'Abres (esfera 1) y cierras (esfera 12): primera y última impresión.',
    'Presentas a cada compañero en su relevo, por nombre.',
    'Eres el moderador de las preguntas: escuchas, repites la pregunta y la pasas al dueño del bloque.',
    'Respondes tú las preguntas de "por qué decidieron…": eres el creador.',
    'Si alguien se traba, lo rescatas con una frase puente, sin quitarle la palabra.',
  ],

  apertura:
`Buenos días. Somos Jerónimo Uribe, Juan Sebastián García, Miguel Ángel Valencia y Diego, de la media técnica con el SENA. ¿Cuántos de ustedes se han enterado de una tarea el mismo día que había que entregarla?

(Pausa de un segundo.)

Eso nos pasaba a todos en el salón. Por eso hicimos ClassHub: una aplicación para que ningún estudiante pierda una tarea. En los próximos 15 minutos les vamos a mostrar el problema, la aplicación funcionando (que pueden probar en su celular con este QR), cómo está construida por dentro y qué aprendimos haciéndola.`,

  cierre:
`Empezamos con una pregunta: ¿cómo hacemos para que nadie se pierda una tarea? Hoy la respuesta está funcionando. Las tareas se publican una sola vez y llegan a todo el grupo. Cada estudiante lleva su avance. Todo está en internet, con pruebas automáticas y respaldo diario.

Lo construimos de punta a punta: desde la idea hasta que está en el celular de cualquiera de ustedes. Muchas gracias. Con gusto respondemos sus preguntas.`,

  decisiones: [
    { d: 'Aplicación web y no app de Play Store', por: 'Funciona en cualquier celular sin instalar nada, se actualiza sola y se reparte con un enlace o un QR. Como PWA, también se puede instalar.' },
    { d: 'Next.js con TypeScript', por: 'Páginas y servidor en un solo proyecto y en un solo lenguaje. TypeScript atrapa errores antes de que lleguen al usuario.' },
    { d: 'MySQL (base relacional)', por: 'Los datos están conectados entre sí (grupos, materias, tareas, estados) y una base relacional cuida esas relaciones.' },
    { d: 'Railway', por: 'La app y la base en el mismo lugar, se publica sola desde GitHub y cuesta entre 0 y 5 dólares al mes. Empezamos en Netlify, pero se separó de la base y se cayó.' },
    { d: 'Ingreso con correo y código de estudiante', por: 'Nadie tiene que inventar ni recordar una contraseña nueva. El correo institucional asegura que sea alguien del colegio.' },
    { d: 'Puntos y rangos', por: 'Para motivar la constancia: entrar cada día, empezar y terminar tareas.' },
    { d: 'IA para el docente', por: 'Le ahorra tiempo: escribe la tarea como la dijo en clase y la IA llena el formulario. El docente revisa antes de publicar.' },
    { d: 'Quitar funciones antes de exponer', por: 'Había un módulo de varios colegios a medio hacer que fallaba. Preferimos menos funciones, pero que todas funcionen.' },
  ],

  numeros: [
    ['17', 'tablas en MySQL'],
    ['140', 'pruebas automáticas'],
    ['74', 'commits desde el 17 de mayo de 2026'],
    ['49', 'cuentas reales (44 estudiantes, 3 docentes, 2 administradores)'],
    ['90', 'grupos del colegio cargados'],
    ['3', 'roles: estudiante, docente y administrador'],
    ['1 h / 30 días', 'duración de la sesión y de su renovación'],
    ['10 en 15 min', 'intentos fallidos antes del bloqueo'],
    ['0 a 5 USD', 'costo mensual'],
  ],

  reparto: [
    ['El problema, los objetivos o el alcance', 'Quien expone El porqué'],
    ['Qué hace, los roles o la demo', 'Quien expone El qué'],
    ['Tecnologías, arquitectura o base de datos', 'Quien expone El cómo'],
    ['Proceso, pruebas o seguridad', 'Quien expone El proceso'],
    ['"¿Por qué decidieron…?" o "¿qué harían distinto?"', 'Tú, como líder y creador'],
    ['Una pregunta que nadie sabe', 'Tú: con honestidad y explicando cómo lo averiguarían'],
  ],

  frases: [
    ['Para pasar una pregunta', '"Muy buena pregunta. Eso lo trabajó [nombre], que les explica."'],
    ['Para rescatar a un compañero', '"Complemento lo que dice [nombre]…" y luego le devuelves la palabra.'],
    ['Si no saben algo', '"No lo medimos, pero lo haríamos así: …". Es mejor que inventar.'],
    ['Si falla la demo', '"Les mostramos la copia local, que es idéntica", y cambias a localhost:3000.'],
    ['Si preguntan por la IA en el código', '"Usamos IA como herramienta, como hoy se hace en la industria. Las decisiones, las pruebas y la revisión fueron nuestras."'],
  ],

  noche: [
    ['Ahora (30 min)', 'Lee las 3 versiones del proyecto en voz alta hasta decir la de 2 minutos sin mirar.'],
    ['Luego (20 min)', 'Memoriza la apertura y el cierre: la primera y la última frase, palabra por palabra; lo de en medio, con tus palabras.'],
    ['Luego (30 min)', 'En Practicar, filtra "Bastidores" y "Conceptos" y haz las tarjetas hasta dominar 30.'],
    ['Luego (20 min)', 'Abre el código en VS Code y haz 10 preguntas del simulacro del Mapa del código.'],
    ['Antes de dormir (10 min)', 'Repasa los 9 números del líder. Duerme: el sueño fija lo estudiado.'],
    ['Mañana temprano (15 min)', 'Practicar con "Para repasar" + decir la versión de 2 minutos en voz alta.'],
    ['1 hora antes', 'Nada nuevo: solo apertura, cierre, relevos y probar el QR y el modo offline.'],
  ],
};
