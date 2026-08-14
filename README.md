# Clara — Agentic AI Workflow for Insurance Claims Automation

Demo Video: [![Demo Video](https://img.shields.io/badge/YouTube-Video-red?logo=youtube)](https://www.youtube.com/watch?v=uy74DTxScvI)
<br>
Product Requirements Document: [Link to PRD](/clara_prd.pdf)

## What is Clara

Clara is an agentic AI workflow built with Python and Structify, designed to detect, extract, and visualize critical unstructured medical context from patient records and claims data.  
By deploying specialized AI agents on the Airia Platform, Clara automates high-risk claims review:  
- Produces structured summaries of complex medical records  
- Outputs a pass/fail recommendation along with a confidence score  
- Enables insurers to quickly accept or reject claims, reducing manual review overhead  

## Why Clara Matters

- **Significantly reduces manual toil** — claims review time drops from ~20 min to just 5–7 min per case (~65–75% faster).  
- **Improves consistency & compliance** — standardized extraction of relevant medical context and policy logic.  
- **Scales efficiently** — handles large volumes of claims in parallel, enabling faster decision cycles.  
- **Clear traceability** — AI-generated summaries + confidence scores give reviewers transparency and auditability.  

## Key Features

- Python pipeline leveraging Structify for unstructured medical record parsing  
- Multi-agent orchestration on Airia Platform for context extraction + decisioning  
- Automatic generation of structured metadata (e.g. medical context, claim flags)  
- Pass/fail recommendation + confidence score output for each claim  
- Easy-to-use interface: clinics submit cases through their own portal, and insurers review the AI-generated analysis (context extraction + pass/fail prediction) before quickly accepting or rejecting claims.

## Getting Started

### Prerequisites

- Python 3.8+  
- Access credentials for Airia Platform (if deploying agents there)
