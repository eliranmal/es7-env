
// the pet store

customer(`good morning.`);
seller(`hi there!`);
customer(`uhmm, what do you have around here?`);

let inventory = [
  'cat treats',
  'turtle food',
  'dog food', 'dog food',
  'cat bed', 'cat bed', 'cat bed',
  'cat toy',
  'dog collar',
];

const products = () => {
  // TODO - figure out how to list the products in the inventory, without repeating them (that'd be awkward)
  return [...new Set(inventory)]; // <- solution
};

seller(`well, we have:
${products()}.`);
customer(`ok, i'm not gonna read this. do you have any dog treats, maybe?`);

const inInventory = (item) => {
  // TODO - check the inventory for the item, and return true/false
//   return inventory.includes(item); // <- solution 1
  return new Set(inventory).has(item); // <- solution 2
}

if (inInventory('dog treats')) {
  seller(`holy cannoli! we do!`);
  customer(`bananas!`);
} else {
  seller(`oh fudge! we just ran out..`);
  customer(`boogers.`);
}


door('knock '.repeat(2));
inspector(`hello, i'm the health inspector.`);
seller(`that's weird, you look like a detective.`);
inspector(`am not. i came to tell you about the new rules.`);
seller(`what new rules?`);
inspector(`all products must be ordered by category!`);
seller(`good heavens, i'll fix this right up!`);
seller(`...`);

// TODO - define a new inventory with a data structure better suited for grouping, and fill it with data from the old inventory

let productsByCategory; // = ?

// solution 1:
productsByCategory = new Map(Object.entries(
  inventory.reduce((accum, v) => {
    const name = v.split(' ');
    const key = name.shift();
    accum[key] = [...(accum[key] || []), name.join(' ')];
    return accum;
  }, {})
));

// solution 2:
productsByCategory = new Map();
for (let name of inventory) {
  name = name.split(/^([^\s]+)\s(.*)/);
  const category = name[1];
  let products;
  if (productsByCategory.has(category)) {
    products = productsByCategory.get(category);
  } else {
    products = [];
  }
  products.push(name[2]);
  productsByCategory.set(category, products);
}

seller(`all categorized:
${JSON.stringify(productsByCategory, null, 2)}`);


phone('ring! '.repeat(2));
seller(`hello?`);
phone(`congratulations! you're done!`);








/* helpers (not part of the exercise) */

function customer(...msg) {
  console.dir(`
 \u{1f935}`, ...msg);
}

function seller(...msg) {
  console.dir(`
 \u{1f481}`, ...msg);
}

function phone(...msg) {
  console.dir(`
 \u{1f4de}`, ...msg);
}

function inspector(...msg) {
  console.dir(`
 \u{1f575}`, ...msg);
}

function door(...msg) {
  console.dir(`
 \u{1f6aa}`, ...msg);
}
