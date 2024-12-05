import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Equipment from './Equipment';
import EquipmentSearch from './EquipmentSearch';
import styled from 'styled-components';

// Styled components for layout
const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Content = styled.div`
  flex: 3;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 15px;
  border-left: 1px solid #ddd;
  margin-left: 20px;
  max-height: 600px;
  overflow-y: auto;
  background-color: #f7f9fc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  overflow-y: auto;
  max-height: 90vh;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background: #f2f2f2;
  border: none;
  &:hover {
    background: #ddd;
  }
  &.active {
    background: #ddd;
    font-weight: bold;
  }
`;

const SidebarItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0f7fa;
  }

  button {
    margin-left: 10px;
    background: #ff6f61;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: #e64a19;
    }
  }
`;

const StyledButton = styled.button`
  background-color: #007bff; /* Primary color */
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }

  &:active {
    background-color: #004080; /* Even darker when pressed */
  }
`;

const EquipmentPage = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [selection, setSelection] = useState(() => {
    // Load persisted items from local storage
    const savedItems = localStorage.getItem('selection');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('beginner');
  const itemsPerPage = 20;

  // Fetch equipment data from the API
  const fetchData = async (searchTerm = '', category = 'all', minPrice = '', maxPrice = '') => {
    setLoading(true);
    try {
      const response = await axios.get('/api/equipment', {
        params: { page: currentPage, search: searchTerm, category, min_price: minPrice, max_price: maxPrice },
      });
      setEquipmentData(response.data.equipment);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  // Load initial data and selection
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Persist selection in local storage when it changes
  useEffect(() => {
    localStorage.setItem('selection', JSON.stringify(selection));
  }, [selection]);

  // Add to selection
  const addToSelection = (item) => {
    setSelection((prevSelection) => [...prevSelection, item]);
  };

  // Remove from selection
  const removeFromSelection = (itemId) => {
    setSelection((prevSelection) => prevSelection.filter((item) => item.id !== itemId));
  };

  // Open and close modals
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const openTabModal = () => {
    setIsTabModalOpen(true);
  };
  const closeTabModal = () => {
    setIsTabModalOpen(false);
  };

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'beginner':
        return (
          <div>
            <h3>Beginner Tips</h3>
            <p>If you're new to triathlons, focus on getting affordable and essential gear to start without a significant investment. Here’s what you’ll need and what to expect cost-wise:</p>
            <ul>
              <li>
                <strong>Entry-Level Road Bike:</strong> Look for a basic, durable road bike with an aluminum frame and entry-level components. Brands like Giant and Trek offer solid budget options.
                <ul>
                  <li><strong>Estimated Cost:</strong> $500 - $1,000</li>
                </ul>
              </li>
              <li>
                <strong>Helmet & Gloves:</strong> Safety is a priority. Choose a standard helmet that meets safety standards (e.g., Bell or Giro helmets) and comfortable gloves for better grip.
                <ul>
                  <li><strong>Estimated Cost:</strong> $50 - $100 for the helmet, $15 - $25 for gloves</li>
                </ul>
              </li>
              <li>
                <strong>Swim Goggles & Basic Wetsuit:</strong> Start with comfortable, affordable swim goggles and a beginner wetsuit to improve buoyancy and warmth in open water.
                <ul>
                  <li><strong>Estimated Cost:</strong> $20 - $30 for goggles, $150 - $300 for a wetsuit</li>
                </ul>
              </li>
              <li>
                <strong>Running Shoes:</strong> A supportive and comfortable pair of running shoes is essential. Brands like Asics or Brooks have good entry-level options.
                <ul>
                  <li><strong>Estimated Cost:</strong> $80 - $120</li>
                </ul>
              </li>
              <li>
                <strong>Basic Hydration & Nutrition:</strong> Use a simple hydration pack or bottle cage on your bike, and try basic energy gels or bars to get used to fueling during long sessions.
                <ul>
                  <li><strong>Estimated Cost:</strong> $15 - $30 for hydration pack, $10 - $20 for energy gels/bars</li>
                </ul>
              </li>
            </ul>
            <p><strong>Total Estimated Cost:</strong> $800 - $1,600</p>
          </div>
        );
      case 'training':
        return (
          <div>
            <h3>Training Tips</h3>
            <p>For consistent training, mid-range, durable gear can enhance performance and comfort. Here’s a guide for intermediate training essentials:</p>
            <ul>
              <li>
                <strong>Upgraded Road Bike:</strong> Invest in a road bike with a carbon fork for reduced vibration, a more comfortable saddle, and reliable components (e.g., Shimano 105). Specialized and Cannondale offer great mid-range options.
                <ul>
                  <li><strong>Estimated Cost:</strong> $1,500 - $3,000</li>
                </ul>
              </li>
              <li>
                <strong>Durable Running Shoes:</strong> Choose supportive, cushioned shoes for higher mileage, like those from Saucony or Nike.
                <ul>
                  <li><strong>Estimated Cost:</strong> $120 - $150</li>
                </ul>
              </li>
              <li>
                <strong>GPS Watch:</strong> A reliable GPS watch like the Garmin Forerunner or Polar Vantage can track your pace, heart rate, and intervals during training.
                <ul>
                  <li><strong>Estimated Cost:</strong> $200 - $300</li>
                </ul>
              </li>
              <li>
                <strong>Swim Cap & Mid-Tier Wetsuit:</strong> Look for a flexible wetsuit with a comfortable fit for open water swimming, such as Orca or Zone3. A good swim cap is also essential for keeping warm.
                <ul>
                  <li><strong>Estimated Cost:</strong> $200 - $500 for wetsuit, $10 - $20 for swim cap</li>
                </ul>
              </li>
              <li>
                <strong>Nutrition & Supplements:</strong> Incorporate electrolytes and endurance-specific supplements for longer sessions. Look for brands like GU or Clif.
                <ul>
                  <li><strong>Estimated Cost:</strong> $50 - $100 monthly for nutrition</li>
                </ul>
              </li>
            </ul>
            <p><strong>Total Estimated Cost:</strong> $2,100 - $4,100</p>
          </div>
        );
      case 'race day':
        return (
          <div>
            <h3>Race Day Gear</h3>
            <p>On race day, performance-specific gear can make a difference. Aim for lightweight and optimized equipment to boost your results:</p>
            <ul>
              <li>
                <strong>Aerodynamic Triathlon Bike:</strong> Invest in an aero-focused triathlon bike with deep-section wheels and aero bars. Specialized, Trek, or Cervelo offer great options.
                <ul>
                  <li><strong>Estimated Cost:</strong> $3,000 - $6,000</li>
                </ul>
              </li>
              <li>
                <strong>Lightweight, Race-Specific Running Shoes:</strong> Carbon-plated running shoes like Nike Vaporfly or Hoka Carbon X provide a balance of lightweight construction and responsiveness.
                <ul>
                  <li><strong>Estimated Cost:</strong> $150 - $250</li>
                </ul>
              </li>
              <li>
                <strong>Triathlon Suit:</strong> A race-specific tri-suit with moisture-wicking properties and a snug fit enhances aerodynamics and comfort. Look for brands like HUUB or Roka.
                <ul>
                  <li><strong>Estimated Cost:</strong> $150 - $300</li>
                </ul>
              </li>
              <li>
                <strong>Race-Day Nutrition:</strong> Easy-to-access hydration systems and energy gels designed for race day. Brands like Hammer Nutrition and Tailwind have portable options.
                <ul>
                  <li><strong>Estimated Cost:</strong> $30 - $60</li>
                </ul>
              </li>
              <li>
                <strong>Polarized Goggles:</strong> Clear vision is key, so choose polarized goggles to reduce glare in open water, such as those from Aqua Sphere or TYR.
                <ul>
                  <li><strong>Estimated Cost:</strong> $20 - $50</li>
                </ul>
              </li>
            </ul>
            <p><strong>Total Estimated Cost:</strong> $3,500 - $6,700</p>
          </div>
        );
      case 'expert':
        return (
          <div>
            <h3>Expert Tips</h3>
            <p>As an experienced athlete, investing in high-performance gear tailored to your needs can help push your limits. Here’s what you should look for:</p>
            <ul>
              <li>
                <strong>Top-Tier Carbon Fiber Bike:</strong> Elite triathletes benefit from a full carbon triathlon bike with electronic shifting and aero optimizations. Cervelo, BMC, and Pinarello offer top-end models.
                <ul>
                  <li><strong>Estimated Cost:</strong> $6,000 - $10,000</li>
                </ul>
              </li>
              <li>
                <strong>Custom-Fit Running Shoes:</strong> Custom shoes or orthotic inserts are designed for your gait and provide optimal support. Consider working with a podiatrist for the best fit.
                <ul>
                  <li><strong>Estimated Cost:</strong> $200 - $400</li>
                </ul>
              </li>
              <li>
                <strong>Professional Tri-Suit:</strong> A high-performance tri-suit made for aerodynamics and comfort. Look into suits from Roka, HUUB, or Castelli.
                <ul>
                  <li><strong>Estimated Cost:</strong> $300 - $500</li>
                </ul>
              </li>
              <li>
                <strong>High-End Wetsuit:</strong> A top-quality wetsuit with buoyancy panels and flexible shoulders for minimal drag. Orca and Blueseventy make excellent options for serious athletes.
                <ul>
                  <li><strong>Estimated Cost:</strong> $500 - $800</li>
                </ul>
              </li>
              <li>
                <strong>Advanced Nutrition Strategy:</strong> Work with a sports nutritionist for a custom hydration and fueling plan, using brands like SIS or Maurten.
                <ul>
                  <li><strong>Estimated Cost:</strong> $100 - $200 per month</li>
                </ul>
              </li>
            </ul>
            <p><strong>Total Estimated Cost:</strong> $7,100 - $12,600</p>
          </div>
        );
      default:
        return null;
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Content>
      <StyledButton onClick={openTabModal}>Open Tips & Guides</StyledButton>

        <EquipmentSearch onSearch={fetchData} />
        <Equipment equipment={equipmentData} onAddToSelection={addToSelection} />

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </Content>

      {/* Sidebar */}
      <Sidebar>
        <h2>Your Selection</h2>
        {selection.length > 0 ? (
          <ul>
          {selection.map((item) => (
            <SidebarItem key={item.id} onClick={() => openModal(item)}>
              <div>
                <strong>{item.name}</strong> - ${item.price || '0.00'}

              </div>
              <button onClick={(e) => { e.stopPropagation(); removeFromSelection(item.id); }}>Remove</button>
            </SidebarItem>
          ))}
        </ul>
        ) : (
          <p>No items added yet.</p>
        )}
        <div>Total: ${selection.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}</div>
      </Sidebar>

      {/* Modal for item details */}
      {isModalOpen && (
        <>
          <Overlay onClick={closeModal} />
          <Modal>
            <h2>{selectedItem?.name}</h2>
            <p>Price: ${selectedItem?.price}</p>
            <a href={selectedItem?.link} target="_blank" rel="noopener noreferrer">
              {selectedItem?.link ? 'View Item' : 'No Link Available'}
            </a>
            <p>{selectedItem?.description}</p>
            <button onClick={closeModal}>Close</button>
          </Modal>
        </>
      )}

      {/* Tab modal for detailed tips */}
      {isTabModalOpen && (
        <>
          <Overlay onClick={closeTabModal} />
          <Modal>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {['beginner', 'training', 'race day', 'expert'].map((tab) => (
                <TabButton
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabButton>
              ))}
            </div>
            <div>{renderTabContent()}</div>
            <button onClick={closeTabModal}>Close</button>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default EquipmentPage;
