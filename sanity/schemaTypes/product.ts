import { defineType } from 'sanity'

export const product= defineType({
  name: 'product', // Unique name for the schema
  title: 'Product', // Human-readable title
  type: 'document', // Define as a document type
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the product',
    },
    {
      name: 'imagePath',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enable image cropping and focus point selection
      },
      description: 'Upload the product image',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the product in USD',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the product',
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount percentage on the product',
      validation: (Rule:any) => Rule.min(0).max(100),
    },
    {
      name: 'isFeaturedProduct',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Mark this product as featured',
    },
    {
      name: 'stockLevel',
      title: 'Stock Level',
      type: 'number',
      description: 'Number of items in stock',
      validation: (Rule:any) => Rule.min(0),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category of the product',
    },
  ],
})
