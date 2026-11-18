(() => {
  const dialog = document.querySelector("#fundraiser-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  document.documentElement.classList.add("js");

  const trigger = document.querySelector("[data-fundraiser-trigger]");
  const eventId = dialog.dataset.eventId;
  const storageKey = eventId ? `fundraiser-dismissed:${eventId}` : "";
  let openingTrigger = null;

  const wasDismissed = () => {
    if (!storageKey) return false;
    try {
      return window.sessionStorage.getItem(storageKey) === "true";
    } catch (error) {
      console.warn("Fundraiser dismissal could not be read from session storage.", error);
      return false;
    }
  };

  const rememberDismissal = () => {
    if (!storageKey) return;
    try {
      window.sessionStorage.setItem(storageKey, "true");
    } catch (error) {
      console.warn("Fundraiser dismissal could not be saved to session storage.", error);
    }
  };

  const openDialog = () => {
    if (dialog.open) return;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  };

  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openingTrigger = trigger;
      openDialog();
    });
  }

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    rememberDismissal();
    document.body.classList.remove("dialog-open");
    if (openingTrigger?.isConnected) openingTrigger.focus();
    openingTrigger = null;
  });

  if (dialog.dataset.autoOpen === "true" && !wasDismissed()) {
    openDialog();
  }
})();
