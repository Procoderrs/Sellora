import { useEffect, useState } from "react";
import api from "../api/api";
import CategoryForm from "../components/CategoryForm";
import ConfirmDelete from "../components/ConfirmDelete";

export default function Categories() {
	const [categories, setCategories] = useState([]);
	const [parentCategories, setParentCategories] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);
	const [deletingCategory, setDeletingCategory] = useState(null);

	const fetchCategories = async () => {
		const res = await api.get("/admin/categories");
		const all = res.data.categories;
		setCategories(all.filter((c) => c.parent));
		setParentCategories(all.filter((c) => !c.parent));
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleEdit = (cat) => {
		setEditingCategory(cat);
		setShowForm(true);
	};

	const handleDelete = (cat) => {
		setDeletingCategory(cat);
	};

	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingCategory(null);
		fetchCategories();
	};

	const handleDeleteConfirmed = async () => {
		if (!deletingCategory) return;
		await api.delete(`/categories/${deletingCategory._id}`);
		setDeletingCategory(null);
		fetchCategories();
	};

	return (
		<div className="min-h-screen bg-[#F5F5DC] p-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-3xl font-bold text-[#A0522D]">
					Category Management
				</h2>
				<button
					onClick={() => setShowForm(true)}
					className="bg-[#A0522D] text-[#F5F5DC] px-5 py-2 rounded-lg shadow hover:bg-[#8B4513] transition cursor-pointer"
				>
					+ Add Category
				</button>
			</div>

			{/* CATEGORY FORM */}
			{showForm && (
				<CategoryForm
					topCategories={parentCategories}
					selected={editingCategory}
					onClose={() => {
						setShowForm(false);
						setEditingCategory(null);
					}}
					onSuccess={handleFormSuccess}
				/>
			)}

			{/* DELETE CONFIRM */}
			{deletingCategory && (
				<ConfirmDelete
					categoryName={deletingCategory.name}
					onCancel={() => setDeletingCategory(null)}
					onConfirm={handleDeleteConfirmed}
				/>
			)}

			{/* CATEGORY TABLE */}
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full divide-y divide-[#F4A460]/40">
					<thead className="bg-[#F4A460]/30">
						<tr>
							<th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
								Category
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
								Sub Category
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
								Status
							</th>
							<th className="px-6 py-4 text-center text-sm font-semibold text-[#3B2F2F]">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-[#F4A460]/20">
						{categories.map((cat) => (
							<tr key={cat._id} className="hover:bg-[#F4A460]/10 transition">
								<td className="px-6 py-4 text-[#3B2F2F]">
									{cat.parent?.name || "—"}
								</td>
								<td className="px-6 py-4 text-[#3B2F2F]">{cat.name}</td>
								<td className="px-6 py-4">
									{cat.status === "active" ? (
										<span className="inline-block px-3 py-1 text-xs font-semibold text-[#A0522D] bg-[#F4A460]/30 rounded-full">
											Active
										</span>
									) : (
										<span className="inline-block px-3 py-1 text-xs font-semibold text-[#E35336] bg-[#E35336]/20 rounded-full">
											Inactive
										</span>
									)}
								</td>
								<td className="px-6 py-4 text-center space-x-2">
									<button
										onClick={() => handleEdit(cat)}
										className="px-3 py-1 text-sm text-[#A0522D] border border-[#A0522D] rounded hover:bg-[#A0522D]/10 transition cursor-pointer"
									>
										Edit
									</button>

									<button
										onClick={() => handleDelete(cat)}
										className="px-3 py-1 text-sm text-[#E35336] border border-[#E35336] rounded hover:bg-[#E35336]/10 transition cursor-pointer"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
