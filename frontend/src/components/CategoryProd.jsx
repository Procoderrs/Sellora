import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { Icon } from "@iconify/react";
import { DataContext } from "../context/DataContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function CategoryProducts() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { addToCart, cart } = useContext(CartContext);
	const { products: allProducts, categories: allCategories }=useContext(DataContext);

	const [products, setProducts] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const [categoryDescription, setCategoryDescription] = useState("");
	const [heroCategories, setHeroCategories] = useState([]);
	const [sortBy, setSortBy] = useState("default");
	const [productQuantities, setProductQuantities] = useState({});

	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	useEffect(() => {
		const heroWithCounts = [
			{ name: "All", slug: "all", icon: "mdi:view-grid" },
			{ name: "Cakes", slug: "cakes", icon: "mdi:cake" },
			{ name: "Cupcakes", slug: "cupcakes", icon: "mdi:cupcake" },
			{ name: "Coffee", slug: "coffee", icon: "mdi:coffee" },
			{ name: "Brownie", slug: "brownie", icon: "mdi:cookie" },
			{ name: "Sundae", slug: "sundae", icon: "mdi:cup" },
		  { name: "Cookies", slug: "cookies", icon: "mdi:cup" },

		].map((item) => {
			if (item.slug === "all") return { ...item, count: allProducts.length };
			const parent = allCategories.find((c) => c.slug === item.slug);
			if (!parent) return { ...item, count: 0 };
			const children = allCategories.filter(
				(c) => c.parent?._id === parent._id,
			);
			const ids = [parent._id, ...children.map((c) => c._id)];
			const count = allProducts.filter((p) =>
				ids.includes(p.category?._id),
			).length;
			return { ...item, count };
		});

		setHeroCategories(heroWithCounts);
	}, [allCategories, allProducts]);
console.log(allCategories,allProducts)
	// Populate current category products
	// Populate current category products
useEffect(() => {
  if (!allProducts.length || !allCategories.length) return;

  if (slug === "all") {
    setCategoryName("All Products");
    setCategoryDescription("Browse all our freshly baked delights");
    setProducts(allProducts);
    return;
  }

  const parentCategory = allCategories.find((c) => c.slug === slug);
  if (!parentCategory) return;

  setCategoryName(parentCategory.name);
  setCategoryDescription(parentCategory.description || "");

  // ✅ Match header logic: include products directly under parent OR under any child
  const productsForCategory = allProducts.filter(
    (p) =>
      p.category?._id === parentCategory._id ||
      p.category?.parent?._id === parentCategory._id
  );

  setProducts(productsForCategory);
}, [slug, allProducts, allCategories]);
	const sortedProducts = [...products].sort((a, b) => {
		if (sortBy === "low-high") return a.price - b.price;
		if (sortBy === "high-low") return b.price - a.price;
		return 0;
	});

	const increaseQty = (id) =>
		setProductQuantities((p) => ({ ...p, [id]: (p[id] || 1) + 1 }));

	const decreaseQty = (id) =>
		setProductQuantities((p) => ({
			...p,
			[id]: Math.max((p[id] || 1) - 1, 1),
		}));

	const handleAddToCart = (product) =>
		addToCart(product, productQuantities[product._id] || 1);

	return (
		<div className="min-h-screen bg-background">
			{/* CART BADGE */}
			{/* <div
        role="status"
        aria-live="polite"
        aria-label={`Cart contains ${cartCount} items`}
        className="fixed top-5 right-5 z-50 bg-primary text-white px-5 py-2 rounded-full shadow-lg font-semibold"
      >
        Cart: {cartCount}
      </div> */}

			{/* HERO */}
			<section
				className="relative h-[420px] flex flex-col items-center justify-center text-center"
				style={{
					backgroundImage: "url('/img-cake.png')",
					backgroundSize: "cover",
				}}
			>
				<div className="absolute inset-0 bg-black/50" aria-hidden="true" />

				<h1
					role="heading"
					aria-level="1"
					className="relative font-cookie text-8xl mb-4 text-white underline px-2 rounded"
				>
					{categoryName}
				</h1>

				{categoryDescription && (
					<p className="relative max-w-2xl text-lg text-white/90 px-4">
						{categoryDescription}
					</p>
				)}

				<nav aria-label="Category navigation">
					<div className="relative mt-8 flex gap-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl">
						{heroCategories.map((cat) => (
							<button
								key={cat.slug}
								onClick={() => navigate(`/category/${cat.slug}`)}
								className={`flex flex-col items-center   transition font-cookie tracking-wide text-2xl
                  ${slug === cat.slug ? "text-yellow-300" : "hover:text-yellow-300"}
                `}
								aria-label={`${cat.name} (${cat.count} products)`}
							>
								<Icon
									icon={cat.icon}
									width="26"
									role="img"
									aria-hidden="false"
								/>
								<span className="mt-1">{cat.name}</span>
								<span className="text-lg opacity-70">({cat.count})</span>
							</button>
						))}
					</div>
				</nav>
			</section>

			{/* SORT */}
			<div className="max-w-7xl mx-auto px-6 pt-10 flex items-center  justify-end">
				<label htmlFor="sortProducts" className="sr-only">
					Sort products
				</label>
				<select
					id="sortProducts"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary"
				>
					<option value="default">Sort by</option>
					<option value="low-high">Price: Low → High</option>
					<option value="high-low">Price: High → Low</option>
				</select>
			</div>

			{/* PRODUCTS */}
			<section className="max-w-7xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
					{sortedProducts.map((prod) => {
						const qty = productQuantities[prod._id] || 1;
						return (
							<div
								key={prod._id}
								className="bg-white  shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 overflow-hidden cursor-pointer"
							>
								{/* IMAGE + CLICK TO NAVIGATE */}
								<div
									className="relative w-full h-56"
									onClick={() =>
										navigate(`/product/${prod.slug}`, {
											state: { product: prod },
										})
									}
								>
									<img
										src={prod.images?.[0] || "/placeholder.jpg"}
										alt=""
										className="w-full h-full object-cover"
									/>
									{prod.totalSold > 2 && (
										<span className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
											🔥 Top Seller
										</span>
									)}
								</div>

								{/* PRODUCT INFO */}
								<div className="p-5 flex flex-col gap-2">
									<h2 className="font-logo text-lg font-bold text-text-main line-clamp-2">
										{prod.title}
									</h2>

									<p className="text-sm font-body text-zinc-700 line-clamp-2">
										{prod.description}
									</p>

									{/* {prod.category?.parent && (
                    <span className="text-xs text-text-main/50">
                      Parent: {prod.category.parent.name}
                    </span>
                  )} */}

									<span className="text-xl font-bold text-primary mt-1">
										${prod.price}
									</span>

									{/* QUANTITY & CART */}
									<div className="flex items-center gap-3 mt-3">
										<button
											onClick={() => decreaseQty(prod._id)}
											className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
										>
											−
										</button>
										<span aria-live="polite">{qty}</span>
										<button
											onClick={() => increaseQty(prod._id)}
											className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
										>
											+
										</button>

										<button
											onClick={() => handleAddToCart(prod)}
											className="ml-auto bg-primary text-white px-4 py-2 rounded-2xl hover:bg-yellow-600 transition flex items-center gap-1"
										>
											<FaShoppingCart /> Add
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}
