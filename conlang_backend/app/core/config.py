from pydantic_settings import BaseSettings 

class Settings(BaseSettings):
    PROJECT_NAME: str = "Conlang Generator"
    VERSION: str = "1.0.0"
    OPENAI_API_KEY: str  
    class Config:
        env_file = ".env" 


settings = Settings()
