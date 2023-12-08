import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    {
      "id": "1",
      "title": "The Future of Artificial Intelligence",
      "category": "Technology",
      "description": "Exploring the latest trends and innovations in artificial intelligence."
    },
    {
      "id": "2",
      "title": "Healthy Eating Habits",
      "category": "Health",
      "description": "Tips and tricks for maintaining a balanced diet and a healthy lifestyle."
    },
    {
      "id": "3",
      "title": "Protecting Our Oceans",
      "category": "Environment",
      "description": "The importance of preserving marine ecosystems and reducing plastic pollution."
    },
    {
      "id": "4",
      "title": "Journey to Mars",
      "category": "Space",
      "description": "A glimpse into NASA's plans for a manned mission to the Red Planet."
    },
    {
      "id": "5",
      "title": "JavaScript Frameworks Comparison",
      "category": "Programming",
      "description": "An overview of popular JavaScript frameworks and their features."
    },
    {
      "id": "6",
      "title": "Online Learning Tips",
      "category": "Education",
      "description": "Effective strategies for successful online learning and skill development."
    },
    {
      "id": "7",
      "title": "Exploring Ancient Cities",
      "category": "Travel",
      "description": "Adventures in exploring ancient cities and historical landmarks around the world."
    },
    {
      "id": "8",
      "title": "Delicious Mediterranean Cuisine",
      "category": "Food",
      "description": "Savor the flavors of Mediterranean dishes and learn to cook traditional recipes."
    },
    {
      "id": "9",
      "title": "Innovations in Renewable Energy",
      "category": "Technology",
      "description": "The latest breakthroughs in renewable energy sources and sustainability."
    },
    {
      "id": "10",
      "title": "Yoga and Stress Relief",
      "category": "Health",
      "description": "The benefits of practicing yoga for stress reduction and mental well-being."
    }
  ]

};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const { id, title, category, description, isLiked } = action.payload;
      const blogIndex = state.blogs.findIndex((blog) => blog.id === (id));

      state.blogs[blogIndex].title = title;
      state.blogs[blogIndex].category = category;
      state.blogs[blogIndex].description = description;


    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
    },

  },
});

export const selectBlogById = (state, blogID) => {

  const number = blogID;

  const test = state.blogs.blogs.find((blog) => blog.id === number);

  return state.blogs.blogs.find((blog) => blog.id === (blogID));
};



export const { addBlog, updateBlog, deleteBlog, toggleLike } =
  blogSlice.actions;


export default blogSlice.reducer;






