const url = 'https://jsonplaceholder.typicode.com/users'
const data = [];

function sendReauest(url) {
    return fetch(url).then(response => {
        return response.json()
    })
};

sendReauest(url).then(json => {
    for(let i =0; i < json.length; i++ ) {
        data.push(json[i])
    }
});

function showUsers(data) {
    document.querySelector('.frame').remove()

    const frame = document.createElement('div')
    frame.classList.add('frame')

    document.querySelector('body').appendChild(frame)

    for(let i =0; i < data.length; i++ ) {

        const users = document.createElement('div')
        const name = document.createElement('h2')
        const email = document.createElement('p')
        const phone = document.createElement('p')

        frame.appendChild(users)

        users.classList.add('users')
        name.classList.add('name')
        email.classList.add('email')
        phone.classList.add('phone')

        users.appendChild(name)
        users.appendChild(email)
        users.appendChild(phone)

        name.innerText = data[i].name
        email.innerText = data[i].email
        phone.innerText = data[i].phone
    };
};


function searchName() {
    let input = document.querySelector(".input");
    let filter = input.value.toUpperCase();
    let table = document.querySelector(".frame");
    let tr = table.querySelectorAll("div");
    let value 
    if (document.querySelector('input[name="search"]:checked').value == 'name') {
        value = '.name'
    } else if (document.querySelector('input[name="search"]:checked').value == 'email') {
        value = '.email'
    } else {
        value = '.phone'
    }
  
    for (i = 0; i < tr.length; i++) {
        td = tr[i].querySelector(value)
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().includes(filter)) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }
    }
};

function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

function sortName(data) {
    let value = document.querySelector('input[name="sort"]:checked').value;
    data.sort(byField(value))
    showUsers(data)
}
