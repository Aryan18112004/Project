(function() {
  const currentPortal = detectPortal();
  addNavigationHelper();
  enhanceSearch();
  addQuickAccessToolbar();

  function detectPortal() {
    const hostname = window.location.hostname;
    if (hostname.includes('pwcindia.sharepoint.com')) return 'advisory';
    if (hostname.includes('connectedsource.pwcinternal.com')) return 'connected';
    if (hostname.includes('conversationsthatmatter')) return 'conversations';
    return 'unknown';
  }

  function addNavigationHelper() {
    const helpBtn = document.createElement('div');
    helpBtn.innerHTML = '❓';
    helpBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: #0066cc;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10000;
      font-size: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    helpBtn.onclick = function() {
      showContextualHelp();
    };
    document.body.appendChild(helpBtn);
  }

  function enhanceSearch() {
    const searchBoxes = document.querySelectorAll('input[type="search"], input[placeholder*="search" i]');
    searchBoxes.forEach(box => {
      box.addEventListener('input', function() {
        if (this.value.length > 2) showSearchSuggestions(this);
      });
    });
  }

  function addQuickAccessToolbar() {
    const toolbar = document.createElement('div');
    toolbar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: white;
      font-family: Arial, sans-serif;
      gap: 20px;
    `;
    toolbar.innerHTML = `<span>🧭 PwC Portal Navigator Active</span><button onclick="showQuickHelp()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Quick Help</button>`;
    document.body.appendChild(toolbar);
    document.body.style.paddingTop = '40px';
  }

  function showContextualHelp() {
    const portal = detectPortal();
    const helpContent = getPortalSpecificHelp(portal);
    const helpModal = document.createElement('div');
    helpModal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10001;
      max-width: 500px;
      width: 90%;
    `;
    helpModal.innerHTML = `<h3>Help for ${portal} Portal</h3>${helpContent}<button onclick="this.parentElement.remove()" style="margin-top: 15px; padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>`;
    document.body.appendChild(helpModal);
  }

  function getPortalSpecificHelp(portal) {
    const helpContent = {
      advisory: `<ul>
        <li>Use the search bar in the top navigation</li>
        <li>Check the left sidebar for document categories</li>
        <li>Use filters to narrow down results</li>
        <li>Save frequently accessed documents</li>
      </ul>`,
      connected: `<ul>
        <li>Navigate using the main menu</li>
        <li>Use quick links for common tasks</li>
        <li>Check announcements for updates</li>
        <li>Access your profile from top right</li>
      </ul>`,
      conversations: `<ul>
        <li>Browse topics by category</li>
        <li>Use search to find specific discussions</li>
        <li>Join conversations by commenting</li>
        <li>Follow topics for notifications</li>
      </ul>`
    };
    return helpContent[portal] || '<p>General portal help available.</p>';
  }

  window.showQuickHelp = showContextualHelp;
})();
