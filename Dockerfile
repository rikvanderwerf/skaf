from python:3.7

RUN apt-get update

RUN addgroup skaf
RUN useradd -g skaf skaf

COPY coder-core /home/skaf/coder-core
COPY skaf /home/skaf/skaf
WORKDIR /home/skaf

RUN pip install -e coder-core
RUN pip install -e skaf

USER skaf

EXPOSE 6543
CMD ["python", "skaf/skaf/app.py"]
