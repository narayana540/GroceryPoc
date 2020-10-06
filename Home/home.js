const fruitsurl = "http://localhost:4000/fruits"
const vegurl = "http://localhost:4000/veggie"
const meaturl = "http://localhost:4000/meat"
const carturl = "http://localhost:5000/cart"
const fruitsList = document.getElementById('fruitsList')
const vegList = document.getElementById('vegList')
const meatList = document.getElementById('meatList')
const fruitsdiv = document.getElementById('fruitsdiv')
const vegdiv = document.getElementById('vegdiv')
const meatdiv = document.getElementById('meatdiv')
const modalbody = document.getElementById('modalbody')
const modalfooter = document.getElementById('modalfooter')
const modal = document.getElementById('exampleModalCenter')
const userName = document.getElementById('name')
const popupDiv = document.createElement('div')
const popupPara = document.createElement('p')

let removeableDiv = ''
let removeablebtn = ''
let fruitsdata
let vegdata
let meatdata
let uid

clearhistory()
setuser()
getFruitsData()
getVegData()
getmeatData()

function preventBack() {
    window.history.forward();
}

function clearhistory() {
    setTimeout("preventBack()", 0);
    window.onunload = function () { null };
}

async function getFruitsData() {
    await fetch(fruitsurl)
        .then(res => {
            res.json().then(data => {
                fruitsdata = data
                settingFruitsValues()
            })
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

async function getVegData() {
    await fetch(vegurl)
        .then(res => {
            res.json().then(data => {
                vegdata = data
                settingVegValues()
            })
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

async function getmeatData() {
    await fetch(meaturl)
        .then(res => {
            res.json().then(data => {
                meatdata = data
                settingmeatvalues()
            })
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function settingFruitsValues() {
    console.log(fruitsdata);
    for (let i of fruitsdata) {
        const li = document.createElement('li')
        li.innerHTML = i.name
        li.setAttribute('data-toggle', "modal")
        li.setAttribute("data-target", "#exampleModalCenter")
        li.addEventListener('click', () => {
            getdetails(i)
        })
        fruitsList.appendChild(li)

        const div = document.createElement('div')
        div.classList.add('listdiv')

        const img = document.createElement('IMG')
        img.setAttribute('src', i.image)
        img.classList.add('image')
        const name = document.createElement('p')
        name.innerHTML = i.name
        name.setAttribute('data-toggle', "modal")
        name.setAttribute("data-target", "#exampleModalCenter")
        name.classList.add('centerdata', 'cursor')
        name.addEventListener('click', () => {
            getdetails(i)
        })
        const price = document.createElement('p')
        price.innerHTML = "Price : " + i.price
        price.classList.add('centerdata')

        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(price)

        fruitsdiv.appendChild(div)
    }
}

function settingVegValues() {
    console.log(vegdata);
    for (let i of vegdata) {
        const li = document.createElement('li')
        li.innerHTML = i.name
        li.setAttribute('data-toggle', "modal")
        li.setAttribute("data-target", "#exampleModalCenter")
        li.addEventListener('click', () => {
            getdetails(i)
        })
        li.addEventListener('click', () => {
            getdetails(i)
        })
        vegList.appendChild(li)


        const div = document.createElement('div')
        div.classList.add('listdiv')

        const img = document.createElement('IMG')
        img.setAttribute('src', i.image)
        img.classList.add('image')
        const name = document.createElement('p')
        name.innerHTML = i.name
        name.classList.add('centerdata')
        name.setAttribute('data-toggle', "modal")
        name.setAttribute("data-target", "#exampleModalCenter")
        name.classList.add('centerdata', 'cursor')
        name.addEventListener('click', () => {
            getdetails(i)
        })
        const price = document.createElement('p')
        price.innerHTML = "Price : " + i.price
        price.classList.add('centerdata')

        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(price)

        vegdiv.appendChild(div)

    }
}

function settingmeatvalues() {
    console.log(meatdata);
    for (let i of meatdata) {
        const li = document.createElement('li')
        li.innerHTML = i.name
        li.setAttribute('data-toggle', "modal")
        li.setAttribute("data-target", "#exampleModalCenter")
        li.addEventListener('click', () => {
            getdetails(i)
        })
        meatList.appendChild(li)


        const div = document.createElement('div')
        div.classList.add('listdiv')

        let img = document.createElement('IMG')
        img.setAttribute('src', i.image)
        img.classList.add('image')
        let name = document.createElement('p')
        name.innerHTML = i.name
        name.classList.add('centerdata')
        name.setAttribute('data-toggle', "modal")
        name.setAttribute("data-target", "#exampleModalCenter")
        name.classList.add('centerdata', 'cursor')
        name.addEventListener('click', () => {
            getdetails(i)
        })
        let price = document.createElement('p')
        price.innerHTML = "Price : " + i.price
        price.classList.add('centerdata')

        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(price)

        meatdiv.appendChild(div)

    }
}


function getdetails(e) {
    removedata(removeableDiv, removeablebtn)
    const div = document.createElement('div')
    removeableDiv = "romovediv"
    removeablebtn = "romovebtn"
    div.id = removeableDiv
    const details = document.createElement('div')
    div.classList.add('row')
    const img = document.createElement('IMG')
    img.setAttribute('src', e.image)
    img.classList.add('modalimage')



    const name = document.createElement('p')
    name.innerHTML = "Product Name : " + e.name

    const price = document.createElement('p')
    price.innerHTML = "Product price : " + e.havetopay

    const quantity = document.createElement('p')
    quantity.innerHTML = "Product quantity In Kgs: "

    const value = document.createElement('p')
    value.innerHTML = " " + e.quantity + " "

    const dec = document.createElement('button')
    dec.innerHTML = "-"
    dec.classList.add('btn', 'cbtn', 'btn-sm')
    dec.addEventListener('click', () => {
        sub(e)
    })

    const inc = document.createElement('button')
    inc.innerHTML = "+"
    inc.classList.add('btn', 'cbtn', 'btn-sm')
    inc.addEventListener('click', () => {
        add(e)
    })
    const p = document.createElement('div')
    p.classList.add('row')
    p.appendChild(dec)
    p.appendChild(value)
    p.appendChild(inc)

    details.appendChild(name)
    details.appendChild(price)
    details.appendChild(quantity)
    details.appendChild(p)
    div.appendChild(img)
    div.appendChild(details)
    modalbody.appendChild(div)

    const button = document.createElement('button')
    button.id = removeablebtn
    button.innerHTML = "Add To Cart"
    button.classList.add('btn', 'cbtn')
    button.addEventListener('click', () => {
        let res = addtocart(e)
        res.then(response => {
            console.log("after add", response.status);

            if (res.status == 201) {
                popupPara.innerHTML = "Item added to cart"
                popupDiv.classList.add('msg', 'w3-right', 'w3-animate-right')
                popupDiv.appendChild(popupPara)
                modal.appendChild(popupDiv)
                setTimeout(() => {
                    popupDiv.classList.add('opcty')
                }, 3000)
            } else {
                popupPara.innerHTML = "Item Already avaialbe in cart"
                popupDiv.classList.add('msg', 'w3-right', 'w3-animate-right')
                popupDiv.appendChild(popupPara)
                modal.appendChild(popupDiv)
                setTimeout(() => {
                    popupDiv.classList.add('opcty')
                }, 3000)
            }
        })
    })

    modalfooter.appendChild(button)
}

async function addtocart(e) {
    e.userid = uid
    const response = await fetch(carturl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(e)
    });
    return response;
}

function add(e) {
    let newdata = e
    newdata.quantity++
    newdata.havetopay += newdata.price
    getdetails(newdata)
}

function sub(e) {
    if (e.quantity > 1) {
        let newdata = e
        newdata.quantity--
        newdata.havetopay -= newdata.price
        getdetails(newdata)
    }
}
function removedata(e, f) {
    if (e != '' && f != '') {
        let removediv = document.getElementById(e)
        let removedbtn = document.getElementById(f)
        removediv.remove()
        removedbtn.remove()
    }
}


function setuser() {
    userName.innerHTML = localStorage.getItem('name')
    uid = localStorage.getItem('id')
}

function signout() {
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    window.location.href = "../login/login.html"
}

