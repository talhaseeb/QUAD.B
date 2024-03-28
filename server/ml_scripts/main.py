# importing libraries
import sys
import pandas as pd
import json
import xgboost as xgb

# Load the XGBoost model
booster = xgb.Booster()
booster.load_model("./ml_models/xgboost_model_v1.json")

input_data = sys.stdin.read()

# Load JSON data from the input string
input_data_json = json.loads(input_data)

# Convert the JSON keys into column names
column_names = list(input_data_json.keys())

# Create a DataFrame with the JSON data and updated column names
df = pd.DataFrame([input_data_json], columns=column_names)

# Use the XGBoost model to make predictions
predictions = booster.predict(xgb.DMatrix(df))

# Print the predictions
print(predictions[0])
sys.stdout.flush()