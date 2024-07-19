export const ConfirmationDialog = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-10 l:px-0">
            <div className="bg-gray-900 text-gray-400 rounded-xl shadow p-8 flex flex-col gap-4">
                <h2 className="text-2xl font-thin text-gray-300">Are you sure you want to delete this?</h2>
                <div className="flex gap-4 items-center justify-center mt-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white py-2 px-4 hover:bg-red-600 rounded-full font-thin"
                    >
                        Yes, delete it
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white py-2 px-4 hover:bg-gray-600 rounded-full font-thin"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};