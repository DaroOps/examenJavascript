export class carItem extends HTMLElement {
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
        <div class="car-item">
            <div class="car-img"><img src="https://http2.mlstatic.com/D_NQ_NP_2X_787280-MCO51843885132_102022-F.webp" alt=""></div>
            <div class="car-item-name">
                <h6>Nombre</h6>
                <p id="car-item-name">Pantalon1</p>
            </div>
            <div class="car-item-quantity">
                <h6>Cantidad</h6>
                <p id="car-item-quantity">2</p>
            </div>
            <div class="car-item-price">
                <h6>Precio</h6>
                <p id="car-item-price">$ 100</p>
            </div>
            <div class="car-item-subtotal">
                <h6>Subtotal</h6>
                <p id="car-item-subtotal"> $ 200</p>
            </div>
            <i class='bx bxs-trash'></i>
        </div>
        `

        this.shadowRoot.querySelector("i").addEventListener("click", this);
    }

}

