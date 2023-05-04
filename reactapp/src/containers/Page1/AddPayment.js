import React, { useEffect } from "react"
import myConfig from "../../configs/config";
import Select from "react-select";
import "./index.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


function AddPayment() {

  const[state, setState] = React.useState({selectedFile: null})
  function onFileChange (event) {setState({ selectedFile: event.target.files[0] })};
  function onFileUpload (){const formData = new FormData()
    formData.append(
      "myFile",
      state.selectedFile,
      state.selectedFile.name
    );

    fetch(`${myConfig.CRU_URL}/api/payments/fileuploader`,
    {   method: 'POST',
        headers: {
            'Authorization': `Token ${localStorage.getItem("user-token")}`
            },
        body: formData    
    })
    .then((response ) => {
      if (response .status === 200) {
        toast("File uploaded.");
      }
      else{
        toast("File upload failure.")
      }
    })
    };
   

    var day = new Date();
    if (day.getMonth()<9){
    var today = day.getFullYear()+'-0'+(day.getMonth()+1)+'-'+(day.getDate());}
    else{
        var today = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+(day.getDate());}
    const [category, setCategory]=React.useState()
    const[postData, setPostData] = React.useState(
        {
            price: "",
          name: "",
          date: today
        }
      )
      const [categories, setCategories] = React.useState([])
    
      function handleChangeFilter(event) {
        const {name, value} = event.target
        setPostData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value}
          })
      }

      function handleChangeCat(selectedOption) { 
            setCategory(selectedOption)
    }

    function handleSave(event){
        event.preventDefault()
        var payload = {name: postData["name"], price: postData["price"], category: category["value"], date: postData["date"]}
        fetch(`${myConfig.CRU_URL}/api/payments`,
        {   method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                },
            body: JSON.stringify(payload)    
        })
        .then (response => response.json())
        .then (response => {
          console.log(response)})
          .then (setCategory(""))
          .then (setPostData (
            {
                price: "",
              name: "",
              date: today
            }
          ))
    }

      useEffect(() => {const fetchData = async () => {
        const response = await fetch(`${myConfig.CRU_URL}/api/categories`,
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                }    
        })
        const result = await response.json()
        setCategories(result['children'])
        } 
        fetchData();}, [])


        var cat=[]
         for (let i=0, len=categories.length; i<len; i++){
            if(categories[i]['children']){
            var options=categories[i]['children'].map((item, index) => ({
                value: item.id,
                label:item.name,
              }));
            var lib= {label:categories[i]['name'],options:options}
            cat.push(lib)}
            else {
                var other={value: categories[i].id,
                        label:categories[i].name}
                cat.push(other)
        }}

        return (
            <div className="page_content">
                <form onSubmit={handleSave}>
                <h1 className="heading">
                Add new expense
                </h1>
                <div>
                    <input
                    className="input"
                    id="price"
                    onChange={handleChangeFilter}
                    name="price"
                    value={postData.price}
                    placeholder="Sum"
                    />
                </div>
                <div>
                    <input
                    id="name"
                    className="input"
                    onChange={handleChangeFilter}
                    name="name"
                    value={postData.name}
                    placeholder="Info"
                    />
                </div>
                <div>
                    <input
                    type="date" 
                    className="input"
                    id="date"
                    onChange={handleChangeFilter}
                    name="date"
                    value={postData.date}
                    placeholder="Date"
                    />
                </div>
                <div className="inputselec" >
                <Select
            value={category}
            onChange={handleChangeCat}
            options={cat}
            name="category"
            id="category"

      />
      </div>
       <button className="button" type="submit">
            Submit
          </button>
            </form>
            <div className="fileuploader">
              <h2 className="fileuploaderh2">Upload CSV file with bank payment history</h2>
            <div>
                <input type="file" onChange={onFileChange} className="input" />
                <button onClick={onFileUpload} className="button" name="myfile">
                  Upload!
                </button>
            </div>
            </div>
            <ToastContainer />
            </div>
        )
    }
    export default AddPayment;
