const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // finds categories and its products
    const categoriesItems = await Category.findAll({
      include: [
        {model: Product}
      ],
    });
    res.status(200).json(categoriesItems);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // find category by id and items in it
    const categoryItems = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }],
    });

    if (!categoryItems) {
      res.status(404).json({ message: 'No category in DB with that id' });
      return;
    }

    res.status(200).json(categoryItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryItems = await Category.create(req.body);
    res.status(200).json(categoryItems);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryItems = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryItems[0]) {
      res.status(404).json({ message: 'No category in DB with that id.' });
      return;
    }
    res.status(200).json(categoryItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryItems = await Category.destroy({
      where: { id: req.params.id, }
    });
    if (!categoryItems) {
      res.status(404).json({ message: 'No category in DB with that id, so we cant delete it.' });
      return;
    }
    res.status(200).json(categoryItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
