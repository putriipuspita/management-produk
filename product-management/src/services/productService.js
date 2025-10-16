// Simulated database using localStorage
const STORAGE_KEY = 'products';

// Function to get all products
const getAllProducts = () => {
try {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
} catch (error) {
    console.error('Error getting products:', error);
    return [];
}
};

const saveProducts = (products) => {
try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
} catch (error) {
    console.error('Error saving products:', error);
}
};

const generateId = () => {
return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createProduct = (productData) => {
const products = getAllProducts();
const newProduct = {
    id: generateId(),
    ...productData,
    createdAt: new Date().toISOString()
};
products.push(newProduct);
saveProducts(products);
return newProduct;
};

export const getProduct = (id) => {
const products = getAllProducts();
return products.find(product => product.id === id);
};

export const updateProduct = (id, productData) => {
const products = getAllProducts();
const index = products.findIndex(product => product.id === id);
if (index !== -1) {
    products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
    };
    saveProducts(products);
    return products[index];
}
return null;
};

export const deleteProduct = (id) => {
const products = getAllProducts();
const filteredProducts = products.filter(product => product.id !== id);
saveProducts(filteredProducts);
return true;
};

// Export the main getProducts function
export const getProducts = getAllProducts;