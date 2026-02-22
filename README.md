# ClinDoc AI — Clinical Documentation Optimization System

> Built for AHMC Health | AI-Powered Medical Documentation Tool

---

## Overview

ClinDoc AI is a web-based clinical documentation optimization tool that helps physicians rewrite and improve their clinical notes to align with MCG (Milliman Care Guidelines) criteria — reducing insurance denials and improving documentation quality.

---

## The Problem

Physicians often write raw, shorthand clinical notes that are:
- Missing critical details required by insurance companies
- Not aligned with MCG admission criteria
- Vulnerable to claim denials or downgrades
- Inconsistent in structure and clarity

This leads to **denied claims, delayed reimbursements, and additional administrative burden** on clinical staff.

---

## The Solution

ClinDoc AI takes a physician's raw clinical notes and an MCG guideline PDF, and uses AI to:
1. **Rewrite the notes** in a clear, structured, and insurance-compliant format
2. **Identify documentation gaps** that could cause insurance denial or downgrade

---

## Features

- **Single input box** for all clinical data — H&P, labs, vitals, imaging
- **MCG PDF upload** — drag and drop guideline document
- **Live section detector** — checks for HPI, vitals, labs, imaging, exam, and assessment in real time
- **Revised clinical notes** — AI-rewritten for MCG compliance
- **Missing criteria list** — numbered gaps with insurance risk explanations
- **Copy buttons** on both output panels
- **New Analysis** button to reset and start over

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (via Lovable) |
| AI Engine | Google Gemini Flash |
| Deployment | Lovable.app |
| Styling | Inline React styles |

---

## Live Demo

🔗 **App:** https://ahmc-ai-clinicdoc.lovable.app/

---

## How to Use

**Step 1 — Paste Clinical Documentation**

Paste all clinical information into the text box in one block:
- Chief Complaint & HPI
- Vital Signs
- Lab Results
- Imaging Findings
- Physical Exam
- Assessment & Plan

**Step 2 — Upload MCG Guideline PDF (Optional)**

Upload the MCG criteria PDF for the specific diagnosis. If no PDF is uploaded, the AI automatically applies standard inpatient MCG criteria.

**Step 3 — Click Analyze & Optimize**

The AI processes both inputs and returns:
- Fully rewritten clinical notes on the left
- Numbered list of documentation gaps on the right

---
