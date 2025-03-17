# Microsite Development with CRM Integration  

## Overview  
This project involves developing a microsite that collects user responses.  
- The frontend is built using React.js to receive responses.  
- The backend is developed using Flask (Python) to process responses and integrate with HubSpot CRM via the HubSpot API for data storage and lead segmentation.  
- A Streamlit dashboard visualises CRM data using interactive graphs, updating automatically whenever new data is added.  

## Project Links  
- [Microsite Link](https://form-microsite.onrender.com )  

- [Flask API Link](https://flask-backend-nizg.onrender.com ) 

- [Streamlit Dashboard Link](https://crm-data-visualisation.streamlit.app/) 

## Architecture  

- **Microsite**: Collects user responses with form validation and handles secure submission over HTTPS.  
- **Flask API**: Receives responses from the microsite, processes them, and integrates with HubSpot CRM.  
- **HubSpot CRM**: Stores collected user data and performs lead segmentation.  
- **Streamlit Dashboard**: Retrieves CRM data using API calls and visualises insights with interactive graphs.  

## Tools & Technologies Used  

- Microsite: HTML, CSS, React.js  
- Backend: Flask (Python)  
- CRM & Data Storage: HubSpot CRM  
- Data Visualisation: Streamlit, Matplotlib, Seaborn  
- Hosting & Deployment: Render (for Microsite & Flask API), Streamlit Community Cloud (for Dashboard)  
- APIs: HubSpot API (for data storage & retrieval)  

