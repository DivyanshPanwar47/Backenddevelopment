# Experiment 15: Django Todo Application

This implementation follows the course handout's v1 and v2 requirements. It builds a SQLite-backed Django Todo application and demonstrates:

- Django's MVT structure and management commands;
- Create, read, update and delete operations for `Task` records;
- CSRF-protected POST forms for all state-changing actions;
- Django Admin registration with columns, filters and search;
- template inheritance through `base.html` and `{% extends %}`;
- reusable header/footer fragments through `{% include %}`; and
- app-scoped static CSS, JavaScript and a generated `logo.png` asset.

## Run locally

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py test
python manage.py runserver
```

Open <http://127.0.0.1:8000/> for the Todo UI. Create an administrator with `python manage.py createsuperuser`, then open <http://127.0.0.1:8000/admin/>.

## Project structure

```text
EXP-15/
â”œâ”€â”€ manage.py
â”œâ”€â”€ requirements.txt
â”œâ”€â”€ todo_project/              # site settings and root URLs
â””â”€â”€ todo/
    â”œâ”€â”€ admin.py               # Task registration/customization
    â”œâ”€â”€ apps.py                # app metadata/configuration
    â”œâ”€â”€ models.py              # SQLite-backed Task model
    â”œâ”€â”€ views.py               # CRUD request handlers
    â”œâ”€â”€ templates/todo/        # base, includes and child pages
    â””â”€â”€ static/todo/           # CSS, JS and logo.png
```

`admin.py` controls how `Task` appears in Django Admin; `apps.py` identifies and configures the application. `{% extends %}` reuses a complete parent layout, while `{% include %}` inserts a reusable fragment such as the header or footer.

