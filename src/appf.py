
from flask import Flask,request,jsonify
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv
import os


app=Flask(__name__)
CORS(app)

load_dotenv()

HUBSPOT_ACCESS_TOKEN = os.getenv("HUBSPOT_ACCESS_TOKEN")
HUBSPOT_API_URL=os.getenv("HUBSPOT_API_URL")

@app.route("/submit", methods=["POST"])
def submit_form():
    try:
        data = request.json  
        
        contact_data = {
            "properties": {
                "firstname": data.get("firstname"), 
                "lastname": data.get("lastname"),
                "gender": data.get("gender"),
                "date_of_birth": data.get("dob"),
                "occupation": data.get("occupation"),
                "phone": data.get("phone"),
                "email": data.get("email"),
                 
            }
        }

        headers = {
            "Authorization": f"Bearer {HUBSPOT_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }

        response = requests.post(HUBSPOT_API_URL, headers=headers, json=contact_data)
        

        

        if response.status_code == 201:
            
            return jsonify({"message": "Data successfully sent to HubSpot"}), 201
        else:
            return jsonify({"error": response.text}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)