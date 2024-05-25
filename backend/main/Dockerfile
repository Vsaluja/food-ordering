# # Use the official Python image from the Docker Hub
# FROM python:3.9

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy the requirements file into the container
# COPY requirements.txt ./

# # Install the dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code into the container
# COPY . .

# # Expose the port on which the Django app runs
# EXPOSE 8000

# # Command to run the Django application
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Cant use above because Railway wants to use for product below commands

# Use the official Python image from the Docker Hub
FROM python:3.9

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the requirements file into the container
COPY requirements.txt ./

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the Django app runs
EXPOSE 8000

# Command to run the Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.main.main.wsgi:application"]