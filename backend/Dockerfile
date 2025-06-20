# Use an official, slim Python image as the starting point
FROM python:3.10-slim

# Set the working directory inside the container to /code
WORKDIR /code

# Copy ONLY the requirements file first for Docker layer caching
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Now, copy the rest of your application code into the container
COPY . .

# This command starts your server when the container runs
# It tells uvicorn to run the 'app' object from the 'main.py' file
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"] 