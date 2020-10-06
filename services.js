let services = (() => {
    const loginurl = "http://localhost:3000/userDetails"
    let servicesObj = new Object();

    servicesObj.getAll = () => {
        return fetch(loginurl)
    }

    servicesObj.postData = (data) => {
        return fetch(loginurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    return servicesObj;
})();