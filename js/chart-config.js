// chart-config.js - Interactive Sentiment Chart
function initChart() {
  const ctx = document.getElementById('sentimentChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{
        data: [68, 22, 10],
        backgroundColor: ['#10b981', '#fbbf24', '#ef4444'],
        borderWidth: 0,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 20, font: { size: 14 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` } }
      },
      animation: { duration: 1500, easing: 'easeOutQuart' }
    }
  });
}