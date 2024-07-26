window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
  const offlineMessage = document.getElementById('offline-message');
  if (navigator.onLine) {
    offlineMessage.classList.add('hidden');
  } else {
    offlineMessage.classList.remove('hidden');
  }
}

updateOnlineStatus(); // Check the initial status