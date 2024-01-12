import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { CheckCircleOutline as CheckCircleOutlineIcon } from "@mui/icons-material";
import { suggestIngredientPreparation } from "../../services/IngredientPreparation/suggestIngredientPreparation";

const menuItems = [
  {
    id: 1,
    name: "Chicken Burger",
    ingredients: ["Chicken", "Bun", "Lettuce", "Tomato", "Cheese", "Sauce"],
    orders: [10, 15, 12, 18, 20],
  },
  {
    id: 2,
    name: "Veggie Wrap",
    ingredients: [
      "Lettuce",
      "Tomato",
      "Cucumber",
      "Cheese",
      "Hummus",
      "Tortilla",
    ],
    orders: [5, 10, 8, 15, 12],
  },
  // Add more menu items...
];

const SuggestionDialog = ({ isOpen, onClose, suggestions }) => {
  const [iconColor, setIconColor] = useState("success");

  const handleIconColorChange = () => {
    setIconColor("warning");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ sx: { borderRadius: 8} }}>
      <DialogTitle>Ingredient Preparation Suggestions</DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <DialogContentText sx={{ padding: "16px 24px" }}>
          Based on recent orders, we suggest preparing the following ingredients in advance:
        </DialogContentText>
        <List sx={{ padding: "0 24px" }}>
          {suggestions.map((suggestion) => (
            <ListItem key={suggestion.menuItemName} sx={{ padding: "8px 0" }}>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {suggestion.menuItemName}
                  </Typography>
                }
                secondary={
                  <List sx={{ padding: 0 }}>
                    {suggestion.ingredientsToPrepare.map((ingredient) => (
                      <ListItem key={ingredient.name} sx={{ padding: "4px 0" }}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color={iconColor} />
                        </ListItemIcon>
                        <ListItemText>
                          {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ padding: "8px 24px" }}>
        <Button onClick={onClose}  sx={{
  backgroundColor: "black",
  color: "white",
}}>
          Close
        </Button>
       
      </DialogActions>
    </Dialog>
  );
};

const AI_Feedback = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleOpenDialog = () => {
    const newSuggestions = suggestIngredientPreparation(menuItems);
    setSuggestions(newSuggestions);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{color:"white",backgroundColor:"black"}}>
        Open Suggestion Dialog
      </Button>
      <SuggestionDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        suggestions={suggestions}
      />
    </div>
  );
};

export default AI_Feedback;