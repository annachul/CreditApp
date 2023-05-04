import React, { useEffect } from "react"
import "./index.css";
import { Chart } from "react-google-charts";

function  Analysis(){
    const [data, setData] = React.useState([])
    const [category, setCategory] = React.useState(1)
    var date = new Date()
    var todaymonth=date.getMonth()+1 
    var todayear=date.getFullYear()
    var year=todayear
    if (date.getMonth()<9){
        var month="-0"+todaymonth
    }
    else {month="-"+todaymonth}
    const [selectedMonthandYear, setselectedMonthandYear] =React.useState(date.getFullYear()+month);


    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://127.0.0.1:8000/api/categories/1?month='+todaymonth+'&year='+todayear, {
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
                }    
          })
          .then (response => response.json())
          .then(response => {

            setData(response['General']);
        })
    }
        fetchData();
      }, []);



      const handleRequest= (event) => {
        const {value} = event.target
        setselectedMonthandYear(value)
        year=value.slice(0,4)
        if(value.slice(5,5=="0")){
            month=value.slice(6)
        }
        else {
            month=value.slice(5)
        }
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/categories/1?month='+month+'&year='+year, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user-token")}`
                    }    
              })
              .then (response => response.json())
              .then(response => {

                setData(response['General']);
            })
        }
          fetchData();
  
      }


      const handlePress = (val, sum) => {
        if(sum!=0){
            year=selectedMonthandYear.slice(0,4)
            if(selectedMonthandYear.slice(5,5=="0")){
                month=selectedMonthandYear.slice(6)
            }
            else {
                month=selectedMonthandYear.slice(5)
            }
        const fetchData = async () => {
          const response = await fetch('http://127.0.0.1:8000/api/categories/' +val +'?month='+month+'&year='+year, {
            headers: {
                'Authorization': `Token ${localStorage.getItem("user-token")}`
            }
          })
          .then (response => response.json())
          .then(response => {setData(response[Object.keys(response)[0]])})

        }
        fetchData();

    }}


      const list = data.map((item, index) => (
      [item.name, item.sum]
      ));
      const options = {
        title: "Spent in "+selectedMonthandYear,
        backgroundColor:"#e6e6fa"
      };
      
      var piedata=[["Category", "Sum"]]
      piedata=piedata.concat(list)
      

    
        return (
            <div>
                <div className="month">
                <div className="input">
                    <input
                    type="month" 
                    id="selectedMonthandYear"
                    name="selectedMonthandYear"
                    value={selectedMonthandYear}
                    placeholder="Date"
                    onChange={handleRequest}
                    />
                </div>
                <div className="back" style={{cursor:'pointer'}} onClick={() =>{handlePress(1, 1)}}> Back </div>
                </div>
                <div className="month">
                <Chart
      chartType="PieChart"
      data={piedata}
      options={options}
      width={"800px"}
      className="pie"
      height={"400px"}
    />
    <div className="allcat">
    {data.map((cat)=>
        {
            return(
    <div>
    <div key={cat.id} className="each">
    <div style={{cursor:'pointer'}} onClick={() =>{handlePress(cat.id, cat.sum)}} className="cat">
    {cat.name} </div>
       <div className="sum">{cat.sum} $</div>
       </div>
       <hr></hr>
    </div>
    )
        })}
        </div>
        </div>
            </div>
        )

}
export default Analysis;