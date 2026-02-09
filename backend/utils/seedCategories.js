import Category from "../models/categoryModel.js";
import slugify from "slugify";

const mainCategories = [
  { name: "Cakes", subs: [
    'Lotus Three milk Cake',
    "Nuts Fusion Cake" , 
    'Pistachio Cake',
    'Pistachio Three Milk Cake',
    'Lotus Cake',
    'Belgian Malt Cake',
    'Ferrero Rocher Cake',
    'Ferrero Classic Cake',
    'Nutella Cake',
    'Red Velvet Cake',] },

  { name: "Brownie", subs: [
    'Chocolate Chunk Brownie',
     "Nutella Brownie" , 
     "Belgian Malt Brownie", 
     'Cadbury Brownie',
     'Hersheys Fudge Brownie',
     'Peanut Butter Stack Brownie'
    ] },

  { name: "Cupcakes", subs: [
    'Ferrero Rocher Cupcake',
     "Red Velvet Cupcake" , 
     "Belgian Malt Cupcake",
      "Chocolate Hazelnut Cupcake",
    "Classic Chocolate Cupcake",
      "Original Malt Cupcake",
      "Chocolate Cream Cheese Cupcake",
      "Swiss Dark Chocolate Cupcake",
      'Milk Choclate Cupcake',
      'Nutella Cupcake'
  ] },
  {name:"Coffee",subs:[
    "Espresso",
    "Espresso Double",
    "Flat White",
    "Americano",
    "Latte",
    "Capacuino",
    "Hot Chocolate"
  ]}
  

];

export const seedCategories = async () => {
  for (const cat of mainCategories) {
    let parent = await Category.findOne({ name: cat.name, parent: null });
    if (!parent) {
      parent = await Category.create({ name: cat.name, slug: slugify(cat.name, { lower: true }) });
    }
    for (const sub of cat.subs) {
      const exists = await Category.findOne({ name: sub, parent: parent._id });
      if (!exists) {
        await Category.create({ 
          name: sub, 
          slug: slugify(`${parent._id}-${sub}`, { lower: true }), 
          parent: parent._id 
        });
      }
    }
  }
  console.log("Main + subcategories seeded");
};
