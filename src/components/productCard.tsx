import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import { Product } from "../models/product";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { AppDispatch } from "../store/store";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">{product.brand}</Typography>

        <Typography sx={{ mt: 1 }}>₹ {product.price}</Typography>

        <Chip
          label={product.quantity > 0 ? "In Stock" : "Out of Stock"}
          color={product.quantity > 0 ? "success" : "error"}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          disabled={product.quantity === 0}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
