from dotenv import load_dotenv
import os

# Construct path to the .env file in the parent directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

api_key = os.getenv("OPENAI_API_KEY")
print("Loaded API Key:", api_key)
