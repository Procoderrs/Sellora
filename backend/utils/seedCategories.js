import Category from "../models/categoryModel.js";
import slugify from "slugify";

const mainCategories = [
  { name: "Men", subs: ['Summer wear',"Winter wear" , 'foot wear','Accessories'] },
  { name: "Women", subs: ['Summer wear', "Winter wear" , "Accessories", 'foot wear'] },
  { name: "Kids", subs: ['Summer wear', "Winter wear" , "play", "foot wear"] }
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
