import React from 'react'
import styles from './textfield.module.css'

const TextField = (props) => {
  return (
    <div className={styles.inputbox}>
      <label className={styles.fieldLabel} htmlFor={props.name}>
          {props.label}
        </label>
      <div className={styles.textField}>
        <input className={styles.input} type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.handle} 
        required
        />
      </div>
    </div>
    
  )
}

export default TextField