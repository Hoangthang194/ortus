"use client"

import { useState } from "react"
import MenuItem from "./menu-item"

const menuData = {
  skewers: {
    title: "Skewers",
    description:
      "Below are basic grilled 150g meats, seafood and mushroom, served with our special dipping sauces. (Buy 4 grilled skewers get 1 free)",
    items: [
      { name: "150g Pork", price: "55.000" },
      { name: "150g Beef", price: "65.000" },
      { name: "150g Prawn", price: "80.000" },
      { name: "150g Mushroom", price: "50.000" },
      { name: "150g Chicken", price: "45.000" },
    ],
  },
  burgers: {
    title: "Beef Burger",
    description:
      "A big burger with patty of ground beef grilled and placed between two halves of a bun. Slices of raw onion, lettuce, bacon, mayonnaise, cheese and other ingredients add flavor.",
    items: [
      { name: "Regular (120g beef)", price: "130.000" },
      { name: "Jumbo (240g beef)", price: "185.000" },
    ],
  },
  dinner: {
    title: "Dinner",
    items: [
      {
        name: "Paradise Fries",
        description: "Crispy french fries served with chili sauce and ketchup.",
        price: "85.000",
      },
      {
        name: "Paradise Aubergine",
        description: "Fried aubergine served with soy sauce and fried onions.",
        price: "85.000",
      },
      {
        name: "Paradise Fish and Chip",
        description: "Crispy breaded fish with fries and tartar sauce.",
        price: "140.000",
      },
      { name: "Crispy Prawn", description: "Fried breaded shrimp with sweet and sour sauce.", price: "140.000" },
      {
        name: "Crispy Spring Roll",
        description: "Fried spring rolls filled with beef, pork and vegetables.",
        price: "140.000",
      },
      {
        name: "Fish Sauce Chicken Wings",
        description: "Deep-fried chicken wings covered in a special fish sauce.",
        price: "160.000",
      },
      { name: "Seafood Fried Rice", description: "Fried rice with shrimp and calamari.", price: "160.000" },
      {
        name: "Seafood Fried Noodle",
        description: "Stir-fried Quang noodles with shrimp, squid, bok choy, and peanuts.",
        price: "195.000",
      },
      {
        name: "Pepper Spicy Beef",
        description: "Beef with pepper sauce served with french fries and stir-fried vegetables.",
        price: "325.000",
      },
      {
        name: "Five Spicy Beef",
        description: "Beef with five spicy sauce served with french fries and stir-fried vegetables.",
        price: "325.000",
      },
      {
        name: "French Beef w Mushroom Sauce",
        description: "Beef cooked with mushroom sauce served with french fries.",
        price: "430.000",
      },
      {
        name: "Grilled Dried Squid",
        description: "Grilled dried squid served with Hot An chili sauce.",
        price: "270.000",
      },
    ],
  },
  breakfast: {
    title: "🌴 PARADISE – BREAKFAST",
    items: [
      {
        name: "Big Breakfast",
        description:
          "A large breakfast includes: 80g sausage, toast, 150g beef steak, 100g bacon, baked beans, grilled tomatoes and fried eggs.",
        price: "215.000",
      },
    ],
  },
  lunch: {
    title: "🍝 LUNCH",
    items: [
      {
        name: "Spaghetti Bolognese",
        description:
          "Classic Italian spaghetti served with a rich Bolognese sauce made from minced beef and tomatoes, topped with Parmesan cheese.",
        price: "160.000",
      },
      {
        name: "Mushroom Pasta",
        description:
          "Spaghetti in a creamy mushroom sauce with the aromatic flavor of mushrooms and Parmesan cheese — an unforgettable taste, especially for vegetarians.",
        price: "130.000",
      },
      {
        name: "Bacon Creamy Pasta",
        description:
          "An indulgent pasta dish with cheese, rich cream, and crispy bacon. Silky pasta coated in a delicious, creamy sauce that's simply irresistible.",
        price: "195.000",
      },
      {
        name: "Basil Pesto Seafood Pasta",
        description:
          "A fresh-tasting seafood pasta tossed in a fragrant basil pesto sauce and sautéed with garlicky seafood. Simple to make but amazingly delicious thanks to the fresh homemade pesto.",
        price: "215.000",
      },
    ],
  },
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("skewers")

  const categories = Object.keys(menuData) as Array<keyof typeof menuData>

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Menu</h2>
          <p className="text-lg text-muted-foreground font-sans">
            Discover our carefully curated selection of Vietnamese specialties and international favorites
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-sans font-medium transition-colors capitalize ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
            {menuData[activeCategory as keyof typeof menuData].title}
          </h3>
          {menuData[activeCategory as keyof typeof menuData].description && (
            <p className="text-muted-foreground font-sans mb-8">
              {menuData[activeCategory as keyof typeof menuData].description}
            </p>
          )}

          <div className="grid gap-6">
            {menuData[activeCategory as keyof typeof menuData].items.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
