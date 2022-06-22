// Input data baru dengan class
class Product {
    constructor(_sku, _preview, _name, _category, _stock, _price) {
        this.sku = _sku;
        this.preview = _preview;
        this.name = _name;
        this.category = _category;
        this.stock = _stock;
        this.price = _price
    };
};

class FnB extends Product {
    constructor(_sku, _preview, _name, _category, _stock, _price, _expDate) {
        super(_sku, _preview, _name, _category, _stock, _price);
        this.expDate = _expDate;
    }
};

class Cart extends Product {
    constructor(_sku, _preview, _name, _price, _qty) {
        super(_sku, _preview, _name, null, null, _price)
        this.qty = _qty;
        this.subTotal = _price * _qty;
    }
};

let dbProduct = [
    new Product("SKU-01-123456", 'https://www.jakartanotebook.com/images/products/95/63/27652/124/jiangxihuitian-topi-baseball-polos-xx2-black-with-white-side-141.jpg', "Topi", "General", 24, 50000),
    new FnB("SKU-02-321456", "https://contents.file-server.net/store/51/tenant-item-image/31258850/eaff7f0f-75d4-402a-9c4b-a73285f44ae3-web.jpg", "Kopi", "FnB", 48, 25000, "2022-07-20"),
    new Product("SKU-03-135642", 'https://images.tokopedia.net/img/cache/200-square/product-1/2019/3/11/5165205/5165205_ba45a3ef-a679-495b-b2b6-6db6b4c01574_648_648.jpg', "Jacket", "General", 36, 75000)

];

let dbCart = [];
let dbCheckOut = [];
let paymentDisplay = [];

let getId = dbProduct.length == 0 ? 0 : dbProduct[dbProduct.length - 1].id;

const dateHandler = (val) => {
    if (val == 'FnB') {
        document.getElementById('expDate').disabled = false;
    } else {
        document.getElementById('expDate').disabled = true
    };
};

const addProduct = () => {
    getId += 1;

    let form = document.getElementById('addProduct');
    let id = getId;
    let sku = `SKU-${getId}-${Math.round(Math.random() * 1000000)}`
    let productName = form.elements['product'].value;
    let productPreview = form.elements['preview'].value;
    let category = form.elements['category'].value;
    let stock = form.elements['stock'].value;
    let price = form.elements['price'].value;
    let expDate = form.elements['expDate'].value;

    console.log(id);

    // Push data dari form
    if (category == "General") {
        dbProduct.push(new Product(sku, productPreview, productName, category, parseInt(stock), parseInt(price)))
    } else if (category == "FnB") {
        dbProduct.push(new FnB(sku, productPreview, productName, category, parseInt(stock), parseInt(price), expDate))
    };

    // Set value ke null
    form.elements["product"].value = null;
    form.elements['preview'].value = null;
    form.elements["category"].value = '';
    form.elements['stock'].value = null;
    form.elements['price'].value = null;
    form.elements['expDate'].value = null;
    document.getElementById('expDate').disabled = true

    PrintData(dbProduct)
};

const filterProduct = () => {
    let form = document.getElementById('filteProduct');
    let sku = form.elements['sku'].value;
    let name = form.elements['product'].value;
    let price = form.elements['price'].value;
    let category = form.elements['category'].value;

    let filterObj = new Object();

    Boolean(name) == true ? filterObj.name = name :
        Boolean(sku) == true ? filterObj.sku = sku :
            Boolean(price) == true ? filterObj.price = price :
                Boolean(category) == true ? filterObj.category = category :

                    console.log(filterObj);

    let result = [];
    dbProduct.forEach((val) => {
        if (Object.keys(filterObj).length == 1) {
            if (val.name == filterObj.name) {
                result.push(val)
            } else if (val.sku == filterObj.sku) {
                result.push(val)
            } else if (val.price == filterObj.price) {
                result.push(val)
            } else if (val.category == filterObj.category) {
                result.push(val)
            }
        } else if (Object.keys(filterObj).length == 2) {
            if (val.name == filterObj.name && val.sku == filterObj.sku) {
                result.push(val)
            } else if (val.sku == filterObj.sku && val.price == filterObj.price) {
                result.push(val)
            } else if (val.price == filterObj.price && val.name == filterObj.name) {
                result.push(val)
            } else if (val.category == filterObj.category && val.name == filterObj.name) {
                result.push(val)
            } else if (val.category == filterObj.category && val.sku == filterObj.sku) {
                result.push(val)
            } else if (val.category == filterObj.category && val.price == filterObj.price) {
                result.push(val)
            }

        } else if (Object.keys(filterObj).length == 3) {
            if (val.price == filterObj.price && val.name == filterObj.name && val.sku == filterObj.sku) {
                result.push(val)
            } else if (val.price == filterObj.price && val.name == filterObj.name && val.category == filterObj.category) {
                result.push(val)
            } else if (val.name == filterObj.name && val.category == filterObj.category && val.sku == filterObj.sku) {
                result.push(val)
            } else if (val.category == filterObj.category && val.sku == filterObj.sku && val.price == filterObj.price) {
                result.push(val)
            }
        } else if (Object.keys(filterObj).length == 4) {
            if (val.price == filterObj.price && val.name == filterObj.name && val.sku == filterObj.sku && val.category == filterObj.category) {
                result.push(val)
            }

        }
    });

    PrintData(result);

    form.elements['sku'].value = null;
    form.elements['product'].value = null;
    form.elements['price'].value = null;
    form.elements['category'].value = '';

};

