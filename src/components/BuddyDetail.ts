class BuddyDetail extends HTMLElement {
    private shadowInitialized: boolean = false;
  
    async connectedCallback() {
      if (!this.shadowInitialized) {
        this.attachShadow({ mode: "open" });
        this.shadowInitialized = true;
      }
  
      const uuid = this.getAttribute("uuid");
  
      if (!uuid) {
        this.renderError("No se proporcionó UUID.");
        return;
      }
  
      try {
        const res = await fetch(`https://valorant-api.com/v1/buddies/${uuid}`);
        const json = await res.json();
  
        const buddy = json.data;
        if (!buddy) {
          this.renderError("No se encontró el buddy.");
          return;
        }
  
        this.renderBuddy(buddy);
      } catch (err) {
        console.error(err);
        this.renderError("Error al cargar el buddy.");
      }
    }
  
    renderBuddy(buddy: any) {
      if (!this.shadowRoot) return;
  
      this.shadowRoot.innerHTML = `
        <style>
          .detail {
            padding: 2rem;
            text-align: center;
            background-color: #0F1923;
            color: #ECE8E1;
          }
  
          img {
            max-width: 200px;
            border: 3px solid #FF4655;
            padding: 1rem;
          }
  
          h2 {
            color: #FF4655;
          }
  
          button {
            background-color: #FF4655;
            border: none;
            padding: 0.5rem 1rem;
            color: #fff;
            font-weight: bold;
            font-family: 'Rajdhani', sans-serif;
            cursor: pointer;
            margin-top: 2rem;
          }
  
          button:hover {
            background-color: #ff2e43;
          }
        </style>
        <div class="detail">
          <h2>${buddy.displayName}</h2>
          <img src="${buddy.displayIcon}" alt="${buddy.displayName}" />
          <p>UUID: ${buddy.uuid}</p>
          <p>Asset Path: ${buddy.assetPath}</p>
          <button id="back">Volver</button>
        </div>
      `;
  
      this.shadowRoot.querySelector("#back")!.addEventListener("click", () => {
        location.reload();
      });
    }
  
    renderError(message: string) {
      if (!this.shadowRoot) return;
  
      this.shadowRoot.innerHTML = `
        <style>
          .error {
            padding: 2rem;
            text-align: center;
            color: #FF4655;
            font-weight: bold;
          }
        </style>
        <div class="error">${message}</div>
      `;
    }
  }
  
  customElements.define("buddy-detail", BuddyDetail);
  