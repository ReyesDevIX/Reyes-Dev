try {
  document.documentElement.dataset.theme = localStorage.getItem('reyes-theme') === 'light' ? 'light' : 'dark';
} catch {
  document.documentElement.dataset.theme = 'dark';
}
