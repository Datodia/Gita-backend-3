
const usersContainer = document.querySelector('.container')
const productsContainer = document.querySelector('.productsContainer')
const catBtn = document.querySelector('.catBtn')
const catFact = document.querySelector('.catFact')
const input = document.querySelector('input')
const form = document.querySelector('form')


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newUser = {
        fullName: form.fullName.value,
        email: form.email.value,
        age: form.age.value,
    }

    const resp = await fetch('https://664853d92bb946cf2fa03190.mockapi.io/api/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })

    if(resp.status === 201){
        alert('User Cerated successully')
        await getAllUsers()
        form.fullName.value = ''
        form.age.value = ''
        form.email.value = ''
    }
    
})

function debounce(callback, ms){
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, ms)
    }
}

catBtn.addEventListener('click', async () => {
    const resp = await fetch('https://catfact.ninja/fact')
    const data = await resp.json()

    catFact.textContent = data.fact
})

input.addEventListener('input', debounce((e) => {
    getAllProducts(`https://dummyjson.com/products/search?q=${e.target.value}`)
}, 300))

async function getAllUsers(){
    const resp = await fetch('https://664853d92bb946cf2fa03190.mockapi.io/api/users')
    const data = await resp.json()

    drawUsers(data)
}

async function deleteUser(userId){
    const resp = await fetch(`https://664853d92bb946cf2fa03190.mockapi.io/api/users/${userId}`,{
        method: "DELETE"
    })
    if(resp.status === 200){
        await getAllUsers()
    }
}

function drawUsers(users){
    usersContainer.innerHTML = ''
    users.forEach((user) => {
        const userDiv = document.createElement('div')
        const userName = document.createElement('h1')
        const userEmail = document.createElement('h2')
        const userAge = document.createElement('h1')
        const dltBtn = document.createElement('button')

        dltBtn.textContent = "Delete"

        userName.textContent = `Name: ${user.fullName}`
        userEmail.textContent = `Email: ${user.email}`
        userAge.textContent = `Age: ${user.age}`

        userDiv.appendChild(userName)
        userDiv.appendChild(userEmail)
        userDiv.appendChild(userAge)
        userDiv.appendChild(dltBtn)

        dltBtn.addEventListener('click', () => deleteUser(user.id))

        userDiv.style.border = '2px solid black'

        usersContainer.appendChild(userDiv)
    })
}

async function getAllProducts(url = 'https://dummyjson.com/products'){
    const resp = await fetch(url)
    const data = await resp.json()

    drawProducts(data.products)
}


function drawProducts(products){
    productsContainer.innerHTML = ''
    products.forEach((product) => {
        const productDiv = document.createElement('div')
        const productName = document.createElement('h1')
        const productPrice = document.createElement('h1')
        const productImg = document.createElement('img')

        productName.textContent = product.title
        productPrice.textContent = product.price
        productImg.src = product.thumbnail

        productDiv.appendChild(productImg)
        productDiv.appendChild(productName)
        productDiv.appendChild(productPrice)

        productDiv.style.border = '2px solid black'

        productsContainer.appendChild(productDiv)
    })
}


getAllUsers() // Promise.all()
getAllProducts()