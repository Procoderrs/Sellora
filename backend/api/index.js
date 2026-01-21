/* 
let isDbConnected = false;
let isSeeded = false;

app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectDb();
      isDbConnected = true;

      if (!isSeeded) {
        await createAdmin();
        await seedCategories();
        isSeeded = true;
      }
    } catch (error) {
      console.error("DB init error:", error);
      return res.status(500).json({ message: "Server initialization failed" });
    }
  }
  next();
});


app.get("/", (req, res) => res.json({ message: "API running" }));

app.use("/api/authentication", authRoutes);
app.use("/api/customerDashboard", customerDashboardRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/products", publicProductsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

export default app;
  */