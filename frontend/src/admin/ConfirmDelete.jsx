export default function ConfirmDelete({ categoryName, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl space-y-5">
        <h2 className="text-xl font-bold text-[#A0522D]">
          Delete Category
        </h2>

        <p className="text-[#3B2F2F]">
          Are you sure you want to delete{" "}
          <strong className="text-[#E35336]">{categoryName}</strong>?
        </p>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[#A0522D]/40
                       text-[#A0522D] hover:bg-[#A0522D]/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#E35336]
                       text-white hover:bg-[#c9442c] transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
