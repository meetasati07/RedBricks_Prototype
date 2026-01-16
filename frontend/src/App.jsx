import { useState } from 'react';
import Home from './pages/Home';
import AddCrop from './pages/AddCrop';
import Results from './pages/Results';
import Buyers from './pages/Buyers';
import Machines from './pages/Machines';
import { buyers } from './data/buyers';
import Alternatives from './pages/Alternatives';  
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState(null);

  const goTo = (page, data = null) => {
    if (data) setFormData(data);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home goTo={goTo} />;
      case 'add': return <AddCrop goTo={goTo} />;
      case 'results': return <Results goTo={goTo} data={formData} />;
      case 'buyers': return <Buyers goTo={goTo} data={formData} />;
      case 'machines': return <Machines goTo={goTo} data={formData} />;
      case 'alternatives': return <Alternatives goTo={goTo} />;  
      default: return <Home goTo={goTo} />;
    }
  };

  return (
    <div className="App font-sans">
      {renderPage()}
    </div>
  );
}

export default App;
