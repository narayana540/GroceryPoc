const login = document.getElementById('login')
const registerdiv = document.getElementById('registerdiv')
const registerdiv1 = document.getElementById('registerdiv1')
const registerbtn = document.getElementById('registerbtn')
const register = document.getElementById('register')
const loginbtn = document.getElementById('loginbtn')
const fullname = document.getElementById('fullname')
const mobile = document.getElementById('mobile')
const username = document.getElementById('username')
const password = document.getElementById('password')
const cpassword = document.getElementById('cpassword')
const errorMsg = document.getElementById('errorMsg')
const label = document.getElementById('label')

const div = document.createElement('div')
const p = document.createElement('p')

let userdata

login_display()

function register_display() {
    getAllusers()
    label.innerHTML = "Register New User"
    register.classList.remove('hide')
    registerbtn.classList.remove('hide')
    registerdiv.classList.remove('hide')
    registerdiv1.classList.remove('hide')
    login.classList.add('hide')
    loginbtn.classList.add('hide')
    cleartextfileds()
}

function login_display() {
    getAllusers()
    label.innerHTML = "Login"
    login.classList.remove('hide')
    loginbtn.classList.remove('hide')
    register.classList.add('hide')
    registerbtn.classList.add('hide')
    registerdiv.classList.add('hide')
    registerdiv1.classList.add('hide')
    cleartextfileds()
}

function cleartextfileds() {
    username.value = ''
    password.value = ''
    cpassword.value = ''
    fullname.value = ''
    mobile.value = ''
}
async function getAllusers() {
    await services.getAll()
        .then(res => {
            res.json().then(data => {
                userdata = data
            })
        })
        .catch(function (err) {
            console.log('Fetch Error', err);
        });
}

function loginClick() {
    console.log(userdata);
    const uname = username.value
    const passwrd = password.value
    if (userdata.length != 0) {
        for (let i of userdata) {
            if (i.username == uname && i.password == passwrd) {
                console.log("login");
                localStorage.setItem('name', i.fullname)
                localStorage.setItem('id', i.id)
                window.location.href = "../Home/home.html"
                window.location.replace('../Home/home.html')
            } else {
                p.innerHTML = "User Name or password is wrong"
                div.classList.add('msg', 'w3-right', 'w3-animate-right')
                div.appendChild(p)
                document.body.appendChild(div)
                setTimeout(() => {
                    div.classList.add('opcty')
                }, 3000)
            }
        }
    } else {
        p.innerHTML = "Your are not Authorized user"
        div.classList.add('msg', 'w3-right', 'w3-animate-right')
        div.appendChild(p)
        document.body.appendChild(div)
        setTimeout(() => {
            div.classList.add('opcty')
        }, 3000)
    }

}

async function registerClick() {

    let newuser = {
        'fullname': fullname.value,
        'moblie': mobile.value,
        'username': username.value,
        'password': password.value,
        'confirmPswd': cpassword.value,
    }
    if (newuser.password === newuser.confirmPswd) {
        let found = userdata.filter(a => a.username == newuser.username)
        if (found.length > 0) {
            p.innerHTML = "User Name already taken"
            div.classList.add('msg', 'w3-right', 'w3-animate-right')
            div.appendChild(p)
            document.body.appendChild(div)
            setTimeout(() => {
                div.classList.add('opcty')
            }, 3000)
        } else {
           await services.postData(newuser).then(res => {
                if (res.status == 404) {
                    p.innerHTML = "404 - Not Found(URL Mistake)"
                    div.classList.add('msg', 'w3-right', 'w3-animate-right')
                    div.appendChild(p)
                    document.body.appendChild(div)
                    setTimeout(() => {
                        div.classList.add('opcty')
                    }, 3000)
                } else if (res.status == 201) {
                    console.log(res, "hello");
                    cleartextfileds()
                    p.innerHTML = "User Created"
                    div.classList.add('msg', 'w3-right', 'w3-animate-right')
                    div.appendChild(p)
                    document.body.appendChild(div)
                    setTimeout(() => {
                        div.classList.add('opcty')
                    }, 3000)

                }
            }).catch(error => {
                console.log(error);
            })
        }

    } else {
        errorMsg.innerHTML = "Password Miss match"
    }

}


function change() {
    errorMsg.innerHTML = ''
}