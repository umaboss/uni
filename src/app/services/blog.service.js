// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// // Import slugify function
// import { slugify } from '../utils/slugify.js';

// export const blogService = {
//   // Blog Posts
//   createBlog: async (data) => {
//     try {
//       const response = await fetch(`api/blogs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(data)
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating blog:', error);
//       throw error;
//     }
//   },

//   getAllBlogs: async () => {
//     try {
//       const response = await fetch(`api/blogs`);
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//       throw error;
//     }
//   },

//   getBlogById: async (id) => {
//     try {
//       const response = await fetch(`api/blogs/${id}`);
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       throw error;
//     }
//   },

//   getBlogBySlug: async (slug) => {
//     try {
//       console.log('Looking for slug:', slug);
//       const response = await fetch(`api/blogs`);
//       const data = await response.json();
//       if (data.success) {
//         console.log('Available blogs:', data.data.map(blog => ({ title: blog.title, slug: slugify(blog.title) })));
//         const found = data.data.find(blog => slugify(blog.title) === slug);
//         console.log('Found article:', found);
//         return {
//           success: true,
//           data: found || null
//         };
//       }
//       return data;
//     } catch (error) {
//       console.error('Error fetching blog by slug:', error);
//       throw error;
//     }
//   },

//   updateBlog: async (id, data) => {
//     try {
//       const response = await fetch(`api/blogs/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(data)
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error updating blog:', error);
//       throw error;
//     }
//   },

//   deleteBlog: async (id) => {
//     try {
//       const response = await fetch(`api/blogs/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       throw error;
//     }
//   },

//   // Categories
//   createCategory: async (data) => {
//     try {
//       const response = await fetch(`api/blog-categories`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(data)
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating category:', error);
//       throw error;
//     }
//   },

//   getAllCategories: async () => {
//     try {
//       const response = await fetch(`api/blog-categories`);
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       throw error;
//     }
//   },

//   getActiveCategories: async () => {
//     try {
//       const response = await fetch(`api/blog-categories/active`);
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching active categories:', error);
//       throw error;
//     }
//   },

//   updateCategory: async (id, data) => {
//     try {
//       const response = await fetch(`api/blog-categories/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(data)
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error updating category:', error);
//       throw error;
//     }
//   },

//   deleteCategory: async (id) => {
//     try {
//       const response = await fetch(`api/blog-categories/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       throw error;
//     }
//   }
// };



// File: app/services/blog.service.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const blogService = {
  createBlog: async (data) => {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  getAllBlogs: async () => {
    const response = await fetch(`/api/blogs`);
    return await response.json();
  },

  getBlogById: async (id) => {
    const response = await fetch(`/api/blogs/${id}`);
    return await response.json();
  },

  getBlogBySlug: async (slug) => {
    const response = await fetch(`/api/blogs`);
    const data = await response.json();
    if (data.success) {
      const found = data.data.find(blog => slugify(blog.title) === slug);
      return {
        success: true,
        data: found || null,
      };
    }
    return data;
  },

  updateBlog: async (id, data) => {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  deleteBlog: async (id) => {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await response.json();
  },

  createCategory: async (data) => {
    const response = await fetch(`/api/blog-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  getAllCategories: async () => {
    const response = await fetch(`/api/blog-categories`);
    return await response.json();
  },

  getActiveCategories: async () => {
    const response = await fetch(`/api/blog-categories/active`);
    return await response.json();
  },

  updateCategory: async (id, data) => {
    const response = await fetch(`/api/blog-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  deleteCategory: async (id) => {
    const response = await fetch(`/api/blog-categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await response.json();
  },
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
