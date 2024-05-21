import { carItem } from "./components/carItem.js";
import { productItem } from "./components/productItem.js";

customElements.define("product-item", productItem);
customElements.define("car-item", carItem)


let allProducts = []
let coats = []
let tShirts = []
let pants = []
let car = []





const view = document.getElementById("view")

const productContainer = document.getElementById("product-grid")

const buttonAll = document.getElementById("all");
const buttonCoats = document.getElementById("coats");
const buttonShirts = document.getElementById("shirts");
const buttonPants = document.getElementById("pants");
const buttonCar = document.getElementById("car");
const buttonEmpty = document.getElementById("empty-car");

const carSize = document.getElementById("cart-count");

let fetcAA = "https://file.notion.so/f/f/eaa1771c-fc19-40d4-8527-37ca1caab8fa/8f181ea0-47f7-49a5-9b85-48db35d8ec38/Documentos_DB.json?id=a21b973c-4a2b-4e71-b3f3-1b6e38a01f05&table=block&spaceId=eaa1771c-fc19-40d4-8527-37ca1caab8fa&expirationTimestamp=1710597600000&signature=H4E5-BCFxw_gtPqActAr3i5A1JJxtOMqYGc3WOIyj1I&downloadName=Documentos_DB.json"

document.addEventListener("user:data-message", (e) => {
    console.log('eventoRecibido!', e.detail);
    manageCar(e.detail.class_name, e.detail.id)
})

document.addEventListener("user:data-id", (e) => {
    console.log('eventoRecibido!', e.detail);
    removeFromCart(e.detail.id)
})


buttonAll.addEventListener("click", function (event) {
    cleanView()
    activateTabIndex(event);
    carSize.textContent = car.length
    view.textContent = "Todos los productos"
    if (!document.getElementById("product-grid")) {
        document.getElementById("car-grid").id = "product-grid"
    }
    createProduct(allProducts)
    hideElement("car-manager")
    document.getElementById("nothing") ? document.getElementById("nothing").remove() : null
});

buttonCoats.addEventListener("click", function (event) {
    cleanView()
    activateTabIndex(event);
    carSize.textContent = car.length
    view.textContent = "Abrigos"
    if (!document.getElementById("product-grid")) {
        document.getElementById("car-grid").id = "product-grid"
    }
    createProduct(coats)
    hideElement("car-manager")
    document.getElementById("nothing") ? document.getElementById("nothing").remove() : null
});

buttonShirts.addEventListener("click", function (event) {
    cleanView()
    activateTabIndex(event);
    carSize.textContent = car.length
    if (!document.getElementById("product-grid")) {
        document.getElementById("car-grid").id = "product-grid"
    }
    view.textContent = "Camisetas"
    createProduct(tShirts)
    hideElement("car-manager")
    document.getElementById("nothing") ? document.getElementById("nothing").remove() : null
});

buttonPants.addEventListener("click", function (event) {
    cleanView()
    activateTabIndex(event);
    carSize.textContent = car.length
    if (!document.getElementById("product-grid")) {
        document.getElementById("car-grid").id = "product-grid"
    }

    view.textContent = "Pantalones"
    createProduct(pants)
    hideElement("car-manager")
    document.getElementById("nothing") ? document.getElementById("nothing").remove() : null
});

buttonCar.addEventListener("click", function (event) {
    calculateTotal()
    cleanView()
    if (!document.getElementById("car-grid")) {
        document.getElementById("product-grid").id = "car-grid"
    }
    // console.log(car);
    createCartItem(car)
    carSize.textContent = car.length
    const empty = document.createElement("h3");
    empty.setAttribute("id", "nothing");
    empty.textContent = "Tu carrito esta vacio :("

    activateTabIndex(event);

    // console.log(checkEmptynes("car-grid"));

    if (checkEmptynes()) {
        showElement("car-manager")
        document.getElementById("nothing") ? document.getElementById("nothing").remove() : null
    }
    else {
        if (!document.getElementById("nothing")) {
            productContainer.appendChild(empty)
        }
        hideElement("car-manager")
    }
    view.textContent = "Carrito"

});

buttonEmpty.addEventListener("click", function () {
    car = []
    cleanView()
    carSize.textContent = car.length
    hideElement("car-manager")
    const empty = document.createElement("h3");
    empty.setAttribute("id", "nothing");
    empty.textContent = "Tu carrito esta vacio :("
    if (!document.getElementById("nothing")) {
        productContainer.appendChild(empty)
    }
    calculateTotal();
});

