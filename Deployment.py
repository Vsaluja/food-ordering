# Backend Instructions

# Create a Procfile inside the directory where the manage.py file is
# web: gunicorn main.wsgi --log-file -

# In order to deploy the UI for django framework i.e. admin panel UI
# -Install whitenoise https://whitenoise.readthedocs.io/en/stable/django.html
# Configure it
# # For rendering static files while deploying using whitenoise
# STATIC_URL = 'static/'
# STATIC_DIRS = [
#     BASE_DIR / 'static'
# ]  # 'static' is the name of the folder that we create manually if we use custom static files like html css js etc but in this project we have not used any custom static file
# # Below staticfiles folder holds django's default static files for admin panel etc
# STATIC_ROOT = BASE_DIR / "staticfiles"
# STORAGES = {
#     # ...
#     "staticfiles": {
#         "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
#     },
# }
