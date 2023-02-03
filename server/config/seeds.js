const db = require('./connection');
const { User, Product, Category, Tag, Booking } = require('../models');

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
    { tagName: 'fascinator' },
    { tagName: 'casual' },
    { tagName: 'sandals' },
    { tagName: 'comfortable' },
    { tagName: 'shoes' },
    { tagName: 'scarf' },
    { tagName: 'spring racing' },
    { tagName: 'handbag' },
    { tagName: 'jewellery' },
    { tagName: 'purse' },
    { tagName: 'watch' },
    { tagName: 'heels' },
    { tagName: 'boots' },
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
      gallery: ['woman-white-background-model-shoe.jpg', 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg'],
      size: '9',
      colour: 'brown',
      tags: [tags[1]._id, tags[2]._id, tags[4]._id],
      onLoan: false
    },
    {
      name: 'Black woven handbag',
      description: 'Small to medium black woven handbag with zip. Versatile and stylish for a variety of occassions.',
      category: [categories[2]._id, categories[3].id, categories[4]._id, categories[5]._id],
      location: 'Sydney',
      productStatus: 'friendsOnly',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      gallery: ['woman-white-background-model-shoe.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      deposit: 50.00,
      size: 'universal',
      colour: 'black',
      tags: [tags[1]._id, tags[6]._id, tags[7]._id],
      onLoan: true
    },
    {
      name: 'Black Heels',
      description: 'Black pointed toe heels in size 7.',
      category: [categories[0]._id, categories[1]._id, categories[2]._id, categories[3]._id, categories[4]._id, categories[5]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'women-s-beige-low-heel-shoes-fashion.jpg',
      gallery: ['woman-white-background-model-shoe.jpg', 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg'],
      size: '7',
      colour: 'black',
      tags: [tags[1]._id, tags[3]._id, tags[4]._id, tags[6]._id, tags[11]._id, tags[12]._id],
      onLoan: false
    },
    {
      name: 'Silver Clutch',
      description: 'Formal silver clutch purse.',
      category: [categories[0]._id, categories[3].id, categories[5]._id],
      location: 'Brisbane',
      productStatus: 'hidden',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      gallery: ['woman-white-background-model-shoe.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      deposit: 80.00,
      size: 'universal',
      colour: 'silver',
      tags: [tags[6]._id, tags[7]._id, tags[9]._id],
      onLoan: false
    },
    {
      name: 'Gold Necklace',
      description: 'Long gold chain.',
      category: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      gallery: ['woman-white-background-model-shoe.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'gold',
      tags: [tags[6]._id, tags[8]._id],
      onLoan: false
    },
    {
      name: 'Silk Scarf',
      description: 'Multicoloured silk scarf in greens and blues.',
      category: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg',
      size: 'universal',
      colour: 'multi',
      tags: [tags[1]._id, tags[5]._id]
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
      tags: [tags[7]._id]
    },
    {
      name: 'Cream Feather Fascinator',
      description: 'Ivory cream fascinator headband with feather details.',
      category: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
      gallery: ['woman-white-background-model-shoe.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      deposit: 60.00,
      size: 'universal',
      colour: 'cream',
      tags: [tags[0]._id, tags[6]._id, tags[8]._id],
      onLoan: false
    },
    {
      name: 'Red Flower Fascinator',
      description: 'Fascinator with big red flower.',
      category: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'hidden',
      image: 'mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
      gallery: ['woman-white-background-model-shoe.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'red',
      tags: [tags[0]._id, tags[6]._id, tags[8]._id],
      onLoan: false
    },
    {
      name: 'Brown knee-high boots',
      description: 'Long brown tan boots with 3 inch heel. Comfortable for full-day wear.',
      category: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: '7',
      colour: 'brown',
      tags: [tags[1]._id, tags[3]._id, tags[4]._id, tags[11]._id, tags[12]._id],
      onLoan: false
    },
    {
      name: 'Pale pink watch',
      description: 'Light pink analogue watch with gold rim.',
      category: [categories[0]._id, categories[1].id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'pink',
      tags: [tags[6]._id, tags[8]._id, tags[10]._id],
      onLoan: false
    },
    {
      name: 'Silver Mimco Purse',
      description: 'Medium sized silver sparkly Mimco purse with zip. Can comfortably fit Samsung phone and has zip pocket for cards.',
      category: [categories[0]._id, categories[3].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'silver',
      tags: [tags[6]._id, tags[7]._id, tags[9]._id],
      onLoan: false
    },
    {
      name: 'Gold Bracelet Watch',
      description: 'Delicate gold bracelet watch with filigree links. Analogue.',
      category: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Sydney',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['mohammad-metri-E-0ON3VGrBc-unsplash.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'gold',
      tags: [tags[8]._id, tags[10]._id],
      onLoan: true
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
      onLoan: false
    },
    {
      name: 'White High Heels',
      description: '4 inch white high heels in size 9.',
      category: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: '9',
      colour: 'white',
      tags: [tags[2]._id, tags[4]._id, tags[6]._id, tags[11]._id]
    },
    {
      name: 'Black Ankle Boots',
      description: 'Black ankle boots with mid heel, size 10.',
      category: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: '10',
      colour: 'black',
      tags: [tags[1]._id, tags[3]._id, tags[4]._id, tags[11]._id, tags[12]._id]
    },
    {
      name: 'Black Fascinator',
      description: 'Black lace fascinator with flower detailing.',
      category: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'woman-white-background-model-shoe.jpg',
      gallery: ['young-ballerina-closeup-legs-shoes-standing-pointe-position.jpg', 'women-s-beige-low-heel-shoes-fashion.jpg'],
      size: 'universal',
      colour: 'black',
      tags: [tags[0]._id, tags[6]._id]
    }
  ]);

  console.log('products seeded');

  await Booking.deleteMany();

  const bookings = await Booking.insertMany([
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-9-2',
      bookingStatus: 'active',
      product: products[5]._id
    },
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-4-17',
      bookingStatus: 'cancelled',
      product: products[12]._id
    },
    {
      createdDate: '2023-1-30',
      bookingDate: '2023-5-1',
      bookingStatus: 'active',
      product: products[14]._id
    },
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-2-1',
      bookingStatus: 'previous',
      product: products[0]._id
    },
    {
      createdDate: '2022-12-10',
      bookingDate: '2023-4-7',
      bookingStatus: 'active',
      product: products[7]._id
    },
    {
      createdDate: '2023-2-1',
      bookingDate: '2023-4-11',
      bookingStatus: 'active',
      product: products[11]._id
    },
    {
      createdDate: '2022-12-10',
      bookingDate: '2023-2-25',
      bookingStatus: 'active',
      product: products[2]._id
    },
    {
      createdDate: '2022-12-10',
      bookingDate: '2023-4-8',
      bookingStatus: 'active',
      product: products[4]._id
    },
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-1-15',
      bookingStatus: 'completed',
      product: products[10]._id
    },
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-2-16',
      bookingStatus: 'active',
      product: products[10]._id
    },
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-2-17',
      bookingStatus: 'active',
      product: products[10]._id
    },
    {
      createdDate: '2022-12-30',
      bookingDate: '2023-2-25',
      bookingStatus: 'active',
      product: products[0]._id
    },
    {
      createdDate: '2023-1-10',
      bookingDate: '2023-3-2',
      bookingStatus: 'active',
      product: products[1]._id
    },
    {
      createdDate: '2023-1-10',
      bookingDate: '2023-9-1',
      bookingStatus: 'active',
      product: products[1]._id
    },
    {
      createdDate: '2023-1-10',
      bookingDate: '2023-6-1',
      bookingStatus: 'active',
      product: products[6]._id
    },
    {
      createdDate: '2023-1-12',
      bookingDate: '2023-5-30',
      bookingStatus: 'active',
      product: products[14]._id
    },
    {
      createdDate: '2023-1-8',
      bookingDate: '2023-2-20',
      bookingStatus: 'active',
      product: products[9]._id
    },
    {
      createdDate: '2022-11-10',
      bookingDate: '2022-12-2',
      bookingStatus: 'completed',
      product: products[16]._id
    }
  ]);

  console.log('bookings seeded');

  await User.deleteMany();

  const users = await User.insertMany([
    {
      username: 'userOne',
      email: 'userone@email.com',
      password: 'password12345',
      products: [products[0]._id, products[2]._id, products[4]._id, products[6]._id, products[15]._id],
      favourites: [products[1]._id, products[5]._id, products[11]._id, products[14]._id, products[16]._id],
      bookings: [bookings[0]._id, bookings[1]._id, bookings[2]._id]
    },
    {
      username: 'userTwo',
      email: 'usertwo@email.com',
      password: 'password12345',
      products: [products[3]._id, products[16]._id],
      favourites: [products[0]._id, products[5]._id, products[7]._id, products[11]._id, products[15]._id],
      bookings: [bookings[3]._id, bookings[4]._id, bookings[5]._id]
    },
    {
      username: 'userThree',
      email: 'userthree@email.com',
      password: 'password12345',
      products: [products[1]._id, products[5]._id, products[12]._id, products[13]._id],
      favourites: [products[0]._id, products[2]._id, products[6]._id, products[10]._id, products[15]._id],
      bookings: [bookings[6]._id, bookings[7]._id, bookings[8]._id, bookings[9]._id, bookings[10]._id]
    },
    {
      username: 'userFour',
      email: 'userfour@email.com',
      password: 'password12345',
      products: [products[7]._id, products[9]._id, products[10]._id],
      favourites: [products[1]._id, products[2]._id, products[4]._id, products[6]._id, products[11]._id, products[13]._id, products[14]._id],
      bookings: [bookings[11]._id, bookings[12]._id, bookings[13]._id, bookings[14]._id, bookings[15]._id]
    },
    {
      username: 'userFive',
      email: 'userfive@email.com',
      password: 'password12345',
      products: [products[8]._id, products[11]._id, products[14]._id],
      favourites: [products[0]._id, products[4]._id, products[5]._id, products[9]._id, products[10]._id, products[12]._id, products[16]._id],
      bookings: [bookings[16]._id, bookings[17]._id]
    }
  ]);

  console.log('users seeded');

  const userOne = await User.findOneAndUpdate(
    { username: 'userOne' },
    { $addToSet: { friends: [users[2]._id, users[4]._id] } }
  );

  const userTwo = await User.findOneAndUpdate(
    { username: 'userTwo' },
    { $addToSet: { friends: users[3]._id } }
  );

  const userThree = await User.findOneAndUpdate(
    { username: 'userThree' },
    { $addToSet: { friends: [users[0]._id, users[1]._id, users[3]._id, users[4]._id] } }
  );

  const userFour = await User.findOneAndUpdate(
    { username: 'userFour' },
    { $addToSet: { friends: [users[1]._id, users[2]._id, users[4]._id] } }
  );

  const userFive = await User.findOneAndUpdate(
    { username: 'userFive' },
    { $addToSet: { friends: [users[0]._id, users[2]._id, users[3]._id] } }
  );

  console.log('friends seeded');

  const booking1 = await Booking.findOneAndUpdate(
    { _id: bookings[0]._id },
    { creator: users[0]._id }
  );

  const booking2 = await Booking.findOneAndUpdate(
    { _id: bookings[1]._id },
    { creator: users[0]._id }
  );

  const booking3 = await Booking.findOneAndUpdate(
    { _id: bookings[2]._id },
    { creator: users[0]._id }
  );

  const booking4 = await Booking.findOneAndUpdate(
    { _id: bookings[3]._id },
    { creator: users[1]._id }
  );

  const booking5 = await Booking.findOneAndUpdate(
    { _id: bookings[4]._id },
    { creator: users[1]._id }
  );

  const booking6 = await Booking.findOneAndUpdate(
    { _id: bookings[5]._id },
    { creator: users[1]._id }
  );

  const booking7 = await Booking.findOneAndUpdate(
    { _id: bookings[6]._id },
    { creator: users[2]._id }
  );

  const booking8 = await Booking.findOneAndUpdate(
    { _id: bookings[7]._id },
    { creator: users[2]._id }
  );

  const booking9 = await Booking.findOneAndUpdate(
    { _id: bookings[8]._id },
    { creator: users[2]._id }
  );

  const booking10 = await Booking.findOneAndUpdate(
    { _id: bookings[9]._id },
    { creator: users[2]._id }
  );

  const booking11 = await Booking.findOneAndUpdate(
    { _id: bookings[10]._id },
    { creator: users[2]._id }
  );

  const booking12 = await Booking.findOneAndUpdate(
    { _id: bookings[11]._id },
    { creator: users[3]._id }
  );

  const booking13 = await Booking.findOneAndUpdate(
    { _id: bookings[12]._id },
    { creator: users[3]._id }
  );

  const booking14 = await Booking.findOneAndUpdate(
    { _id: bookings[13]._id },
    { creator: users[3]._id }
  );

  const booking15 = await Booking.findOneAndUpdate(
    { _id: bookings[14]._id },
    { creator: users[3]._id }
  );

  const booking16 = await Booking.findOneAndUpdate(
    { _id: bookings[15]._id },
    { creator: users[3]._id }
  );

  const booking17 = await Booking.findOneAndUpdate(
    { _id: bookings[16]._id },
    { creator: users[4]._id }
  );

  const booking18 = await Booking.findOneAndUpdate(
    { _id: bookings[17]._id },
    { creator: users[4]._id }
  );

  console.log('booking creators seeded');

  process.exit();
});
