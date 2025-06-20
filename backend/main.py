import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create the FastAPI app instance
app = FastAPI()

# --- CORS Middleware ---
# This allows your frontend (running on a different URL) to make requests to this backend.
origins = [
    "http://localhost:5173",      # Default Vite local dev URL
    "http://localhost:3000",      # Default Create React App URL
    # Add your deployed frontend's URL here later, e.g., "https://your-app.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Supabase Initialization ---
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# --- API Endpoints ---
@app.get("/api/test-db")
def test_db_connection():
    """
    Reads the first message from the 'test_messages' table in Supabase.
    """
    try:
        response = supabase.table('test_messages').select("message").limit(1).single().execute()
        # .single() conveniently returns just the first object, raising an error if not found
        return {"message": response.data['message']}
    except Exception as e:
        print(f"Error connecting to Supabase: {e}")
        return {"message": "Error: Could not fetch message from Supabase."}

@app.get("/")
def read_root():
    return {"status": "Backend is running"} 