---
layout: project
title: "Neural Network Verification Toolkit"
tagline: "Open-source tools for formal verification of neural networks"
tech_stack: [Python, Z3, PyTorch, NumPy]
github: https://github.com/tgergo1/nn-verification
image: /img/2.jpg
---

## Overview

A collection of tools and libraries for formally verifying properties of neural networks, particularly focused on safety-critical applications in automotive and robotics.

## Features

- **Property Specification**: DSL for expressing safety properties
- **Multiple Verification Backends**: Support for Z3, Marabou, and α,β-CROWN
- **Visualization**: Interactive visualization of verification results
- **Integration**: Easy integration with PyTorch and TensorFlow models

## Use Cases

### Robustness Verification
Prove that neural networks are robust to input perturbations within specified bounds.

### Output Range Analysis
Verify that network outputs stay within safe bounds for given input ranges.

### Safety Property Checking
Verify domain-specific safety properties like collision avoidance in autonomous driving.

## Research

This toolkit has been used in multiple research papers and is actively developed in collaboration with academic institutions.
