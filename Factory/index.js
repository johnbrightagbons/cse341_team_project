const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

// Initialize connection I could not use the class constructor because of the async function required for smooth
async function connect() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    return client.db("ecommerce");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// CREATE Multiple Education posts
async function createMany(insertDataArray, collectionName) {
  const collection = (await connect()).collection(collectionName);
  const result = await collection.insertMany(insertDataArray);
  return result;
}

async function main() {
  const usersData = [
    {
      fullname: "Naomi Patel",
      email: "npatel@healthcare.org",
      password: "$2b$10$V9qy8M9aGdO9Jk0lZ4wRZu",
      role: "admin",
      createdAt: "2023-11-05T08:30:00.000Z",
      updatedAt: "2023-11-05T08:30:00.000Z",
    },
    {
      fullname: "Carlos Mendez",
      email: "cmendez_admin@titanium.io",
      password: "$2b$10$m3FpHx.LcWqY7sA0rSvQ7e",
      role: "admin",
      createdAt: "2023-11-05T08:35:00.000Z",
      updatedAt: "2023-11-05T08:35:00.000Z",
    },
    {
      fullname: "Sophie Martin",
      email: "sophie.martin@outlook.com",
      password: "$2b$10$kLp6VtYWzXhG5D1qNxYb8O",
      role: "client",
      createdAt: "2023-11-06T14:22:00.000Z",
      updatedAt: "2023-11-06T14:22:00.000Z",
    },
    {
      fullname: "Rajesh Kapoor",
      email: "rkapoor.tech@indiainfo.in",
      password: "$2b$10$RqW9uICeJfS7ZbHlKo1vAu",
      role: "client",
      createdAt: "2023-11-07T09:45:00.000Z",
      updatedAt: "2023-11-07T09:45:00.000Z",
    },
    {
      fullname: "Aisha Abdi",
      email: "a.abdi@mail.som",
      password: "$2b$10$sTdM4rPQcYh7vUaO0nXzKu",
      role: "client",
      createdAt: "2023-11-08T16:15:00.000Z",
      updatedAt: "2023-11-08T16:15:00.000Z",
    },
    {
      fullname: "Liam O'Connor",
      email: "liam.oconnor@student.uni.edu",
      password: "$2b$10$wZ3pKmHdFqEeH7rVvS5j0u",
      role: "client",
      createdAt: "2023-11-09T11:30:00.000Z",
      updatedAt: "2023-11-09T11:30:00.000Z",
    },
    {
      fullname: "Yuki Tanaka",
      email: "ytanaka@jpnet.co.jp",
      password: "$2b$10$uY7sA0rSvQ7em3FpHx.LcW",
      role: "client",
      createdAt: "2023-11-10T13:45:00.000Z",
      updatedAt: "2023-11-10T13:45:00.000Z",
    },
    {
      fullname: "Maria Silva",
      email: "maria.silva@mail.pt",
      password: "$2b$10$qY7sA0rSvQ7em3FpHx.LcW",
      role: "client",
      createdAt: "2023-11-11T17:00:00.000Z",
      updatedAt: "2023-11-11T17:00:00.000Z",
    },
    {
      fullname: "James Wilson",
      email: "jwilson22@yahoo.com",
      password: "$2b$10$vTdM4rPQcYh7vUaO0nXzKu",
      role: "client",
      createdAt: "2023-11-12T10:10:00.000Z",
      updatedAt: "2023-11-12T10:10:00.000Z",
    },
    {
      fullname: "Fatima Zahra",
      email: "f.zahra@proton.me",
      password: "$2b$10$wKmHdFqEeH7rVvS5j0uY7",
      role: "client",
      createdAt: "2023-11-13T08:20:00.000Z",
      updatedAt: "2023-11-13T08:20:00.000Z",
    },
    {
      fullname: "Ethan Johnson",
      email: "ethan.j@argonaut.com",
      password: "$2b$10$pKmHdFqEeH7rVvS5j0uY7",
      role: "client",
      createdAt: "2023-11-14T15:55:00.000Z",
      updatedAt: "2023-11-14T15:55:00.000Z",
    },
    {
      fullname: "Lina Garcia",
      email: "lina.garcia@icloud.com",
      password: "$2b$10$rSvQ7em3FpHx.LcWqY7sA0",
      role: "client",
      createdAt: "2023-11-15T12:05:00.000Z",
      updatedAt: "2023-11-15T12:05:00.000Z",
    },
  ];
  const productsData = [
    {
      name: "Organic Cold-Pressed Juice Trio",
      description:
        "Three-bottle set with kale-apple-ginger, beet-carrot-orange, and pineapple-mint flavors",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/trio_juice.webp?raw=true",
      price: 14.99,
      createdAt: "2023-11-01T08:00:00Z",
      updatedAt: "2023-11-01T08:00:00Z",
    },
    {
      name: "Gourmet Truffle Popcorn",
      description:
        "Air-popped popcorn with white truffle oil and parmesan dusting",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/truffle_popcorn.webp?raw=true",
      price: 4.5,
      createdAt: "2023-11-02T09:15:00Z",
      updatedAt: "2023-11-02T09:15:00Z",
    },
    {
      name: "Superfood Breakfast Granola",
      description:
        "Gluten-free oats with chia seeds, goji berries, and coconut flakes",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/granola.webp?raw=true",
      price: 8.75,
      createdAt: "2023-11-03T10:30:00Z",
      updatedAt: "2023-11-03T10:30:00Z",
    },
    {
      name: "Artisanal Hummus Trio",
      description:
        "200g each of roasted red pepper, classic tahini, and black garlic varieties",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/hummus_trio.webp?raw=true",
      price: 6.99,
      createdAt: "2023-11-04T11:45:00Z",
      updatedAt: "2023-11-04T11:45:00Z",
    },
    {
      name: "Wood-Fired Margherita Pizza",
      description:
        '12" frozen pizza with San Marzano tomato sauce and fresh mozzarella',
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/pizza.webp?raw=true",
      price: 9.99,
      createdAt: "2023-11-05T13:00:00Z",
      updatedAt: "2023-11-05T13:00:00Z",
    },
    {
      name: "Japanese Curry Sauce Mix",
      description:
        "Authentic Golden Curry roux blocks (medium hot) - makes 8 servings",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/sauce_mix.webp?raw=true",
      price: 5.25,
      createdAt: "2023-11-06T14:15:00Z",
      updatedAt: "2023-11-06T14:15:00Z",
    },
    {
      name: "Stone-Ground Almond Butter",
      description: "Unsweetened creamy almond butter with sea salt",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/almond_butter.webp?raw=true",
      price: 10.5,
      createdAt: "2023-11-07T15:30:00Z",
      updatedAt: "2023-11-07T15:30:00Z",
    },
    {
      name: "Instant Ramen Sampler Pack",
      description:
        "4 premium ramen bowls: Tonkotsu, Miso, Spicy Beef, and Vegetarian",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/instant_ramen.webp?raw=true",
      price: 15.95,
      createdAt: "2023-11-08T16:45:00Z",
      updatedAt: "2023-11-08T16:45:00Z",
    },
    {
      name: "Aged Balsamic Vinegar Set",
      description:
        "3x100ml bottles: Traditional, Fig Infused, and Orange Blossom",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/vinegar.webp?raw=true",
      price: 22.0,
      createdAt: "2023-11-09T18:00:00Z",
      updatedAt: "2023-11-09T18:00:00Z",
    },
    {
      name: "French Brie Wheel",
      description: "200g creamy brie cheese with edible rind",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/french_brie.webp?raw=true",
      price: 7.95,
      createdAt: "2023-11-10T19:15:00Z",
      updatedAt: "2023-11-10T19:15:00Z",
    },
    {
      name: "Rainbow Veggie Chips",
      description:
        "Dehydrated root vegetable mix: beet, sweet potato, parsnip, and taro",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/veggie_chips.webp?raw=true",
      price: 3.99,
      createdAt: "2023-11-11T20:30:00Z",
      updatedAt: "2023-11-11T20:30:00Z",
    },
    {
      name: "Craft Ginger Beer",
      description: "4-pack of 330ml bottles with real ginger and lime extract",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/ginger_beer.webp?raw=true",
      price: 8.5,
      createdAt: "2023-11-12T21:45:00Z",
      updatedAt: "2023-11-12T21:45:00Z",
    },
    {
      name: "Edible Cookie Dough Jar",
      description:
        "Safe-to-eat chocolate chip cookie dough (vegan option available)",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/cookie.webp?raw=true",
      price: 6.25,
      createdAt: "2023-11-13T22:00:00Z",
      updatedAt: "2023-11-13T22:00:00Z",
    },
    {
      name: "Bone Broth Variety Pack",
      description: "3 flavors: Chicken, Beef, and Mushroom (16oz each)",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/variety_pack.webp?raw=true",
      price: 12.75,
      createdAt: "2023-11-14T08:15:00Z",
      updatedAt: "2023-11-14T08:15:00Z",
    },
    {
      name: "Salted Caramel Ice Cream",
      description: "Premium dairy ice cream with ribbon of house-made caramel",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/ice_cream.webp?raw=true",
      price: 5.99,
      createdAt: "2023-11-15T09:30:00Z",
      updatedAt: "2023-11-15T09:30:00Z",
    },
    {
      name: "Trail Mix Power Pack",
      description:
        "Custom blend with dark chocolate, nuts, seeds, and dried fruit",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/trail_mix.webp?raw=true",
      price: 4.25,
      createdAt: "2023-11-16T10:45:00Z",
      updatedAt: "2023-11-16T10:45:00Z",
    },
    {
      name: "Stuffed Olive Medley",
      description: "Mixed olives filled with garlic, jalapeño, and blue cheese",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/olive.webp?raw=true",
      price: 5.75,
      createdAt: "2023-11-17T11:00:00Z",
      updatedAt: "2023-11-17T11:00:00Z",
    },
    {
      name: "Microwave Basmati Rice",
      description: "90-second ready rice with turmeric and cumin",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/rice.webp?raw=true",
      price: 2.99,
      createdAt: "2023-11-18T12:15:00Z",
      updatedAt: "2023-11-18T12:15:00Z",
    },
    {
      name: "Spinach Artichoke Dip",
      description: "Creamy frozen dip with panko topping (serves 4-6)",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/spinach.webp?raw=true",
      price: 7.5,
      createdAt: "2023-11-19T13:30:00Z",
      updatedAt: "2023-11-19T13:30:00Z",
    },
    {
      name: "Blueberry Lemon Muffins",
      description: "4-pack of bakery-style muffins with streusel topping",
      image:
        "https://github.com/johnbrightagbons/cse341_team_project/blob/main/assets/images/products/lemon_muffins.webp?raw=true",
      price: 6.0,
      createdAt: "2023-11-20T14:45:00Z",
      updatedAt: "2023-11-20T14:45:00Z",
    },
  ];
  const paymentsData = [
    {
      userId: "649e3c4f5b1d2c001f8e4b0a",
      amount: 29.99,
      method: "credit_card",
      status: "completed",
      createdAt: "2023-11-01T08:00:00Z",
      updatedAt: "2023-11-01T08:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0b",
      amount: 14.5,
      method: "paypal",
      status: "pending",
      createdAt: "2023-11-02T09:15:00Z",
      updatedAt: "2023-11-02T09:15:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0c",
      amount: 8.75,
      method: "credit_card",
      status: "failed",
      createdAt: "2023-11-03T10:30:00Z",
      updatedAt: "2023-11-03T10:30:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0d",
      amount: 6.99,
      method: "credit_card",
      status: "completed",
      createdAt: "2023-11-04T11:45:00Z",
      updatedAt: "2023-11-04T11:45:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0e",
      amount: 9.99,
      method: "paypal",
      status: "completed",
      createdAt: "2023-11-05T13:00:00Z",
      updatedAt: "2023-11-05T13:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0f",
      amount: 5.25,
      method: "credit_card",
      status: "pending",
      createdAt: "2023-11-06T14:15:00Z",
      updatedAt: "2023-11-06T14:15:00Z",
    },
  ];
  const ordersData = [
    {
      userId: "649e3c4f5b1d2c001f8e4b0a",
      productId: "649e3c4f5b1d2c001f8e4b0a",
      quantity: 2,
      totalPrice: 29.99,
      status: "shipped",
      createdAt: "2023-11-01T08:00:00Z",
      updatedAt: "2023-11-01T08:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0b",
      productId: "649e3c4f5b1d2c001f8e4b0b",
      quantity: 1,
      totalPrice: 14.5,
      status: "processing",
      createdAt: "2023-11-02T09:15:00Z",
      updatedAt: "2023-11-02T09:15:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0c",
      productId: "649e3c4f5b1d2c001f8e4b0c",
      quantity: 3,
      totalPrice: 26.25,
      status: "delivered",
      createdAt: "2023-11-03T10:30:00Z",
      updatedAt: "2023-11-03T10:30:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0d",
      productId: "649e3c4f5b1d2c001f8e4b0d",
      quantity: 1,
      totalPrice: 6.99,
      status: "cancelled",
      createdAt: "2023-11-04T11:45:00Z",
      updatedAt: "2023-11-04T11:45:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0e",
      productId: "649e3c4f5b1d2c001f8e4b0e",
      quantity: 2,
      totalPrice: 19.98,
      status: "returned",
      createdAt: "2023-11-05T13:00:00Z",
      updatedAt: "2023-11-05T13:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0f",
      productId: "649e3c4f5b1d2c001f8e4b0f",
      quantity: 1,
      totalPrice: 5.25,
      status: "pending",
      createdAt: "2023-11-06T14:15:00Z",
      updatedAt: "2023-11-06T14:15:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0g",
      productId: "649e3c4f5b1d2c001f8e4b0g",
      quantity: 1,
      totalPrice: 10.5,
      status: "shipped",
      createdAt: "2023-11-07T15:30:00Z",
      updatedAt: "2023-11-07T15:30:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0h",
      productId: "649e3c4f5b1d2c001f8e4b0h",
      quantity: 4,
      totalPrice: 63.8,
      status: "delivered",
      createdAt: "2023-11-08T16:45:00Z",
      updatedAt: "2023-11-08T16:45:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0i",
      productId: "649e3c4f5b1d2c001f8e4b0i",
      quantity: 1,
      totalPrice: 22.0,
      status: "processing",
      createdAt: "2023-11-09T18:00:00Z",
      updatedAt: "2023-11-09T18:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0j",
      productId: "649e3c4f5b1d2c001f8e4b0j",
      quantity: 2,
      totalPrice: 15.9,
      status: "cancelled",
      createdAt: "2023-11-10T19:15:00Z",
      updatedAt: "2023-11-10T19:15:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0k",
      productId: "649e3c4f5b1d2c001f8e4b0k",
      quantity: 1,
      totalPrice: 7.95,
      status: "returned",
      createdAt: "2023-11-11T20:30:00Z",
      updatedAt: "2023-11-11T20:30:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0l",
      productId: "649e3c4f5b1d2c001f8e4b0l",
      quantity: 3,
      totalPrice: 11.97,
      status: "shipped",
      createdAt: "2023-11-12T21:45:00Z",
      updatedAt: "2023-11-12T21:45:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0m",
      productId: "649e3c4f5b1d2c001f8e4b0m",
      quantity: 2,
      totalPrice: 12.5,
      status: "pending",
      createdAt: "2023-11-13T22:00:00Z",
      updatedAt: "2023-11-13T22:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0n",
      productId: "649e3c4f5b1d2c001f8e4b0n",
      quantity: 1,
      totalPrice: 12.75,
      status: "completed",
      createdAt: "2023-11-14T08:15:00Z",
      updatedAt: "2023-11-14T08:15:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0o",
      productId: "649e3c4f5b1d2c001f8e4b0o",
      quantity: 1,
      totalPrice: 5.99,
      status: "shipped",
      createdAt: "2023-11-15T09:30:00Z",
      updatedAt: "2023-11-15T09:30:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0p",
      productId: "649e3c4f5b1d2c001f8e4b0p",
      quantity: 1,
      totalPrice: 6.25,
      status: "delivered",
      createdAt: "2023-11-16T10:45:00Z",
      updatedAt: "2023-11-16T10:45:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0q",
      productId: "649e3c4f5b1d2c001f8e4b0q",
      quantity: 2,
      totalPrice: 25.5,
      status: "processing",
      createdAt: "2023-11-17T11:00:00Z",
      updatedAt: "2023-11-17T11:00:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0r",
      productId: "649e3c4f5b1d2c001f8e4b0r",
      quantity: 1,
      totalPrice: 2.99,
      status: "cancelled",
      createdAt: "2023-11-18T12:15:00Z",
      updatedAt: "2023-11-18T12:15:00Z",
    },
    {
      userId: "649e3c4f5b1d2c001f8e4b0s",
      productId: "649e3c4f5b1d2c001f8e4b0s",
      quantity: 1,
      totalPrice: 7.5,
      status: "returned",
      createdAt: "2023-11-19T13:30:00Z",
      updatedAt: "2023-11-19T13:30:00Z",
    },
  ];

  createMany(usersData, "users");
  console.log("Users seeded successfully!");

  createMany(productsData, "products");
  console.log("Products seeded successfully!");

  createMany(paymentsData, "payments");
  console.log("Payments seeded successfully!");

  createMany(ordersData, "orders");
  console.log("Orders seeded successfully!");

  // Close the connection
  const db = await connect();
  await db.client.close();
  console.log("Database connection closed.");
}
main();
