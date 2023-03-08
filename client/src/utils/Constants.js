
const isDevelopment = true

const development = {
    URL: 'http://localhost:5111'
}

const production = {
    URL: 'https://fabb-backend.onrender.com'
}


export const config = isDevelopment === true ? development : production;