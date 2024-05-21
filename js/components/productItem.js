export class productItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["name", "img", "price"];
      }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, old, now) {
        if(old !== now){
            this.render()
        }
    }

    handleEvent(event) {
        if (event.type === "click") {
          const messageEvent = new CustomEvent("user:data-message", {
            detail: { class_name: this.getAttribute("class"), id: this.getAttribute("id")},
            bubbles: true,
            composed: true
          });
          console.log('eventoenviado');
          
          this.dispatchEvent(messageEvent);
        }
      }

    render(){

        const name = this.getAttribute("name") || "testName";
        const productImg = this.getAttribute("img") || "https://http2.mlstatic.com/D_NQ_NP_2X_787280-MCO51843885132_102022-F.webp";
        const price = this.getAttribute("price") || "1.500"; 

        this.shadowRoot.innerHTML =/*html*/`
        <link rel="stylesheet" href="css/style.css">
        <div class="product-item">
            <div class="product-img"><img src=${productImg} alt=""  loading="lazy"></div>
            <section class="product-info">
                <h3>${name}</h3>
                <div class"info-foo">
                <p>$${price}</p>
                <button>Agregar</button>
                </div>
            </section>
        </div>
        `

        this.shadowRoot.querySelector("button").addEventListener("click", this);
    }

}

