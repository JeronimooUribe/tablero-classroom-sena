(() => {
  const D = window.TABLERO;
  const app = document.getElementById('app');
  const hoja = document.getElementById('hoja');
  const velo = document.getElementById('velo');
  const hojaCuerpo = document.getElementById('hoja-cuerpo');
  const bloque = id => D.bloques.find(b => b.id === id);
  const esfera = n => D.esferas.find(e => e.n === n);
  const reducido = matchMedia('(prefers-reduced-motion: reduce)');

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const parrafos = s => esc(s).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

  // Lo estudiado es de cada quien: vive solo en su navegador.
  const CLAVE = 'tablero-estudiadas';
  const leerEstudiadas = () => { try { return JSON.parse(localStorage.getItem(CLAVE)) || []; } catch { return []; } };
  const guardarEstudiadas = l => { try { localStorage.setItem(CLAVE, JSON.stringify(l)); } catch { /* sin almacenamiento: no pasa nada */ } };

  const avisar = (() => {
    const el = document.createElement('div');
    el.className = 'aviso-copiado'; el.setAttribute('role', 'status');
    document.body.appendChild(el);
    let t;
    return msg => { el.textContent = msg; el.classList.add('ver'); clearTimeout(t); t = setTimeout(() => el.classList.remove('ver'), 1800); };
  })();

  const nombreProyecto = () => D.proyecto.nombre || 'Nuestro proyecto de grado';
  const etiquetaEstado = e => e.estado === 'lista'
    ? '<span class="tag c-verde"><i class="ph-bold ph-check"></i>Lista</span>'
    : '<span class="tag c-gris">Por llenar</span>';
  const duracion = s => s >= 60 ? `${Math.floor(s / 60)} min${s % 60 ? ' ' + (s % 60) + ' s' : ''}` : `${s} s`;

  // ---------- Fichas y prompts para NotebookLM ----------
  function fichaMarkdown(e) {
    const b = bloque(e.bloque);
    const l = [`# Esfera ${e.n}: ${e.titulo}`, '', `Proyecto: ${nombreProyecto()}. Bloque: ${b.nombre} (${b.idea}).`, '',
      `## La pregunta que responde`, e.pregunta, ''];
    if (e.esencial) l.push(`## Lo esencial`, ...e.esencial.map(x => `- ${x}`), '');
    l.push(`## Qué debe incluir`, ...e.incluye.map(x => `- ${x}`), '');
    if (e.contenido) l.push(`## Contenido`, e.contenido, '');
    if (e.arranque) l.push(`## Frase de arranque`, e.arranque, '');
    if (e.relevo) l.push(`## Frase de relevo`, e.relevo, '');
    if (e.preguntas.length) {
      l.push(`## Preguntas probables del jurado`);
      e.preguntas.forEach(p => l.push(`- Pregunta: ${p.p}`, `  Respuesta: ${p.r}`));
      l.push('');
    }
    if (e.segundos) l.push(`Tiempo en la exposición: ${duracion(e.segundos)}.`);
    return l.join('\n');
  }

  function prompt(e) {
    return `Enfócate solo en la esfera ${e.n} del proyecto ${nombreProyecto()}: "${e.titulo}".
Somos estudiantes de grado 11 y vamos a exponer este proyecto ante el SENA. Explícalo con palabras simples, como a alguien que nunca lo ha visto, pero con rigor.
Responde esta pregunta: ${e.pregunta}
Cubre: ${e.incluye.join('; ')}.
Usa ejemplos concretos sacados de las fuentes del proyecto. No inventes nada que no esté en las fuentes.
Termina con 3 preguntas que podría hacer el jurado sobre esta parte, y cómo responderlas.`;
  }

  function descargar(nombre, texto) {
    const url = URL.createObjectURL(new Blob([texto], { type: 'text/markdown;charset=utf-8' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: nombre });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function todoMarkdown() {
    const p = D.proyecto;
    const l = [`# ${nombreProyecto()}: guía completa para aprender y exponer`, ''];
    if (p.frase) l.push(p.frase, '');
    if (p.preguntaOrigen) l.push(`La pregunta que dio origen al proyecto: ${p.preguntaOrigen}`, '');
    l.push(`Equipo: ${D.equipo.join(', ')}. ${p.programa}. ${p.duracion}. Exposición de 15 minutos.`, '');
    D.esferas.forEach(e => l.push(fichaMarkdown(e), ''));
    l.push(conceptosMarkdown(), '');
    l.push('# Cómo exponer', '');
    D.guia.forEach(g => { l.push(`## ${g.titulo}`, ...g.puntos.map(x => `- ${x}`), ''); });
    return l.join('\n');
  }

  // ---------- Conceptos ----------
  const CONC = D.conceptos || [];
  const concepto = id => CONC.find(c => c.id === id);
  const urlVideo = v => `https://www.youtube.com/watch?v=${v.id}`;
  // Parte un párrafo en frases para mostrarlo como puntos cortos.
  const frasesDe = t => t.split(/(?<=[.:])\s+(?=[A-ZÁÉÍÓÚÑ0-9"(])/).map(x => x.trim()).filter(Boolean);

  function conceptoMarkdown(c) {
    const l = [`## ${c.nombre}`, '', `Qué es: ${c.que}`, '', `Analogía: ${c.analogia}`, '', `Cómo lo usa ${nombreProyecto()}: ${c.enClassHub}`, '',
      `Pregunta probable: ${c.pregunta.p}`, `Respuesta: ${c.pregunta.r}`];
    for (const v of [c.video, c.extra].filter(Boolean)) l.push('', `Video: ${v.titulo} (${v.canal}) ${urlVideo(v)}`);
    return l.join('\n');
  }

  function conceptosMarkdown() {
    const l = [`# Conceptos clave de ${nombreProyecto()}`, ''];
    for (const g of D.gruposConceptos || []) {
      l.push(`# ${g.nombre}: ${g.idea}`, '');
      CONC.filter(c => c.grupo === g.id).forEach(c => l.push(conceptoMarkdown(c), ''));
    }
    return l.join('\n');
  }

  const miniatura = (v, grande) => `<a class="mini-video ${grande ? 'grande' : ''}" href="${urlVideo(v)}" target="_blank" rel="noopener">
      <img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="" loading="lazy" width="320" height="180">
      <span class="mini-txt"><i class="ph-bold ph-play-circle"></i><span><strong>${esc(v.titulo)}</strong><small>${esc(v.canal)} · YouTube</small></span></span>
    </a>`;

  function vistaConceptos() {
    const grupos = (D.gruposConceptos || []).map((g, gi) => {
      const items = CONC.filter(c => c.grupo === g.id).map((c, i) => `
        <li class="entra" style="--i:${gi + i}">
          <a class="concepto-card" href="#/concepto/${c.id}">
            ${c.video ? `<img src="https://i.ytimg.com/vi/${c.video.id}/mqdefault.jpg" alt="" loading="lazy" width="320" height="180">` : '<span class="sin-video"><i class="ph-bold ph-book-open-text"></i></span>'}
            <span class="concepto-txt"><strong>${esc(c.nombre)}</strong><small>${esc(c.que.split('. ')[0])}.</small></span>
          </a>
        </li>`).join('');
      return `<section class="bloque"><div class="bloque-cab"><h2>${esc(g.nombre)}</h2><p>${esc(g.idea)}</p></div><ul class="conceptos">${items}</ul></section>`;
    }).join('');
    return `
      <section class="entra"><h1>Conceptos clave</h1>
        <p class="bajada">Todo lo que hay que entender para hablar con autoridad: qué es cada cosa, cómo la usa ${esc(nombreProyecto())} y un video corto en español.</p>
        <div class="acciones"><button class="btn btn-2" data-conceptos>Descargar para NotebookLM <i class="ph-bold ph-download-simple"></i></button></div>
      </section>
      ${grupos}`;
  }

  function vistaConcepto(id) {
    const c = concepto(id);
    if (!c) return `<section><h1>Ese concepto no existe</h1><div class="acciones"><a class="btn btn-1" href="#/conceptos">Ver conceptos</a></div></section>`;
    const g = (D.gruposConceptos || []).find(x => x.id === c.grupo);
    const enEsferas = Object.entries(D.conceptosPorEsfera || {}).filter(([, ids]) => ids.includes(c.id)).map(([n]) => esfera(Number(n))).filter(Boolean);
    const i = CONC.indexOf(c), ant = CONC[i - 1], sig = CONC[i + 1];
    return `
      <nav class="migas" aria-label="Ubicación"><a href="#/conceptos">Conceptos</a><span aria-hidden="true">/</span><span>${esc(g ? g.nombre : '')}</span></nav>
      <section class="ficha-cab entra"><h1>${esc(c.nombre)}</h1><p class="pregunta">${esc(c.que)}</p></section>
      <div class="concepto-ficha">
        <div>
          <div class="panel entra" style="--i:1"><h3>Para entenderlo fácil</h3><p class="frase">${esc(c.analogia)}</p></div>
          <div class="panel entra esencial" style="--i:2"><h3>Cómo lo usa ${esc(nombreProyecto())}</h3><ol class="puntos">${frasesDe(c.enClassHub).map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
          <div class="panel entra" style="--i:3"><h3>Pregunta probable del jurado</h3>
            <div class="acordeon"><details open><summary>${esc(c.pregunta.p)}</summary><ul><li>${esc(c.pregunta.r)}</li></ul></details></div></div>
        </div>
        <aside>
          ${c.video ? `<div class="panel entra" style="--i:2"><h3>Video recomendado</h3>${miniatura(c.video, true)}${c.extra ? `<p class="frase-lbl" style="margin-top:14px">Otro video</p>${miniatura(c.extra)}` : ''}</div>` : ''}
          ${enEsferas.length ? `<div class="panel entra" style="--i:3"><h3>Aparece en</h3><div class="chips">${enEsferas.map(e => `<a class="chip" href="#/esfera/${e.n}">${e.n}. ${esc(e.titulo)}</a>`).join('')}</div></div>` : ''}
        </aside>
      </div>
      <nav class="nav-esferas" aria-label="Recorrido de conceptos">
        ${ant ? `<a href="#/concepto/${ant.id}"><small><i class="ph-bold ph-arrow-left"></i> Anterior</small><span>${esc(ant.nombre)}</span></a>` : '<span></span>'}
        ${sig ? `<a class="sig" href="#/concepto/${sig.id}"><small>Siguiente <i class="ph-bold ph-arrow-right"></i></small><span>${esc(sig.nombre)}</span></a>` : `<a class="sig" href="#/conceptos"><small>Terminaste</small><span>Volver a conceptos</span></a>`}
      </nav>`;
  }

  async function copiarTexto(texto) {
    try { await navigator.clipboard.writeText(texto); avisar('Instrucción copiada'); }
    catch { avisar('No se pudo copiar. Selecciónalo a mano.'); }
  }

  async function copiar(texto) {
    try { await navigator.clipboard.writeText(texto); avisar('Prompt copiado'); }
    catch { avisar('No se pudo copiar. Selecciónalo a mano.'); }
  }

  // ---------- Medios ----------
  const TIPOS = [
    { k: 'video', n: 'Video', i: 'ph-video' },
    { k: 'audio', n: 'Audio', i: 'ph-headphones' },
    { k: 'tarjetas', n: 'Tarjetas', i: 'ph-cards' },
    { k: 'cuestionario', n: 'Cuestionario', i: 'ph-list-checks' },
    { k: 'mapa', n: 'Mapa mental', i: 'ph-tree-structure' },
  ];

  function embebido(url) {
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
    m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
    return null;
  }

  function medios(e) {
    const filas = TIPOS.map(t => {
      const url = e.media[t.k];
      return url
        ? `<a class="medio" href="${esc(url)}" target="_blank" rel="noopener"><i class="ph-bold ${t.i}"></i><span>${t.n}</span><small>Abrir</small></a>`
        : `<div class="medio pendiente"><i class="ph-bold ${t.i}"></i><span>${t.n}</span><small>Pendiente</small></div>`;
    }).join('');
    const emb = e.media.video && embebido(e.media.video);
    const video = emb ? `<div class="video"><iframe src="${esc(emb)}" title="Video de la esfera ${e.n}" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>` : '';
    return `${video}<div class="medios">${filas}</div>`;
  }

  // ---------- El mapa ----------
  // Lienzo fijo; el usuario lo recorre con el dedo (scroll nativo) o arrastrando con el mouse.
  const W = 1500, H = 1380, C = { x: 750, y: 600 };
  const POS_BLOQUE = {
    porque: { x: 390, y: 290 }, que: { x: 1110, y: 290 },
    como: { x: 1110, y: 910 }, proceso: { x: 390, y: 910 },
    bastidores: { x: 750, y: 1150 },
  };

  function geometria() {
    const nodos = {};
    for (const b of D.bloques) {
      const p = POS_BLOQUE[b.id];
      const es = D.esferas.filter(e => e.bloque === b.id);
      if (b.id === 'bastidores') {
        const dx = [-345, -115, 115, 345], dy = [105, 140, 140, 105];
        es.forEach((e, i) => { nodos[e.n] = { x: p.x + dx[i], y: p.y + dy[i] }; });
      } else {
        const a = Math.atan2(p.y - C.y, p.x - C.x);
        es.forEach((e, i) => {
          // Las tres esferas se abren en abanico hacia afuera, en el sentido de las agujas del reloj.
          const ang = a + (i - 1) * 0.85;
          nodos[e.n] = { x: p.x + Math.cos(ang) * 215, y: p.y + Math.sin(ang) * 215 };
        });
      }
    }
    return nodos;
  }

  // Curva suave: el punto de control se corre un poco hacia un lado de la recta.
  const curva = (a, b) => {
    const cx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12, cy = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
    return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
  };

  let zoom = 1;
  const ZOOMS = [0.55, 0.7, 0.85, 1, 1.2];

  function siguientePendiente() {
    const hechas = leerEstudiadas();
    return D.esferas.find(e => !hechas.includes(e.n)) || D.esferas[0];
  }

  function vistaMapa() {
    const nodos = geometria();
    const hechas = leerEstudiadas();
    const p = D.proyecto;
    let lineas = '';
    for (const b of D.bloques) {
      const pb = POS_BLOQUE[b.id];
      lineas += `<path class="l-centro" d="${curva(C, pb)}"/>`;
      D.esferas.filter(e => e.bloque === b.id).forEach(e => { lineas += `<path class="l-${b.color}" d="${curva(pb, nodos[e.n])}"/>`; });
    }
    const bloquesHtml = D.bloques.map(b => {
      const pb = POS_BLOQUE[b.id];
      return `<div class="n-bloque c-${b.color}" style="left:${pb.x}px;top:${pb.y}px"><strong>${esc(b.nombre)}</strong><span>${esc(b.idea)}</span></div>`;
    }).join('');
    const esferasHtml = D.esferas.map(e => {
      const pe = nodos[e.n], b = bloque(e.bloque), hecha = hechas.includes(e.n);
      return `<a class="n-esfera ${hecha ? 'hecha' : ''}" href="#/esfera/${e.n}" data-n="${e.n}" style="left:${pe.x}px;top:${pe.y}px">
        <span class="n-num c-${b.color}">${hecha ? '<i class="ph-bold ph-check" aria-label="estudiada"></i>' : e.n}</span>
        <span class="n-tit">${esc(e.titulo)}</span>
      </a>`;
    }).join('');
    const sig = siguientePendiente();

    return `
      <div class="mapa" id="mapa" aria-label="Mapa del proyecto. Desliza para recorrerlo y toca una esfera para abrirla.">
        <div class="lienzo" id="lienzo">
          <div class="escena" id="escena" style="width:${W}px;height:${H}px">
            <svg class="lineas" width="${W}" height="${H}" aria-hidden="true">${lineas}</svg>
            <div class="n-centro" style="left:${C.x}px;top:${C.y}px">
              <span class="n-centro-lbl">El proyecto</span>
              <strong>${esc(nombreProyecto())}</strong>
              <span class="n-centro-preg">${esc(p.preguntaOrigen || 'La pregunta que lo empezó todo se escribe aquí.')}</span>
            </div>
            ${bloquesHtml}${esferasHtml}
          </div>
        </div>
      </div>
      <div class="mapa-ui">
        <a class="btn btn-1 seguir" href="#/esfera/${sig.n}"><i class="ph-bold ph-play"></i>${leerEstudiadas().length ? 'Seguir' : 'Empezar'}: esfera ${sig.n}</a>
        <div class="zoom" role="group" aria-label="Acercar o alejar el mapa">
          <button class="icono" data-zoom="-1" aria-label="Alejar"><i class="ph-bold ph-minus"></i></button>
          <button class="icono" data-centrar aria-label="Centrar el mapa"><i class="ph-bold ph-crosshair"></i></button>
          <button class="icono" data-zoom="1" aria-label="Acercar"><i class="ph-bold ph-plus"></i></button>
        </div>
      </div>
      <p class="mapa-pista" id="pista">Desliza para recorrer el mapa. Toca una esfera para abrirla.</p>`;
  }

  function aplicarZoom(z, foco) {
    const m = document.getElementById('mapa');
    const lienzo = document.getElementById('lienzo');
    const escena = document.getElementById('escena');
    if (!m) return;
    const fx = foco ? foco.x : m.scrollLeft + m.clientWidth / 2;
    const fy = foco ? foco.y : m.scrollTop + m.clientHeight / 2;
    const cx = fx / zoom, cy = fy / zoom;
    zoom = z;
    lienzo.style.width = W * z + 'px';
    lienzo.style.height = H * z + 'px';
    escena.style.transform = `scale(${z})`;
    m.scrollLeft = cx * z - m.clientWidth / 2;
    m.scrollTop = cy * z - m.clientHeight / 2;
  }

  function centrar(punto = C) {
    const m = document.getElementById('mapa');
    if (!m) return;
    m.scrollTo({ left: punto.x * zoom - m.clientWidth / 2, top: punto.y * zoom - m.clientHeight / 2, behavior: reducido.matches ? 'auto' : 'smooth' });
  }

  function montarMapa() {
    app.innerHTML = vistaMapa();
    app.dataset.vista = 'mapa';
    document.body.classList.add('en-mapa');
    const m = document.getElementById('mapa');
    const inicial = innerWidth < 768 ? 0.85 : 1;
    zoom = inicial;
    aplicarZoom(inicial, { x: C.x * inicial, y: C.y * inicial });
    m.scrollLeft = C.x * zoom - m.clientWidth / 2;
    m.scrollTop = C.y * zoom - m.clientHeight / 2;
    const ocultarPista = () => document.getElementById('pista')?.classList.add('oculta');
    m.addEventListener('pointerdown', ocultarPista, { once: true, passive: true });
    setTimeout(ocultarPista, 5000);

    // Arrastrar con el mouse para mover el mapa (en el celular ya lo hace el dedo).
    let arr = null, movio = false;
    m.addEventListener('pointerdown', ev => {
      if (ev.pointerType !== 'mouse' || ev.button !== 0) return;
      arr = { x: ev.clientX, y: ev.clientY, l: m.scrollLeft, t: m.scrollTop }; movio = false;
    });
    addEventListener('pointermove', ev => {
      if (!arr) return;
      const dx = ev.clientX - arr.x, dy = ev.clientY - arr.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) { movio = true; m.classList.add('arrastrando'); }
      m.scrollLeft = arr.l - dx; m.scrollTop = arr.t - dy;
    });
    addEventListener('pointerup', () => { arr = null; m.classList.remove('arrastrando'); });
    m.addEventListener('click', ev => { if (movio) { ev.preventDefault(); ev.stopPropagation(); movio = false; } }, true);
    m.addEventListener('wheel', ev => {
      if (!ev.ctrlKey) return;
      ev.preventDefault();
      const r = m.getBoundingClientRect();
      const z = Math.min(1.4, Math.max(0.5, zoom * (ev.deltaY < 0 ? 1.1 : 0.9)));
      aplicarZoom(z, { x: m.scrollLeft + ev.clientX - r.left, y: m.scrollTop + ev.clientY - r.top });
    }, { passive: false });
  }

  function refrescarNodos() {
    const hechas = leerEstudiadas();
    document.querySelectorAll('.n-esfera').forEach(a => {
      const n = Number(a.dataset.n), hecha = hechas.includes(n);
      a.classList.toggle('hecha', hecha);
      a.querySelector('.n-num').innerHTML = hecha ? '<i class="ph-bold ph-check" aria-label="estudiada"></i>' : n;
    });
    const s = document.querySelector('.seguir');
    if (s) { const sig = siguientePendiente(); s.href = `#/esfera/${sig.n}`; s.innerHTML = `<i class="ph-bold ph-play"></i>${hechas.length ? 'Seguir' : 'Empezar'}: esfera ${sig.n}`; }
  }

  // ---------- La pestaña de cada esfera ----------
  function contenidoEsfera(e) {
    const b = bloque(e.bloque);
    const ant = esfera(e.n - 1), sig = esfera(e.n + 1);
    const estudiada = leerEstudiadas().includes(e.n);
    const t = D.tiempos.find(x => x.bloque === e.bloque);
    const contenido = e.contenido
      ? `<div class="contenido">${parrafos(e.contenido)}</div>`
      : `<div class="vacio"><i class="ph-bold ph-hourglass"></i><p>El contenido real se escribe cuando investiguemos el proyecto a fondo. Mientras tanto, esta es la lista de lo que la esfera debe responder.</p></div>`;
    const frases = (e.arranque || e.relevo) ? `
      <div class="panel"><h3>Lo que se dice</h3>
        ${e.arranque ? `<div class="frase-bloque"><p class="frase-lbl">Primera frase</p><p class="frase">${esc(e.arranque)}</p></div>` : ''}
        ${e.relevo ? `<div class="frase-bloque"><p class="frase-lbl">Frase de relevo</p><p class="frase">${esc(e.relevo)}</p></div>` : ''}
      </div>` : '';
    const preguntas = e.preguntas.length
      ? `<div class="acordeon">${e.preguntas.map(p => `<details><summary>${esc(p.p)}</summary><ul><li>${esc(p.r)}</li></ul></details>`).join('')}</div>`
      : `<div class="vacio"><i class="ph-bold ph-chat-circle-dots"></i><p>Las preguntas probables del jurado y sus respuestas llegan con la investigación del proyecto.</p></div>`;

    return `
      <div class="ficha-cab">
        <span class="tag c-${b.color}">${esc(b.nombre)}</span>
        <h2 id="hoja-titulo">${esc(e.titulo)}</h2>
        <p class="pregunta">${esc(e.pregunta)}</p>
        <div class="ficha-datos">
          ${e.segundos ? `<span class="tag c-gris">${duracion(e.segundos)} en la exposición</span>` : '<span class="tag c-gris">No se expone</span>'}
          ${t ? `<span class="tag c-gris">Expone: ${esc(t.responsable)}</span>` : ''}
          ${etiquetaEstado(e)}
        </div>
      </div>
      ${e.esencial ? `<div class="panel esencial"><h3>Lo esencial</h3><ol class="puntos">${e.esencial.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>` : ''}
      ${frases}
      <div class="panel"><h3>Preguntas del jurado</h3>${preguntas}</div>
      ${(D.conceptosPorEsfera?.[e.n] || []).length ? `<div class="panel"><h3>Conceptos para repasar</h3><div class="chips">${D.conceptosPorEsfera[e.n].map(id => concepto(id)).filter(Boolean).map(c => `<a class="chip" href="#/concepto/${c.id}"><i class="ph-bold ${c.video ? 'ph-play-circle' : 'ph-book-open-text'}"></i>${esc(c.nombre)}</a>`).join('')}</div></div>` : ''}
      <details class="panel plegable"><summary>Explicación completa</summary>${contenido}</details>
      <details class="panel plegable"><summary>Material de estudio y NotebookLM</summary>
        ${medios(e)}
        <pre class="prompt" style="margin-top:14px">${esc(prompt(e))}</pre>
        <div class="fila-btn">
          <button class="btn btn-2 btn-chico" data-copiar>Copiar prompt</button>
          <button class="btn btn-2 btn-chico" data-ficha>Descargar ficha</button>
        </div>
      </details>
      <label class="check panel"><input type="checkbox" data-estudiada ${estudiada ? 'checked' : ''}> Ya la estudié y la puedo explicar sin mirar</label>
      <nav class="nav-esferas" aria-label="Secuencia">
        ${ant ? `<a href="#/esfera/${ant.n}"><small><i class="ph-bold ph-arrow-left"></i> Anterior</small><span>${esc(ant.titulo)}</span></a>` : '<span></span>'}
        ${sig ? `<a class="sig" href="#/esfera/${sig.n}"><small>Siguiente <i class="ph-bold ph-arrow-right"></i></small><span>${esc(sig.titulo)}</span></a>` : `<a class="sig" href="#/mapa"><small>Terminaste la secuencia</small><span>Volver al mapa</span></a>`}
      </nav>
      <p class="pista-hoja">Desliza a los lados para pasar de esfera.</p>`;
  }

  let abierta = null, ultimoFoco = null;

  function abrirHoja(n, dir = 0) {
    const e = esfera(n);
    if (!e) { location.hash = '#/mapa'; return; }
    document.getElementById('hoja-pos').textContent = `Esfera ${n} de ${D.esferas.length}`;
    hojaCuerpo.innerHTML = contenidoEsfera(e);
    hojaCuerpo.scrollTop = 0;
    hojaCuerpo.dataset.n = n;
    if (dir && !reducido.matches) {
      hojaCuerpo.classList.remove('de-der', 'de-izq'); void hojaCuerpo.offsetWidth;
      hojaCuerpo.classList.add(dir > 0 ? 'de-der' : 'de-izq');
    }
    document.querySelectorAll('.n-esfera.activa').forEach(a => a.classList.remove('activa'));
    const nodo = document.querySelector(`.n-esfera[data-n="${n}"]`);
    if (nodo) nodo.classList.add('activa');
    if (abierta === null) {
      ultimoFoco = document.activeElement;
      hoja.hidden = false; velo.hidden = false;
      requestAnimationFrame(() => { hoja.classList.add('abierta'); velo.classList.add('abierto'); });
      document.getElementById('hoja-cerrar').focus({ preventScroll: true });
    }
    abierta = n;
    document.title = `${e.titulo} · ${nombreProyecto()}`;
  }

  function cerrarHoja() {
    if (abierta === null) return;
    abierta = null;
    hoja.classList.remove('abierta'); velo.classList.remove('abierto');
    hoja.style.transform = '';
    const fin = () => { if (abierta === null) { hoja.hidden = true; velo.hidden = true; } };
    if (reducido.matches) fin(); else setTimeout(fin, 320);
    document.querySelectorAll('.n-esfera.activa').forEach(a => a.classList.remove('activa'));
    if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus({ preventScroll: true });
  }

  const irA = n => { const e = esfera(n); if (e) location.hash = `#/esfera/${n}`; };

  // Deslizar a los lados: siguiente o anterior. Deslizar el asa hacia abajo: cerrar.
  (() => {
    let ini = null;
    hojaCuerpo.addEventListener('pointerdown', ev => { if (ev.pointerType !== 'mouse') ini = { x: ev.clientX, y: ev.clientY, t: Date.now() }; });
    hojaCuerpo.addEventListener('pointerup', ev => {
      if (!ini) return;
      const dx = ev.clientX - ini.x, dy = ev.clientY - ini.y, rapido = Date.now() - ini.t < 600;
      ini = null;
      if (rapido && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) irA(abierta + (dx < 0 ? 1 : -1));
    });
    hojaCuerpo.addEventListener('pointercancel', () => { ini = null; });

    const asa = document.getElementById('hoja-asa');
    let y0 = null;
    asa.addEventListener('pointerdown', ev => { y0 = ev.clientY; asa.setPointerCapture(ev.pointerId); hoja.classList.add('sin-trans'); });
    asa.addEventListener('pointermove', ev => { if (y0 !== null) hoja.style.transform = `translateY(${Math.max(0, ev.clientY - y0)}px)`; });
    asa.addEventListener('pointerup', ev => {
      if (y0 === null) return;
      const dy = ev.clientY - y0; y0 = null;
      hoja.classList.remove('sin-trans');
      if (dy > 90) location.hash = '#/mapa'; else hoja.style.transform = '';
    });
  })();

  document.getElementById('hoja-cerrar').addEventListener('click', () => { location.hash = '#/mapa'; });
  velo.addEventListener('click', () => { location.hash = '#/mapa'; });
  addEventListener('keydown', ev => {
    if (abierta === null) return;
    if (ev.key === 'Escape') location.hash = '#/mapa';
    if (ev.target.closest('input, textarea, pre')) return;
    if (ev.key === 'ArrowRight') irA(abierta + 1);
    if (ev.key === 'ArrowLeft') irA(abierta - 1);
  });

  hojaCuerpo.addEventListener('click', ev => {
    const e = esfera(abierta);
    if (ev.target.closest('[data-copiar]')) copiar(prompt(e));
    if (ev.target.closest('[data-ficha]')) descargar(`Esfera ${String(e.n).padStart(2, '0')} - ${e.titulo}.md`, fichaMarkdown(e));
  });
  hojaCuerpo.addEventListener('change', ev => {
    if (!ev.target.matches('[data-estudiada]')) return;
    const l = leerEstudiadas().filter(x => x !== abierta);
    if (ev.target.checked) l.push(abierta);
    guardarEstudiadas(l);
    refrescarNodos();
    avisar(ev.target.checked ? 'Marcada como estudiada' : 'Desmarcada');
  });

  // ---------- Páginas ----------
  function vistaAvance() {
    const p = D.proyecto;
    const tiempo = D.tiempos.map(t => {
      const b = bloque(t.bloque);
      const [a1, a2] = t.desde.split(':').map(Number), [b1, b2] = t.hasta.split(':').map(Number);
      return `<div class="c-${b ? b.color : 'gris'}" style="flex:${(b1 * 60 + b2) - (a1 * 60 + a2)}">${b ? esc(b.nombre) : 'Colchón'}</div>`;
    }).join('');
    const reparto = D.tiempos.filter(t => bloque(t.bloque)).map((t, i) => {
      const b = bloque(t.bloque);
      const ns = D.esferas.filter(e => e.bloque === b.id).map(e => e.n).join(', ');
      return `<article class="entra" style="--i:${i}"><span class="tag c-${b.color}">${esc(b.nombre)}</span>
        <span class="mono">${t.desde} a ${t.hasta}</span><p>Esferas ${ns}${t.nota ? '. ' + esc(t.nota) : ''}</p>
        <p class="quien">${esc(t.responsable)}</p></article>`;
    }).join('');
    const pasos = D.checklist.map(c => {
      const icono = c.estado === 'hecho' ? 'ph-check-circle' : c.estado === 'siguiente' ? 'ph-arrow-circle-right' : 'ph-circle';
      const tag = c.estado === 'hecho' ? '<span class="tag c-verde">Hecho</span>' : c.estado === 'siguiente' ? '<span class="tag c-azul">Sigue</span>' : '<span class="tag c-gris">Pendiente</span>';
      return `<li class="${c.estado}"><i class="ph-bold ${icono}" aria-hidden="true"></i><div><h3>${esc(c.titulo)}</h3><p>${esc(c.detalle)}</p></div>${tag}</li>`;
    }).join('');
    const hechas = leerEstudiadas().length;
    return `
      <section class="portada entra">
        <h1>${esc(nombreProyecto())}, de la pregunta al código</h1>
        <p class="bajada">${esc(p.frase || 'Un mapa para que los cuatro entendamos el proyecto entero y lo expongamos con autoridad en 15 minutos.')}</p>
        <div class="progreso" role="progressbar" aria-valuemin="0" aria-valuemax="${D.esferas.length}" aria-valuenow="${hechas}" aria-label="Esferas estudiadas">
          <div style="transform:scaleX(${hechas / D.esferas.length})"></div></div>
        <p class="progreso-txt">Llevas ${hechas} de ${D.esferas.length} esferas estudiadas en este celular.</p>
      </section>
      <section class="origen entra" style="--i:2">
        <p class="lbl">La pregunta que lo empezó todo</p>
        <p class="cita ${p.preguntaOrigen ? '' : 'vacia'}">${esc(p.preguntaOrigen || 'Se escribe aquí cuando investiguemos el proyecto.')}</p>
      </section>
      <section class="seccion"><h2>En qué vamos</h2><p>Un punto a la vez. El tablero se va llenando a medida que avanzamos.</p><ul class="pasos">${pasos}</ul></section>
      <section class="seccion">
        <h2>Los 15 minutos, repartidos entre cuatro</h2>
        <p>Cuatro bloques de tres esferas: a cada uno le toca lo mismo. Las esferas de bastidores no se exponen, pero todos las dominan para las preguntas.</p>
        <div class="linea" role="img" aria-label="Reparto del tiempo: el porqué, el qué, el cómo, el proceso y un colchón final">${tiempo}</div>
        <div class="reparto">${reparto}</div>
      </section>`;
  }

  function vistaGuia() {
    return `
      <section class="entra"><h1>Cómo hacer una exposición excelente</h1>
        <p class="bajada">Lo que encontramos al investigar cómo se califica, cómo se cuenta un proyecto de software y cómo se responden las preguntas del jurado.</p></section>
      <div class="acordeon">${D.guia.map((g, i) => `<details ${i === 0 ? 'open' : ''}><summary>${esc(g.titulo)}</summary><ul>${g.puntos.map(p => `<li>${esc(p)}</li>`).join('')}</ul></details>`).join('')}</div>
      <p class="fuentes-link"><a href="#/fuentes">Ver las fuentes de la investigación</a></p>`;
  }

  function vistaEstudio() {
    const fuerza = f => f === 'alta' ? '<span class="tag c-verde">Mucha evidencia</span>' : '<span class="tag c-azul">Buena evidencia</span>';
    const metodos = D.metodos.map((m, i) => `<article class="metodo entra ${i < 2 ? 'ancho' : ''}" style="--i:${i}">${fuerza(m.fuerza)}<h3>${esc(m.nombre)}</h3><p>${esc(m.que)}</p><p>${esc(m.porque)}</p></article>`).join('');
    const plan = D.plan.map(p => `<li><div class="cuando">${esc(p.cuando)}<span class="quien">${esc(p.quien)}</span></div><div><p>${esc(p.que)}</p><p class="meta">${esc(p.meta)}</p></div></li>`).join('');
    return `
      <section class="entra"><h1>Cómo aprenderlo en 24 horas</h1>
        <p class="bajada">No se trata de memorizar líneas de código, sino de entender el proyecto tan bien que se pueda explicar de cualquier forma.</p></section>
      <section class="seccion"><h2>Lo que funciona, según la evidencia</h2><p>Releer y subrayar se siente productivo pero rinde poco. Estas técnicas sí funcionan.</p><div class="metodos">${metodos}</div></section>
      <section class="seccion"><h2>El plan, hora por hora</h2><p>Arranca cuando las esferas tengan su contenido.</p><ul class="plan">${plan}</ul></section>`;
  }

  // Una fuente por bloque: sus esferas y los conceptos que esas esferas deben repasar.
  function bloqueMarkdown(id) {
    const b = bloque(id), p = D.proyecto;
    const es = D.esferas.filter(e => e.bloque === id);
    const ids = [...new Set(es.flatMap(e => D.conceptosPorEsfera?.[e.n] || []))];
    const l = [`# ${nombreProyecto()}, ${b.nombre} (${b.idea})`, '', p.frase || '', p.preguntaOrigen ? `Pregunta de origen: ${p.preguntaOrigen}` : '',
      `Equipo: ${D.equipo.join(', ')}. ${p.programa}. Exposición de 15 minutos.`, ''];
    es.forEach(e => l.push(fichaMarkdown(e), ''));
    if (ids.length) { l.push(`# Conceptos clave de este bloque`, ''); ids.map(concepto).filter(Boolean).forEach(c => l.push(conceptoMarkdown(c), '')); }
    return l.join('\n');
  }

  function vistaNotebook() {
    const N = D.notebooklm;
    const botones = D.bloques.map((b, i) => `<button class="btn btn-2 btn-chico" data-bloque="${b.id}"><i class="ph-bold ph-download-simple"></i>${i + 1} · ${esc(b.nombre)}</button>`).join('')
      + `<button class="btn btn-2 btn-chico" data-conceptos><i class="ph-bold ph-download-simple"></i>6 · Conceptos</button>`;
    const studio = (N.studio || []).map((x, i) => `<li><div><strong>${esc(x.boton)}</strong>${x.instruccion ? `<p>${esc(x.instruccion)}</p>` : '<p>No necesita instrucción.</p>'}</div>
      ${x.instruccion ? `<button class="btn btn-2 btn-chico" data-copiar-studio="${i}">Copiar</button>` : ''}</li>`).join('');
    return `
      <section class="entra"><h1>Cómo usar NotebookLM con este tablero</h1>
        <p class="bajada">Un cuaderno por bloque. Cada uno se vuelve un paquete de estudio: audio, video, tarjetas, cuestionario y más.</p></section>
      <section class="seccion"><h2>Las fuentes, una por cuaderno</h2>
        <p>Toca el bloque que te toca y súbelo como fuente. Funciona también desde el celular.</p>
        <div class="fila-btn">${botones}</div></section>
      <section class="seccion"><h2>Paso a paso</h2>
        <ol class="numerada">${N.pasos.map(p => `<li><span>${esc(p)}</span></li>`).join('')}</ol></section>
      <section class="seccion"><h2>Qué generar en Studio</h2>
        <p>En este orden. Toca el lápiz de cada botón y pega su instrucción.</p>
        <ul class="studio">${studio}</ul>
        <div class="aviso"><strong>Lo que hay que saber</strong><ul>${N.avisos.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div></section>`;
  }

  function vistaFuentes() {
    return `<section class="entra"><h1>Fuentes de la investigación</h1>
        <p class="bajada">De dónde sale lo que dice la guía. Los métodos de estudio vienen de revisiones de investigación en psicología cognitiva.</p></section>
      <ol class="fuentes">${D.fuentes.map(f => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.nombre)}</a></li>`).join('')}</ol>`;
  }

  // ---------- Enrutador ----------
  let previa = null;
  function render() {
    const partes = location.hash.replace(/^#\/?/, '').split('/');
    const ruta = partes[0] || 'mapa';
    const activa = ruta === 'esfera' ? 'mapa' : ruta === 'concepto' ? 'conceptos' : ruta;
    document.querySelectorAll('.tabs a').forEach(a => {
      if (a.dataset.ruta === activa) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    if (ruta === 'mapa' || ruta === 'esfera') {
      if (app.dataset.vista !== 'mapa') montarMapa();
      if (ruta === 'esfera') {
        const n = Number(partes[1]);
        abrirHoja(n, previa ? Math.sign(n - previa) : 0);
        previa = n;
      } else { cerrarHoja(); previa = null; document.title = `Mapa · ${nombreProyecto()}`; }
      return;
    }

    cerrarHoja(); previa = null;
    document.body.classList.remove('en-mapa');
    app.dataset.vista = ruta;
    const vistas = { avance: vistaAvance, guia: vistaGuia, estudio: vistaEstudio, notebooklm: vistaNotebook, fuentes: vistaFuentes,
      conceptos: vistaConceptos, concepto: () => vistaConcepto(partes[1]) };
    app.innerHTML = (vistas[ruta] ||(() => `<section><h1>Esta página no existe</h1><div class="acciones"><a class="btn btn-1" href="#/mapa">Ir al mapa</a></div></section>`))();
    const h1 = app.querySelector('h1');
    document.title = `${h1 ? h1.textContent : 'Tablero'} · ${nombreProyecto()}`;
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  app.addEventListener('click', ev => {
    const z = ev.target.closest('[data-zoom]');
    if (z) {
      const i = ZOOMS.findIndex(v => v >= zoom - 0.01);
      const j = Math.min(ZOOMS.length - 1, Math.max(0, (i < 0 ? ZOOMS.length - 1 : i) + Number(z.dataset.zoom)));
      aplicarZoom(ZOOMS[j]);
    }
    if (ev.target.closest('[data-centrar]')) centrar();
    if (ev.target.closest('[data-todo]')) descargar(`${nombreProyecto()} - todas las esferas.md`, todoMarkdown());
    if (ev.target.closest('[data-conceptos]')) descargar(`${nombreProyecto()} - conceptos clave.md`, conceptosMarkdown());
    const bq = ev.target.closest('[data-bloque]');
    if (bq) { const i = D.bloques.findIndex(b => b.id === bq.dataset.bloque); descargar(`${nombreProyecto()} ${i + 1} - ${D.bloques[i].nombre}.md`, bloqueMarkdown(bq.dataset.bloque)); }
    const cs = ev.target.closest('[data-copiar-studio]');
    if (cs) copiarTexto(D.notebooklm.studio[Number(cs.dataset.copiarStudio)].instruccion);
  });

  window.addEventListener('hashchange', render);
  render();
})();
