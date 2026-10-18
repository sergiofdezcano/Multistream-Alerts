/* Serg4Cano MultiGoal · sin credenciales ni tokens en este archivo.
   `current` es el valor de muestra hasta leer sc_goal_<id> de Streamer.bot. */
window.SERG4CANO_MULTIGOAL = {
  websocketUrl: 'ws://127.0.0.1:8080/',
  syncEverySeconds: 10,
  rotateEverySeconds: 10,
  transitionMilliseconds: 350,
  goals: [
    { id: 'youtube-subs', platform: 'youtube', title: 'Meta de suscriptores', type: 'subscribers', current: 2350, target: 2500, start: 0, enabled: true },
    { id: 'twitch-followers', platform: 'twitch', title: 'Meta de seguidores', type: 'followers', current: 740, target: 1000, start: 0, enabled: true },
    { id: 'twitch-gifted', platform: 'twitch', title: 'Subs regaladas', type: 'gifted_subs', current: 12, target: 25, start: 0, enabled: true },
    { id: 'kick-followers', platform: 'kick', title: 'Meta de seguidores', type: 'followers', current: 160, target: 200, start: 0, enabled: true },
    { id: 'tiktok-gifts', platform: 'tiktok', title: 'Meta de regalos', type: 'gifts', current: 3200, target: 5000, start: 0, enabled: true }
  ]
};
