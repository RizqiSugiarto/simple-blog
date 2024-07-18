import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import { TagsProvider } from './context/tagsContext';
import { AuthContextProvider } from './context/authContext';
import MainLayout from './layouts/main';

function App() {
    return (
        <AuthContextProvider>
            <TagsProvider>
                <Router>
                <MainLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog/:id" element={<BlogDetail />} />
                        </Routes>
                    </MainLayout>
                </Router>
            </TagsProvider>
        </AuthContextProvider>
    );
}

export default App;
