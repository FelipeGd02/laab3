class BuddyFilter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot!.innerHTML = `
        <style>
          input {
            width: 100%;
            padding: 0.5rem;
            font-size: 1rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
          }
        </style>
        <input type="text" placeholder="Buscar buddy..." />
      `;
  
      const input = this.shadowRoot!.querySelector("input")!;
      input.addEventListener("input", () => {
        const value = input.value.toLowerCase();
        this.dispatchEvent(new CustomEvent("buddy-filter-changed", {
          detail: { filter: value },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  customElements.define("buddy-filter", BuddyFilter);
  