from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

app = Flask(__name__)

# Load embeddings
embedding = HuggingFaceEmbeddings()

# Load vector database
db = Chroma(
    persist_directory="vector_db",
    embedding_function=embedding
)

@app.route("/ask", methods=["POST"])
def ask_question():

    data = request.get_json()
    question = data["question"]

    docs = db.similarity_search(question, k=2)

    answer = " ".join([doc.page_content for doc in docs])

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)