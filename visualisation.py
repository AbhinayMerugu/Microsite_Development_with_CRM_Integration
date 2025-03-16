import streamlit as st
import pandas as pd
from dotenv import load_dotenv
import requests
import matplotlib.pyplot as plt
import seaborn as sns
import os
from datetime import datetime

st.set_page_config(layout="wide")



load_dotenv()

HUBSPOT_ACCESS_TOKEN=os.getenv("HUBSPOT_ACCESS_TOKEN")
HUBSPOT_API_URL=os.getenv("HUBSPOT_API_URL")
#HUBSPOT_API_URL_LISTS=os.getenv("HUBSPOT_API_URL_LISTS")

properties={"firstname","lastname","gender","date_of_birth","occupation","phone","email"}

HEADERS = {
    "Authorization": f"Bearer {HUBSPOT_ACCESS_TOKEN}",
    "Content-Type": "application/json"
}


def fetch_data():
    params = {"properties": ",".join(properties),"limit": 100}
    response_con = requests.get(HUBSPOT_API_URL_CONTACTS, headers=HEADERS, params=params)

    if response_con.status_code == 200:
        result = response_con.json()
        data = []
        for item in result.get("results", []):
            props = item.get("properties", {})
            data.append({
                "First Name": props.get("firstname"),
                "Last Name": props.get("lastname"),
                "Gender": props.get("gender"),
                "DOB": props.get("date_of_birth"),
                "Occupation": props.get("occupation"),
                "Phone Number": props.get("phone"),
                "Email": props.get("email"),

            })
        return pd.DataFrame(data)
    else:
        st.error(f"Error fetching data: {response_con.json()}")
        return pd.DataFrame()
    


    

st.title("CRM Data Visualisation")


df1= fetch_data()
#df2= fetch_lists()

if not df1.empty:


    df1["Age"] = pd.to_datetime(df1["DOB"], errors="coerce").apply(lambda x: datetime.now().year - x.year if pd.notnull(x) else None)


    

    col1,col2,col3=st.columns(3)

    with col1:
        st.write("Gender Distribution")
        gender_counts = df1["Gender"].value_counts()
        st.bar_chart(gender_counts,y_label="Count",x_label="Gender",height=450)
        
        
        st.write("Gender Distribution by Occupation")
        fig,ax=plt.subplots(figsize=(5,4))

        sns.countplot(df1,x="Gender",hue="Occupation",ax=ax)
        ax.set_xlabel("Gender")
        ax.set_ylabel("Count")
        ax.set_yticks(range(0,df1["Gender"].value_counts().max()+1,1))
        st.pyplot(fig)
        
        st.write("Gender Distribution by Age")
        ans=df1.groupby("Gender")["Age"].mean()
        st.bar_chart(ans,y_label="Count",x_label="Gender",height=420)

    with col2:
        st.write("Occupation Distribution")
        occupation_counts = df1["Occupation"].value_counts()
        st.bar_chart(occupation_counts,y_label="Count",x_label="Occupation",height=450)

        st.write("Occupation Distribution by Gender")
        fig,ax=plt.subplots(figsize=(5,4))

        sns.countplot(df1,x="Occupation",hue="Gender",ax=ax)
        ax.set_xlabel("Occupation")
        ax.set_ylabel("Count")
        ax.set_yticks(range(0,df1["Occupation"].value_counts().max()+1,1))
        st.pyplot(fig)

        st.write("Occupation Distribution by Age")
        ans=df1.groupby("Occupation")["Age"].mean()
        st.bar_chart(ans,y_label="Count",x_label="Gender",height=420)

    with col3:
        st.write("Age Distribution")
        fig,ax=plt.subplots(figsize=(5,4))
        ax.hist(df1["Age"],bins=10)
        ax.set_xlabel("Age")
        ax.set_ylabel("Count")
        st.pyplot(fig)

        
        
             

             


    
    