const PrintData = (array = dbProduct, sku) => {
    document.getElementById('data-list').innerHTML = array.map((val, idx) => {
        if (val.sku == sku) {
            return `
            <tr>
                <td>${idx + 1}</td>
                <td>${val.sku}</td>
                <td><img src="${val.preview}"  style="width: 80px;"></td>
                <td><input type="text" id="editProduct" value="${val.name}" ></td>
                <td>${val.category}</td>
                <td><input type="number" id="editStock" value="${val.stock}" ></td>
                <td><input type="number" id="editPrice" value="${val.price}" ></td>
                <td>${val.expDate ? val.expDate : " "}</td>
                <td id='${val.sku}'>
                    <button onclick="saveHandler('${val.sku}')">Save</button>
                    <button onclick="cancelHandler('${val.sku}')">Cancel</button>
                </td> 
            </tr>`
        } else {
            return `
            <tr id='${val.sku}'>
                <td>${idx + 1}</td>
                <td>${val.sku}</td>
                <td><img src="${val.preview}" style="width: 80px;"></td>
                <td>${val.name}</td>
                <td>${val.category}</td>
                <td>${val.stock}</td>
                <td>Rp. ${parseInt(val.price).toLocaleString('id')},-</td>
                <td>${val.expDate ? val.expDate : " "}</td>
                <td id='button'>
                    <button value="delete" onclick="deleteData('${val.sku}')">Delete</button>
                    <button value="edit" onclick="editHandler('${val.sku}')">Edit</button>
                    <button value="edit" id="buyHandler" onclick="buyHandler('${val.sku}')">Buy</button>
                </td> 
            </tr>`
        }

    }).join('');
};

// Action row
const deleteData = (sku) => {
    dbProduct.forEach((val, idx) => {
        if (val.sku == sku) {
            dbProduct.splice(idx, 1)
        }
    })
    PrintData(dbProduct)
};

const editHandler = (val) => {
    PrintData(dbProduct, val)
};

const cancelHandler = () => {
    PrintData(dbProduct)
};

const saveHandler = (sku) => {
    let index = dbProduct.findIndex((val) => val.sku == sku);

    let name = document.getElementById('editProduct').value;
    let stock = document.getElementById('editStock').value;
    let price = document.getElementById('editPrice').value;

    dbProduct[index].name = name;
    dbProduct[index].stock = stock;
    dbProduct[index].price = price;

    PrintData(dbProduct);
};

const buyHandler = (sku) => {

    let cartIndex = dbCart.findIndex((val) => val.sku == sku);
    let productIndex = dbProduct.findIndex((val) => val.sku == sku);

    if (cartIndex >= 0) {
        dbCart[cartIndex].qty += 1;
        dbCart[cartIndex].subTotal = dbCart[cartIndex].qty * dbCart[cartIndex].price;

        dbProduct[productIndex].stock -= 1;
    } else {

        dbCart.push(new Cart(dbProduct[productIndex].sku,
            dbProduct[productIndex].preview,
            dbProduct[productIndex].name,
            dbProduct[productIndex].price, 1));

        dbProduct[productIndex].stock -= 1;
    }
    printCart()
    PrintData(dbProduct);
};

