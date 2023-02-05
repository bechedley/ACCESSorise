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

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Tan Sandals',
      description: 'Comrtable tan t-bar sandals with buckle.',
      categories: [categories[2]._id, categories[4]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/3155234/pexels-photo-3155234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/7046767/pexels-photo-7046767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/1438680/pexels-photo-1438680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: '9',
      colour: 'brown',
      tags: ["casual", "sandals", "shoes"],
      onLoan: false
    },
    {
      name: 'Black handbag',
      description: 'Small to medium black handbag with zip and front buckles. Versatile and stylish for a variety of occassions.',
      categories: [categories[2]._id, categories[3].id, categories[4]._id, categories[5]._id],
      location: 'Sydney',
      productStatus: 'friendsOnly',
      image: 'https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/1204459/pexels-photo-1204459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/1204463/pexels-photo-1204463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      deposit: 50.00,
      size: 'universal',
      colour: 'black',
      tags: ['casual', 'spring racing', 'handbag'],
      onLoan: true
    },
    {
      name: 'Black Heels',
      description: 'Black pointed toe heels in size 7.',
      categories: [categories[0]._id, categories[1]._id, categories[2]._id, categories[3]._id, categories[4]._id, categories[5]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/1539781/pexels-photo-1539781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/7701076/pexels-photo-7701076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/13722335/pexels-photo-13722335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: '7',
      colour: 'black',
      tags: ['casual', 'comfortable', 'shoes', 'spring racing', 'heels'],
      onLoan: false
    },
    {
      name: 'Silver Clutch',
      description: 'Formal silver clutch purse.',
      categories: [categories[0]._id, categories[3].id, categories[5]._id],
      location: 'Brisbane',
      productStatus: 'hidden',
      image: 'https://images.pexels.com/photos/5864581/pexels-photo-5864581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/7659916/pexels-photo-7659916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      deposit: 80.00,
      size: 'universal',
      colour: 'silver',
      tags: ['spring racing', 'handbag', 'purse'],
      onLoan: false
    },
    {
      name: 'Gold Necklace',
      description: 'Long gold chain.',
      categories: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5]._id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/59662/pexels-photo-59662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/185489/pexels-photo-185489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: 'universal',
      colour: 'gold',
      tags: ['spring racing', 'jewellery'],
      onLoan: false
    },
    {
      name: 'Silk Scarf',
      description: 'Multicoloured silk scarf in greens and blues.',
      categories: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/2120584/pexels-photo-2120584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      size: 'universal',
      colour: 'multi',
      tags: ['casual', 'scarf']
    },
    {
      name: 'Laptop Travel Bag',
      description: 'Black bag for business or travel. Suits 15inch Mac book with zip.',
      categories: [categories[1]._id],
      location: 'Sydney',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/842959/pexels-photo-842959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      size: 'universal',
      colour: 'multi',
      tags: ['handbag', 'travel']
    },
    {
      name: 'Cream Flower Fascinator',
      description: 'Ivory cream fascinator headband with flower details.',
      categories: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'https://images.pexels.com/photos/8100397/pexels-photo-8100397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/10051761/pexels-photo-10051761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      deposit: 60.00,
      size: 'universal',
      colour: 'cream',
      tags: ['fascinator', 'spring racing', 'jewellery'],
      onLoan: false
    },
    {
      name: 'Pink Flower Fascinator',
      description: 'Fascinator with big pink flowers.',
      categories: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'hidden',
      image: 'https://images.pexels.com/photos/11326349/pexels-photo-11326349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/11326351/pexels-photo-11326351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/122734/pexels-photo-122734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: 'universal',
      colour: 'pink',
      tags: ['fascinator', 'spring racing', 'jewellery'],
      onLoan: false
    },
    {
      name: 'Brown knee-high boots',
      description: 'Long brown tan boots with 3 inch heel. Comfortable for full-day wear.',
      categories: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'https://images.pexels.com/photos/1537492/pexels-photo-1537492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      size: '7',
      colour: 'brown',
      tags: ['casual', 'comfortable', 'shoes', 'heels', 'boots'],
      onLoan: false
    },
    {
      name: 'Pale pink watch',
      description: 'Light pink analogue watch with gold rim.',
      categories: [categories[0]._id, categories[1].id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'https://images.pexels.com/photos/1251085/pexels-photo-1251085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/1172851/pexels-photo-1172851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/1172848/pexels-photo-1172848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: 'universal',
      colour: 'pink',
      tags: ['spring racing', 'jewellery', 'watch'],
      onLoan: false
    },
    {
      name: 'Leather Mimco Purse',
      description: 'Medium sized leather Mimco purse with zip. Can comfortably fit Samsung phone and has zip pocket for cards.',
      categories: [categories[0]._id, categories[3].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/978663/pexels-photo-978663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/978664/pexels-photo-978664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/12747236/pexels-photo-12747236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: 'universal',
      colour: 'black',
      tags: ['spring racing', 'handbag', 'jewellery'],
      onLoan: false
    },
    {
      name: 'Gold Bracelet Watch',
      description: 'Delicate gold bracelet watch with filigree links. Analogue.',
      categories: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Sydney',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/9980380/pexels-photo-9980380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      size: 'universal',
      colour: 'gold',
      tags: ['jewellery', 'watch'],
      onLoan: true
    },
    {
      name: 'Red Peep-toe Heels',
      description: 'Red satin peep-toe heels in size 8. Can be dressed up or down.',
      categories: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/3682292/pexels-photo-3682292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/3682291/pexels-photo-3682291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/3682290/pexels-photo-3682290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: '8',
      colour: 'red',
      tags: ['sandals', 'comfortable', 'shoes', 'spring racing', 'heels'],
      onLoan: false
    },
    {
      name: 'White High Heels',
      description: '4 inch white high heels in size 9.',
      categories: [categories[0]._id, categories[1].id, categories[2].id, categories[3].id, categories[4].id, categories[5].id],
      location: 'Melbourne',
      productStatus: 'friendsOnly',
      image: 'https://images.pexels.com/photos/2085527/pexels-photo-2085527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/2085523/pexels-photo-2085523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: '9',
      colour: 'white',
      tags: ['sandals', 'shoes', 'spring racing', 'heels']
    },
    {
      name: 'Black Ankle Boots',
      description: 'Black ankle boots with mid heel, size 10.',
      categories: [categories[1]._id, categories[2].id, categories[4].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/1123985/pexels-photo-1123985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      size: '10',
      colour: 'black',
      tags: ['casual', 'comfortable', 'shoes', 'heels', 'boots']
    },
    {
      name: 'Black Fascinator',
      description: 'Black lace fascinator with flower detailing.',
      categories: [categories[0]._id, categories[3].id],
      location: 'Melbourne',
      productStatus: 'public',
      image: 'https://images.pexels.com/photos/12168803/pexels-photo-12168803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: ['https://images.pexels.com/photos/7759330/pexels-photo-7759330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      size: 'universal',
      colour: 'black',
      tags: ['fascinator', 'spring racing']
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

  const product1 = await Product.findOneAndUpdate(
    { _id: products[0]._id },
    { owner: users[0]._id,
      bookings: [bookings[3]._id, bookings[11]._id]
    }
  );

  const product2 = await Product.findOneAndUpdate(
    { _id: products[1]._id },
    { owner: users[2]._id,
      bookings: [bookings[12]._id, bookings[13]._id]
    }
  );

  const product3 = await Product.findOneAndUpdate(
    { _id: products[2]._id },
    { owner: users[0]._id,
      bookings: [bookings[6]._id]
    }
  );

  const product4 = await Product.findOneAndUpdate(
    { _id: products[3]._id },
    { owner: users[1]._id }
  );

  const product5 = await Product.findOneAndUpdate(
    { _id: products[4]._id },
    { owner: users[0]._id,
      bookings: [bookings[7]._id]
    }
  );

  const product6 = await Product.findOneAndUpdate(
    { _id: products[5]._id },
    { owner: users[2]._id,
      bookings: [bookings[0]._id]
    }
  );

  const product7 = await Product.findOneAndUpdate(
    { _id: products[6]._id },
    { owner: users[0]._id,
      bookings: [bookings[14]._id]
    }
  );

  const product8 = await Product.findOneAndUpdate(
    { _id: products[7]._id },
    { owner: users[3]._id,
      bookings: [bookings[4]._id]
    }
  );

  const product9 = await Product.findOneAndUpdate(
    { _id: products[8]._id },
    { owner: users[4]._id }
  );

  const product10 = await Product.findOneAndUpdate(
    { _id: products[9]._id },
    { owner: users[3]._id,
      bookings: [bookings[16]._id]
    }
  );

  const product11 = await Product.findOneAndUpdate(
    { _id: products[10]._id },
    { owner: users[3]._id,
      bookings: [bookings[8]._id, bookings[9]._id, bookings[10]._id]
    }
  );

  const product12 = await Product.findOneAndUpdate(
    { _id: products[11]._id },
    { owner: users[4]._id,
      bookings: [bookings[5]._id]
    }
  );

  const product13 = await Product.findOneAndUpdate(
    { _id: products[12]._id },
    { owner: users[2]._id,
      bookings: [bookings[1]._id]
    }
  );

  const product14 = await Product.findOneAndUpdate(
    { _id: products[13]._id },
    { owner: users[2]._id }
  );

  const product15 = await Product.findOneAndUpdate(
    { _id: products[14]._id },
    { owner: users[4]._id,
      bookings: [bookings[2]._id, bookings[15]._id]
    }
  );

  const product16 = await Product.findOneAndUpdate(
    { _id: products[15]._id },
    { owner: users[0]._id }
  );

  const product17 = await Product.findOneAndUpdate(
    { _id: products[16]._id },
    { owner: users[1]._id,
      bookings: [17]._id
    }
  );

  console.log('product owners and bookings seeded');

  process.exit();
});
