---
# These are metadata fields whose value need to be filled for parsing.
deciders: { 'Shubham Agrahari', 'Vijay Reddy' }
consulted: { 'Akshay Petani', 'Paresh Kakadiya' }
informed:
  { 'Shubham Agrahari', 'Vijay Reddy', 'Kinnaree Parasana', 'Dhanashree Kale' }
---

# [ADR-3][enforcement-action-avery-1.2]

Date: 2024-07-03
Status: Proposed

## Context

To provide a mapping between regulations and enforcement actions. Allowing users to better understand their risk of non-compliance per each regulation they
have to comply with, by leveraging our LLM to provide regulation/fine mapping + average fine size data per regulation.

## Decision

- Description : <br/>
  In the Fines Tab , in Enforcement Fines table , we need to add a regulation column ,the fine on that table is now comply with the regulations instead only regulatory body.

- Justification: <br/>
  To achieve above functionality as per new requirement , we have add new column to regulation table.

## Deliverables

- Regulation Column Addition in Enforcement Fine Table <br/>

## References

- Enforcement Fine 1.2 : <br/> -https://www.figma.com/proto/86FqAlWJO4UP6Ey3oEcjaW/Surge-Ventures-Design?node-id=9340-59418&t=6VCihT7iru7DSF6Y-0&scaling=min-zoom&content-scaling=fixed&page-id=4633%3A23400
