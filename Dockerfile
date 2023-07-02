FROM python:3.10-slim

WORKDIR /appascovidwatch

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python3", "./wsgi.py"]