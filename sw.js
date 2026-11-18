// Dad Alert Service Worker

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", event => {
  let data = {
    title: "🚨 DAD ALERT",
    body: "AYAH PERLUKAN BANTUAN!"
  };

  try {
    if (event.data) {
      data = { ...data, ...event.data.json() };
    }
  } catch (error) {
    console.error("Invalid push data", error);
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: "dad-alert-sos",
      requireInteraction: true,
      data: {
        url: self.registration.scope
      }
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow(
      event.notification.data?.url ||
      self.registration.scope
    )
  );
});
