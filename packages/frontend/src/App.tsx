import AdminSider from './components/admin-components/AdminSider';
import AdminPageContent from './components/page-contents/AdminPageContent';
import Navbar from './components/ui/Navbar';
function App() {
    return (
        <div className="flex flex-col w-full ">
            <Navbar />
            <div className="flex flex-1  ">
                <AdminSider />
                <AdminPageContent />
            </div>
        </div>
    );
}

export default App;
