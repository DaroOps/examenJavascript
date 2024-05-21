export class carItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["name", "img", "price", "quantity"];
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
          const messageEvent = new CustomEvent("user:data-id", {
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
        const price = this.getAttribute("price") || "1500"; 
        const itemQuantity = this.getAttribute("quantity") || "2"; 


        this.shadowRoot.innerHTML =/*html*/`
        <link rel="stylesheet" href="css/style.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="car-item">
            <div class="car-img"><img src=${productImg} alt=""></div>
            <div class="car-item-name">
                <h6>Nombre</h6>
                <p id="car-item-name">${name}</p>
            </div>
            <div class="car-item-quantity">
                <h6>Cantidad</h6>
                <p id="car-item-quantity">${itemQuantity}</p>
            </div>
            <div class="car-item-price">
                <h6>Precio</h6>
                <p id="car-item-price">$ ${price}</p>
            </div>
            <div class="car-item-subtotal">
                <h6>Subtotal</h6>
                <p id="car-item-subtotal"> $ ${price*itemQuantity}</p>
            </div>
            <i id="trash-ico" class='bx bxs-trash'></i>
        </div>
        `

        this.shadowRoot.querySelector("i").addEventListener("click", this);
    }

}

