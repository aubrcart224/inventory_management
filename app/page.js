'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, doc, firestore, getDoc, query, setDoc } from "firebase/firestore"; // check for error later 
import { Box, Typography } from "@mui/material";

export default function Home() {
  
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await snapshot.get();
    const inventorylist = [];

    docs.forEach(doc => {
      inventorylist.push({
      name: doc.id,
      ...doc.data(),
      });

    })
    setInventory(inventorylist);
  }

  //add items
  const addItem = async (name) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);   

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else{
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory();
  
  }

  //remove items
  const removeItem = async (name) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);   

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory();
  
    useEffect(() => {
      updateInventory(); // delete or keep this later, might error. 
    }, []);

  }

  useEffect(() => {
    updateInventory();
  }, []);


  // handle open and close 
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  
  return (
    <Box>
      <Typography variant="h1">Inventory Managment</Typography>
      {
        inventory.forEach((item)=> {
        return(
          <Box>
        {item.name}
        {item.count}
      </Box>
      )
      })
    }
    </Box>
  )

}
