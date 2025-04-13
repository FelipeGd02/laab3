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
            background-color: #1F2A36;
            border: 2px solid #FF4655;
            color: #ECE8E1;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            padding: 0.5rem;
            width: 100%;
            margin-bottom: 1rem;
          }
  
          input::placeholder {
            color: #ccc;
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
  