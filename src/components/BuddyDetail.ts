import { BuddyDetail } from "../types/Buddy";

class BuddyDetailComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const uuid = this.getAttribute("uuid");

    if (!uuid) {
      this.renderError("No se proporcionó un UUID.");
      return;
    }

    try {
      const res = await fetch(`https://valorant-api.com/v1/buddies/${uuid}`);
      const data = await res.json();

      if (!data.status || !data.data) {
        this.renderError("No se encontró el buddy.");
        return;
      }

      const buddy: BuddyDetail = data.data;
      this.render(buddy);

    } catch (error) {
      this.renderError("Ocurrió un error al cargar los datos.");
      console.error("Error cargando el buddy:", error);
    }
  }

  render(buddy: BuddyDetail) {
    this.shadowRoot!.innerHTML = `
      <style>
        .detail { text-align: center; padding: 2rem; }
        img { max-width: 200px; }
      </style>
      <div class="detail">
        <h2>${buddy.displayName}</h2>
        <img src="${buddy.displayIcon}" alt="${buddy.displayName}" />
        <p>UUID: ${buddy.uuid}</p>
        <p>Asset Path: ${buddy.assetPath}</p>
        <button id="back">Volver</button>
      </div>
    `;

    this.shadowRoot!.querySelector("#back")?.addEventListener("click", () => {
      window.location.reload();
    });
  }

  renderError(message: string) {
    this.shadowRoot!.innerHTML = `
      <style>
        .error { color: red; text-align: center; padding: 2rem; }
      </style>
      <div class="error">
        <p>${message}</p>
        <button id="back">Volver</button>
      </div>
    `;

    this.shadowRoot!.querySelector("#back")?.addEventListener("click", () => {
      window.location.reload();
    });
  }
}

customElements.define("buddy-detail", BuddyDetailComponent);