function createCartItem(itemDataArray) {
    const carContainer = document.getElementById('car-grid');

    itemDataArray.forEach(itemData => {
        const carItem = document.createElement('car-item');

        console.log('data iterada', itemData);
        console.log('COATS IN ARRAY', coats);
        
        // {
        //     "id": "pantalon5",
        //     "pantalonId": "pantalon5",
        //     "cantidad": 1
        // }
        carItem.id = itemData.id
        console.log('item DATA A COMPARAR', carItem);
        
        if (itemData.abrigoId !== undefined) {
            const coat = coats.find(coat => "chaqueta"+coat.id == itemData.abrigoId);
            if (coat) {
                console.log('coat!', coat);
                
                carItem.setAttribute("name",coat.nombre);
                carItem.setAttribute("img",coat.imagen);
                carItem.setAttribute("price",coat.precio);
                carItem.setAttribute("quantity", itemData.cantidad);
            }
        } else if (itemData.camisetaId !== undefined) {
            const tShirt = tShirts.find(tShirt => "camiseta"+tShirt.id == itemData.camisetaId);
            if (tShirt) {
                carItem.setAttribute("name",tShirt.nombre);
                carItem.setAttribute("img",tShirt.imagen);
                carItem.setAttribute("price",tShirt.precio);
                carItem.setAttribute("quantity", itemData.cantidad);

            }
        } else if (itemData.pantalonId !== undefined) {
            const pant = pants.find(pant => "pantalon"+pant.id == itemData.pantalonId);
            if (pant) {
                carItem.setAttribute("name",pant.nombre);
                carItem.setAttribute("img",pant.imagen);
                carItem.setAttribute("price",pant.precio);
                carItem.setAttribute("quantity", itemData.cantidad);

            }
        }
        // const carItem = document.createElement('div');
        // carItem.classList.add('car-item');
        // carItem.id = itemData.id;

        // let productName = '';
        // let productImage = '';
        // let productPrice = '';

        // if (itemData.abrigoId !== undefined) {
        //     const coat = coats.find(coat => coat.id == itemData.abrigoId);
        //     if (coat) {
        //         productName = coat.nombre;
        //         productImage = coat.imagen;
        //         productPrice = coat.precio;
        //     }
        // } else if (itemData.camisetaId !== undefined) {
        //     const tShirt = tShirts.find(tShirt => tShirt.id == itemData.camisetaId);
        //     if (tShirt) {
        //         productName = tShirt.nombre;
        //         productImage = tShirt.imagen;
        //         productPrice = tShirt.precio;
        //     }
        // } else if (itemData.pantalonId !== undefined) {
        //     const pant = pants.find(pant => pant.id == itemData.pantalonId);
        //     if (pant) {
        //         productName = pant.nombre;
        //         productImage = pant.imagen;
        //         productPrice = pant.precio;
        //     }
        // }

        // const carImg = document.createElement('div');
        // carImg.classList.add('car-img');
        // const imageElement = document.createElement('img');
        // imageElement.src = productImage;
        // carImg.appendChild(imageElement);

        // const carItemName = document.createElement('div');
        // carItemName.classList.add('car-item-name');
        // const nameTitle = document.createElement('h6');
        // nameTitle.textContent = 'Nombre';
        // const nameParagraph = document.createElement('p');
        // nameParagraph.id = 'car-item-name';
        // nameParagraph.textContent = productName;
        // carItemName.appendChild(nameTitle);
        // carItemName.appendChild(nameParagraph);

        // const carItemQuantity = document.createElement('div');
        // carItemQuantity.classList.add('car-item-quantity');
        // const quantityTitle = document.createElement('h6');
        // quantityTitle.textContent = 'Cantidad';
        // const quantityParagraph = document.createElement('p');
        // quantityParagraph.id = 'car-item-quantity';
        // quantityParagraph.textContent = itemData.cantidad;
        // carItemQuantity.appendChild(quantityTitle);
        // carItemQuantity.appendChild(quantityParagraph);

        // const carItemPrice = document.createElement('div');
        // carItemPrice.classList.add('car-item-price');
        // const priceTitle = document.createElement('h6');
        // priceTitle.textContent = 'Precio';
        // const priceParagraph = document.createElement('p');
        // priceParagraph.id = 'car-item-price';
        // priceParagraph.textContent = "$ " + productPrice;
        // carItemPrice.appendChild(priceTitle);
        // carItemPrice.appendChild(priceParagraph);

        // const carItemSubtotal = document.createElement('div');
        // carItemSubtotal.classList.add('car-item-subtotal');
        // const subtotalTitle = document.createElement('h6');
        // subtotalTitle.textContent = 'Subtotal';
        // const subtotalParagraph = document.createElement('p');
        // subtotalParagraph.id = 'car-item-subtotal';
        // subtotalParagraph.textContent = "$ " + itemData.cantidad * productPrice;
        // carItemSubtotal.appendChild(subtotalTitle);
        // carItemSubtotal.appendChild(subtotalParagraph);

        // const trashIcon = document.createElement('i');
        // trashIcon.classList.add('bx', 'bxs-trash');
        // trashIcon.id = "trash-ico"
        // trashIcon.addEventListener('click', () => {
        //     removeFromCart(itemData.id);
        // });

        // carItem.appendChild(carImg);
        // carItem.appendChild(carItemName);
        // carItem.appendChild(carItemQuantity);
        // carItem.appendChild(carItemPrice);
        // carItem.appendChild(carItemSubtotal);
        // carItem.appendChild(trashIcon);

        carContainer.appendChild(carItem);
    });
}

