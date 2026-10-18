<div align="center">

# Serg4Cano · Stream Widgets

**Minimal overlays for multistreaming. Maximum focus on the gameplay.**

Widgets ligeros para **OBS Studio**, con automatizaciones a través de **Streamer.bot** y compatibilidad prevista con **TikFinity**.

[![OBS](https://img.shields.io/badge/OBS-Browser%20Source-302B3C?style=for-the-badge&logo=obsstudio&logoColor=white)](https://obsproject.com/)
[![Streamer.bot](https://img.shields.io/badge/Streamer.bot-WebSocket-4B307D?style=for-the-badge)](https://streamer.bot/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-151B23?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

**[🌐 Página del proyecto](https://sergiofdezcano.github.io/Serg4Cano-Stream-Widgets/)** · **[▶ Probar MultiGoal](https://sergiofdezcano.github.io/Serg4Cano-Stream-Widgets/multigoal/demo.html)** · **[📖 Documentación](multigoal/README.md)**

</div>

---

## Qué es este proyecto

Una colección de componentes de streaming **mínimos, configurables y sin dependencias pesadas**, pensados para una sola fuente de navegador en OBS.

El primer componente es **MultiGoal**: una barra compacta que rota entre objetivos de YouTube, Twitch, Kick y TikTok. No muestra todos los objetivos a la vez; enseña solo el activo y pasa al siguiente automáticamente.

| Plataforma | Identidad visual | Ejemplos de objetivo |
| :-- | :-- | :-- |
| **YouTube** | 🔴 Rojo | Suscriptores, miembros |
| **Twitch** | 🟣 Morado | Seguidores, subs, subs regaladas, Bits |
| **Kick** | 🟢 Verde | Seguidores, subs |
| **TikTok** | ⚫ Negro | Seguidores, regalos, likes, subs |

> [!NOTE]
> Los tipos de objetivo de la tabla son **casos de uso previstos**. Para disponer de datos reales hace falta crear los triggers correspondientes en Streamer.bot (y TikFinity para TikTok). No se afirma que todos los eventos estén disponibles automáticamente.

## MultiGoal

El diseño del widget es deliberadamente compacto:

```text
  ◉ Meta de seguidores                        740 / 1.000
  █████████████████████████████████░░░░░░░░░░░░░░
```

- **Un solo objetivo visible** en cada momento, rotación automática.
- **Varios objetivos de la misma plataforma**, cada uno con su propio identificador.
- **Título, valor actual, meta y color** personalizables.
- **Barras animadas** y transiciones discretas.
- **Fondo transparente**, apropiado para superponer sobre el gameplay.
- **Demo interactiva** con eventos simulados, sin necesidad de OBS.
- **Preparación para WebSocket local** de Streamer.bot y variables globales persistentes.

<div align="center">

### [Abrir demostración interactiva ↗](https://sergiofdezcano.github.io/Serg4Cano-Stream-Widgets/multigoal/demo.html)

</div>

## Utilizarlo en OBS

1. Activa GitHub Pages desde **Settings → Pages → Deploy from a branch** y selecciona **`main` / `(root)`**.
2. Espera a que la publicación figure como completada en **Actions** o **Settings → Pages**.
3. En OBS añade **Fuentes → Navegador**.
4. Introduce esta URL y configura **440 × 56 px**:

```text
https://sergiofdezcano.github.io/Serg4Cano-Stream-Widgets/multigoal/index.html
```

La página de demostración incluye sus propios botones de simulación; **no** es la dirección que debes utilizar en OBS.

> [!IMPORTANT]
> **La versión 0.1 todavía no está enlazada a tus eventos reales.** La demo funciona de forma independiente. En la versión para OBS se muestran valores de ejemplo hasta sincronizarlos con Streamer.bot. Algunos navegadores pueden bloquear WebSocket local sin cifrar (`ws://`) desde GitHub Pages (`https://`); si ocurre, aloja los mismos archivos localmente en el PC de streaming.

## Configurar tus metas

Edita [`multigoal/config.js`](multigoal/config.js). Puedes añadir tantos objetivos como necesites:

```js
{
  id: "twitch-followers",
  platform: "twitch",
  title: "Meta de seguidores",
  type: "followers",
  current: 740, // ejemplo hasta sincronización
  start: 0,
  target: 1000,
  enabled: true,
  durationSeconds: 10
}
```

Las variables persistentes previstas en Streamer.bot utilizan el prefijo `sc_goal_`, como `sc_goal_twitch-followers`. La lectura mediante WebSocket está implementada; **el mapeo y validación de los triggers siguen pendientes**.

Consulta la [documentación técnica del widget](multigoal/README.md) para más detalles.

## Estructura del repositorio

```text
.
├── index.html             # Página de inicio para GitHub Pages
├── .nojekyll              # Servir archivos estáticos directamente
├── README.md
└── multigoal/
    ├── index.html         # Widget limpio para OBS
    ├── demo.html          # Demo interactiva
    ├── demo.js            # Controles y simulación
    ├── config.js          # Configuración de objetivos
    ├── widget.js          # Lógica del widget y WebSocket
    ├── styles.css         # Presentación minimalista
    └── README.md          # Documentación técnica
```

## Estado del desarrollo

| Funcionalidad | Estado |
| :-- | :-- |
| Widget minimalista | ✅ Implementado |
| Rotación entre múltiples objetivos | ✅ Implementado |
| Colores por plataforma (TikTok negro) | ✅ Implementado |
| Demo con eventos simulados | ✅ Implementado |
| Lectura WebSocket / variables globales | 🟡 Implementada; no validada contra tu Streamer.bot |
| Integración real de triggers | ⏳ Pendiente |
| Panel visual para añadir/editar objetivos | ⏳ Pendiente |
| Alertas y más componentes | 📋 Planeados |

## Tecnología y filosofía

**HTML · CSS · JavaScript**, sin frameworks, cuentas de terceros ni servicios de pago para mostrar el overlay.

La intención es que la lógica de eventos y persistencia resida en Streamer.bot, y que el navegador de OBS solo dibuje el estado del widget. **No guardes claves ni credenciales privadas en archivos alojados en GitHub Pages.**

---

<div align="center">

**Made for streams. Designed to stay out of the way.**

*Serg4Cano · Stream Widgets*

</div>
