# Product photographs

These 75 local assets are AI-generated photorealistic product images made with the built-in imagegen tool. They represent the existing menu items, rather than photographs of the café's actual servings. Each filename is its product name converted to lowercase with spaces replaced by hyphens. Final images are optimized to 512 pixels on their longest edge.

## Prompt set

For each existing product except Iced Coffee, the generation prompt was:

> Use case: product-mockup. Asset type: single café POS product photograph. Primary request: a high-quality photorealistic food photograph of {product name}{optional specific subject below}. Show only that menu item in a suitable plain white plate, bowl, glass or cup. Accurate edible ingredients, realistic textures, natural proportions. Center entire product with generous margins on a clean warm off-white studio background, softly lit commercial food photography. Square frame. Product must fit a narrow portrait crop. No lettering, branding, watermark, emoji, illustration, people, collage or other dishes. This is a photograph-style product image, not a UI mockup.

The optional subject appended as `, specifically {subject}` was:

| Product | Subject |
| --- | --- |
| Soft Drink | a glass of dark cola with ice and bubbles |
| Bottled Water | a sealed clear plastic bottle of mineral water, plain unbranded label |
| Burger | classic beef burger with lettuce tomato and bun, no cheese |
| Sandwich | simple triangular ham sandwich |
| Pork Adobo Rice Bowl | Filipino soy-braised pork adobo with white rice |
| Beef Tapa Rice Bowl | Filipino beef tapa with white rice |
| Tocino Rice Meal | Filipino red glazed pork tocino with garlic rice and fried egg |
| Cheese Cupcake | Filipino golden cheese cupcake topped with grated cheddar |
| Wintermelon Milk Tea | amber milk tea with black tapioca pearls |
| Spanish Latte | iced espresso with layers of sweetened condensed milk |
| BBQ Fries | french fries dusted with red barbecue seasoning |
| Sour Cream Fries | french fries dusted with pale sour cream seasoning |
| Fries | plain golden french fries |
| Ham and Cheese Sandwich | sliced ham and cheddar sandwich |
| Chicken Popcorn | small crispy fried popcorn chicken pieces |

Iced Coffee used this prompt:

> Use case: product-mockup. Create a single photorealistic café product photograph of iced coffee: transparent glass filled with iced milky coffee, visible ice cubes and coffee/milk swirls. One product only, centered fully within frame with generous margins, plain warm off-white studio background, soft natural daylight, realistic condensation and appetizing detail. Square 512x512 or larger composition, no words, no labels, no brand, no watermark, no illustration, no emoji. Intended for a narrow vertical crop on a POS product card. Save the output image.

Matcha Latte's final image used this refined prompt to distinguish it from Iced Matcha Latte:

> Use case: product-mockup. Create a single photorealistic café product photograph of a HOT MATCHA LATTE, in a white ceramic mug on a white saucer, pale green creamy matcha with a delicate white latte-art swirl and subtle rising steam. No ice, no glass, no straw. Only the hot matcha latte. Center complete cup and saucer with generous margins on a plain warm off-white studio background, soft daylight, realistic textures. Square composition, no text, no branding, no watermark, no illustration, no emoji. Intended for a café POS thumbnail. This must be recognizably hot, distinct from iced matcha latte.
