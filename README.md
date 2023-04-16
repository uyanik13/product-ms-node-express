# Product Micro Service with Node JS Express - TypeScript
This is a Laravel project's backend built with Node.js, TypeScript, and Express. It utilizes a scalable and maintainable microservice architecture that implements RESTful APIs with validation and rules, following best practices. The project's database can be found at `https://github.com/uyanik13/udemy-e-commerce-dashboard-backend`

## Features
>Express for building RESTful APIs

>TypeScript for static typing and improved developer experience

>Validation using Joi to ensure correct data is sent to the API

>Middleware to enforce API rules

## Installation
```
git clone https://github.com/uyanik13/Product-Microservice-node-express.git
```

```
cd Product-Microservice-node-express
npm install
npm run dev
```

The server should now be running on `http://localhost:3001`

## Usage

### Example API Endpoint
Description of the API endpoint, expected inputs, and outputs.

```
curl --location 'http://localhost:3001/api/auth/product' \
--form 'name="Ogur Test Product"' \
--form 'category_id="8"' \
--form 'content="<p>Test</p>"' \
--form 'product_variants="[
{:
\"id\": 1,
\"value\": \"Black\",
\"stock\": 50,
\"price\": 250
},:
{:
\"id\": 6,
\"value\": \"100\",
\"stock\": 250,
\"price\": 500
}:
]"' \
--form 'status="1"' \
--form 'stock="250"' \
--form 'sku="PG45HG454"' \
--form 'price="250"' \
--form 'discount_id="9"' \
--form 'size[weight_type]="Kilogram (kg)"' \
--form 'size[weight]="48"' \
--form 'size[width]="25"' \
--form 'size[height]="25"' \
--form 'size[length]="25"' \
--form 'shipping_id="1"' \
--form 'images=@"/Users/oguruyanik/Downloads/2.png"' \
--form 'images=@"/Users/oguruyanik/Downloads/IMG_1798.jpg"'
```


### Response:
```
{
    "created_at": "2023-04-16T01:24:43.666Z",
    "updated_at": "2023-04-16T01:24:43.666Z",
    "id": 101,
    "name": "Ogur Test Product",
    "category_id": "8",
    "content": "<p>Test</p>",
    "status": "1",
    "stock": "250",
    "sku": "PG45HG454",
    "price": "250",
    "discount_id": "9"
}
```

## Validation and Rules
This microservice uses Joi for request validation. Each API endpoint has a schema that defines the expected request format, including required fields, data types, and constraints. Middleware is used to enforce the rules, returning an error if the request does not match the schema.

Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.