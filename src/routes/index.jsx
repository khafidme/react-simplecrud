//Import react router dom
import { Routes, Route } from 'react-router-dom';

//Import Homepage view
import Home from '../views/home';

//Import IndexPost view
import PostIndex from '../views/posts';

//Import CreatePost view
import PostCreate from '../views/posts/create';

//Import EditPost view
import PostEdit from '../views/posts/edit';

const RoutesIndex = () => {
  return (
    <Routes>
        {/** Route for / or home */}
        <Route path='/' element={<Home />} />

        {/** Route for post index page */}
        <Route path='/posts' element={<PostIndex />} />

        {/** Route for post create page */}
        <Route path='/posts/create' element={<PostCreate />} />

        {/** Route for post edit page */}
        <Route path='/posts/edit/:id' element={<PostEdit />} />
    </Routes>
  )
}

export default RoutesIndex;