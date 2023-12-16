"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
    { name: "Coffee", price: 4.95 },
    { name: "Movie", price: 104.95 },
    { name: "Tea", price: 14.95 },
    { name: "Candy", price: 1.5 },
  ]);

  const [newItem, setnewItem] = useState({ name: "", price: "" });

  const [total, setTotal] = useState(0);

  // add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name != "" && newItem.price !== undefined) {
      setItems([...items, newItem]);
      await addDoc(collection(db, "expenses"), {
        name: newItem.name.trim(),
        price: newItem.price.trim(),
      });
      setnewItem({ name: "", price: "" });
    }
  };

  // read item from database
  const readData = async () => {
    // const querySnapshot = await getDocs(collection(db, "expenses"));
    // querySnapshot.forEach((doc) => {
    //   console.log({ id: doc.id, ...doc.data() });
    // });
    const q = query(collection(db, "expenses"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    });
  };

  const setTotals = () => {
    setTotal(
      items.reduce((sum, item) => {
        return sum + parseFloat(item.price);
      }, 0)
    );
  };

  useEffect(() => {
    readData();
    setTotals();
  }, []);

  // delete item from database

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) =>
                setnewItem((prev) => ({ ...prev, name: e.target.value }))
              }
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setnewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize ">{item.name}</span>
                  <span>$ {item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-evenly">
              <div>
                <span>Total - </span>
                <span>$ {total}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
