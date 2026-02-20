import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
	const { cart,loading:cartLoading ,removeFromCart, updateQuantity } = useContext(CartContext);
	const { customer } = useContext(AuthContext);
	const navigate = useNavigate();

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
console.log(cart);
	const handleCheckout = () => {
		if (!customer) {
			navigate("/login", { state: { from: "/checkout/shipping" } });
		} else {
			navigate("/checkout/shipping");
		}
	};

	/* ================= EMPTY CART ================= */
	if (!cart.length) {
		return (
			<section className="min-h-screen flex items-center justify-center bg-background font-Inter">
				<div className="bg-white border rounded-2xl p-12 text-center shadow-md max-w-md">
					<h2 className="text-3xl font-playfair text-text-main mb-4">
						Your cart is empty
					</h2>
					<p className="text-gray-500 mb-8">
						Looks like you haven’t added anything yet.
					</p>
					<button
						onClick={() => navigate("/")}
						className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#8B4513] transition"
					>
						Continue Shopping
					</button>
				</div>
			</section>
		);
	}

	/* ================= CART ================= */
	return (
		<section className="px-4 sm:px-10 py-16 pb-32 bg-background min-h-screen font-Inter">
			<div className="max-w-7xl mx-auto grid lg:grid-cols-[68%_32%] gap-10">
				{/* LEFT — CART ITEMS */}
				<div className="bg-sidebar  rounded-3xl shadow-sm p-8 space-y-8">
					<h2 className="text-3xl font-playfair text-text-main border-b pb-4">
						Shopping Cart
					</h2>

					{cart.map((item) => (
						<div
							key={item._id}
							className="grid md:grid-cols-[130px_1fr_120px] gap-6 border-b pb-6"
						>
							{/* IMAGE */}
							<img
								src={item.images?.[0] || "/placeholder.jpg"}
								alt={item.title}
								className="w-full h-36 object-cover rounded-xl border bg-white"
							/>

							{/* INFO */}
							<div className="flex flex-col justify-between">
								<div>
									<h3 className="text-lg font-semibold text-text-main">
										{item.title}
									</h3>
									<p className="text-sm text-gray-500">
										${item.price} per item
									</p>
								</div>

								{/* QUANTITY */}
								<div className="flex items-center gap-4 mt-4">
									<div className="flex items-center border rounded-xl overflow-hidden bg-white">
										<button
											onClick={() =>
												item.quantity > 1 &&
												updateQuantity(item.product, item.quantity - 1)
											}
											className="px-4 py-2 hover:bg-gray-100 text-lg"
										>
											−
										</button>
										<span className="px-4 font-semibold">{item.quantity}</span>
										<button
											onClick={() =>
												updateQuantity(item.product, item.quantity + 1)
											}
											className="px-4 py-2 hover:bg-gray-100 text-lg"
										>
											+
										</button>
									</div>

									<button
										onClick={() => removeFromCart(item.product)}
										className="text-sm text-danger hover:underline"
									>
										Remove
									</button>
								</div>
							</div>

							{/* PRICE */}
							<div className="flex items-end justify-end">
								<p className="text-xl font-semibold text-primary">
									${(item.price * item.quantity).toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* RIGHT — ORDER SUMMARY */}
				<div className="bg-background rounded-3xl shadow-md p-8 h-fit sticky top-28">
					<h3 className="text-2xl font-playfair text-text-main mb-6 border-b pb-4">
						Order Summary
					</h3>

					<div className="flex justify-between mb-3 text-sm">
						<span>Subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>

					<div className="flex justify-between mb-3 text-sm">
						<span>Shipping</span>
						<span className="text-green-600 font-medium">Free</span>
					</div>

					<hr className="my-6" />

					<div className="flex justify-between text-lg font-semibold mb-8">
						<span>Total</span>
						<span className="text-primary">${subtotal.toFixed(2)}</span>
					</div>

					<button
						onClick={handleCheckout}
						className="hidden md:block w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-[#8B4513] transition"
					>
						Proceed to Checkout
					</button>
				</div>
			</div>

			{/* MOBILE CHECKOUT BAR */}
			<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
				<button
					onClick={handleCheckout}
					className="w-full bg-primary text-white py-4 rounded-xl font-semibold"
				>
					Checkout · ${subtotal.toFixed(2)}
				</button>
			</div>
		</section>
	);
}
