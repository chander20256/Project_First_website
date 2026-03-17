export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Title',         type: 'string' },
    { name: 'slug',        title: 'Slug',          type: 'slug', options: { source: 'title' } },
    { name: 'tag',         title: 'Tag',           type: 'string' },
    { name: 'tagColor',    title: 'Tag Color',     type: 'string' },
    { name: 'desc',        title: 'Description',   type: 'text' },
    { name: 'author',      title: 'Author Name',   type: 'string' },
    { name: 'avatar',      title: 'Author Avatar', type: 'image' },
    { name: 'mainImage',   title: 'Main Image',    type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published At',  type: 'datetime' },
    { name: 'readTime',    title: 'Read Time',     type: 'string' },
    { name: 'comingSoon',  title: 'Coming Soon?',  type: 'boolean' },
    { name: 'featured',    title: 'Featured Post?',type: 'boolean' },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt',     type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption'  }
          ]
        }
      ]
    },
  ]
};