
"use client"

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { AvailableSizes, adminAddProductformControls } from "@/utils";

export default function AdminAddNewProduct(){

    function handleImage(){

    }

    return(
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
                    //   selected={formData.sizes}
                    //   onClick={handleTileClick}
                      data={AvailableSizes}
                    />
                   
                  </div>
                   {adminAddProductformControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        // value={formData[controlItem.id]}
                        // onChange={(event) => {
                        //   setFormData({
                        //     ...formData,
                        //     [controlItem.id]: event.target.value,
                        //   });
                        // }}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        label={controlItem.label}
                        options={controlItem.options}
                    //     value={formData[controlItem.id]}
                    //     onChange={(event) => {
                    //       setFormData({
                    //         ...formData,
                    //         [controlItem.id]: event.target.value,
                    //       });
                    //     }}
                     />
                    ) : null
                  )}
                  <button
                    // onClick={handleAddProduct}
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                  >
                    {/* {componentLevelLoader && componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text={currentUpdatedProduct !== null ? 'Updating Product' : "Adding Product"}
                        color={"#ffffff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                      />
                    ) : currentUpdatedProduct !== null ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )} */}
                    Add Product
                  </button>
                </div> 
              </div>
              {/* <Notification /> */}
            </div>
          )
}