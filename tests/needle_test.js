// Quick and dirty endpoint testing using needle. Note: these are NOT the unit tests.
const needle = require('needle');

// // Register user
// needle.post(
//     'http://localhost:3000/auth/register',
//     {
//         username: 'admin',
//         password: 'password'
//     },
//     (err, res) => {
//         console.log(res.body)
//     }
// )

// Login user
needle.post(
    'http://localhost:3000/auth/login',
    {
        username: 'admin',
        password: 'password'
    },
    (err, res) => {
        console.log(res.body);
        let token = res.body.token;

        // // Create valid product
        // needle.post(
        //     'http://localhost:3000/v1/product/', 
        //     {
        //         name: 'some product',
        //         description: 'sample description',
        //         type: 'music',
        //         quantity: 10,
        //         unitPrice: 200,
        //         requirements: 'none'
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
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
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     },
        //     (err, res) => {
        //         console.log(res.body)
        //     }
        // )

        // Get all products
        needle.get(
            'http://localhost:3000/v1/product/',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            (err, res) => {
                console.log(res.body)
            }
        )

        // // Get 1 product 
        // needle.get(
        //     'http://localhost:3000/v1/product/66f4badcfe06d130068389a7',
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     },
        //     (err, res) => {
        //         console.log(res.body)
        //     }
        // )

        // // Update product
        // needle.put(
        //     'http://localhost:3000/v1/product/66f4badcfe06d130068389a7',
        //     {
        //         type: 'music',
        //         unitPrice: 75
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     },
        //     (err, res) => {
        //         console.log(res.body)
        //     }
        // )

        // // Delete product
        // needle.delete(
        //     'http://localhost:3000/v1/product/66f4badcfe06d130068389a7',
        //     {},
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     },
        //     (err, res) => {
        //         console.log(res.body)
        //     }
        // )
    }
)