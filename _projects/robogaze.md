---
layout: project
title: "roboGaze - Driver Monitoring System"
tagline: "AI-powered driver attention and distraction detection for automotive safety"
tech_stack: [TensorFlow, Python, C++, CUDA, Docker, Kubernetes]
github: https://github.com/roboGaze
image: /img/7.jpg
---

## Overview

roboGaze is an advanced driver monitoring system that uses machine learning to detect driver attention, distraction, and drowsiness in real-time. The system is designed to meet automotive industry safety standards including ASPICE and ASIL.

## Key Features

- **Real-time Detection**: Process video streams at 30+ FPS
- **Multi-modal Analysis**: Combines gaze tracking, head pose, and facial features
- **Formally Verified**: Neural networks verified for robustness and safety
- **Edge Deployment**: Optimized for automotive-grade embedded systems

## Technical Highlights

### Machine Learning Pipeline
- Custom CNN architectures for facial landmark detection
- Ensemble models for robust predictions
- Continuous learning from production data

### Formal Verification
- SMT solver-based verification of critical decision boundaries
- Robustness certificates for adversarial inputs
- Compliance with ISO 26262 standards

### Deployment
- Containerized microservices architecture
- CI/CD pipeline with automated testing
- Cloud-based model training and edge inference

## Impact

Deployed in multiple vehicle fleets, helping reduce accidents caused by driver distraction. The system has processed over 10 million hours of driving data.
