# John Smith — Portfolio Content

*Sample portfolio. The first three projects are guided student adaptations; their sample results are illustrative. The two capstones are planned.*

## Home / About Me

- **John Smith — Computer System Technology student and aspiring AI/application developer.**
- **Education:** Saskatchewan Polytechnic, Computer System Technology Diploma, 2025–2027; expected graduation in 2027.
- **Location:** Saskatoon, Saskatchewan.
- **Introduction:** I build practical AI applications while developing my programming, testing, and documentation skills. My projects explore document retrieval, conversational interfaces, and machine learning.
- **My story:** Java and Python coursework introduced me to debugging and modular design. AI projects taught me to ask harder questions: Where did this answer come from? What happens when input is wrong? Can someone else reproduce the result?
- **Career goal:** Join a junior development team where I can contribute Python code, API integrations, tests, and clear documentation while learning through code review.
- **Role inspiration:** [Ericsson Junior AI Developer, Ottawa](https://ca.linkedin.com/jobs/view/junior-ai-developer-at-ericsson-4467574283)—Python, RAG, generative AI, engineering automation, and testing. This is the posting selected for the earlier résumé exercise.
- **Personal interests:** Badminton, local hiking, coding challenges, open-source learning tools, and accessible interfaces.
- **Photo:** Professional portrait placeholder.

## Projects

### 1. MultiPDF Study Assistant

- **Status:** Guided project, August 2026; sample refinements September 2026.
- **Summary:** Ask questions across several PDFs and inspect the passages supporting each answer.
- **Source:** [Alejandro AO — ask-multiple-pdfs](https://github.com/alejandro-ao/ask-multiple-pdfs).
- **Technologies:** Python, Streamlit, PyPDF2, LangChain, OpenAI embeddings, FAISS.
- **Challenge:** Find explanations across six course-style PDFs without repeatedly opening each document; distinguish supported answers from fluent guesses.
- **My contribution:** Recreated the tutorial’s extraction, chunking, indexing, retrieval, and conversational flow. Sample extensions add document/page metadata, a supporting-passage panel, reset, and empty-file checks.
- **Decisions and problem-solving:** Compared chunk sizes, tested follow-up questions, and identified scanned PDFs as an extraction limitation. Added a clear unsupported-input message rather than returning an unreliable answer.
- **Evidence:** Own answer-and-source screenshot, retrieval-flow diagram, question-level evaluation table, and code changes relative to the tutorial. The diagram explains the pipeline; the evaluation shows whether retrieved passages actually support answers.
- **Illustrative results:** Supported answers improved from 11/15 to 13/15; appropriate responses to out-of-scope questions improved from 2/5 to 4/5.
- **Reflection:** Became more confident checking evidence and explaining limitations. Next step: better page-aware chunking and a larger evaluation set.

### 2. LLM Chatbot

- **Status:** Guided project, June 2026; sample refinements September 2026.
- **Summary:** A conversational interface with coherent history and understandable recovery when requests fail.
- **Source:** [Streamlit — LLM Chatbot example](https://github.com/streamlit/llm-examples/blob/main/Chatbot.py).
- **Technologies:** Python, Streamlit, LLM API, session state, pytest.
- **Challenge:** Preserve the conversation when credentials are missing, a request times out, or a retry occurs.
- **My contribution:** Recreated the API and message-history example. Sample extensions add reset, input validation, specific error messages, and user-controlled retry.
- **Decisions and problem-solving:** Isolated the API boundary and simulated failures. Diagnosed duplicate messages after retry by tracing state updates; changed their order and repeated the same checks.
- **Evidence:** Captioned recovery demonstration, 12-case interaction checklist, code changes, and an anonymized feedback/revision log. These demonstrate debugging, communication, and responsiveness to feedback.
- **Illustrative results:** 12/12 interaction checks passed, including four failure paths; retry produced one user entry and one successful reply. These checks concern interaction behaviour, not answer accuracy.
- **Reflection:** Learned to approach failed demos calmly and make errors understandable to users. Next step: separate the UI and service logic more cleanly.

### 3. Penguin Prediction App

- **Status:** Guided project, March 2026; sample evaluation refinements October 2026.
- **Summary:** Predict a penguin species from measurements and explain what the prediction means.
- **Source:** [Data Professor — Penguin Classification App](https://github.com/dataprofessor/streamlit_freecodecamp/tree/main/app_8_classification_penguins).
- **Technologies:** Python, pandas, scikit-learn, RandomForestClassifier, Streamlit.
- **Challenge:** Establish performance on unseen examples and prevent invalid inputs from producing convincing-looking results.
- **My contribution:** Recreated the prediction interface. Sample extensions add independent evaluation, shared preprocessing, input validation, and a model card.
- **Decisions and problem-solving:** Used an illustrative balanced subset of 180 records: 120 training, 30 validation, and 30 test. Fixed a column-order mismatch by sharing the training/inference schema; kept the first version single-record.
- **Evidence:** Evaluation report, confusion matrix, prediction CSV, own interface screenshot, and model card. These demonstrate data preparation, analytical thinking, and honest interpretation.
- **Illustrative results:** 28/30 correct predictions (93.3%) and 8/8 validation checks. Two mistakes remained between Adelie and Chinstrap; the small balanced sample limits broader conclusions.
- **Reflection:** Learned that a polished interface and confident probabilities do not establish model quality. Next step: broader validation and deeper error analysis.

### 4. Engineering Knowledge Assistant

- **Status:** Planned capstone, October–December 2026; eight weeks, approximately 48–64 hours.
- **Summary:** A source-aware assistant for finding answers in engineering runbooks.
- **Source:** [Azure Samples — azure-search-openai-demo](https://github.com/Azure-Samples/azure-search-openai-demo).
- **Technologies:** React, TypeScript, Python/Quart, Azure OpenAI, Azure AI Search, document storage.
- **Challenge:** Distinguish similar troubleshooting symptoms across documents while integrating a separate interface, API, retrieval service, and citation view.
- **Planned contribution:** Adapt the text-only sample using 12 self-authored synthetic runbooks about CI failures, development environments, logs, and release checks. Add a prominent supporting-evidence view and useful failure messages.
- **Approach:** Establish keyword-search results, compare hybrid retrieval, and manually check answer support. Use 20 development questions and 40 separate evaluation questions; record cost and latency. Keep the scope to one small environment and a recorded public demo.
- **Evidence:** Original architecture diagram, question-level comparison report, source-checking video, cost/latency observations, and student code changes. Together they demonstrate integration, evaluation, and organized delivery.
- **Targets:** Supporting documents and supported answers on at least 27/30 answerable questions; appropriate insufficiency responses on at least 9/10 out-of-corpus questions; working citation links.
- **Expected growth:** Trace problems across multiple services, manage cloud complexity, and explain when retrieved evidence is insufficient. This is substantially more demanding than the single-app PDF tutorial.

### 5. ML Classifier & Quality Pipeline

- **Status:** Planned capstone, January–March 2027; eight weeks, approximately 48–64 hours.
- **Summary:** A reproducible text-classification service with checks for data, model quality, and API behaviour.
- **Source:** [Goku Mohandas — Made With ML](https://github.com/GokuMohandas/Made-With-ML).
- **Technologies:** Python, scikit-learn, PyTorch, MLflow, FastAPI, Ray Serve, Docker, GitHub Actions.
- **Challenge:** Keep preprocessing, training, evaluation, and serving consistent; determine whether a complex model earns its additional cost.
- **Planned contribution:** Compare a TF-IDF/logistic-regression baseline with one course-supported model configuration. Adapt the API, add a separate “needs review” flag, and create lightweight checks and Docker packaging.
- **Approach:** Check duplicates and schemas, reserve holdout data, track experiments, compare macro F1 and per-class recall, then test the local API. Keep training separate from fast CI checks; defer Kubernetes deployment.
- **Evidence:** Experiment comparison, model card, captioned API demo, passing and deliberately failing quality checks, and reproducible setup instructions. These show trade-off reasoning, testing, and ownership of the workflow.
- **Targets:** Holdout macro F1 ≥ 0.80, recall ≥ 0.70 for every class, and 20/20 API contract checks. No measured capstone results yet.
- **Expected growth:** Diagnose reproducibility problems and recognize when a simpler model is the better engineering choice. This extends well beyond a saved classifier behind a small interface.

## Skills & Certifications

- **Programming:** Python; Java, JavaScript, TypeScript, C#, and SQL through coursework or introductory practice.
- **Front end:** Streamlit, HTML5, CSS3, React, Tailwind CSS.
- **Back end and data:** FastAPI, Node.js, Express, ASP.NET Core, REST APIs, PostgreSQL, pandas.
- **AI/ML:** scikit-learn, LLM APIs, embeddings, LangChain, FAISS, RAG.
- **Tools:** Git, GitHub, Linux, pytest, Docker basics, Kubernetes fundamentals, Azure basics.
- **Technical evidence 1:** MultiPDF retrieval-flow diagram and evaluation—explains how extraction, indexing, and evidence connect to an answer.
- **Technical evidence 2:** Penguin evaluation report—demonstrates independent testing, error analysis, and recognition of limitations.
- **Soft-skill evidence 1:** Chatbot feedback/revision log—shows listening, communication, prioritization, and adapting an unclear error state.
- **Soft-skill evidence 2:** Penguin planning retrospective—documents a 12-hour refinement schedule, a schema bug, completed priorities, and the decision to defer batch uploads.
- **Working strengths:** Analytical problem-solving, organized debugging, clear explanations, openness to feedback, and realistic scope management.
- **Certifications:** None earned yet. Current learning focus: Azure fundamentals and practical deployment skills.

## Résumé

- **John Smith — Computer System Technology student seeking junior AI/application development work.**
- **Education:** Saskatchewan Polytechnic, Computer System Technology Diploma, 2025–2027; expected graduation 2027.
- **Profile:** Guided experience with Python applications, introductory machine learning, document retrieval, API integration, and technical documentation.
- **Project experience:** MultiPDF Study Assistant (August 2026), LLM Chatbot (June 2026), and Penguin Prediction App (March 2026). Two final-year capstones are planned.
- **Relevant learning:** Object-oriented programming, SQL/relational design, web development, debugging, and Git collaboration.
- **Core skills:** Python, SQL, Git, Streamlit, pandas, scikit-learn, LLM APIs, and RAG.
- **Download:** John Smith — Public Résumé (PDF).

## Contact

- **Email:** john.smith@example.com — sample address.
- **Location:** Saskatoon, Saskatchewan, Canada.
- **Availability:** Interested in graduate opportunities aligned with diploma completion in 2027.
- **GitHub / LinkedIn:** Actual profile links pending.
- **Message:** I welcome junior development opportunities, student collaborations, and constructive feedback on my projects.
- **Contact form:** Name, reply email, subject, and message; prepare an email draft for review before sending.
