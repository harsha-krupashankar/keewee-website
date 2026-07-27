export type LegalBlock =
  | { p: string }
  | { c: [string, string, string] } // [clause no, heading, text]
  | { sub: [string, string] } // [clause no, heading]
  | { d: [string, string] } // [term, text]
  | { ul: string[] }
  | { note: string }
  | { contact: [string, string, string] }; // [name, city, email]

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  key: string;
  label: string;
  eyebrow: string;
  title: string;
  entity: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    key: "terms",
    label: "Terms of Service",
    eyebrow: "Legal · Terms of Service",
    title: "Terms of Service",
    entity: "Keewee Marketing Pvt Ltd",
    updated: "Last updated: June 2026",
    intro:
      "The ground rules for working with Keewee — written plainly, because contracts you can't read protect no one. If anything is unclear, email us before you sign.",
    sections: [
      {
        title: "About These Terms",
        blocks: [
          {
            p: `These Terms of Service govern the relationship between Keewee Marketing Pvt Ltd ("Keewee", "we", "us") and any individual or business ("Client", "you") that engages our services. By signing a Statement of Work or Master Service Agreement with us, or by making any payment toward our services, you agree to these terms in full.`,
          },
          {
            p: `If anything here is unclear, email us at team@keewee.in before signing anything.`,
          },
        ],
      },
      {
        title: "Services",
        blocks: [
          {
            p: `We provide B2B marketing services as described in each Statement of Work (SOW). The SOW defines the specific deliverables, timelines, fees, and scope for each engagement. These Terms of Service apply to all SOWs and govern the overall relationship.`,
          },
          {
            p: `We reserve the right to decline any project or client at our discretion, including after initial conversations or proposal stage.`,
          },
        ],
      },
      {
        title: "Contracts and Engagement Structure",
        blocks: [
          {
            c: [
              "3.1",
              "Minimum Commitment",
              `All retainer engagements have a minimum term of 90 days (one quarter). This is non-negotiable. One quarter is the minimum time required to build the system, execute it, and generate meaningful signal on performance. Anyone promising results before that is not being honest with you, and we will not pretend otherwise.`,
            ],
          },
          {
            c: [
              "3.2",
              "After the Minimum Term",
              `After the initial 90-day minimum, retainers continue on a rolling monthly basis unless either party gives 30 days written notice of termination.`,
            ],
          },
          {
            c: [
              "3.3",
              "Annual Contracts",
              `Clients who commit to an annual contract receive a 10% discount and have the setup fee waived. Annual contracts are paid quarterly upfront.`,
            ],
          },
          {
            c: [
              "3.4",
              "Project-Based Engagements",
              `One-time projects (strategy sprints, website builds, CRO audits, etc.) are governed by individual SOWs with their own timelines and payment terms. Project engagements do not carry the 90-day retainer minimum.`,
            ],
          },
          {
            c: [
              "3.5",
              "Amendments",
              `Any change to the agreed scope of work requires a written change order, signed by both parties, before work begins. Verbal agreements, messages, or emails requesting additional work do not constitute an amendment unless formalised in a change order.`,
            ],
          },
        ],
      },
      {
        title: "Payment Terms",
        blocks: [
          {
            note: `All work at Keewee is paid in advance. No work begins, continues, or is delivered until payment for that period has been received and cleared. This applies to retainers, project work, and all add-ons without exception.`,
          },
          {
            c: [
              "4.2",
              "Retainer Payments",
              `The first three months of any retainer engagement are invoiced and paid in full upfront before work begins. This covers the mandatory 90-day minimum term. From month four onwards, each month is invoiced and paid in advance on the 1st of that month before work for that month commences.`,
            ],
          },
          {
            c: [
              "4.3",
              "Project Payments",
              `Project-based work (strategy sprints, website builds, CRO audits, and similar one-time engagements) requires 100% payment upfront before work begins, unless a milestone structure is explicitly agreed in the SOW. Where milestones apply, each milestone payment must be received before work on that milestone commences.`,
            ],
          },
          {
            c: [
              "4.4",
              "No Work Without Payment",
              `If a retainer payment is not received by the 1st of the month, work for that month will not begin until payment clears. We will send one reminder. If payment is not received within 7 days of the due date, the engagement is considered paused. A late fee of 2% per month applies to any overdue balance. Repeated late payment is grounds for termination under Clause 8.`,
            ],
          },
          {
            c: [
              "4.5",
              "Setup Fee",
              `A one-time setup fee is charged on all new retainer engagements to cover onboarding, dashboard setup, platform access, and discovery. This is due alongside the first three-month payment before work begins. The setup fee is waived for annual contracts.`,
            ],
          },
          {
            c: [
              "4.6",
              "Annual Contracts",
              `Clients on annual contracts pay quarterly in advance. The first quarter payment and setup fee (waived for annual contracts) are due before work begins. Subsequent quarters are invoiced and paid before the start of each quarter.`,
            ],
          },
          {
            c: [
              "4.7",
              "Currencies",
              `We invoice in INR for Indian clients and USD for international clients. Currency is agreed at signing and does not change mid-engagement without written agreement.`,
            ],
          },
          {
            c: [
              "4.8",
              "Taxes",
              `All fees are inclusive of applicable taxes. Indian clients will be charged GST as applicable. International clients are responsible for any withholding tax obligations in their jurisdiction.`,
            ],
          },
          {
            c: [
              "4.9",
              "Disputed Invoices",
              `If you dispute an invoice, notify us in writing within 7 days of receipt with a clear explanation. Work will not commence or continue until the dispute is resolved. Undisputed portions of the invoice remain due immediately.`,
            ],
          },
          {
            c: [
              "4.10",
              "No Refunds",
              `Because all work is paid in advance and planned accordingly, fees paid are non-refundable once the work period has commenced. If you terminate mid-month or mid-project, fees for that period are not refunded. Setup fees are non-refundable under any circumstances.`,
            ],
          },
        ],
      },
      {
        title: "Scope of Work and Deliverables",
        blocks: [
          {
            c: [
              "5.1",
              "Scope Definition",
              `All deliverables, timelines, revision rounds, and output formats are defined in the SOW. Work not listed in the SOW is not included in the engagement.`,
            ],
          },
          {
            c: [
              "5.2",
              "Scope Creep",
              `Requests for work outside the agreed SOW will be handled via a change order at our standard rates. We will flag scope creep as soon as we identify it. We will not absorb additional work silently and invoice for it later.`,
            ],
          },
          {
            c: [
              "5.3",
              "Revisions",
              `Each deliverable includes the number of revision rounds stated in the SOW. Revisions beyond that are billed at our standard hourly rate. Revisions are defined as changes within the original brief. A change in direction, messaging strategy, or brief constitutes a new brief and may require a new SOW.`,
            ],
          },
          {
            c: [
              "5.4",
              "Client Responsibilities",
              `Timely delivery of our work depends on your timely input. You agree to provide briefs, approvals, access, and feedback within the timelines agreed in the SOW. Delays caused by late client input may push delivery timelines accordingly. We are not responsible for missed deadlines caused by delayed approvals or missing information on your side.`,
            ],
          },
          {
            c: [
              "5.5",
              "Approvals",
              `Any deliverable approved by you in writing (email, Slack, or signed document) is considered accepted. Changes requested after approval may be treated as a new revision round or a change order.`,
            ],
          },
        ],
      },
      {
        title: "Intellectual Property",
        blocks: [
          {
            c: [
              "6.1",
              "Ownership on Full Payment",
              `Upon receipt of full payment for a deliverable, all intellectual property rights in that deliverable transfer to you. Until full payment is received, all work product remains the property of Keewee.`,
            ],
          },
          {
            c: [
              "6.2",
              "Our Tools and Processes",
              `We retain all rights to our proprietary methodologies, frameworks, templates, systems, and processes used in delivering your work. These do not transfer to you as part of the engagement.`,
            ],
          },
          {
            c: [
              "6.3",
              "Third-Party Assets",
              `If we use third-party assets (stock images, fonts, licensed software) in your deliverables, we will inform you. Licensing costs for such assets are either included in the SOW or billed separately. You are responsible for maintaining any licences required after the engagement ends.`,
            ],
          },
          {
            c: [
              "6.4",
              "AI-Assisted Work",
              `We may use AI tools in the production of certain deliverables. All AI-assisted output is reviewed, edited, and approved by our team before delivery. We take full responsibility for the quality and accuracy of what we deliver, regardless of how it was produced.`,
            ],
          },
          {
            c: [
              "6.5",
              "Portfolio and Case Study Rights",
              `We reserve the right to reference your company name, describe the nature of the engagement, and share results in our portfolio, case studies, website, and marketing materials, unless you request confidentiality in writing at the time of signing. We will always seek your approval before publishing identifiable details or specific metrics.`,
            ],
          },
        ],
      },
      {
        title: "Confidentiality",
        blocks: [
          {
            c: [
              "7.1",
              "Mutual Confidentiality",
              `Both parties agree to keep confidential any non-public information shared during the engagement, including business strategies, financial information, customer data, product roadmaps, and proprietary processes.`,
            ],
          },
          {
            c: [
              "7.2",
              "Duration",
              `Confidentiality obligations survive the termination of the engagement for a period of two years.`,
            ],
          },
          {
            c: [
              "7.3",
              "Exclusions",
              `Confidentiality obligations do not apply to information that is already publicly available, independently developed by either party, or required to be disclosed by law or regulatory order.`,
            ],
          },
        ],
      },
      {
        title: "Termination",
        blocks: [
          {
            c: [
              "8.1",
              "Termination by Client",
              `After the 90-day minimum term, you may terminate a retainer engagement by giving 30 days written notice. You remain liable for fees during the notice period.`,
            ],
          },
          {
            c: [
              "8.2",
              "Termination by Keewee",
              `We reserve the right to terminate any engagement with 14 days written notice if: you materially breach these terms and fail to remedy the breach within 7 days of notification; you fail to pay outstanding invoices; you engage in conduct that is abusive, dishonest, or damaging to our reputation or team.`,
            ],
          },
          {
            c: [
              "8.3",
              "Immediate Termination",
              `Either party may terminate immediately if the other party becomes insolvent, enters administration, or ceases to trade.`,
            ],
          },
          {
            c: [
              "8.4",
              "Effect of Termination",
              `On termination, all work completed up to the termination date remains billable. Work in progress will be invoiced on a pro-rated basis. All outstanding fees become immediately due. We will deliver all completed work product to you upon receipt of full payment.`,
            ],
          },
          {
            c: [
              "8.5",
              "No Refunds",
              `Fees paid for work already commenced are non-refundable. Setup fees are non-refundable under any circumstances.`,
            ],
          },
        ],
      },
      {
        title: "Warranties and Representations",
        blocks: [
          {
            c: [
              "9.1",
              "Our Warranties",
              `We warrant that: our work will be delivered with reasonable skill and care; we have the right to enter into this agreement; our work will not knowingly infringe any third-party intellectual property rights.`,
            ],
          },
          {
            c: [
              "9.2",
              "No Guarantee of Results",
              `We do not guarantee specific marketing outcomes, lead volumes, conversion rates, search rankings, or revenue figures. Marketing results depend on factors outside our control, including your product, pricing, market conditions, and sales process. We will always be honest about what is and is not working.`,
            ],
          },
          {
            c: [
              "9.3",
              "Your Warranties",
              `You warrant that: you have the authority to enter into this agreement; any materials, content, or data you provide to us do not infringe third-party rights; you will not use our work for any unlawful purpose.`,
            ],
          },
        ],
      },
      {
        title: "Limitation of Liability",
        blocks: [
          {
            c: [
              "10.1",
              "Cap on Liability",
              `Our total liability to you under any engagement is limited to the total fees paid by you in the three months preceding the event giving rise to the claim.`,
            ],
          },
          {
            c: [
              "10.2",
              "Exclusions",
              `We are not liable for: loss of profits, loss of revenue, loss of data, indirect or consequential losses, or any loss arising from third-party platforms, tools, or services used in the delivery of your work.`,
            ],
          },
          {
            c: [
              "10.3",
              "Force Majeure",
              `Neither party is liable for delays or failures caused by events outside their reasonable control, including but not limited to natural disasters, government action, platform outages, or internet failure.`,
            ],
          },
        ],
      },
      {
        title: "Non-Solicitation",
        blocks: [
          {
            p: `During the engagement and for 12 months after its termination, you agree not to directly solicit, recruit, or hire any member of the Keewee team who worked on your account. If you wish to hire someone from our team, speak to us first.`,
          },
        ],
      },
      {
        title: "Governing Law and Disputes",
        blocks: [
          {
            p: `These terms are governed by the laws of India. Any dispute arising from this agreement will first be attempted to be resolved through good-faith negotiation between both parties. If unresolved within 30 days, disputes will be referred to arbitration in Bangalore, India under the Arbitration and Conciliation Act, 1996.`,
          },
        ],
      },
      {
        title: "Changes to These Terms",
        blocks: [
          {
            p: `We may update these terms from time to time. We will notify active clients of any material changes by email at least 14 days before they take effect. Continued engagement after that date constitutes acceptance of the updated terms.`,
          },
        ],
      },
      {
        title: "Contact",
        blocks: [
          {
            p: `For any questions about these terms, reach us anytime — we would rather clarify now than argue later.`,
          },
          { contact: ["Keewee Marketing Pvt Ltd", "Bangalore, India", "team@keewee.in"] },
        ],
      },
    ],
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    eyebrow: "Legal · Privacy Policy",
    title: "Privacy Policy",
    entity: "Keewee Marketing Pvt Ltd",
    updated: "Last updated: June 2026",
    intro:
      "How we collect, use, store, and protect your personal data. No dark patterns, no data brokers — just what we hold, why, and how to get it back.",
    sections: [
      {
        title: "Who We Are",
        blocks: [
          {
            p: `Keewee Marketing Pvt Ltd is a B2B marketing agency incorporated in India. We provide marketing strategy, content, demand generation, and related services to B2B SaaS companies globally.`,
          },
          {
            p: `This Privacy Policy explains how we collect, use, store, and protect personal data when you visit our website, fill out a form, use our services, or communicate with us.`,
          },
          { p: `For any privacy-related queries: team@keewee.in` },
        ],
      },
      {
        title: "What Data We Collect",
        blocks: [
          { sub: ["2.1", "Data You Give Us Directly"] },
          {
            ul: [
              "Name and job title",
              "Work email address and phone number",
              "Company name and website",
              "Information submitted through our contact forms, audit request forms, or quote request forms",
              "Information shared in calls, emails, or messages with our team",
              "Payment information (processed via our payment providers; we do not store card details)",
            ],
          },
          { sub: ["2.2", "Data We Collect Automatically"] },
          { p: `When you visit our website, we may collect:` },
          {
            ul: [
              "IP address and approximate location",
              "Browser type and version",
              "Pages visited and time spent on each",
              "Referring URL (where you came from)",
              "Device type and operating system",
            ],
          },
          {
            p: `This data is collected via cookies and analytics tools and is used to understand how our website is used and how to improve it.`,
          },
          { sub: ["2.3", "Data We Collect About Your Business"] },
          { p: `In the course of delivering services, we may handle:` },
          {
            ul: [
              "Your customer data (only as necessary to deliver agreed services)",
              "Your marketing analytics and performance data",
              "Access credentials for platforms we manage on your behalf (stored securely, never shared)",
              "CRM and email platform data",
            ],
          },
        ],
      },
      {
        title: "How We Use Your Data",
        blocks: [
          { p: `We use personal data for the following purposes:` },
          {
            d: [
              "To deliver our services:",
              "Fulfilling the scope of work agreed in your SOW, communicating with you about your engagement, and managing your account.",
            ],
          },
          {
            d: [
              "To respond to enquiries:",
              "If you fill out a form or email us, we use your data to respond and follow up as relevant.",
            ],
          },
          {
            d: [
              "To send relevant communications:",
              "With your consent, we may send you emails about our services, new offerings, or content we think is relevant to you. You can unsubscribe at any time.",
            ],
          },
          {
            d: [
              "To improve our website and services:",
              "Analytics data helps us understand what is working and what is not.",
            ],
          },
          {
            d: [
              "For legal and compliance purposes:",
              "Retaining records of contracts, invoices, and communications as required by law.",
            ],
          },
          {
            note: `We do not sell your data. We do not use your data for advertising purposes unrelated to our own services. We do not share your data with third parties except as described in Data Sharing.`,
          },
        ],
      },
      {
        title: "Legal Basis for Processing",
        blocks: [
          {
            p: `For users in the European Union, United Kingdom, or other jurisdictions with similar data protection laws, our legal basis for processing personal data is:`,
          },
          {
            ul: [
              "Contract: Processing necessary to deliver the services you have engaged us for",
              "Legitimate interests: Processing for internal analytics, business development, and improving our services, where this does not override your rights",
              "Consent: Where we ask for your explicit consent (for example, newsletter subscriptions)",
              "Legal obligation: Where we are required to process data to comply with applicable law",
            ],
          },
        ],
      },
      {
        title: "Third-Party Tools and Data Processing",
        blocks: [
          {
            p: `In delivering our services and operating our business, we use a range of third-party tools. Some of these tools process personal data on our behalf. We only use tools that meet adequate standards of data protection.`,
          },
          { p: `Current and anticipated tools include the following categories:` },
          {
            d: [
              "CRM and Contact Management",
              "Tools such as HubSpot are used to store contact records, manage client communications, and track engagement history. Data stored includes name, email, company, and communication history.",
            ],
          },
          {
            d: [
              "Email Marketing and Automation",
              "Tools such as Mailchimp, Customer.io, and similar platforms are used to send email communications. These platforms store email addresses, open and click data, and subscription preferences.",
            ],
          },
          {
            d: [
              "Analytics and Website Tracking",
              "Google Analytics 4 (GA4) is used to understand website traffic and behaviour. Google Search Console tracks search performance. Heatmap and session recording tools such as Microsoft Clarity or Hotjar may be used to understand on-site behaviour. These tools do not capture passwords or payment information.",
            ],
          },
          {
            d: [
              "Project Management and Communication",
              "Tools such as Notion and Slack are used internally for project management and team communication. Client-related information shared in these tools is handled in line with this policy.",
            ],
          },
          {
            d: [
              "Video and Content Tools",
              "Tools such as HeyGen, Canva, and similar platforms may be used in the production of content deliverables. These tools may process images, scripts, or other content you provide.",
            ],
          },
          {
            d: [
              "AI and Language Model Tools",
              "We use AI-powered tools for research, drafting, data enrichment, and workflow automation. We do not input your confidential business data, customer personal data, or sensitive financial information into any AI tool without your explicit written consent. Any AI-assisted work that reaches you has been reviewed, edited, and approved by a member of our team.",
            ],
          },
          {
            d: [
              "Payment Processing",
              "Payments are processed via third-party infrastructure including Razorpay, Wise Business, and Stripe where applicable. We do not store card numbers, bank account details, or payment credentials on our systems.",
            ],
          },
          {
            d: [
              "Outbound and Prospecting Tools",
              "In delivering demand generation for clients, we may use tools such as Apollo, Clay, and similar platforms for list building, data enrichment, and outreach. These process publicly available professional contact data.",
            ],
          },
          {
            d: [
              "Scheduling and Communication",
              "Tools such as Calendly are used for booking calls. Calendly collects your name, email address, and any other information you provide at the time of booking.",
            ],
          },
          {
            d: [
              "Cloud Storage and File Sharing",
              "We use Google Workspace for email, document creation, and file storage. Client files are stored in Google Drive with access restricted to relevant team members only.",
            ],
          },
          {
            p: `We periodically review the tools we use and update this section accordingly. If a new tool materially changes how we process your personal data, we will update this policy and notify active clients.`,
          },
        ],
      },
      {
        title: "Data Sharing",
        blocks: [
          {
            p: `We do not sell, rent, or trade your personal data to any third party. We share data only in the following circumstances:`,
          },
          {
            d: [
              "Service delivery:",
              "With the third-party tools listed above, strictly to the extent necessary to deliver our services.",
            ],
          },
          {
            d: [
              "Legal compliance:",
              "Where we are required to disclose information by law, court order, or regulatory authority. We will inform you of any such request where legally permitted.",
            ],
          },
          {
            d: [
              "Business transfers:",
              "If Keewee is acquired, merges, or transfers its business assets, your data may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.",
            ],
          },
          {
            p: `We do not share your data with any advertising networks, data brokers, or third parties for their own marketing purposes.`,
          },
        ],
      },
      {
        title: "International Data Transfers",
        blocks: [
          {
            p: `Keewee is incorporated in India. If you are based in the European Union, United Kingdom, or another jurisdiction with data transfer restrictions, your data may be transferred to and processed in India and other countries where our third-party tools operate.`,
          },
          {
            p: `Where such transfers occur, we rely on appropriate safeguards including standard contractual clauses, adequacy decisions, or the data processing agreements of our tool providers. If you have questions about international data transfers, contact us at team@keewee.in.`,
          },
        ],
      },
      {
        title: "Data Retention",
        blocks: [
          {
            p: `We retain personal data for as long as necessary to deliver our services and meet our legal obligations. Specifically:`,
          },
          {
            d: [
              "Active clients:",
              "Data is retained for the duration of the engagement and for five years after it ends, to meet accounting, legal, and audit requirements.",
            ],
          },
          {
            d: [
              "Prospects and enquiries:",
              "Contact data from people who enquired but did not become clients is retained for up to two years, then deleted or anonymised unless you have consented to ongoing communication.",
            ],
          },
          {
            d: [
              "Website analytics:",
              "Aggregated and anonymised analytics data may be retained indefinitely. Individual session data follows the default settings of the analytics tool, typically 14 months for GA4.",
            ],
          },
          {
            d: [
              "Email subscriptions:",
              "Retained until you unsubscribe or request deletion, whichever comes first.",
            ],
          },
          {
            p: `When data is no longer needed, it is securely deleted or anonymised so it can no longer be linked to an individual.`,
          },
        ],
      },
      {
        title: "Cookies",
        blocks: [
          {
            p: `Our website uses cookies to understand how visitors use the site and to improve the experience.`,
          },
          {
            d: [
              "Essential cookies:",
              "Required for the website to function. These cannot be disabled.",
            ],
          },
          {
            d: [
              "Analytics cookies:",
              "Used to collect anonymised data about how visitors use our site, including pages visited, time on page, and traffic source. We use Google Analytics 4 for this.",
            ],
          },
          {
            d: [
              "Preference cookies:",
              "Used to remember settings or choices you have made on the site.",
            ],
          },
          {
            p: `You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Disabling certain cookies may affect how the website functions. We do not use advertising or retargeting cookies on our own website.`,
          },
        ],
      },
      {
        title: "Your Rights",
        blocks: [
          {
            p: `Depending on where you are based, you may have the following rights regarding your personal data:`,
          },
          { d: ["Right to access:", "You can request a copy of the personal data we hold about you."] },
          { d: ["Right to correction:", "You can ask us to correct any inaccurate or incomplete data."] },
          {
            d: [
              "Right to deletion:",
              "You can ask us to delete your personal data, subject to any legal obligations that require us to retain it.",
            ],
          },
          {
            d: [
              "Right to restriction:",
              "You can ask us to stop processing your data in certain circumstances while a dispute is resolved.",
            ],
          },
          {
            d: [
              "Right to portability:",
              "You can request your data in a structured, machine-readable format.",
            ],
          },
          {
            d: [
              "Right to object:",
              "You can object to us processing your data on the basis of legitimate interests, including for direct marketing.",
            ],
          },
          {
            d: [
              "Right to withdraw consent:",
              "Where processing is based on consent, you can withdraw it at any time without affecting the lawfulness of prior processing.",
            ],
          },
          {
            note: `To exercise any of these rights, email us at team@keewee.in with the subject line "Data Request." We will respond within 30 days and may ask you to verify your identity first. EU/UK users unsatisfied with our response may lodge a complaint with their local data protection authority.`,
          },
        ],
      },
      {
        title: "Data Security",
        blocks: [
          {
            p: `We take reasonable and appropriate technical and organisational measures to protect your personal data from unauthorised access, loss, misuse, alteration, or disclosure. These measures include:`,
          },
          {
            ul: [
              "Access controls ensuring only relevant team members can access client data",
              "Two-factor authentication on all tools and platforms that handle personal data",
              "Encrypted storage and transmission of sensitive information",
              "Regular review of third-party tool access and permissions",
              "Secure deletion of data no longer required",
            ],
          },
          {
            p: `No method of transmission over the internet or electronic storage is completely secure. While we take data security seriously, we cannot guarantee absolute security. In the event of a data breach that affects your personal data, we will notify you as required by applicable law and take immediate steps to contain the breach.`,
          },
        ],
      },
      {
        title: "Children's Privacy",
        blocks: [
          {
            p: `Our services are intended for business professionals and are not directed at anyone under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected data from a minor, contact us immediately at team@keewee.in and we will delete it.`,
          },
        ],
      },
      {
        title: "Links to Third-Party Websites",
        blocks: [
          {
            p: `Our website may contain links to third-party websites, tools, or resources. This Privacy Policy applies only to our website and services. We are not responsible for the privacy practices of any third-party site and encourage you to read their privacy policies before submitting any personal data.`,
          },
        ],
      },
      {
        title: "Changes to This Privacy Policy",
        blocks: [
          {
            p: `We may update this Privacy Policy from time to time to reflect changes in our practices, tools, or legal obligations. When we make material changes, we will update the "Last updated" date at the top of this page and notify active clients by email at least 14 days before the changes take effect.`,
          },
          {
            p: `We encourage you to review this page periodically. Continued use of our website or services after a policy update constitutes acceptance of the revised terms.`,
          },
        ],
      },
      {
        title: "Contact and Complaints",
        blocks: [
          {
            p: `For any questions, requests, or concerns about how we handle your personal data, reach us anytime. We take privacy seriously and will respond to all queries within 30 days. If you are not satisfied with our response, you have the right to escalate to the relevant data protection authority in your jurisdiction.`,
          },
          { contact: ["Keewee Marketing Pvt Ltd", "Bangalore, India", "team@keewee.in"] },
        ],
      },
    ],
  },
];
