const defaultActions = [
  { label: "✅ Clean", text: "Nothing suspicious found\n/close", key: "1" },
  { label: "🎯 Lead @Michael", text: "Possible lead for @michael\n/assign @michael\n/label ~lead", key: "M" }
];

function renderActions(actions) {
  const list = document.getElementById('actions-list');
  list.innerHTML = '';
  actions.forEach((action, index) => {
    const div = document.createElement('div');
    div.className = 'action-item';
    div.innerHTML = `
      <div class="row">
        <input type="text" placeholder="Label" value="${action.label}" class="label-input">
        <input type="text" maxlength="1" placeholder="Key" value="${action.key}" class="key-input" title="Hot key">
        <button onclick="removeAction(${index})" class="delete-btn">✕</button>
      </div>
      <textarea placeholder="Slash commands (e.g. /close)" class="text-input">${action.text}</textarea>
    `;
    list.appendChild(div);
  });
}

document.getElementById('save').onclick = () => {
  const labels = document.querySelectorAll('.label-input');
  const keys = document.querySelectorAll('.key-input');
  const texts = document.querySelectorAll('.text-input');
  const newActions = [];
  
  labels.forEach((l, i) => {
    if (l.value.trim() !== "") {
      newActions.push({ 
        label: l.value, 
        key: keys[i].value.toUpperCase().trim(), 
        text: texts[i].value 
      });
    }
  });
  
  chrome.storage.local.set({actions: newActions}, () => {
    const status = document.getElementById('save');
    status.innerText = "✅ Saved! Refresh GitLab";
    setTimeout(() => { status.innerText = "💾 Save All Settings"; }, 2000);
  });
};

document.getElementById('add').onclick = () => {
  chrome.storage.local.get({actions: defaultActions}, (data) => {
    data.actions.push({label: "New Action", text: "", key: ""});
    renderActions(data.actions);
  });
};

window.removeAction = (index) => {
  chrome.storage.local.get({actions: []}, (data) => {
    data.actions.splice(index, 1);
    chrome.storage.local.set({actions: data.actions}, () => renderActions(data.actions));
  });
};

chrome.storage.local.get({actions: defaultActions}, (data) => renderActions(data.actions));