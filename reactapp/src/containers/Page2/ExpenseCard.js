import React, { useEffect } from "react"
import myConfig from "../../configs/config";
import Select from "react-select";
import "./index.css";

export default function ExpenseCard (props) {
    


const[postData, setPostData] = React.useState(
        {
            price: props.expense.price,
          name: props.expense.name,
          date: props.expense.date,

        }
      )
    function handleChangePayment(event) {
        const {name, value} = event.target
        setPostData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value}
          })
      }


const [category, setCategory]=React.useState(props.expense.category)
function handleChangeCat(selectedOption) { 
        setCategory(selectedOption)
}


const [rememberVendor, setRememberVendor]=React.useState(false)
const handleCheck = (event) => {
    if(rememberVendor){
        setRememberVendor(false)
    }
    else{
        setRememberVendor(true)
    }
}

const [changeid, setChangeid] = React.useState()
const handleChange = (id) => {
        setChangeid(id)
    }



       function handlePut(event){
        event.preventDefault()
        var payload = {id: props.expense.id, name: postData["name"], price: postData["price"], category: category["value"], date: postData["date"], rememberVender:rememberVendor}
        fetch(`${myConfig.CRU_URL}/api/payments`,
        {   method: 'PUT',
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                },
            body: JSON.stringify(payload)    
        })
        .then (response => response.json())
        .then (response => {
          console.log(response)})
          .then (setCategory(""))
          .then (setRememberVendor(false))
          .then (setChangeid())
          .then(window.location.reload())
    }

function handleDelete(id){
        fetch(`${myConfig.CRU_URL}/api/payments/`+id,
        {   method: 'DELETE',
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                }
        })
        .then (response => response.json())
        .then (response => {
          console.log(response)})
          .then(window.location.reload())
    }
    
    return(
        changeid==props.expense.id?
        <div className="bloxxhange">
             <form onSubmit={handlePut} className="bloxxhange">
            <div>
                    <input
                    className="suminput"
                    id="price"
                    onChange={handleChangePayment}
                    name="price"
                    value={postData.price}
                    placeholder="Sum"
                    />
                </div>
                <div>
                    <input
                    id="name"
                    className="nameinput"
                    onChange={handleChangePayment}
                    name="name"
                    value={postData.name}
                    placeholder="Info"
                    />
                </div>
                <div>
                    <input
                    type="date" 
                    className="dateinput"
                    id="date"
                    onChange={handleChangePayment}
                    name="date"
                    value={postData.date}
                    placeholder="Date"
                    />
                </div>
                <div className="inputselectchange" >
                <Select
            value={category}
            onChange={handleChangeCat}
            options={props.cat}
            name="category"
            id="category"

      />
      </div>
      <label htmlFor="vendor" className="label">
                Remember Vendor?
              </label>
      <input type='checkbox' onChange={handleCheck} id="vendor"/>
      <button className="buttonchange" type="submit">
            Submit
          </button>
          </form>
          <button style={{cursor:'pointer'}} onClick={() =>{handleDelete(props.expense.id)}} className="buttondelete">Delete</button>
            </div>:
        <div>
        <div className="blox" style={{cursor:'pointer'}} onClick={() =>{handleChange(props.expense.id)}}>
            <div className="oneexpense">{props.expense.date}<span className="info">{props.expense.name==""?props.expense.category:props.expense.name}</span>  <span className="price">{props.expense.price}$</span></div>
            <div className="category">{props.expense.category}</div>
            </div>
            <hr></hr>
        </div>
    )
}