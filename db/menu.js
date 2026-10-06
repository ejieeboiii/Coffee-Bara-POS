// Prices are in Philippine pesos. Keep category assignments explicit.
const groups = {
  food: [
    ['Burger', 60, '🍔'], ['Sandwich', 50, '🥪'],
    ['Cheeseburger', 75, '🍔'], ['Chicken Burger', 70, '🍔'],
    ['Double Cheeseburger', 110, '🍔'], ['Bacon Burger', 95, '🍔'],
    ['Egg Sandwich', 45, '🥪'], ['Tuna Sandwich', 65, '🥪'],
    ['Chicken Sandwich', 65, '🥪'], ['Ham and Cheese Sandwich', 60, '🥪'],
    ['Grilled Cheese', 55, '🥪'], ['Club Sandwich', 90, '🥪'],
    ['Hotdog Sandwich', 50, '🌭'], ['Chicken Wrap', 75, '🌯'],
    ['Tuna Wrap', 70, '🌯'], ['Vegetable Wrap', 60, '🌯'],
    ['Spaghetti', 75, '🍝'], ['Carbonara', 85, '🍝'],
    ['Baked Macaroni', 80, '🍝'], ['Chicken Rice Bowl', 90, '🍚'],
    ['Pork Adobo Rice Bowl', 95, '🍚'], ['Beef Tapa Rice Bowl', 110, '🍚'],
    ['Fried Chicken Meal', 100, '🍗'], ['Tocino Rice Meal', 85, '🍚'],
    ['Vegetable Fried Rice', 65, '🍚']
  ],
  drinks: [
    ['Iced Coffee', 45, '🧋'], ['Soft Drink', 35, '🥤'], ['Bottled Water', 20, '💧'],
    ['Hot Brewed Coffee', 35, '☕'], ['Americano', 45, '☕'],
    ['Iced Americano', 50, '🧊'], ['Cafe Latte', 60, '☕'],
    ['Iced Latte', 65, '🧋'], ['Cappuccino', 60, '☕'],
    ['Cafe Mocha', 70, '☕'], ['Iced Mocha', 75, '🧋'],
    ['Caramel Latte', 75, '☕'], ['Vanilla Latte', 70, '☕'],
    ['Spanish Latte', 75, '🧋'], ['Matcha Latte', 75, '🍵'],
    ['Iced Matcha Latte', 80, '🍵'], ['Hot Chocolate', 50, '☕'],
    ['Iced Chocolate', 55, '🥤'], ['Classic Milk Tea', 65, '🧋'],
    ['Wintermelon Milk Tea', 70, '🧋'], ['Lemon Iced Tea', 40, '🍋'],
    ['Lemonade', 45, '🍋'], ['Calamansi Juice', 35, '🥤'],
    ['Mango Juice', 45, '🥭'], ['Orange Juice', 45, '🍊']
  ],
  sides: [
    ['Fries', 35, '🍟'], ['Cheese Fries', 45, '🍟'],
    ['BBQ Fries', 45, '🍟'], ['Sour Cream Fries', 45, '🍟'],
    ['Loaded Fries', 65, '🍟'], ['Potato Wedges', 50, '🥔'],
    ['Hash Brown', 30, '🥔'], ['Onion Rings', 45, '🧅'],
    ['Chicken Nuggets', 55, '🍗'], ['Chicken Popcorn', 60, '🍗'],
    ['Mozzarella Sticks', 65, '🧀'], ['Garlic Bread', 30, '🥖'],
    ['Cheesy Garlic Bread', 40, '🥖'], ['Nachos', 55, '🧀'],
    ['Buttered Corn', 35, '🌽'], ['Coleslaw', 30, '🥗'],
    ['Garden Salad', 50, '🥗'], ['Macaroni Salad', 40, '🥗'],
    ['Steamed Rice', 20, '🍚'], ['Garlic Rice', 25, '🍚'],
    ['Fried Egg', 15, '🍳'], ['Banana Muffin', 35, '🧁'],
    ['Chocolate Chip Cookie', 25, '🍪'], ['Chocolate Brownie', 40, '🍫'],
    ['Cheese Cupcake', 30, '🧁']
  ]
};

module.exports = Object.entries(groups).flatMap(([category, items]) =>
  items.map(([name, price, icon]) => ({ name, price, icon, category }))
);
