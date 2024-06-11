import React, { useState, useRef } from 'react';

const initialItems = [
  { id: '1', content: 'Scotland Island', location: 'Sydney, Australia' },
  { id: '2', content: 'The Charles Grand Brasserie & Bar', location: 'Lorem ipsum, Dolor' },
  { id: '3', content: 'Bridge Climb', location: 'Dolor, Sit amet' },
  { id: '4', content: 'Clam Bar', location: 'Etcetera veni, Vidi vici' },
  { id: '5', content: 'Vivid Festival', location: 'Sydney, Australia' },
];

const DraggableList = () => {
  const [items, setItems] = useState(initialItems);
  const [dragging, setDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const draggingItem = useRef(null);

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    setDraggedIndex(position);
    setDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', position);

    const img = new Image();
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBAY2uP6MAAAAASUVORK5CYII=';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e, position) => {
    e.preventDefault();
    const bounding = e.target.getBoundingClientRect();
    const offset = bounding.y + bounding.height / 2;
    setHoveredIndex(e.clientY - offset > 0 ? position + 1 : position);
  };

  const handleDragEnd = () => {
    if (hoveredIndex !== null && hoveredIndex !== draggedIndex) {
      const newList = [...items];
      const [draggedItemContent] = newList.splice(draggingItem.current, 1);
      const adjustedIndex = hoveredIndex > draggedIndex ? hoveredIndex - 1 : hoveredIndex;
      newList.splice(adjustedIndex, 0, draggedItemContent);
      setItems(newList);
    }
    draggingItem.current = null;
    setDragging(false);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  return (
    <div className="p-4">
      <ul className={`list-none p-0 m-0 relative ${dragging ? 'cursor-grabbing' : ''}`}>
        {dragging && hoveredIndex === 0 && (
          <div className="relative z-10 mb-2">
            <div className="absolute inset-x-0 top-1/2 h-1 bg-blue-500"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-white p-2 rounded shadow z-20" style={{ width: '50%' }}>
              <img src={`/img/${items[draggedIndex].id}.jpg`} alt={items[draggedIndex].content} className="w-5 h-5 rounded-full mr-2" />
              <div>
                <h3 className="text-xs font-bold">{items[draggedIndex].content}</h3>
                <p className="text-xs text-gray-500">{items[draggedIndex].location}</p>
              </div>
            </div>
          </div>
        )}
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <li
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              draggable
              className={`bg-white p-4 mb-2 rounded shadow flex items-center relative cursor-grab ${
                dragging && draggedIndex === index ? 'bg-gray-200 opacity-50' : ''
              }`}
            >
              <img
                src={`/img/${item.id}.jpg`}
                alt={item.content}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">{item.content}</h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </li>
            {dragging && hoveredIndex === index + 1 && (
              <div className="relative z-10">
                <div className="absolute inset-x-0 top-1/2 h-1 bg-blue-500"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-white p-2 rounded shadow z-20" style={{ width: '50%' }}>
                  <img src={`/img/${items[draggedIndex].id}.jpg`} alt={items[draggedIndex].content} className="w-5 h-5 rounded-full mr-2" />
                  <div>
                    <h3 className="text-xs font-bold">{items[draggedIndex].content}</h3>
                    <p className="text-xs text-gray-500">{items[draggedIndex].location}</p>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        {dragging && hoveredIndex === items.length && (
          <div className="relative z-10">
            <div className="absolute inset-x-0 top-1/2 h-1 bg-blue-500" style={{ top: '50%' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-white p-2 rounded shadow z-20" style={{ width: '50%' }}>
              <img src={`/img/${items[draggedIndex].id}.jpg`} alt={items[draggedIndex].content} className="w-5 h-5 rounded-full mr-2" />
              <div>
                <h3 className="text-xs font-bold">{items[draggedIndex].content}</h3>
                <p className="text-xs text-gray-500">{items[draggedIndex].location}</p>
              </div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default DraggableList;
