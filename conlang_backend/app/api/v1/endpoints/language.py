from fastapi import APIRouter, HTTPException
from app.models.schemas import LanguageSpec
from app.services.language_processor import process_language_spec

router = APIRouter()

@router.post("/submit", summary="Submit Language Spec", tags=["Language"])
async def submit_language_spec(language_spec: LanguageSpec):
    try:
        #  processing function
        result = process_language_spec(language_spec)
        return {"message": "Data submitted successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
