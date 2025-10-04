//detectDevTools auto fermer la page
(function () {
  // Fermer ou vider la page
  function lockPage() {
    try {
      window.close(); // marche si ouvert par JS
    } catch (e) {}
    setTimeout(() => {
      if (!window.closed) {
          window.location.href = "about:blank";
      }
    }, 10);
  }

  // Détection par différence de taille (dock DevTools)
  function checkBySize(threshold = 200) {
    const wDiff = Math.abs(window.outerWidth - window.innerWidth);
    const hDiff = Math.abs(window.outerHeight - window.innerHeight);
    return wDiff > threshold || hDiff > threshold;
  }

  // Détection console getter trick (DevTools ouvert)
  let consoleHit = false;
  async function checkByConsole() {
    consoleHit = false;
    const probe = {};
    Object.defineProperty(probe, 'id', {
      get() {
        consoleHit = true;
        return 'x';
      }
    });
    console.log(probe);
    return new Promise(resolve => setTimeout(() => resolve(consoleHit), 50));
  }

  // Boucle de surveillance
  async function monitor() {
    while (true) {
      try {
        if (checkBySize() || await checkByConsole()) {
          lockPage();
          break;
        }
      } catch(e) {}
      await new Promise(r => setTimeout(r, 800));
    }
  }

  monitor();
})();



//Bloquer clic droit et sélection
document.addEventListener('contextmenu', e => { e.preventDefault(); flashMessage("Action non autorisée"); });
document.addEventListener('selectstart', e => { e.preventDefault(); flashMessage("Action non autorisée"); });
document.addEventListener('dragstart', e => { e.preventDefault(); flashMessage("Action non autorisée"); });


//Bloquer raccourcis courants (F12, Ctrl+S, Ctrl+U, Ctrl+Shift+I/C)
document.addEventListener('keydown', function(e) {
const key = (e.key || '').toString();
const blocked = (
key === 'F12' ||
(e.ctrlKey && (key.toLowerCase() === 's' || key.toLowerCase() === 'u')) ||
(e.ctrlKey && e.shiftKey && (key.toLowerCase() === 'i' || key.toLowerCase() === 'c'))
);
if (blocked) {
e.preventDefault();
e.stopPropagation();
flashMessage("Action non autorisée");
}
});

// petit message utilisateur
function flashMessage(text) {
try {
let el = document.getElementById('__flash_msg_protect');
if (!el) {
el = document.createElement('div');
el.id = '__flash_msg_protect';
Object.assign(el.style, {
position: 'fixed', top: '10px', right: '10px', background: '#f44', color: '#fff',
padding: '8px 12px', borderRadius: '6px', zIndex: 9999999, fontFamily: 'sans-serif'
});
document.body.appendChild(el);
}
el.textContent = text;
setTimeout(() => el.remove(), 1200);
} catch (err) {}
}
