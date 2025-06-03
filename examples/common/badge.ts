import "./badge.scss";

function isChrome(): boolean {
  const userAgent = navigator.userAgent;
  return (
    /Chrome/.test(userAgent) && !/Edg/.test(userAgent) && !/OPR/.test(userAgent)
  );
}

function closeDialog(): void {
  document.getElementsByTagName("dialog")[0].close();
}

function createBadge(): void {
  if (isChrome()) {
    return;
  }

  const badge = document.createElement("button");
  badge.className = "chrome-badge";
  badge.textContent = "Switch to Chrome";

  const dialog = document.createElement("dialog");
  dialog.innerHTML = `
    <div id="dialog-backdrop" class="dialog-backdrop"></div>
    <div class="dialog-content">
        <p>This page uses experimental API not available in every browser, use Chrome (for now)</p>
        <div class="button-container">
        <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
            Download Chrome
        </a>
        <button id="dialog-close" type="button">Close</button>
    </div>
</div>
  `;
  dialog.id = "chrome-dialog";
  badge.addEventListener("click", () => {
    dialog.showModal();
  });

  document.body.appendChild(badge);
  document.body.appendChild(dialog);
  document
    .getElementById("dialog-close")
    ?.addEventListener("click", closeDialog);
  document
    .getElementById("dialog-backdrop")
    ?.addEventListener("click", closeDialog);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createBadge);
} else {
  createBadge();
}
