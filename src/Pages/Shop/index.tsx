import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "../../store";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";

const Shop = () => {
  console.log("about");
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const customerCategory = useStoreState(
    (state) => state?.productModel?.customerCategory
  );
  const getCustomerCategory = useStoreActions(
    (actions) => actions?.productModel?.getCustomerCategory
  );
  const getSelectedCategory = useStoreActions(
    (actions) => actions?.productModel?.getSelectedCategory
  );
  const setCustomerCategory = useStoreActions(
    (actions) => actions?.productModel?.setCustomerCategory
  );

  useEffect(() => {
    console.log("bt", customerCategory?.catagory);
    setCategoryData(customerCategory);
  }, []);

  const selectedValues = (selectedList: any, selectedItem: any) => {
    console.log("selectedList", selectedList);
    let selectedCategory = selectedList.map(
      (value: any) => value.productCatagoryName
    );
    let payload = { category: selectedCategory.join() };
    console.log("payload", payload);
    // setCustomerCategory(selectedList)
    getSelectedCategory({ url: "/customer/getselectedcatagory", payload });
    console.log("selectedItem", selectedItem);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    console.log("selectedList", selectedList);
    let selectedCategory = selectedList.map(
      (value: any) => value.productCatagoryName
    );
    let payload = { category: selectedCategory.join() };
    console.log("payload", payload);
    // setCustomerCategory(selectedList)
    getSelectedCategory({ url: "/customer/getselectedcatagory", payload });
    console.log("removedItem", removedItem);
  };
  console.log("categoryData", categoryData);

  useEffect(() => {
    getCustomerCategory({ url: "/customer/getcategory" });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="mb-5"> Shoping Page </h1>
        <Multiselect
          options={categoryData} // Options to display in the dropdown
          displayValue="productCatagoryName" // Property name to display in the dropdown options
          className="my-4"
          onSelect={selectedValues}
          onRemove={onRemove}
        />
        <div className="row">
          {customerCategory?.length ? (
            customerCategory?.map((val: any, i: number) => {
              return (
                <div className="col-md-4 mb-3" key={i}>
                  <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      <Card.Title className="bg-warning">
                        {val?.productCatagoryName.toUpperCase()}
                      </Card.Title>
                      <Card.Text>
                        <b>Created At:</b> {val?.createdAt}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <h1>No catagory added</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
