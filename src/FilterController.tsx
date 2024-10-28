import React from 'react'

import styles from "./app.module.css"

interface FilterControllerProps {
    handleStatusChanged: (status: string) => void;  // function to handle status change
    minPrice: number;                               // minimum price range value
    maxPrice: number;                               // maximum price range value
    minValue: number;                               // currently selected minimum price
    maxValue: number;                               // currently selected maximum price
    handleMinChange: React.ChangeEventHandler<HTMLInputElement>; // min slider change handler
    handleMaxChange: React.ChangeEventHandler<HTMLInputElement>; // max slider change handler
  }

function FilterController({handleStatusChanged,minPrice,maxPrice,minValue,handleMinChange,maxValue,handleMaxChange}: FilterControllerProps) {
 
    // Calculate the percentage position of each slider thumb relative to the min/max price range
    const minPercent = ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;

    function formatNumber(num: number): string {
        if (num >= 1_000_000) {
          return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
        } else if (num >= 1_000) {
          return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        else{
          return `${num}`
        }
      
      }


      let statusValArr = ['available' , 'reserved' , 'sold' , ''];
      let statusTextArr = ['Available' , 'Reserved' , 'Sold' , 'All'];
    
 
    return (
    <div className={styles.filter_controler}>
    <div className={styles.filter_controler_item}>
      <span>Type</span>
      <div className={styles.filter_controler_item_btns}>
        {
          statusValArr.map((item,index)=>(
            <button key={index} className={styles.filter_controler_item_btn} onClick={()=>{handleStatusChanged(item)}} >{statusTextArr[index]}</button>
          ))
        }
      </div>
    </div>

    <div className={styles.filter_controler_item} >
    <label htmlFor="rangeSlider">Price:</label>
    <div className={styles.sliders_control}>
      <input id={styles.fromSlider}
       type="range"  min={minPrice} max={maxPrice}
       value={minValue}
       onChange={handleMinChange}
       style={{ zIndex: minValue > maxValue - 1 ? 5 : 3 }}
       />
      <input id={styles.toSlider} type="range"
        min={minPrice} max={maxPrice}
        value={maxValue}
        onChange={handleMaxChange}
        />
        
        <div
        className={styles.slider_track}
        style={{
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
        }}
      />
  </div>
    
    <div className={styles.maxMin_div}>
    <span>Min: {formatNumber(minValue)}$</span>
    <span>Max: {formatNumber(maxValue)}$</span> 
    </div>
  </div>

   </div>
  )
}

export default FilterController