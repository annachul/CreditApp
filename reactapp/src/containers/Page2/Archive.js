
import React, { useEffect } from "react"
import myConfig from "../../configs/config";
import Select from "react-select";
import "./index.css";
import ExpenseCard from "./ExpenseCard"

function Archive() {
    useEffect(() => {const PayData = async () => {
        const response = await fetch(`${myConfig.CRU_URL}/api/payments`,
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                }    
        })
        .then (response => response.json())
        .then (response => {
            setSum(response["sum"])
            setExpenses(response["data"]) 
        })
        } 
        PayData();}, [])

    var day = new Date();
    if (day.getMonth()<9){
    var today = day.getFullYear()+'-0'+(day.getMonth()+1)+'-'+(day.getDate());}
    else{
         today = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+(day.getDate());}

    if (day.getMonth()==0){
        var monthearlier = day.getFullYear()+'-12-'+(day.getDate());}
    else if (day.getMonth()<9){
        monthearlier = day.getFullYear()+'-0'+day.getMonth()+'-'+(day.getDate());}
    else{
        monthearlier = day.getFullYear()+'-'+day.getMonth()+'-'+(day.getDate())
    }

    const [filterdata, setFilterdata]=React.useState(
        {
            from:monthearlier,
            to:today
        }
    )
    
  function handleChangeFilter(event) {
    const {name, value} = event.target
    setFilterdata(prevFormData => {
      return {
          ...prevFormData,
          [name]: value}
      })
  }

    const [category, setCategory]=React.useState("")
    const [categories, setCategories] = React.useState([])
    const [sum, setSum] = React.useState()
    const [expenses, setExpenses] = React.useState([])
    function handleChangeCat(selectedOption) { 
        setCategory(selectedOption)
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

    function  handleRequest (event) {
        event.preventDefault()
        var filterto="&to="+filterdata.to
        var filtercategory
        if (category==""){
            filtercategory="" 
        }
        else {filtercategory="&category="+category["value"]}

        const response =fetch('http://127.0.0.1:8000/api/payments?from='+filterdata.from+filterto+filtercategory,
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                }    
        })
        .then (response => response.json())
        .then(response => {

            setExpenses(response['data'])
            setSum(response['sum'])
        })
                
            }

            const oneexpense=expenses.map((expense) => 
            <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    cat={cat}
                  />
           
            )
            var textsum="Sum of your expenses from " +filterdata.from+ " to "+ filterdata.to+ " is " +sum

        return (
            <div>
                <h1 className="heading">Filter expenses</h1>
                <form onSubmit={handleRequest} className="filter">
                <div>
                    <input
                    type="date" 
                    className="input"
                    id="from"
                    onChange={handleChangeFilter}
                    name="from"
                    value={filterdata.from}
                    placeholder="Date"
                    />
                </div>
                <div>
                    <input
                    type="date" 
                    className="input"
                    id="to"
                    onChange={handleChangeFilter}
                    name="to"
                    value={filterdata.to}
                    placeholder="Date"
                    />
                </div>
                <div className="inputselect" >
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
      <div className="text">{sum==null?"Sorry, the aren't any expenses":textsum}</div>
      {oneexpense}
            </div>
        )
}
export default Archive;