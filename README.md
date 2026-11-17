# SkillSwap · Landing page

Web oficial de **SkillSwap**, la plataforma donde los estudiantes intercambian habilidades. *Aprende sin pagar.*

Hecha con HTML, CSS y JavaScript vanilla. No tiene dependencias ni paso de build; solo carga Google Fonts.

```
index.html        → todo el contenido y los textos
css/styles.css    → estilos (variables de marca al inicio)
js/main.js        → menú, scroll, simulador de match, FAQ y formulario
assets/           → favicon.svg y og-image.png (imagen para redes sociales)
```

## Abrir en local

Haz doble clic en `index.html` y se abre en tu navegador.

Si prefieres un servidor local (recomendado para probar con Lighthouse):

```bash
npx serve .
```

o, con Python:

```bash
python -m http.server 8000
```

## Publicar

**GitHub Pages**
1. Sube la carpeta a un repositorio de GitHub.
2. Ve a *Settings → Pages*, elige la rama `main` y la carpeta `/ (root)`.
3. En un minuto la web estará en `https://TU_USUARIO.github.io/TU_REPO/`.

**Netlify**
1. Entra en [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta del proyecto. Listo.

Después de publicar, cambia en `index.html` las etiquetas `og:url` y `og:image` por la URL absoluta de tu web, por ejemplo `https://skillswap.co/assets/og-image.png`.

## Dónde cambiar cosas

| Qué | Dónde |
|---|---|
| **Textos** | `index.html`. Cada sección está marcada con un comentario (`1. HEADER FIJO`, `2. HERO`…). |
| **Colores, tipografía y espaciados** | `css/styles.css`, bloque `:root` al principio. |
| **Precios** | `index.html`, sección `6. PRECIOS` (clase `price-card__amount`). Recuerda actualizar también la respuesta "¿Qué incluye Premium?" del FAQ. |
| **Perfiles de ejemplo del simulador** | `js/main.js`, constante `SAMPLE_PEOPLE`. |
| **Habilidades del simulador** | `index.html`, los dos `<select>` del simulador (`sim-teach` y `sim-learn`). |
| **Enlaces a redes** | `index.html`, footer (ahora tienen `href="#"`). |
| **Envío del formulario** | `js/main.js`, busca `// TODO: conectar con backend o Formspree`. Ahora no se envía nada. |
