// self.addEventListener('push', event => {
//   const data = event.data ? event.data.json() : {
//     title: 'Default Title',
//     body: 'Fallback message',
//     icon: '/icon.png',
//     badge: '/badge.png',
//     url: 'https://www.youtube.com'
//   };
//     const options = {
//     body: data.body,
//     icon: data.icon,
//     badge: data.badge,
//     data: { url: data.url },
//     tag: 'sample-push',
//   };    
//     event.waitUntil(
//     self.registration.showNotification(data.title, options)
//   );
// });

// sw.js

// Listen for push events
self.addEventListener('push', event => {
  // Parse incoming payload or use fallback
  const data = event.data ? event.data.json() : {
    title: 'Default Title',
    body: 'Fallback message',
    icon: '/icon.png',
    badge: '/badge.png',
    url: 'https://www.youtube.com'
  };

  const options = {
    body: data.body,           // matches 'disc' from your index.js
    icon: data.icon,           // '/icon.png'
    badge: data.badge,         // optional small icon
    data: { url: data.url },   // URL to open on click
    tag: 'push-notification',
    renotify: true
  };

  // Display the notification
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Handle click on the notification
// self.addEventListener('notificationclick', event => {
//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
//       for (const client of clientList) {
//         if (client.url === event.notification.data.url && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       if (clients.openWindow) {
//         return clients.openWindow(event.notification.data.url);
//       }
//     })
//   );
// });
