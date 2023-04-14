import mysql, { Connection } from 'mysql';

// create a connection to the database
const db: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

// connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

// create a new product
const createProduct = (product: any) => {
  db.query('INSERT INTO products SET ?', product, (err, res) => {
    if (err) throw err;
    console.log('Product created: ', product);
  });
};

// retrieve all products
const getProducts = () => {
  db.query('SELECT * FROM products', (err, rows) => {
    if (err) throw err;
    console.log('Products retrieved: ', rows);
  });
};

// retrieve a specific product by ID
const getProductById = (id: number) => {
  db.query('SELECT * FROM products WHERE id = ?', id, (err, rows) => {
    if (err) throw err;
    console.log('Product retrieved: ', rows[0]);
  });
};

// update a product by ID
const updateProduct = (id: number, product: any) => {
  db.query('UPDATE products SET ? WHERE id = ?', [product, id], (err, res) => {
    if (err) throw err;
    console.log('Product updated: ', product);
  });
};

// delete a product by ID
const deleteProduct = (id: number) => {
  db.query('DELETE FROM products WHERE id = ?', id, (err, res) => {
    if (err) throw err;
    console.log('Product deleted: ', id);
  });
};

// close the database connection
db.end((err) => {
  if (err) throw err;
  console.log('Database connection closed!');
});
