const api = "http://localhost:8088"

export const getAllVendors = () => {
    return fetch(`${api}/vendors`)
    .then(res => res.json())
}
export const getAllPurchases = () => {
    return fetch(`${api}/purchases`)
    .then(res => res.json())
}
export const getAllProducts = () => {
    return fetch(`${api}/products`)
    .then(res => res.json())
}
export const getAllCategories = () => {
    return fetch(`${api}/categories`)
    .then(res => res.json())
}