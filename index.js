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

let dbProduct = [
    new Product("SKU-01-123456", 'https://www.jakartanotebook.com/images/products/95/63/27652/124/jiangxihuitian-topi-baseball-polos-xx2-black-with-white-side-141.jpg', "Topi", "General", 24, 50000),
    new FnB("SKU-02-321456", "https://contents.file-server.net/store/51/tenant-item-image/31258850/eaff7f0f-75d4-402a-9c4b-a73285f44ae3-web.jpg", "Kopi", "FnB", 48, 25000, "2022-07-20"),
    new Product("SKU-03-135642", 'https://images.tokopedia.net/img/cache/200-square/product-1/2019/3/11/5165205/5165205_ba45a3ef-a679-495b-b2b6-6db6b4c01574_648_648.jpg', "Jacket", "General", 36, 75000)

];

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
    }

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
                <td><img src="${val.preview}"  style="width: 150px;" id="editPreview"  value="${val.preview}"></td>
                <td><input type="text" id="editProduct" value="${val.name}" ></td>
                <td id="editCategory" value='${val.category}'>${val.category}</td>
                <td><input type="number" id="editStock" value="${val.stock}" ></td>
                <td><input type="number" id="editPrice" value="${val.price}" ></td>
                <td id ='editExpDate' value='${val.expDate}'>${val.expDate ? val.expDate : " "}</td>
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
            <td><img src="${val.preview}" style="width: 150px;"></td>
            <td>${val.name}</td>
            <td>${val.category}</td>
            <td>${val.stock}</td>
            <td>Rp.${parseInt(val.price).toLocaleString('id')}</td>
            <td>${val.expDate ? val.expDate : " "}</td>
            <td id='button'>
                <button value="delete" onclick="deleteData('${val.sku}')">Delete</button>
                <button value="edit" onclick="editHandler('${val.sku}')">Edit</button>
            </td> 
            
        </tr>`
        }
        
    }).join('');
};

// Action row
const deleteData = (sku) => {
    dbProduct.forEach((data, idx) => {
        if (data.sku == sku) {
            dbProduct.splice(idx, 1)
        }
    })
    PrintData(dbProduct);
};

const editHandler = (val) => {
    PrintData(dbProduct, val)
}

const cancelHandler = () => {
    PrintData(dbProduct)
};

const saveHandler = (sku) => {
    let name = document.getElementById('editProduct').value;
    let stock = document.getElementById('editStock').value;
    let price = document.getElementById('editPrice').value;
    let product = {name, stock, price};

    dbProduct.forEach((val, idx) => {
        if (val.sku == sku) {
            product.sku = val.sku;
            product.preview = val.preview;
            product.category = val.category;
            product.expDate = val.expDate;
        }
    });

    let index = dbProduct.findIndex((val) => val.sku == sku);
    dbProduct[index] = product;

    PrintData(dbProduct);
  
    console.log(product);
};

PrintData(dbProduct)