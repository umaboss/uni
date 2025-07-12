import { prisma } from '../../../../lib/prisma';

export default async function handler(req , res) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: { select: { id: true, email: true } },
        },
      });

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving blog', details: err });
    }
  } else if (req.method === 'PUT') {
    try {
      const blog = await prisma.blog.update({
        where: { id: parseInt(id) },
        data: req.body,
      });

      res.status(200).json({ message: 'Blog updated successfully!', data: blog });
    } catch (err) {
      res.status(500).json({ message: 'Error updating blog', details: err });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.blog.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting blog', details: err });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
