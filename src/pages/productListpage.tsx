import { useEffect, useState } from "react";
import { CircularProgress,TextField, Typography } from "@mui/material";
import { getAllProducts } from "../api/productApi";
import { Product } from "../models/product";
import ProductCard from "../components/productCard";
import Grid from "@mui/material/Grid";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "@mui/material";
import { Category } from "../models/category";
import { getAllCategories } from "../api/categoryApi";
import {FormControl,InputLabel,Select,MenuItem,} from "@mui/material";
import { CartItem } from "../models/cartItem";





  const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 6;// fixed for now
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);




  

  useEffect(() => {
  console.log("Fetching products for page =", page);

  setLoading(true);

  getAllProducts({
  name: debouncedSearchText || undefined,
  categoryId: selectedCategory || undefined,
  page,
  size: pageSize,
})
    .then((data) => {
      console.log("API returned page =", data.number);
      setProducts(data.content);
      setTotalPages(data.totalPages);
    })
    .catch((error) => {
      console.error("Error fetching products", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, [debouncedSearchText, selectedCategory, page, pageSize]);

useEffect(() => {
  setPage(0);
}, [selectedCategory]);

useEffect(() => {
  getAllCategories()
    .then((data) => {
      setCategories(data);
    })
    .catch((error) => {
      console.error("Error fetching categories", error);
    });
}, []);





  


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Available Products
      </Typography>

      <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      sx={{ mb: 3 }}
    />

      <FormControl fullWidth sx={{ mb: 3 }}>
    <InputLabel>Category</InputLabel>
    <Select
      value={selectedCategory}
      label="Category"
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <MenuItem value="">All Categories</MenuItem>
      {categories.map((cat) => (
        <MenuItem key={cat.id} value={cat.id}>
          {cat.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

      <Grid container spacing={3}>
  {products.map((product) => (
    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>

<Pagination
  count={totalPages}
  page={page + 1}
  onChange={(_, value) => {
    console.log("Pagination clicked, value =", value);
    setPage(value - 1);
  }}
  sx={{ mt: 4, display: "flex", justifyContent: "center" }}
/>

    </>
  );
};

export default ProductListPage;
