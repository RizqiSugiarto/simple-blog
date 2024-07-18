import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Footer from './components/Footer';
import { TagsProvider } from './context/tagsContext';
import { AuthContextProvider } from './context/authContext';

function App() {
    return (
        <AuthContextProvider>
            <TagsProvider>
                <Router>
                    <Header />
                    <div className="p-[20px]">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog/:id" element={<BlogDetail />} />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </TagsProvider>
        </AuthContextProvider>
    );
}

export default App;
