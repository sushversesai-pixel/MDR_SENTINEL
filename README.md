# MDR Sentinel- AI-Powered Infection Surveillance and Early Outbreak Prediction Platform

## Abstract

MDR Sentinel is a proposed infection surveillance platform designed to improve the way hospitals monitor and respond to Multi-Drug Resistant (MDR) infections. Traditional infection control primarily depends on laboratory confirmation and manual contact tracing, which often detect outbreaks only after transmission has occurred.

MDR Sentinel introduces a proactive approach by combining Bluetooth Low Energy (BLE), Internet of Things (IoT), Artificial Intelligence (AI), Graph Analytics, and Digital Twin technology to support continuous monitoring, automated contact tracing, and early infection risk assessment. The objective is to assist healthcare professionals in identifying potential outbreaks earlier, improving operational response, and enhancing patient safety.

The current repository contains the interactive frontend prototype and the proposed system architecture developed during the hackathon.

---

# Problem Statement

Hospital-acquired MDR infections remain one of the most critical challenges in modern healthcare.

Current monitoring systems often rely on delayed laboratory reports, manual investigations, and retrospective analysis. As a result, infection control teams may receive actionable information only after transmission has already occurred.

There is a need for a system capable of providing real-time situational awareness and supporting proactive infection prevention.

---

# Proposed Solution

MDR Sentinel is designed as an intelligent decision-support platform for hospital infection control.

The proposed workflow includes:

* Indoor location tracking using Bluetooth Low Energy (BLE)
* Continuous interaction monitoring
* AI-assisted infection risk assessment
* Automated exposure analysis
* Graph-based transmission mapping
* Digital Twin visualization of hospital activity
* Real-time notifications for high-risk situations
* Role-based dashboards for healthcare professionals

Rather than replacing existing hospital systems, MDR Sentinel is intended to integrate with them and provide an additional layer of predictive intelligence.

---

# Key Features

* Role-based dashboards for Doctors, Nurses, and Infection Control Teams
* AI Prediction interface for infection risk estimation
* Infection Replay Engine for transmission visualization
* What-if Simulation for evaluating intervention strategies
* Digital Twin interface for live hospital monitoring
* Environmental Hygiene Score visualization
* Interactive prototype demonstrating the proposed workflow

---

# System Architecture

The proposed architecture consists of the following stages:

1. BLE tags assigned to patients and healthcare staff.
2. BLE receivers collect indoor location and interaction data.
3. Hospital records, laboratory reports, and location data are consolidated.
4. The Exposure Engine evaluates interactions and calculates infection risk.
5. AI models estimate outbreak probability.
6. Graph Analytics identifies transmission chains and infection clusters.
7. Digital Twin visualizes hospital activity in real time.
8. Alerts are generated for infection control teams when risk thresholds are exceeded.

---

# Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

## Proposed Backend

* Node.js
* NestJS
* REST APIs
* MQTT

## Databases

* MongoDB
* Neo4j Graph Database

## Artificial Intelligence

* Python
* FastAPI
* Scikit-learn
* XGBoost
* MLflow

## IoT

* Bluetooth Low Energy (BLE)

---

# Project Structure
```
MDR-Sentinel/
│
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

# Prototype Status

This repository represents the frontend prototype and conceptual architecture developed during the hackathon.

### Implemented

* Interactive user interface
* Role-based dashboards
* AI Prediction prototype
* Infection Replay Engine
* What-if Simulator
* Digital Twin visualization
* User workflow and navigation

### Planned

* BLE hardware integration
* Backend APIs
* MongoDB integration
* Neo4j integration
* AI model deployment
* Real-time data streaming
* Hospital Information System integration

---

# Expected Impact

If implemented in clinical environments, MDR Sentinel could contribute to:

* Earlier identification of infection risks
* Faster contact tracing
* Improved infection surveillance
* Better allocation of healthcare resources
* Enhanced patient and healthcare worker safety
* Data-driven infection control

---

# Future Work

Future development will focus on integrating live hospital infrastructure, validating predictive AI models using anonymized healthcare datasets, implementing BLE communication, and deploying the system within a pilot hospital environment.

---
## Live Demo

The prototype is available online and can be accessed using the link below:

**https://rlakshmisridivya.github.io/MDR_SENTINEL/**

This deployment demonstrates the current frontend prototype, user workflow, and interface of MDR Sentinel.

---
