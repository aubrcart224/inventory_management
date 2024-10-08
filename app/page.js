'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, doc, firestore, getDoc, query, setDoc,} from "firebase/firestore"; // check for error later 
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { ST } from "next/dist/shared/lib/utils";

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

 //main return
  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center" gap={2}>
      <Modal open={open}onClose={handleClose}>
        <Box
          postion="absolute" top="50%" left="50%" 
          width={400}
          bgcolor={"white"}
          border="2px solid black"
          boxShadow={24}
          padding={4}
          display="flex"
          flexDirection="column" 
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant="ouiutlined"
            fullWidth
            value={itemName}
            onChange={(e) =>{
              setItemName(e.target.value)
            }}
            />
            <Button
            variant= "outlined"
            onClick={() => {
              addItem(itemName);
              setItemName("");
              handleClose();
            }}
            >
              Add Item
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={()=>{
        handleOpen();
      }}
      >
        Add New Item
      </Button>
      <Box border="1px solid black">
        <Box
        width = '800px'
        height = '100px'
        bgcolor= "#ADD8E6"
        display= 'flex'
        alignItems='center'
        justifyContent='center'
        >
        <Typography variant="h2" color = '#333'>
          Inventory Items
        </Typography>
        </Box>
      
      <Stack width = '800px' height = '300px' spacing = {2} overflow='auto'>
        {inventory.map(({name, quantity})=>{
            <Box key ={name} 
              width = '100%' 
              minHeight = '150px'
              display = 'flex'
              allignItems = 'center'
              justifyContent = 'space-between'
              bgcolor="#f0f0f0"
              padding={5}
            >
              <Typography variant = 'h3' color = '#333' textAllign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant = 'h3' color = '#333' textAllign="center">
                {quantity}
              </Typography>
              <Button 
                variant = "contained" 
                onClick={() => {
                  removeItem(name);
              }}
              >
                Remove
              </Button>
            </Box>
          })}
      </Stack>
    </Box>
  </Box>
  )
}
