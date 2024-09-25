// Quick and dirty endpoint testing using needle. Note: these are NOT the unit tests.
const needle = require('needle');

// // Create valid product
// needle.post(
//     'http://localhost:3000/v1/product/', 
//     {
//         name: 'another product',
//         description: 'sample description',
//         type: 'electronic',
//         quantity: 5,
//         unitPrice: 500,
//         requirements: 'none'
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// // Create invalid product
// needle.post(
//     'http://localhost:3000/v1/product/', 
//     {
//         name: 'invalid type product',
//         description: 'invalid type',
//         type: 'sometype',
//         quantity: 10,
//         unitPrice: 100,
//         requirements: 'none'
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// Get all products
needle.get(
    'http://localhost:3000/v1/product/',
    (err, res) => {
        console.log(res.body)
    }
)

// // Get 1 product 
// needle.get(
//     'http://localhost:3000/v1/product/66f41557815e8fcf05e72f94',
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// // Update product
// needle.put(
//     'http://localhost:3000/v1/product/66f41557815e8fcf05e72f95',
//     {
//         type: 'music',
//         unitPrice: 75
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// // Delete product
// needle.delete(
//     'http://localhost:3000/v1/product/66f4206b394c4b266f48fae5',
//     {},
//     (err, res) => {
//         console.log(res.body)
//     }
// )