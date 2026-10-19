// Diagramas de las esferas 7 (arquitectura) y 9 (base de datos). SVG en línea, con los colores del tema.
// Las relaciones del diagrama de datos salen de las llaves foráneas reales (database/offline/01_estructura.sql).

(() => {
  const flecha = `<defs><marker id="pt" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="d-punta"/></marker></defs>`;
  const caja = (x, y, w, h, titulo, sub, clase = '') => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="d-caja ${clase}"/>
    <text x="${x + w / 2}" y="${y + (sub ? h / 2 - 3 : h / 2 + 5)}" class="d-tit" text-anchor="middle">${titulo}</text>
    ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 14}" class="d-sub" text-anchor="middle">${sub}</text>` : ''}`;

  const arquitectura = `
  <svg viewBox="0 0 340 560" role="img" aria-labelledby="d-arq-t d-arq-d" class="diagrama-svg">
    <title id="d-arq-t">Arquitectura de ClassHub</title>
    <desc id="d-arq-d">El celular se conecta por HTTPS a Railway. Allí el middleware revisa permisos, Next.js sirve las páginas y la API, y la API usa MySQL y servicios externos. GitHub y la CI publican cada cambio.</desc>
    ${flecha}
    ${caja(70, 8, 200, 46, 'Celular o computador', 'el navegador del usuario', 'd-azul')}
    <line x1="170" y1="54" x2="170" y2="92" class="d-linea" marker-end="url(#pt)"/>
    <text x="178" y="78" class="d-sub">HTTPS</text>
    <rect x="8" y="96" width="324" height="250" rx="12" class="d-zona"/>
    <text x="22" y="118" class="d-zona-tit">Railway · la nube</text>
    ${caja(70, 130, 200, 44, 'middleware.ts', 'el portero: sesión y rol')}
    <line x1="120" y1="174" x2="90" y2="196" class="d-linea" marker-end="url(#pt)"/>
    <line x1="220" y1="174" x2="250" y2="196" class="d-linea" marker-end="url(#pt)"/>
    ${caja(22, 198, 140, 48, 'Páginas', 'React · app/(app)', 'd-verde')}
    ${caja(178, 198, 140, 48, 'API', 'Next.js · app/api', 'd-verde')}
    <line x1="248" y1="246" x2="248" y2="276" class="d-linea" marker-end="url(#pt)"/>
    ${caja(178, 278, 140, 50, 'MySQL 8', '17 tablas · lib/db.ts', 'd-amarillo')}
    <text x="22" y="292" class="d-sub">Las páginas piden</text>
    <text x="22" y="308" class="d-sub">datos a la API, nunca</text>
    <text x="22" y="324" class="d-sub">directo a la base.</text>
    
    <path d="M318 222 H332 V372 H170 V386" class="d-linea" marker-end="url(#pt)"/>
    <text x="22" y="372" class="d-sub">La API usa servicios externos:</text>
    ${caja(8, 390, 76, 50, 'Cloudinary', 'imágenes')}
    ${caja(90, 390, 76, 50, 'Resend', 'correos')}
    ${caja(172, 390, 76, 50, 'Claude', 'IA')}
    ${caja(254, 390, 78, 50, 'Web Push', 'avisos')}
    <rect x="8" y="466" width="324" height="84" rx="12" class="d-zona"/>
    <text x="22" y="488" class="d-zona-tit">Cómo llega un cambio</text>
    ${caja(18, 498, 88, 42, 'GitHub', 'el código')}
    <line x1="106" y1="519" x2="122" y2="519" class="d-linea" marker-end="url(#pt)"/>
    ${caja(124, 498, 92, 42, 'CI', '140 pruebas')}
    <line x1="216" y1="519" x2="232" y2="519" class="d-linea" marker-end="url(#pt)"/>
    ${caja(234, 498, 88, 42, 'Railway', 'publica solo')}
  </svg>`;

  const tabla = (x, y, nombre, cols, clase = '') => `
    <rect x="${x}" y="${y}" width="104" height="${22 + cols.length * 15}" rx="7" class="d-caja ${clase}"/>
    <text x="${x + 6}" y="${y + 16}" class="d-tit-t">${nombre}</text>
    ${cols.map((c, i) => `<text x="${x + 6}" y="${y + 33 + i * 15}" class="d-col">${c}</text>`).join('')}`;

  const datos = `
  <svg viewBox="0 0 340 556" role="img" aria-labelledby="d-er-t d-er-d" class="diagrama-svg">
    <title id="d-er-t">Modelo entidad-relación de ClassHub</title>
    <desc id="d-er-d">groups es el centro: users, subjects, tasks y announcements apuntan a un grupo. task_status une users y tasks. Las tablas de pagos, chat y horario se relacionan por convención, sin llave foránea.</desc>
    ${flecha}
    ${tabla(118, 8, 'groups', ['id (PK)', 'name · grade'], 'd-amarillo')}
    <path d="M170 53 V70 H62 V96" class="d-linea" marker-end="url(#pt)"/>
    <path d="M170 53 V96" class="d-linea" marker-end="url(#pt)"/>
    <path d="M170 70 H278 V96" class="d-linea" marker-end="url(#pt)"/>
    ${tabla(10, 98, 'users', ['id (PK)', 'group_id (FK)', 'role · points'], 'd-azul')}
    ${tabla(118, 98, 'subjects', ['id (PK)', 'group_id (FK)', 'teacher_name'])}
    ${tabla(226, 98, 'tasks', ['id (PK)', 'group_id (FK)', 'subject_id (FK)', 'due_at'], 'd-verde')}
    <path d="M222 128 H226" class="d-linea" marker-end="url(#pt)"/>
    <path d="M62 165 V216 H118" class="d-linea" marker-end="url(#pt)" />
    <path d="M278 180 V216 H222" class="d-linea" marker-end="url(#pt)"/>
    ${tabla(118, 200, 'task_status', ['task_id (FK)', 'user_id (FK)', 'status'], 'd-rojo')}
    <text x="170" y="284" class="d-sub" text-anchor="middle">muchos a muchos:</text>
    <text x="170" y="298" class="d-sub" text-anchor="middle">el estado de cada estudiante</text>
    <path d="M222 22 H334 V346 H330" class="d-linea" marker-end="url(#pt)"/>
    ${tabla(226, 328, 'announcements', ['group_id (FK)', 'created_by (FK)'])}
    <text x="10" y="338" class="d-zona-tit">Por convención (sin FK)</text>
    ${tabla(10, 350, 'user_payment', ['user_id', 'ACTIVE · …'], 'd-punteada')}
    ${tabla(118, 350, 'schedules', ['group_id', 'image_url'], 'd-punteada')}
    ${tabla(10, 416, 'staff_chat', ['user_id', 'content'], 'd-punteada')}
    ${tabla(118, 416, 'push_subs', ['user_id', 'endpoint'], 'd-punteada')}
    <line x1="10" y1="508" x2="40" y2="508" class="d-linea" marker-end="url(#pt)"/>
    <text x="48" y="512" class="d-sub">llave foránea real: va del padre a la tabla hija</text>
    <rect x="10" y="526" width="30" height="14" rx="4" class="d-caja d-punteada"/>
    <text x="48" y="537" class="d-sub">relación solo por convención en el código</text>
  </svg>`;

  const T = window.TABLERO;
  T.esferas.find(e => e.n === 7).diagrama = { titulo: 'El diagrama de la arquitectura', svg: arquitectura,
    nota: 'Practiquen dibujarlo en un tablero: celular → Railway (middleware → páginas y API → MySQL) → servicios externos.' };
  T.esferas.find(e => e.n === 9).diagrama = { titulo: 'El modelo entidad-relación', svg: datos,
    nota: 'Hay 9 llaves foráneas reales. Las tablas de pagos, horario, chat y notificaciones se unen por user_id o group_id sin llave foránea: si el jurado pregunta, es una mejora pendiente.' };
})();
