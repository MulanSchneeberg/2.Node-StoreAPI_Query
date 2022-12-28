const Product = require("../model/products");

const getAllTasks = async (req, res) => {
  // search
  const { name, company, featured, sort, field, numericFilters } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // i==case insensitive
  }
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // number filter
  if (numericFilters) {
    console.log(numericFilters); //price>40,rating>=4
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "==": "$eq",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters); //price-$gt-40,rating-$gte-4

    const options = ["price", "rating"];
    filters.split(",").forEach((element) => {
      const [field, operator, value] = element.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }; //await MyModel.find({  age: { $gte: 18 } })
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    await result.sort(sortList);
  } else {
    await result.sort("createdAt");
  }
  // select field
  if (field) {
    const fields = field.split(",").join(" "); // select('name occupation')
    await result.select(fields);
  }

  //pagination
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const skip = (page - 1) * limit;
  await result.limit(limit).skip(skip);
  const product = await result;
  return res.status(200).json({ nr: product.length, product });
};

module.exports = getAllTasks;
