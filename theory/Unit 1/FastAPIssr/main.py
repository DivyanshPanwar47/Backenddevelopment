from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates


app = FastAPI()
templates = Jinja2Templates(directory=".")


students = [
	{"name": "Divyansh Panwar", "sap_id": "590018990", "batch": "B.Tech CSE Core 5"},
]
@app.get("/")
@app.get("/students")
async def students_page(request: Request):
	return templates.TemplateResponse(
		request=request,
		name="students.html",
		context={"students": students},
	)
