const url = "http://localhost:5000/cart/"
const name = document.getElementById('name')
const totalprice = document.getElementById('totalprice')
const cartdetails = document.getElementById('cartdetails')

let removalid = ''
let cartdata
let id


class Cart {
    constructor() {
        this.setuser()
        this.getCartdata()
    }

    async getCartdata() {
        await fetch(url)
            .then(res => {
                res.json().then(data => {
                    cartdata = data
                    let founddata = cartdata.filter(a => Number(a.userid) == id)
                    this.settingcartdata(founddata)
                    this.calculate(founddata)
                })
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    settingcartdata(data) {
        this.removeold(data)
        for (let i of data) {
            const row = document.createElement('div')
            removalid = i.id
            row.id = i.id
            row.classList.add('row', 'borderclass', 'mb-2')
            const itemname = document.createElement('p')
            const itemprice = document.createElement('p')
            const itemquantity = document.createElement('p')
            const havetopay = document.createElement('p');
            const icon = document.createElement('i')

            itemname.classList.add('col-2')
            itemprice.classList.add('col-2')
            itemquantity.classList.add('col-2')
            havetopay.classList.add('col-2')
            icon.classList.add('fa', 'fa-trash', 'col-2')
            icon.addEventListener('click', () => {
                this.deleteitem(i.id)
            }, false)

            itemname.innerHTML = i.name
            itemprice.innerHTML = i.price
            itemquantity.innerHTML = i.quantity
            havetopay.innerHTML = i.havetopay

            row.appendChild(itemname)
            row.appendChild(itemquantity)
            row.appendChild(itemprice)
            row.appendChild(havetopay)
            row.appendChild(icon)

            cartdetails.appendChild(row)
        }

    }


    setuser() {
        id = localStorage.getItem('id')
        name.innerHTML = localStorage.getItem('name')
    }

    signout() {
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        window.location.href = "../login/login.html"
    }


    async deleteitem(itemid) {
        await fetch(url + itemid, {
            method: 'DELETE'
        })
        this.removeItem(itemid)
        this.getCartdata()
        return
    }

    calculate(e) {
        let total = 0
        for (let i of e) {
            total += i.havetopay
        }
        totalprice.innerHTML = total
    }

    removeold(e) {
        if (removalid != '') {
            for (let i of e) {
                let removeitems = document.getElementById(i.id)
                removeitems.remove()
            }

        }
    }

    removeItem(e) {
        const itemremove = document.getElementById(e)
        itemremove.remove()
    }

}

let cart=new Cart()