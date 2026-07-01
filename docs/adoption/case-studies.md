---
id: case-studies
title: Case Studies — State Data Exchanges in India
sidebar_label: Case Studies
description: How data exchange platforms built on the IUDX open-source framework power urban, agriculture, e-governance, and geospatial use cases across Indian states.
---

# Case Studies — State Data Exchanges

Data exchange technology is a freely accessible, open-source Digital Public Infrastructure (DPI) implemented at state level across India — powering urban governance in over 50 cities, agriculture, public service delivery, and national geospatial data management.

Rather than consolidating data into a central repository, a data exchange interconnects disparate, distributed entities through standardized APIs and consent mechanisms. This promotes discoverability and interoperability, and fosters innovation by enabling third-party developers to build new applications and services. The four case studies below are all built on the open-source India Urban Data Exchange (IUDX) framework — the same lineage as IUDX.

:::info Why a data exchange
The real value of data lies in integrating information from multiple sources. A data exchange must accommodate open, licensed, and private data while addressing security and privacy — interconnecting entities rather than centralizing their data.
:::

## Case Study 1 — Urban Data Exchange (IUDX)

Cities generate a valuable asset: data from their departments and agencies — IoT streams from sensors (air quality, traffic), municipal tax and property records, and historical archival data. Each dataset carries its own security, privacy, and commercial considerations.

In 2018, the **Smart Cities Mission, Government of India** collaborated with the **Indian Institute of Science (IISc), Bangalore** to jointly develop and deploy the **India Urban Data Exchange (IUDX)**. IUDX has been implemented in **over 54 Indian cities**, onboarding numerous data sources. Use cases include Emergency Vehicle Priority Corridors, Solid Waste Management optimization, enhanced Public Bus Transit Systems, Multi-Modal Transport applications, and Flood Prediction and Management.

![IUDX urban data exchange architecture — Control APIs and Data APIs connecting Solutions/Apps and Resource Servers through Authorization and Catalog services](/img/case-studies/iudx-urban.png)

IUDX is an open-source platform built on open APIs and data models, with built-in security, privacy, and accounting mechanisms. It enables secure, authenticated, managed data sharing across platforms, third-party applications, and data sources — while data owners retain full control over what they expose and to whom. Built-in accounting supports payment-gateway integration, and open API and data-schema templates foster a new application ecosystem.

## Case Study 2 — Agricultural Data Exchange (ADeX)

Agriculture is entering a transformative phase of data-driven decision-making, precision farming, and optimized resource allocation aimed at food security, sustainability, and rural economic development.

In 2023, the **Government of Telangana** collaborated with **IISc Bangalore** to develop and deploy the **Agricultural Data Exchange (ADeX)** — the first agricultural data exchange in India — alongside the Agricultural Data Management Framework (ADMF). Built on the open-source IUDX framework, ADeX retains its security, privacy, and accounting capabilities. Use cases include Smart Finance, Smart Insurance, Farmer Advisories, Digitized Farm Boundaries, and Sharing of Farm Resources.

The **Smart Finance** use case enables banks and lenders to provide collateral-free loans by using ADeX data to connect with farmers. Despite government efforts on agricultural credit, roughly **52% of agricultural households rely on credit sources** (NABARD), and insufficient information for assessing creditworthiness pushes many toward non-institutional lenders.

![ADeX Smart Finance flow — data providers (agri marketing, land ownership, weather, farming history) feeding a Smart Credit & Finance application via ADeX, connecting farmers with institutional and non-institutional finance services](/img/case-studies/adex-smart-finance.png)

By assessing credit scores from public and private data sources on the exchange, the Smart Finance application bridges legitimate credit sources and farmers — enabling access to credit at competitive rates without collateral. Key performance indicators include loan availability from multiple lenders at competitive rates, minimal or no collateral requirements, and a reduction in high-interest loans and agricultural credit fraud.

## Case Study 3 — Integrated Proactive e-Governance (IPeG)

As governments shift toward data-driven decision-making, the goal is to strengthen the social safety net through timely, convenient access to public services and social benefits.

In 2022, the **Government of Chhattisgarh** collaborated with **IISc Bangalore** on the **Integrated Proactive e-Governance (IPeG)** program — a governance framework that is paperless, presence-less, cashless, and consent-based. IPeG proactively delivers public services, including Direct Benefit Transfer (DBT) scheme applications across the state, leveraging the open-source IUDX data-exchange framework with its security, privacy, and accounting capabilities.

![IPeG data exchange — Labour, DTE, and other department servers connected through a Data eXchange (Catalogue, Authorization, Resource Server, Message Broker, Data Adaptor) to the Social Registry and DBT applications](/img/case-studies/ipeg-egovernance.png)

The program built a large beneficiary database with high Aadhaar seeding. The Public Distribution System (PDS) database anchors a **Centralized Social Registry** that integrates PDS and Aadhaar data for accurate beneficiary identification and demographic verification, generating a unique **Social Registry Number (SRN)** per eligible individual. It currently integrates the Labour Department and the Directorate of Technical Education, with room to add more departments — keeping stakeholders on current information and improving verification and processing of DBT applications.

## Case Study 4 — Integrated Geospatial Data Interface (GDI)

The **National Geospatial Policy, 2022** aims to leverage geospatial technology and data for sustainable cities, climate action, and responsible consumption — ensuring publicly funded geospatial data is accessible to businesses and third-party developers.

In 2023, the **Department of Science and Technology (DST)** collaborated with **IISc Bangalore** to develop and deploy the **Integrated Geospatial Data sharing Interface (GDI)** — the first unified geospatial interface exchange in India. Built on the open-source IUDX framework, GDI supports use cases such as flood inundation models, mapping natural drains, origin-destination routing, urban heat islands, agricultural land suitability, and land use / land cover applications.

![GDI geospatial exchange — consumers (catalog server, consent server, resource server, analytics engine) accessing public and private geospatial data (spatiotemporal, topography, LIDAR, administrative maps, satellite) from providers](/img/case-studies/gdi-geospatial.png)

GDI offers a standards-based catalog of geospatial data so users can easily discover and access relevant datasets. Robust authorization and consent management safeguard privacy and security while enabling controlled access, and standardized APIs facilitate integration and interoperability — making it easier for developers to build applications that benefit the entire geospatial ecosystem.

---

## What these case studies show

Across urban, agriculture, e-governance, and geospatial domains, the same open-source data-exchange framework — the lineage behind **IUDX** — breaks down silos and enables real-time, consent-driven access to information. Adopting a data exchange platform democratizes access to crucial information, fosters innovation, and improves the efficiency and quality of public services.

### References

- [Centre of Data for Public Good](https://dataforpublicgood.org.in/)
- [India Urban Data Exchange (IUDX)](https://iudx.org.in/) · [IUDX Datasets](https://catalogue.cos.iudx.org.in/)
- [Agricultural Data Exchange (ADeX)](https://adex.org.in/) · [ADeX Datasets](https://dataexplorer.ts.adex.org.in/)
- [IPeG Program, Chhattisgarh](https://ipeg-csp.cgstate.gov.in/)
- [Geospatial Data Infrastructure (GDI)](https://geospatial.org.in/) · [GDI Datasets](https://catalogue.geospatial.org.in/)
