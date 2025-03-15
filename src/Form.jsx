
import {useState} from "react";
import axios from "axios";

const MicrositeForm=()=>{

    const initvalues={fullname:"",gender:"",dob:"",occupation:"", phone:"", email:"", password:"" };

    const [formvalues,setformvalues]=useState(initvalues);

    const [formerrors,setformerrors]=useState({});

    const handleChange=(e)=>
    {
        setformvalues({...formvalues,[e.target.name]:e.target.value});
        
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        const errors=validate(formvalues);
        setformerrors(errors);
        if (Object.keys(errors).length==0)
        {
            try {
                const response = await axios.post("http://127.0.0.1:5000/submit", formvalues, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
               
                console.log("Response from Flask:", response.data);
                window.location.reload();
            } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message);
            }
            

        }



    }

    const validate=(values)=>{
        const errors={};
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const nameRegex = /^[a-zA-Z ]{3,}$/;
        const today = new Date().toISOString().split("T")[0];
        const phoneRegex = /^[6-9]\d{9}$/;


        if(!values.firstname){
            errors.firstname="First Name is required";

        }
        else if (!nameRegex.test(values.firstname)) {
            errors.firstname = "First Name must contain only alphabets and be at least 3 characters long";
        }

        if(!values.lastname){
            errors.lastname="Last Name is required";

        }
        else if (!nameRegex.test(values.lastname)) {
            errors.lastname = "Last Name must contain only alphabets and be at least 3 characters long";
        }
        
        

        if(!values.gender){
            errors.gender="Gender is required";

        }

        if(!values.dob){
            errors.dob="Date of Birth is required";

        }
        else if (values.dob > today) {
            errors.dob = "Date of Birth cannot be in the future";
          }

          if (!values.occupation || values.occupation === "") {
            errors.occupation = "Please select a valid occupation";
          }

        if(!values.phone){
            errors.phone="Phone Number is required";

        }
        else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Enter a valid 10-digit phone number";
          }

        if(!values.email){
            errors.email="Email is required";

        }
        else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid email format";
          }

        

        return errors;



    }
    
    

    return (
        
            <div className="container">
        <h1>Registration Form</h1>
        <p>Please fill in your details</p>
        
        <form onSubmit={handleSubmit}>
        <div className="input-group">

            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" placeholder="Enter Your First Name" onChange={handleChange} />
            {formerrors.firstname && <span className="error">{formerrors.firstname}</span>}
            </div>

            <div className="input-group">

<label htmlFor="lastname">Last Name</label>
<input type="text" id="lastname" name="lastname" placeholder="Enter Your Last Name" onChange={handleChange} />
{formerrors.lastname && <span className="error">{formerrors.lastname}</span>}
</div>
    
            
    
        <div className="input-group">
        <label htmlFor="gender">Gender</label>
        <div className="gender-container">
        <input type="radio" id="male" name="gender" value="male" onChange={handleChange}/>
        <label htmlFor="male">Male</label>
        
    
        <input type="radio" id="female" name="gender" value="female" onChange={handleChange}/>
        <label htmlFor="female">Female</label>
    
        <input type="radio" id="other" name="gender" value="other"onChange={handleChange} />
        <label htmlFor="other">Other</label>
        </div>
        {formerrors.gender && <span className="error">{formerrors.gender}</span>}
            </div>


      <div className="input-group">
        <label htmlFor="DOB">Date of Birth</label>
        <input type="date" name="dob" placeholder="Enter your Date of Birth" onChange={handleChange}/>
        {formerrors.dob && <span className="error">{formerrors.dob}</span>}
            </div>

            <div className="input-group">
    
        <label htmlFor="Occupation">Occupation</label>
        <select id="occupation" name="occupation" onChange={handleChange}>
      <option value="">Select your Occupation</option>
      <option value="student">Student</option>
      <option value="employee">Employee</option>
      <option value="self-employed">Self-Employed</option>
      <option value="other">Other</option>
      </select>
      {formerrors.occupation && <span className="error">{formerrors.occupation}</span>}
            </div>


            <div className="input-group">
            
    
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your Phone Number" onChange={handleChange} />
            {formerrors.phone && <span className="error">{formerrors.phone}</span>}
            </div>


            <div className="input-group">

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter Your Email Address" onChange={handleChange} />
            {formerrors.email && <span className="error">{formerrors.email}</span>}
            </div>

            
    
            
            <button type="submit">Submit</button>
        </form>
    </div>
    
        );
    }
export default MicrositeForm;
     