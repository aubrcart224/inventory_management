'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, doc, Firestore, query } from "firebase/firestore"; // check for error later 
import { Box, Typography } from "@mui/material";

export default function Home() {
  
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(Firestore, "inventory"));
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

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box>
      <Typography variant="h1">Inventory Managment</Typography>
      {
        inventory.forEach((item)=> {
        return(<>
        {item.name}
        {item.count}
      </> )
      })
    }
    </Box>
  )
}
