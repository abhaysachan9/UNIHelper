from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
loader = TextLoader("university_data.txt")
documents = loader.load()

text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

embedding = HuggingFaceEmbeddings()

db = Chroma.from_documents(
    docs,
    embedding,
    persist_directory="vector_db"
)

db.persist()

print("Vector Database Created Successfully")