const printCart = () => {
    document.getElementById('cart-list').innerHTML = dbCart.map(val => {
        return `<tr>
                <td>
                    <input id="${val.name}" type="checkbox" value="${val.name}">
                </td>
                <td>${val.sku}</td>
                <td><img src="${val.preview}" style="width: 80px;"></td>
                <td>${val.name}</td>
                <td>Rp.${parseInt(val.price).toLocaleString('id')},-</td>
                <td><button id='${val.sku}' onclick="decrement('${val.sku}')">-</button> ${val.qty} <button onclick="increment('${val.sku}')">+</button></td>
                <td>Rp. ${(val.price * val.qty).toLocaleString('id')},-</td>
                <td>
                    <button value="delete" onclick="deleteCart('${val.sku}')">Delete</button>
                </td>
            </tb>`
    }).join('')
};

const deleteCart = (sku) => {
    let cartIndex = dbCart.findIndex(val => val.sku == sku);
    let productIndex = dbProduct.findIndex(val => val.sku == sku);

    dbProduct[productIndex].stock += dbCart[cartIndex].qty
    dbCart.splice(cartIndex, 1)

    PrintData(dbProduct)
    printCart()
};

const decrement = (sku) => {
    let cartIndex = dbCart.findIndex(val => val.sku == sku);
    let productIndex = dbProduct.findIndex(val => val.sku == sku);

    dbCart[cartIndex].qty -= 1;
    dbProduct[productIndex].stock += 1;
    dbCart[cartIndex].qty == '0' ? dbCart.splice(cartIndex, 1) : dbCart;

    printCart();
    PrintData(dbProduct);
};

const increment = (sku) => {
    let cartIndex = dbCart.findIndex(val => val.sku == sku);
    let productIndex = dbProduct.findIndex(val => val.sku == sku);

    dbCart[cartIndex].qty += 1;
    dbProduct[productIndex].stock -= 1;
    dbProduct[productIndex].stock <= '0' ? alert(`Sorry, the item out of stock 😌`) : dbCart;

    printCart()
    PrintData(dbProduct)
};

const multipleDelete = () => {
    let confirmation = confirm('Are you sure want to delete these items?');

    if (confirmation == true) {
        let checked = [];
        dbCart.forEach(val => {
            if (document.getElementById(val.name).checked) {

                let productIndex = dbProduct.findIndex(prodVal => prodVal.sku == val.sku)
                dbProduct[productIndex].stock += val.qty;
                checked.push(val);
            }
        });

        checked.forEach(val => {
            let cartIndex = dbCart.findIndex(value => value.sku == val.sku);
            dbCart.splice(cartIndex, 1);
        });
    };

    PrintData(dbProduct)
    printCart()
};

const checkOut = () => {
    dbCart.forEach(val => {
        if (document.getElementById(val.name).checked) {
            dbCheckOut.push(val)
        };
    });

    dbCheckOut.forEach(val => {
        let cartIndex = dbCart.findIndex(data => data.sku == val.sku)
        dbCart.splice(cartIndex, 1)
    });

    printCart()
    printCheckOut();
};

const printCheckOut = () => {
    document.getElementById('output-cart').innerHTML = dbCheckOut.map(val => {
        return `
        <tr>
            <td> ${val.sku}</td>
            <td> Rp.${(val.qty * val.price).toLocaleString('id')},-</td>
        </tr>`
    }).join('');

    let payment = dbCheckOut.reduce((previous, current) => {
        let currentValue = current.price * current.qty
        return previous + currentValue;
    }, 0);

    document.getElementById("payment").innerHTML = `Rp.${payment.toLocaleString('id')},-`
    paymentDisplay.push(payment);

};

const payment = () => {
    let paymentInput = document.getElementById('paymentInput').value;
    
    paymentDisplay.forEach(val => {
        if (paymentInput > val) {
            alert(`Thank you for coming 😁 here is your changes Rp. ${paymentInput - paymentDisplay},-`);
            
            document.getElementById('summary').innerHTML = null;
            document.getElementById('output-cart').innerHTML = null;
            document.getElementById('payment').innerHTML = 'Rp. 0,-';
            paymentDisplay = [];
            dbCheckOut = [];
            
        } else if (paymentInput < val) {
            document.getElementById('summary').innerHTML = `Sorry payment failed, not enough amount of money 😌`
            paymentDisplay = paymentDisplay
        };
    });
    document.getElementById('paymentInput').value = null;
};

PrintData(dbProduct);