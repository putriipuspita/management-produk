import React from 'react';

const DeleteModal = ({ product, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                        <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                    </div>
                    <div className="mt-3 text-center">
                        <h3 className="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus produk <span className="font-semibold">"{product?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center space-x-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;