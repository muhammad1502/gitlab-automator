let injectionTimeout = null;

function executeAction(action) {
    const textArea = document.querySelector('textarea[name="note[note]"]') || 
                     document.querySelector('.js-main-target-form textarea') ||
                     document.querySelector('#note-body');

    if (!textArea) return;

    // 1. Fill the text
    textArea.value = action.text;
    
    // 2. Alert GitLab UI
    textArea.dispatchEvent(new Event('input', { bubbles: true }));

    // 3. Auto-submit with Ctrl+Enter simulation
    setTimeout(() => {
        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter', code: 'Enter', ctrlKey: true, bubbles: true
        });
        textArea.dispatchEvent(enterEvent);
    }, 150);
}

function injectFloatingUI() {
    if (document.getElementById('ninpo-floating-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'ninpo-floating-bar';
    bar.style.cssText = `
        position: fixed; top: 50%; right: 15px; transform: translateY(-50%);
        display: flex; flex-direction: column; gap: 8px; z-index: 99999;
        background: #fff; padding: 12px; border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1px solid #e1e1e1;
    `;

    chrome.storage.local.get({actions: []}, (data) => {
        if (!data.actions || data.actions.length === 0) return;
        
        data.actions.forEach(action => {
            const btn = document.createElement('button');
            btn.innerText = action.key ? `Alt+${action.key}: ${action.label}` : action.label;
            btn.style.cssText = "padding:8px 12px; cursor:pointer; background:#1068bf; color:white; border:none; border-radius:5px; font-weight:600; font-size:12px; text-align:left;";
            btn.onclick = (e) => {
                e.preventDefault();
                executeAction(action);
            };
            bar.appendChild(btn);
        });
        document.body.appendChild(bar);
    });
}

// THE NEW SIMPLE SHORTCUT LISTENER (Alt + Key)
window.addEventListener('keydown', (e) => {
    // SAFETY: If you are currently typing in an input or textarea, 
    // we don't want the shortcut to fire and close the ticket accidentally.
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Only allow the shortcut if you aren't actually typing a message
        // (This allows you to use the shortcut even if the box is focused, but only if Alt is held)
    }

    if (e.altKey && !e.shiftKey && !e.ctrlKey) {
        const pressedKey = e.key.toUpperCase();
        
        chrome.storage.local.get({actions: []}, (data) => {
            const action = data.actions.find(a => a.key.toUpperCase() === pressedKey);
            if (action) {
                console.log(`Ninpo Accelerator: Triggered Alt + ${pressedKey}`);
                e.preventDefault();
                e.stopPropagation();
                executeAction(action);
            }
        });
    }
}, true);

// Optimized Observer to prevent crashing
const observer = new MutationObserver(() => {
    if (injectionTimeout) clearTimeout(injectionTimeout);
    injectionTimeout = setTimeout(() => {
        injectFloatingUI();
    }, 500);
});

observer.observe(document.body, { childList: true, subtree: true });
injectFloatingUI();