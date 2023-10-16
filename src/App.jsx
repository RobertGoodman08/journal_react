import './App.css'
import React, {useEffect, useState} from "react";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import {useLocalStorage} from "./hooks/use-localstorage.hook.js";
import {UserContextProvidev} from "./context/user.context.jsx";



function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
}


function App() {
    const [items, setItems] = useLocalStorage('data');
    const [selectedItem, setSelectedItem] = useState(null);
    console.log('App');



    const addItem = item => {
        if (!item.id) {
            setItems([...mapItems(items), {
                ...item,
                date: new Date(item.date),
                id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
            }]);
        } else {
            setItems([...mapItems(items).map(i => {
                if (i.id === item.id) {
                    return {
                        ...item
                    };
                }
                return i;
            })]);
        }
    };

    const deleteItem = (id) => {
        setItems([...items.filter(i => i.id !== id)]);
    };


  return (
      <UserContextProvidev>
          <div className='app'>
              <LeftPanel>
                  <Header/>
                  <JournalAddButton clearForm={() => setSelectedItem(null)}/>
                  <JournalList items={mapItems(items)} setItem={setSelectedItem} />
              </LeftPanel>
              <Body>
                  <JournalForm onSubmit={addItem} onDelete={deleteItem}  data={selectedItem}/>
              </Body>
          </div>
      </UserContextProvidev>

  )
}

export default App