function createProduct(data) {
    const productsContainer = document.getElementById('product-grid');
    const fragment = document.createDocumentFragment();

    data.forEach(productData => {
        const productItem = document.createElement('product-item');

        productItem.setAttribute("name", productData.nombre)
        productItem.setAttribute("img", productData.imagen)
        productItem.setAttribute("price", productData.precio)

        if (productData.nombre.includes("Camiseta")) {
            productItem.classList.add("camiseta")
            productItem.setAttribute("id", "camiseta" + productData.id)
        }
        else if (productData.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes("pantalon")) {
            productItem.classList.add("pantalon")
            productItem.setAttribute("id", "pantalon" + productData.id)
        }
        else if (productData.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes("chaqueta")) {
            productItem.classList.add("chaqueta")
            productItem.setAttribute("id", "chaqueta" + productData.id)
        }
        // calculateTotal();
        fragment.appendChild(productItem)
    });


    // productsContainer.appendChild(fragment);
    productsContainer.appendChild(fragment)
}

async function fetchData() {
    // console.log(allProducts);
    try {
        const response = await fetch('./storage/DBjson.json');
        const data = await response.json();

        for (const category in data) {
            if (data.hasOwnProperty(category)) {
                if (category != "carrito") {
                    data[category].forEach(item => allProducts.push(item));
                }

                switch (category) {
                    case "abrigo":
                        data[category].forEach(item => coats.push(item));
                        break;
                    case "camiseta":
                        data[category].forEach(item => tShirts.push(item));
                        break;
                    case "pantalon":
                        data[category].forEach(item => pants.push(item));
                        break;
                    case "carrito":
                        // data[category].forEach(item => car.push(item));
                        break;
                    default:
                        break;
                }
            }
        }
        allProducts.reverse()
        createProduct(allProducts)
        hideElement("car-manager")
        carSize.textContent = car.length

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function activateTabIndex(event) {
    event.preventDefault();

    var listItem = event.target.closest('li');

    var listItems = document.querySelectorAll('ul > li');
    listItems.forEach(function (item) {
        item.removeAttribute('tabindex');
    });

    listItem.setAttribute('tabindex', '1');

    listItem.focus();
}

function checkEmptynes() {
    return car.length > 0 ? true : false
}

function hideElement(elementId) {
    const selected = document.getElementById(elementId);

    selected.style.display = 'none';
}

function showElement(elementId) {
    const selected = document.getElementById(elementId);

    selected.style.display = 'flex';
}

function cleanView() {
    const products = document.querySelectorAll('product-item');
    products.forEach(product => {
        product.remove();
    });

    const cars = document.querySelectorAll('car-item');
    cars.forEach(car => {
        car.remove();
    });
}


function calculateTotal() {
    let total = 0;

    car.forEach(item => {
        let itemPrice;

        if (item.abrigoId !== undefined) {
            const coat = coats.find(coat => coat.id == item.abrigoId);
            itemPrice = coat ? coat.precio : 0;
        } else if (item.camisetaId !== undefined) {
            const tShirt = tShirts.find(tShirt => tShirt.id == item.camisetaId);
            itemPrice = tShirt ? tShirt.precio : 0;
        } else if (item.pantalonId !== undefined) {
            const pant = pants.find(pant => pant.id == item.pantalonId);
            itemPrice = pant ? pant.precio : 0;
        }

        total += itemPrice * item.cantidad;
    });

    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

function removeFromCart(itemId) {
    const itemIndex = car.findIndex(item => {
        return item.id === itemId;
    });

    if (itemIndex !== -1) {
        car.splice(itemIndex, 1);
        carSize.textContent = car.length;
        calculateTotal();
        cleanView();
        createCartItem(car);
    }

    if (car.length < 1) {
        hideElement("car-manager")
        const empty = document.createElement("h3");
        empty.setAttribute("id", "nothing");
        empty.textContent = "Tu carrito esta vacio :("
        if (!document.getElementById("nothing")) {
            productContainer.appendChild(empty)
        }
    }
}

window.onload = fetchData();


function manageCar(productClass, productId) {
    calculateTotal();
    if (productClass) {
        const quantity = 1;

        const existingItem = car.find(item => {
            if (productClass === 'camiseta') {
                return item.camisetaId === productId;
            } else if (productClass === 'pantalon') {
                return item.pantalonId === productId;
            } else if (productClass === 'chaqueta') {
                return item.abrigoId === productId;
            }
            return false;
        });

        if (existingItem) {
            existingItem.cantidad += quantity;
            console.log('aumentado', existingItem);
        } else {
            const newItem = {
                id: productId,
            };

            switch (productClass) {
                case 'camiseta':
                    newItem.camisetaId = productId;
                    break;
                case 'pantalon':
                    newItem.pantalonId = productId;
                    break;
                case 'chaqueta':
                    newItem.abrigoId = productId;
                    break;
            }

            newItem.cantidad = quantity;
            car.push(newItem);
            console.log('agregado', newItem);

        }

        carSize.textContent = car.length;
    }

    console.log(car);

}