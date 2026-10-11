# Sitio de Creando Arcoíris

Sitio en React (Vite + Tailwind) con panel de administración. Incluye la página de la agencia, las fichas de proyectos y **Baños Justos** en `/banos`.

Costo de operación: solo el dominio (unos 10–15 USD al año). GitHub, Netlify y el panel de administración son gratuitos para un sitio de este tamaño.

---

## 1. Probarlo en tu computador (opcional)

Necesitas Node 20 o superior.

```
npm install
npm run dev
```

Abre http://localhost:5173

---

## 2. Publicarlo (una sola vez, unos 30 minutos)

### a) Subir el código a GitHub
1. Crea una cuenta en github.com (si no tienes) y un repositorio nuevo llamado `crearco-site` (puede ser privado).
2. Sube el contenido de esta carpeta a ese repositorio (en la página del repositorio: *uploading an existing file*, o con `git`).

### b) Publicar en Netlify
1. Entra a netlify.com con tu cuenta de GitHub.
2. *Add new site → Import an existing project → GitHub →* elige `crearco-site`.
3. No cambies nada: el archivo `netlify.toml` ya trae la configuración. Pulsa *Deploy*.
4. Netlify te da una dirección provisional (`algo.netlify.app`) para revisar el sitio.

### c) Conectar tu dominio
1. Compra el dominio en el registrador que prefieras (Namecheap, GoDaddy, etc.).
2. En Netlify: *Domain management → Add a domain* y sigue las instrucciones (te indica qué registros DNS poner en el registrador). El certificado HTTPS es automático.

### d) Activar el panel de administración
1. Abre `public/admin/config.yml` y cambia:
   - `repo: TU-USUARIO/crearco-site` por tu usuario y repositorio reales,
   - `site_url` y `display_url` por tu dominio.
2. Guarda el cambio en GitHub. Netlify vuelve a publicar solo.

---

## 3. Administrar el contenido

1. Entra a **tudominio.com/admin** (usa una versión reciente de Chrome, Edge, Firefox o Safari).
2. Elige **Sign In Using Access Token** y pega tu token de GitHub. Para crearlo:
   GitHub → *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
   - *Repository access*: solo `crearco-site`.
   - *Permissions → Contents*: **Read and write**.
3. Edita textos, fotos, proyectos, cifras y equipo. Al pulsar **Publicar**, el cambio se guarda en GitHub y el sitio se actualiza en 1–2 minutos.

**Para tu socia:** en GitHub, *Settings del repositorio → Collaborators → Add people* (permiso *Write*). Ella crea su propio token y entra igual.

Qué se edita en cada colección:
- **Página de inicio:** todos los textos y fotos de la portada y las secciones.
- **Proyectos:** una ficha por proyecto (propio o incubado). Sin foto se muestra el símbolo de la marca. Marcar *caso destacado* los lleva a la sección "Ideas que se convirtieron en proyectos". Los campos de reto, idea, resultados y galería llenan la página individual del proyecto; los vacíos no se muestran.
- **Equipo:** si agregas personas, aparece el bloque de equipo en "Nosotros". Si está vacío, no se muestra.
- **Ajustes generales:** correo, teléfono, redes y pie de página.
- **Baños Justos:** textos, lugares, bibliografía y equipo.

---

## 4. Formularios

- **Contacto** y **Reportar baño** se reciben en Netlify (*Forms* en el panel de tu sitio). Gratis hasta 100 envíos al mes.
- Para recibir un correo con cada envío: Netlify → *Site configuration → Notifications → Form submission notifications*.
- Los reportes de baños quedan en Netlify Forms, no en una base de datos. Sirven para esta etapa; cuando haya volumen conviene migrarlos a una base de datos (por ejemplo Supabase).

---

## 5. Pendientes antes de lanzar

- [ ] Reemplazar las fotos provisionales (las de stock) por fotos propias. Solo `hero-certificados.jpg` y `jovenes-territorio.jpg` son del equipo.
- [ ] Completar "Rol de Creando Arcoíris", convocatoria, año y monto de los tres casos. Se dejaron vacíos a propósito: no estaban en el brief.
- [ ] Confirmar la organización de "Novenas de Barrio".
- [ ] Confirmar las cifras de resultados (+200 millones, +600, 66, +30).
- [ ] Agregar correo de contacto en *Ajustes generales*.
- [ ] Revisar los textos de Baños Justos y los datos de los lugares estimados.

---

## 6. Dónde está cada cosa

```
content/            Todo el contenido editable (JSON). Lo modifica el panel.
public/uploads/     Fotos subidas.
public/admin/       Panel de administración y su configuración.
src/sections/       Secciones de la página de inicio.
src/banos/          Simulación, calculadora, lugares y reporte de Baños Justos.
src/index.css       Colores, tipografías y espaciado de la marca.
src/assets/         Logo (color, blanco y símbolo).
```

**Marca:** los colores y las dos tipografías (Bricolage Grotesque para títulos, Outfit para textos) están en `src/index.css`. El color de cada proyecto sale de su primer ámbito (`src/lib/ambitos.ts`).
