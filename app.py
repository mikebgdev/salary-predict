from flask import Flask, render_template, request
import pandas as pd
import pickle

app = Flask(__name__)

with open('pickles/pipeline.pickle', 'rb') as f:
    loaded_pipe = pickle.load(f)

with open('pickles/jobs.pickle', 'rb') as f:
    joblist = pickle.load(f)

with open('pickles/job_mapping.pkl', 'rb') as f:
    job_mapping = pickle.load(f)

with open('pickles/education_mapping.pkl', 'rb') as f:
    education_mapping = pickle.load(f)

data_columns = ["Education Level", "Job Title", "Age", "Years of Experience"]
education = ["Bachillerato", "Grado", "Master", "Doctorado"]


@app.route('/', methods=['POST', 'GET'])
def home():
    if request.method == 'GET':
        return render_template('home.html', joblist=job_mapping, education=education_mapping)
 
    test_data = pd.DataFrame([[request.form["education"],request.form["job"],request.form["age"], request.form["exp"]]], columns=data_columns)
    prediction = loaded_pipe.predict(test_data)
    final_numbero = round(prediction[0])

    return render_template('post.html',prediction=final_numbero)
