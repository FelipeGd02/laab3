import { Buddy } from "../types/Buddy";
import "./BuddyCard";
import "./BuddyDetail";
import "./BuddyFilter";

class BuddyList extends HTMLElement {
  private buddies: Buddy[] = [];
  private filtered: Buddy[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const res = await fetch("https://valorant-api.com/v1/buddies");
    const data = await res.json();
    this.buddies = data.data;
    this.filtered = [...this.buddies];

    this.render();
    this.renderCards();

    this.shadowRoot!.querySelector("buddy-filter")!.addEventListener("buddy-filter-changed", (e: any) => {
      const text = e.detail.filter;
      this.filtered = this.buddies.filter(b =>
        b.displayName.toLowerCase().includes(text)
      );
      this.renderCards();
    });
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
          background-color: #0F1923;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }
      </style>
      <buddy-filter></buddy-filter>
      <div class="grid" id="buddy-container"></div>
    `;
  }

  renderCards() {
    const container = this.shadowRoot!.querySelector("#buddy-container")!;
    container.innerHTML = this.filtered.map(
      (buddy) => `
        <buddy-card
          data-id="${buddy.uuid}"
          name="${buddy.displayName}"
          img="${buddy.displayIcon}">
        </buddy-card>
      `
    ).join("");

    this.shadowRoot!.querySelectorAll("buddy-card").forEach(card =>
      card.addEventListener("click", (e: Event) => {
        const uuid = (e.currentTarget as HTMLElement).getAttribute("data-id");
        const detail = document.createElement("buddy-detail");
        detail.setAttribute("uuid", uuid!);
        document.body.innerHTML = "";
        document.body.appendChild(detail);
      })
    );
  }
}

customElements.define("buddy-list", BuddyList);
