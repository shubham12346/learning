---
# These are metadata fields whose value need to be filled for parsing.
deciders: { 'Shubham Agrahari', 'Vijay Reddy' }
consulted: { 'Akshay Petani', 'Paresh Kakadiya' }
informed:
  { 'Shubham Agrahari', 'Vijay Reddy', 'Kinnaree Parasana', 'Dhanashree Kale' }
---

# [ADR-2][gap-assessment-avery-1-2]

Date: 2024-06-25
Status: Proposed

## Context

To ingest the firm’s compliance policies and conduct a Gap Analysis against the firms' uploaded policies, and Avery’s golden policies using AI. Take the AI
output that consists of suggestions for changes, and additions that may be missing from the firms' policies, as well as an overall Gap Analysis score per policy,
providing them with the option to automatically “accept” the suggested changes (remediation – update their existing policies), or add the Gap Analysis output as a
task that the firm can address as they wish.

## Decision

- Description : <br/>
  1. To add a gap assessment tab (ui component as mentioned in figma) in the regulations menu in which user can view generated gap assessment.
  2. To add gap analysis screen on the ui for uploading policies to generate gap analysis
- Justification: <br/>
  Adding a gap assessment tab and gap analysis screen helps users easily upload and view gap assessment. It puts all relevant information in one place, making it simpler to stay up-to-date with regulations. This improvement boosts efficiency and ensures better regulatory compliance.

## Deliverables

- Gap assessment tab component in regulations <br/>
- Gap analysis tab in mydocs to upload policies <br/>

## References

- Avery1.2 documentation on confluence: <br/>
  https://surgeventures.atlassian.net/wiki/spaces/ABR/pages/112197637/Avery+1.2+Release+Feature

- Avery1.2 Screen on the figma : <br/>
  https://www.figma.com/design/86FqAlWJO4UP6Ey3oEcjaW/Surge-Ventures-Design?node-id=5091-42802&t=sGAHUZr9Jjdz4Hay-0
