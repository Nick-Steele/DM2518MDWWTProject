
const ENDPOINT = 'https://world.openfoodfacts.org/api/v0/product/%barcode%.json'

export default function GetItemfromBarcode(barcode){
    url = ENDPOINT.replace('%barcode%',barcode)
    return fetch(url)
    .then(data=>data.json())
    .then(x=>(
        matinfo={
        'name':x.product.product_name,
        'quantity':x.product.quantity,
        'keywords':x.product._keywords,
    })
    )
}