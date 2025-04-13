class BuddyCard extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute("name") || "";
      const img = this.getAttribute("img") || "";
  
      this.attachShadow({ mode: "open" });
      this.shadowRoot!.innerHTML = `
        <style>
          .card {
            background-color: #1F2A36;
            border: 2px solid transparent;
            padding: 1rem;
            text-align: center;
            transition: border 0.2s, transform 0.2s;
            border-radius: 0;
            cursor: pointer;
          }
  
          .card:hover {
            border: 2px solid #FF4655;
            transform: scale(1.05);
          }
  
          img {
            max-width: 80px;
            margin-bottom: 0.5rem;
          }
  
          p {
            font-weight: bold;
            color: #ECE8E1;
          }
        </style>
        <div class="card">
          <img src="${img}" alt="${name}" />
          <p>${name}</p>
        </div>
      `;
    }
  }
  
  customElements.define("buddy-card", BuddyCard);
  