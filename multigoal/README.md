# Serg4Cano MultiGoal v0.1

Widget minimalista multiplataforma para OBS: YouTube rojo, Twitch morado, Kick verde y TikTok negro. Muestra icono, título, contador actual/destino y barra de progreso; rota automáticamente. Permite varios objetivos de la misma plataforma.

## Ver demo

Abre [demo.html](demo.html) desde GitHub Pages o servidor HTTP. Puedes simular eventos, alternar entre objetivos y cambiar el fondo. No se modifican contadores de plataformas.

## OBS

Añade una **fuente de navegador** de **440×56 px** con `index.html`. La capa es transparente. Si usas GitHub Pages, la ruta es `https://sergiofdezcano.github.io/Multistream-Alerts/multigoal/index.html` una vez habilitado GitHub Pages en Settings > Pages.

## Configuración

Edita `config.js`. Cada meta admite `id` único, `platform`, `title`, `type`, `current` (dato ilustrativo), `start`, `target`, `enabled`, y opcionalmente `durationSeconds`. Rotación global: `rotateEverySeconds`.

## Streamer.bot

**La UI y el lector WebSocket están implementados; aún hay que configurar las acciones y eventos de las plataformas.**

1. Activa el WebSocket Server de Streamer.bot en `127.0.0.1:8080` (no lo publiques en Internet).
2. Mantén una variable global persistente por objetivo con nombre `sc_goal_<id>`; por ejemplo `sc_goal_twitch-followers`.
3. En las acciones y triggers correspondientes de Streamer.bot, incrementa/asigna el valor persistente.
4. El widget solicita las variables con `GetGlobals` cada 10 segundos. La demo no utiliza WebSocket.

Los valores iniciales mostrados en `config.js` son de ejemplo y no representan cifras de tus plataformas. TikTok requiere pasar los eventos de TikFinity a Streamer.bot. Los tipos de objetivo no tienen integración automática; requieren mapear los triggers según los eventos disponibles.

**Aviso importante:** GitHub Pages usa HTTPS y el navegador puede bloquear una conexión a `ws://127.0.0.1:8080`. En caso de incompatibilidad, sirve el widget desde un servidor HTTP local o utiliza una fuente de navegador de archivo local con la carpeta descargada. Para lectura WebSocket protegida con contraseña hará falta agregar autenticación en una futura versión; no publiques credenciales en GitHub.

No está incluido todavía un panel de administración ni sincronización automática de los totales absolutos de cada plataforma.
