const BACKEND_URL = 'http://localhost:5000/api/ask';

const portalKnowledge = {
  advisory: {
    url: "https://pwcindia.sharepoint.com/sites/advisorykmportal-india"
  },
  connected: {
    url: "https://connectedsource.pwcinternal.com/"
  },
  conversations: {
    url: "https://conversationsthatmatter.ifs-ind-06-02.pwcglb.com/Home/Index"
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSearch();
  });

  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      handleQuickAction(this.dataset.action);
    });
  });

  document.querySelectorAll('.shortcut-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      openPortal(this.dataset.portal);
    });
  });
});

async function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');
  if (!query) return;
  resultsDiv.innerHTML = 'Searching...';

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query })
    });
    const data = await response.json();
    resultsDiv.innerHTML = `<div class="answer"><h4>💡 Answer:</h4><p>${data.response || data.error}</p></div>`;
  } catch (error) {
    resultsDiv.innerHTML = `<div class="error"><h4>❌ Error:</h4><p>Could not process your request. Please try again.</p></div>`;
  }
}

function handleQuickAction(action) {
  const resultsDiv = document.getElementById('results');
  if (action === 'login-help') {
    resultsDiv.innerHTML = `<div class="quick-help"><h4>🔐 Login Help</h4><ul>
      <li>Clear browser cache and cookies</li>
      <li>Try incognito/private browsing mode</li>
      <li>Check if VPN is connected</li>
      <li>Verify your credentials</li>
      <li>Contact IT if issue persists</li>
    </ul></div>`;
  } else if (action === 'navigation-guide') {
    resultsDiv.innerHTML = `<div class="quick-help"><h4>🧭 Navigation Guide</h4><ul>
      <li>Use the search bar for quick access</li>
      <li>Check left sidebar for main sections</li>
      <li>Use breadcrumbs to track location</li>
      <li>Bookmark frequently used pages</li>
      <li>Check recent activity for quick access</li>
    </ul></div>`;
  } else if (action === 'troubleshoot') {
    resultsDiv.innerHTML = `<div class="quick-help"><h4>🔧 Troubleshooting</h4><ul>
      <li>Refresh the page (F5 or Ctrl+R)</li>
      <li>Clear browser cache</li>
      <li>Try different browser</li>
      <li>Check internet connection</li>
      <li>Restart browser</li>
    </ul></div>`;
  }
}

function openPortal(portal) {
  const portalInfo = portalKnowledge[portal];
  if (portalInfo) chrome.tabs.create({ url: portalInfo.url });
}
