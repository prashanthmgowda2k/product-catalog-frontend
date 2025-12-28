import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getAllProducts } from "../api/productApi";
import { Product } from "../models/product";
import ProductCard from "../components/productCard";

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getAllProducts()
    .then((data) => {
      console.log("API RESPONSE 👉", data);
      setProducts(data.content);
    })
    .catch((error) => {
      console.error("Error fetching products", error);
    })
    .finally(() => {
      setLoading(false);
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

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductListPage;
