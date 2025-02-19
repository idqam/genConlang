from pydantic_settings import BaseSettings 

class Settings(BaseSettings):
    PROJECT_NAME: str = "Conlang Gen Backend"
    VERSION: str = "1.0.0"

    class Config:
        env_file = ".env"

settings = Settings()
