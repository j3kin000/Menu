import {
  FETCH_ALL_ITEMS,
  FETCH_ITEMS,
  FETCH_ITEMS_CATEGORY,
  ADD_ITEMS,
  UPDATE_ITEMS,
  DELETE_ITEMS,
} from "../constant";
import menu from "../../data";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  set,
  push,
  update,
  remove,
} from "firebase/database";
export const fetchAllItems = () => async (dispatch) => {
  try {
    const db = getDatabase();
    const dbRef = ref(db, "menu");
    const items = [];
    const categories = ["all"];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach(
        (childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          const data = { ...childData, key: childKey };
          console.log("data", childData.category);
          items.push(data);

          categories.push(childData.category);
          const allCategories = [...new Set(categories?.map((item) => item))];
          dispatch({ type: FETCH_ITEMS_CATEGORY, payload: allCategories });
          dispatch({ type: FETCH_ITEMS, payload: items });
        },
        {
          onlyOnce: true,
        }
      );
    });
    console.log("items", items.length);
    console.log("items", items);
  } catch (error) {}
};
export const fetchItemsCategory = (menu, category) => async (dispatch) => {
  try {
    const categoryItem = menu?.filter((item) => item.category === category);
    console.log("asd", categoryItem);
    dispatch({ type: fetchAllItems, payload: categoryItem });
  } catch (error) {}
};
export const addItem = (item, navigate) => async (dispatch) => {
  try {
    const db = getDatabase();
    const itemList = ref(db, "menu");
    const newItem = push(itemList);
    set(newItem, {
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      cost: item.cost,
      sizes: item.sizes,
    });
  } catch (error) {}
};
export const updateItem = (item) => async (dispatch) => {
  try {
    const db = getDatabase();
    set(ref(db, "menu/" + item.key), {
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      cost: item.cost,
      sizes: item.sizes,
    });
  } catch (error) {}
};

export const deleteItem = (item, message) => async (dispatch) => {
  try {
    console.log("delete");
    const db = getDatabase();
    const itemList = ref(db);
    get(child(itemList, "menu/" + item.key)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(db, "menu/" + item.key));
      } else {
        console.log("blee");
      }
    });
    message();
  } catch (error) {}
};
