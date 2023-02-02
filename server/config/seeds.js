const db = require('./connection');
const { User, Product, Category, Tag } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Formal' },
    { name: 'Business' },
    { name: 'Smart Casual' },
    { name: 'Cocktail Party' },
    { name: 'Daywear' },
    { name: 'Night Out' }
  ]);

  console.log('categories seeded');

  await Tag.deleteMany();

  const tags = await Tag.insertMany([
    { name: 'fascinator' },
    { name: 'casual' },
    { name: 'sandals' },
    { name: 'comfortable' },
    { name: 'shoes' },
    { name: 'scarf' },
    { name: 'spring racing' },
    { name: 'handbag' },
    { name: 'jewellery' },
    { name: 'purse' },
    { name: 'watch' },
    { name: 'heels' },
    { name: 'boots' },
  ]);

  console.log('tags seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Tan Sandals',
      description: 'Comrtable tan t-bar sandals with buckle.',
      category: [categories[2]._id, categories[4]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'women-s-beige-low-heel-shoes-fashion.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg'],
      size: '9',
      colour: 'brown',
      tags: [tags[1]._id, tags[2]._id, tags[4]._id],
      onLoan: false,
      owner: users[0]._id
    },
    {
      name: 'Black woven handbag',
      description: 'Small to medium black woven handbag with zip. Versatile and stylish for a variety of occassions.',
      category: [categories[2]._id, categories[3].id, categories[4]._id, categories[5]._id],
      location: 'Sydney',
      productStatus: 'friendsOnly',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      deposit: 50.00,
      size: 'universal',
      colour: 'black',
      tags: [tags[1]._id, tags[6]._id, tags[7]._id],
      onLoan: true,
      owner: users[2]._id
    },
    {
      name: 'Black Heels',
      description: 'Black pointed toe heels in size 7.',
      category: [categories[0]._id, categories[1]._id, categories[2]._id, categories[3]._id, categories[4]._id, categories[5]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'women-s-beige-low-heel-shoes-fashion.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg'],
      size: '7',
      colour: 'black',
      tags: [tags[1]._id, tags[3]._id, tags[4]._id, tags[6]._id, tags[11]._id, tags[12]._id],
      onLoan: false,
      owner: users[0]._id
    },
    {
      name: 'Silver Clutch',
      description: 'Formal silver clutch purse.',
      category: [categories[0]._id, categories[3].id, categories[5]._id],
      location: 'Brisbane',
      productStatus: 'hidden',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      deposit: 80.00,
      size: 'universal',
      colour: 'silver',
      tags: [tags[6]._id, tags[7]._id, tags[9]._id],
      onLoan: false,
      owner: users[1]._id
    },
    {
      name: 'Gold Necklace',
      description: 'Long gold chain.',
      category: [categories[0]._id, categories[1].id,categories[2].id, categories[3].id, categories[4].id, categories[5]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'gold',
      tags: [tags[6]._id, tags[8]._id],
      onLoan: false,
      owner: users[0]._id
    },
    {
      name: 'Silk Scarf',
      description: 'Multicoloured silk scarf in greens and blues.',
      category: [categories[1]._id, categories[2].id,categories[4].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      size: 'universal',
      colour: 'multi',
      tags: [tags[1]._id, tags[5]._id],
      owner: users[2]._id
    },
    {
      name: 'Laptop Bag',
      description: 'Black and white check workbag. Suits 15inch Mac book with zip.',
      category: [categories[1]._id],
      location: 'Sydney',
      productStatus: 'public',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      size: 'universal',
      colour: 'multi',
      tags: [tags[7]._id],
      owner: users[0]._id
    },
    {
      name: 'Cream Feather Fascinator',
      description: 'Ivory cream fascinator headband with feather details.',
      category: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      deposit: 60.00,
      size: 'universal',
      colour: 'cream',
      tags: [tags[0]._id, tags[6]._id, tags[8]._id],
      onLoan: false,
      owner: users[3]._id
    },
    {
      name: 'Red Flower Fascinator',
      description: 'Fascinator with big red flower.',
      category: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'hidden',
      image: 'mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
      gallery: ['woman-white-background-model-shoe.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'red',
      tags: [tags[0]._id, tags[6]._id, tags[8]._id],
      onLoan: false,
      owner: users[4]._id
    },
    {
      name: 'Brown knee-high boots',
      description: 'Long brown tan boots with 3 inch heel. Comfortable for full-day wear.',
      category: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: '7',
      colour: 'brown',
      tags: [tags[1]._id, tags[3]._id, tags[4]._id, tags[11]._id, tags[12]._id],
      onLoan: false,
      owner: users[3]._id
    },
    {
      name: 'Pale pink watch',
      description: 'Light pink analogue watch with gold rim.',
      category: [categories[0]._id, categories[1].id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'pink',
      tags: [tags[6]._id, tags[8]._id, tags[10]._id],
      onLoan: false,
      owner: users[3]._id
    },
    {
      name: 'Silver Mimco Purse',
      description: 'Medium sized silver sparkly Mimco purse with zip. Can comfortably fit Samsung phone and has zip pocket for cards.',
      category: [categories[0]._id, categories[3].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'silver',
      tags: [tags[6]._id, tags[7]._id, tags[9]._id],
      onLoan: false,
      owner: users[4]._id
    },
        {
      name: 'Gold Bracelet Watch',
      description: 'Delicate gold bracelet watch with filigree links. Analogue.',
      category: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Sydney',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'gold',
      tags: [tags[8]._id, tags[10]._id],
      onLoan: true,
      owner: users[2]._id
    },
    {
      name: 'Red Peep-toe Heels',
      description: 'Red satin peep-toe heels in size 8. Can be dressed up or down.',
      category: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'women-s-beige-low-heel-shoes-fashion.jpg',
      size: '8',
      colour: 'red',
      tags: [tags[2]._id, tags[3]._id, tags[4]._id, tags[6]._id, tags[11]._id],
      onLoan: false,
      owner: users[2]._id
    },
    {
      name: 'White High Heels',
      description: '4 inch white high heels in size 9.',
      category: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: '9',
      colour: 'white',
      tags: [tags[2]._id, tags[4]._id, tags[6]._id, tags[11]._id],
      owner: users[4]._id
    },
    {
      name: 'Black Ankle Boots',
      description: 'Black ankle boots with mid heel, size 10.',
      category: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: '10',
      colour: 'black',
      tags: [tags[1]._id, tags[3]._id, tags[4]._id, tags[11]._id, tags[12]._id],
      owner: users[0]._id
    },
    {
      name: 'Black Fascinator',
      description: 'Black lace fascinator with flower detailing.',
      category: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg','women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'black',
      tags: [tags[0]._id, tags[6]._id],
      owner: users[1]._id
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    username: 'userOne',
    email: 'userone@email.com',
    password: 'password12345',
    products: [products[0]._id, products[2]._id, products[4]._id, products[6]._id, products[15]._id],
    friends: [users[2]._id, users[4]._id],
    favourites: [products[1]._id, products[5]._id, products[11]._id, products[14]._id, products[16]._id],
    bookings: [
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-9-2',
            bookingStatus: 'active',
            product: products[5]._id,
            creator: users[0]._id
        },
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-4-17',
            bookingStatus: 'cancelled',
            product: products[12]._id,
            creator: users[0]._id
        },
        {
            createdDate: '2023-1-30',
            bookingDate: '2023-5-1',
            bookingStatus: 'active',
            product: products[14]._id,
            creator: users[0]._id
        }
    ]
  });

  await User.create({
    username: 'userTwo',
    email: 'userTwo@email.com',
    password: 'password12345',
    products: [products[3]._id, products[16]._id],
    friends: [users[3]._id],
    favourites: [products[0]._id, products[5]._id, products[7]._id, products[11]._id, products[15]._id],
    bookings: [
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-2-1',
            bookingStatus: 'previous',
            product: products[0]._id,
            creator: users[1]._id
        },
        {
            createdDate: '2022-12-10',
            bookingDate: '2023-4-7',
            bookingStatus: 'active',
            product: products[7]._id,
            creator: users[1]._id
        },
        {
            createdDate: '2023-2-1',
            bookingDate: '2023-4-11',
            bookingStatus: 'active',
            product: products[11]._id,
            creator: users[1]._id
        }
    ]
  });

  await User.create({
    username: 'userThree',
    email: 'userThree@email.com',
    password: 'password12345',
    products: [products[1]._id, products[5]._id, products[12]._id, products[13]._id],
    friends: [users[0]._id, users[1]._id, users[3]._id, users[4]._id],
    favourites: [products[0]._id, products[2]._id, products[6]._id, products[10]._id, products[15]._id],
    bookings: [
        {
            createdDate: '2022-12-10',
            bookingDate: '2023-2-25',
            bookingStatus: 'active',
            product: products[2]._id,
            creator: users[2]._id
        },
        {
            createdDate: '2022-12-10',
            bookingDate: '2023-4-8',
            bookingStatus: 'active',
            product: products[4]._id,
            creator: users[2]._id
        },
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-1-15',
            bookingStatus: 'completed',
            product: products[10]._id,
            creator: users[2]._id
        },
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-2-16',
            bookingStatus: 'active',
            product: products[10]._id,
            creator: users[2]._id
        },
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-2-17',
            bookingStatus: 'active',
            product: products[10]._id,
            creator: users[2]._id
        }
    ]
  });

  await User.create({
    username: 'userFour',
    email: 'userFour@email.com',
    password: 'password12345',
    products: [products[7]._id, products[9]._id, products[10]._id],
    friends: [users[1]._id, users[2]._id, users[4]._id],
    favourites: [products[1]._id, products[2]._id, products[4]._id, products[6]._id, products[11]._id, products[13]._id, products[14]._id],
    bookings: [
        {
            createdDate: '2022-12-30',
            bookingDate: '2023-2-25',
            bookingStatus: 'active',
            product: products[0]._id,
            creator: users[3]._id
        },
        {
            createdDate: '2023-1-10',
            bookingDate: '2023-3-2',
            bookingStatus: 'active',
            product: products[1]._id,
            creator: users[3]._id
        },
        {
            createdDate: '2023-1-10',
            bookingDate: '2023-9-1',
            bookingStatus: 'active',
            product: products[1]._id,
            creator: users[3]._id
        },
        {
            createdDate: '2023-1-10',
            bookingDate: '2023-6-1',
            bookingStatus: 'active',
            product: products[6]._id,
            creator: users[3]._id
        },
        {
            createdDate: '2023-1-12',
            bookingDate: '2023-5-30',
            bookingStatus: 'active',
            product: products[14]._id,
            creator: users[3]._id
        }
    ]
  });

  await User.create({
    username: 'userFive',
    email: 'userFive@email.com',
    password: 'password12345',
    products: [products[8]._id, products[11]._id, products[14]._id],
    friends: [users[0]._id, users[2]._id, users[3]._id],
    favourites: [products[0]._id, products[4]._id, products[5]._id, products[9]._id, products[10]._id, products[12]._id, products[16]._id],
    bookings: [
        {
            createdDate: '2023-1-8',
            bookingDate: '2023-2-20',
            bookingStatus: 'active',
            product: products[9]._id,
            creator: users[4]._id
        },
        {
            createdDate: '2022-11-10',
            bookingDate: '2022-12-2',
            bookingStatus: 'completed',
            product: products[16]._id,
            creator: users[4]._id
        }
    ]
  });

  console.log('users seeded');

  process.exit();
});
