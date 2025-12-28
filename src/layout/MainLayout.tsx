import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const cartCount = useSelector(
    (state: RootState) =>
      state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product Catalog
          </Typography>

          <Box>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>{children}</Box>
    </>
  );
};

export default MainLayout;
