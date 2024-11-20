import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import SearchedTodo from './pages/searchedTodo';
import { TodoProvider } from '@/context/todoContext';

function App() {
  return (
    <>
      <Router>
        <TodoProvider>
          <motion.main
            className=" min-h-screen min-w-full flex flex-col bg-gradient-to-b from-red-50/90 via-gray-100/100 to-[#d5b2b8]/25"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo/add" element={<AddTodo />} />
              <Route path="/todo/edit/:id" element={<EditTodo />} />
              <Route path="/todo/search/" element={<SearchedTodo />} />
            </Routes>
          </motion.main>
        </TodoProvider>
      </Router>
    </>
  );
}

export default App;
