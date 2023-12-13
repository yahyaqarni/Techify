import React from 'react';
import styles from './genderinput.module.css'

const GenderInputSelect = (props) =>
    <div className={styles.wrap}>
        <label className={styles.fieldLabel} htmlFor={props.name}>
          {props.label}
        </label>
        <div className={styles.genderwrap}>
            <select className={styles.select} required {...props}>
                <option>Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
        </div>
    </div>
  
  

export default GenderInputSelect;