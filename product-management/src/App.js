import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import DeleteModal from './components/DeleteModal';
import Notification from './components/Notification';

const App = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Data produk awal
    const initialProducts = [
        { id: 1, name: 'Laptop Gaming', category: 'Elektronik', price: 15000000, stock: 10 },
        { id: 2, name: 'Meja Kerja', category: 'Furniture', price: 1200000, stock: 5 },
        { id: 3, name: 'Kursi Ergonomis', category: 'Furniture', price: 800000, stock: 8 },
        { id: 4, name: 'Monitor 24"', category: 'Elektronik', price: 2500000, stock: 15 }
    ];

    // Load data dari localStorage saat komponen pertama kali di-render
    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
    }, []);

    // Simpan ke localStorage setiap kali products berubah
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Fungsi untuk menampilkan notifikasi
    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Fungsi untuk menambah produk
    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        showNotification('Produk berhasil ditambahkan', 'success');
    };

    // Fungsi untuk mengedit produk
    const editProduct = (product) => {
        const updatedProducts = products.map(p => 
            p.id === product.id ? product : p
        );
        setProducts(updatedProducts);
        showNotification('Produk berhasil diperbarui', 'success');
    };

    // Fungsi untuk menghapus produk
    const deleteProduct = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        setShowDeleteModal(false);
        showNotification('Produk berhasil dihapus', 'success');
    };

    // Fungsi untuk membuka form edit
    const openEditForm = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    // Fungsi untuk membuka modal konfirmasi hapus
    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    // Fungsi untuk menutup form
    const closeForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gray-800 text-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Tambah Produk
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                <i className="fas fa-box text-xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Produk</p>
                                <h3 className="text-2xl font-bold">{products.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                                <i className="fas fa-layer-group text-xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Kategori</p>
                                <h3 className="text-2xl font-bold">{[...new Set(products.map(p => p.category))].length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                                <i className="fas fa-cubes text-xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Stok</p>
                                <h3 className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabel Produk */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Daftar Produk</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{product.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">Rp {product.price.toLocaleString('id-ID')}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button 
                                                    onClick={() => openEditForm(product)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    <i className="fas fa-edit mr-1"></i> Edit
                                                </button>
                                                <button 
                                                    onClick={() => openDeleteModal(product)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <i className="fas fa-trash mr-1"></i> Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            Tidak ada produk. Silakan tambah produk baru.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Form Tambah/Edit Produk */}
            {showForm && (
                <ProductForm 
                    product={editingProduct}
                    onSave={editingProduct ? editProduct : addProduct}
                    onClose={closeForm}
                />
            )}

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <DeleteModal 
                    product={productToDelete}
                    onConfirm={() => deleteProduct(productToDelete.id)}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}

            {/* Notifikasi */}
            {notification.show && (
                <Notification 
                    message={notification.message}
                    type={notification.type}
                />
            )}
        </div>
    );
};

export default App;