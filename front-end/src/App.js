import logo from './logo.svg';
import './App.css';
import { paymentData } from './paymentData';
import { useState } from 'react';
import { useRef } from 'react';

function App() {
    const [inputshemeData,setInputShemeData] =  useState({shemeType:"",serviceType:"",subServicesType:"",paymentModeType:"",paymentOptionType:""})
    const [totalValue,setTotalValue] = useState()
    const [inputValue ,setInputValue] = useState()
    console.log(inputshemeData)
    //console.log(typeof(inputValue.current))

    const serviceFun = ()=>{
           
             if(inputshemeData.shemeType){
              let servicesData=[]
              let shemeData = paymentData.find((item)=> item._id.$oid == inputshemeData.shemeType )
                  shemeData.services.map((item)=>{
                                      if(item.serviceName && !servicesData.includes(item.serviceName)){
                                         servicesData.push(item.serviceName)
                                         }
              })
              return servicesData.map((service)=>{
                         return (<option>{service}</option>)
              })
             }else{
                 
             }
    }

    const subServicesFun=()=>{
             
       if(inputshemeData.shemeType && inputshemeData.serviceType){
              let subServicesData=[]
              let shemeData = paymentData.find((item)=> item._id.$oid == inputshemeData.shemeType )
                      shemeData.services.map((item)=>{
                                      if(item.serviceName == inputshemeData.serviceType){
                                       subServicesData.push(item.subService)
                                         }
              })
              return subServicesData.map((item)=>{
                         return (<option>{item}</option>)
              })
             }

    }

    const paymentModeFun=()=>{
               
      if(inputshemeData.shemeType && inputshemeData.serviceType && inputshemeData.subServicesType){
         let paymentMods=[]
         let shemeData = paymentData.find((item)=> item._id.$oid == inputshemeData.shemeType )
         let subServiseData = shemeData.services.find((item)=> item.subService == inputshemeData.subServicesType)
         subServiseData.paymentConfigurations.map((item)=>{
            if(item.paymentMode && !paymentMods.includes(item.paymentMode)){
               paymentMods.push(item.paymentMode)
               }
             })

         //  console.log(subServiseData)      
         return paymentMods.map((item)=>{
                    return (<option>{item}</option>)
         })
        }
               

    }

    const paymentOptionFun=()=>{
             
      if(inputshemeData.shemeType && inputshemeData.serviceType && inputshemeData.subServicesType && inputshemeData.paymentModeType){
         let paymentOptions=[]
         let shemeData = paymentData.find((item)=> item._id.$oid == inputshemeData.shemeType )
         let subServiseData = shemeData.services.find((item)=> item.subService == inputshemeData.subServicesType)
         subServiseData.paymentConfigurations.map((item)=>{
            if(item.paymentMode == inputshemeData.paymentModeType){
               paymentOptions.push(item)
               }
             })

         //  console.log(subServiseData)      
         return paymentOptions.map((item)=>{
                    return (<option style={{display:"block"}}value={item.paymentOption}>{item.paymentOption} ( ProcessingFee:{item.processingFee} , ProcessingPercentage:{item.processingPercentage} , CommissionFee:{item.commissionFee})</option>  )
         })
        }

    }

    const finalValueFun = ()=>{
      if(inputshemeData.shemeType && inputshemeData.serviceType && inputshemeData.subServicesType && inputshemeData.paymentModeType && inputshemeData.paymentOptionType){
       
         let shemeData = paymentData.find((item)=> item._id.$oid == inputshemeData.shemeType )
         let subServiseData = shemeData.services.find((item)=> item.subService == inputshemeData.subServicesType)
         let paymentFees =  subServiseData.paymentConfigurations.find((item)=> item.paymentOption == inputshemeData.paymentOptionType)
       //  console.log(paymentFees)
         let value= parseInt(inputValue)
          let totalValue =value+value*(parseInt(paymentFees.processingPercentage)/100)+parseInt(paymentFees.commissionFee)+parseInt(paymentFees.processingFee)
        //  console.log(totalValue)
           
          return totalValue
         
        }
    }

    
console.log(inputValue)

  return (<>
  <div>
   <div style={{textAlign:'center',margin:"20px"}}><input type="number" required onChange={(e)=>{setInputValue(e.target.value)}}/></div> 
          <div style={{display:"flex",justifyContent:"space-between",margin:"0px 20px"}}>
             
             <div>
              <select value={inputshemeData.shemeType} onChange={(e)=>{setInputShemeData({shemeType:e.target.value,serviceType:"",subServicesType:"",paymentModeType:"",paymentOptionType:""})}}>
               <option value="">Select Scheme</option>
                  {inputValue ? paymentData.map((item,index)=>{
                       return (<option value={item._id.$oid}>{item.schemeName}</option>)
                  }) : ""} 
              </select>
             </div>

             <div>
              <select value={inputshemeData.serviceType} onChange={(e)=>{setInputShemeData((prev)=>({...prev,serviceType:e.target.value,subServicesType:"",paymentModeType:"",paymentOptionType:""}))}}>
              <option value="">Select Service</option>
                 {serviceFun()}
              </select>
             </div>


             <div>
                  <select value={inputshemeData.subServicesType}  onChange={(e)=>{setInputShemeData((prev)=>({...prev,subServicesType:e.target.value,paymentModeType:"",paymentOptionType:""}))}}>
                  <option value="">Select Sub Service</option>
                     {subServicesFun()}
                  </select>
             </div>

             <div>
                  <select value={inputshemeData.paymentModeType} onChange={(e)=>{setInputShemeData((prev)=>({...prev,paymentModeType:e.target.value,paymentOptionType:""}))}}>
                  <option value="">Select Payment Mode</option>
                     {paymentModeFun()}
                  </select>
             </div>

             <div>
               <select value={inputshemeData.paymentOptionType} onChange={(e)=>{setInputShemeData((prev)=>({...prev,paymentOptionType:e.target.value}))}}>
               <option value="">Select Payment Option</option>
                  {paymentOptionFun()}
               </select>
             </div>
             
             <div>
               <input value={inputshemeData.paymentOptionType ? finalValueFun() :""}  type='number' required />
             </div>

          </div>
          </div>
  </>);
}

export default App;
