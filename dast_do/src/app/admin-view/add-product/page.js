"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notifcation";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resolve } from "styled-jsx/css";

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
  
    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
  };

async function helperForUPloadingImageToFirebase(file){
   const getFileName = createUniqueFileName(file);
   const storageReference = ref(storage, `ecommerce/${getFileName}`)
   const uploadImage = uploadBytesResumable(storageReference, file)

   return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

export default function AdminAddNewProduct() {
   const [formData, setFormData] = useState(initialFormData);

    async function handleImage(e) {
        console.log(e.target.files);
        const extractImageUrl = await helperForUPloadingImageToFirebase(e.target.files[0])
        console.log(extractImageUrl);

        if (extractImageUrl !== "") {
            setFormData({
              ...formData,
              imageUrl: extractImageUrl,
            });
          }
    }

    function handleTileClick(getCurrentItem) {
        let cpySizes = [...formData.sizes];
        const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);
    
        if (index === -1) {
          cpySizes.push(getCurrentItem);
        } else {
          cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
        }
    
        setFormData({
          ...formData,
          sizes: cpySizes,
        });
      }

      async function handleAddProduct() {
        // setComponentLevelLoader({ loading: true, id: "" });
        const res = await addNewProduct(formData);
        //   currentUpdatedProduct !== null
        //     ? await updateAProduct(formData)
        //     : await addNewProduct(formData);
    
        console.log(res)
      }
    console.log(formData);
  //   const {
  //     componentLevelLoader,
  //     setComponentLevelLoader,
  //     currentUpdatedProduct,
  //     setCurrentUpdatedProduct,
  //   } = useContext(GlobalContext);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
               selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={formData[controlItem.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
              />
            ) : null
          )}

          <button
             onClick={handleAddProduct}
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          >
            Add prodact
          </button>
        </div>
      </div>
      {/* <Notification /> */}
    </div>
  );
}
