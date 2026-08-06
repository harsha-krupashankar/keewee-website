/**
 * Copy for the `/prompt-library` page, transcribed from the design.
 *
 * Unlike `scripts/legacy/`, none of this was ever hardcoded in a component — it
 * is here only so `npm run seed` can create the `promptLibraryPage` singleton.
 * Once the document exists, the Studio is the source of truth and edits here do
 * nothing until the seed is re-run.
 */

export type PromptItem = {
  title: string;
  best: string;
  useCase: string;
  prompt: string;
  tip?: string;
};

export type PromptCategoryData = {
  name: string;
  tagline: string;
  prompts: PromptItem[];
};

export const promptCategories: PromptCategoryData[] = [
  {
    name: "Positioning & Messaging",
    tagline: "Get the words right before you spend money making anyone see them.",
    prompts: [
      {
        title: "ICP & Positioning Teardown",
        best: "ChatGPT or Claude",
        useCase:
          "Stress-test your current positioning against your actual ICP before touching a single line of homepage copy.",
        prompt: `You are a B2B positioning strategist reviewing [Company Name]'s current market position. Here's what you're working with:

• Company: [Company Name], a [1-line description] company
• ICP: [describe your ideal customer: company size, industry, buyer title, revenue stage]
• Current homepage headline: [paste headline]
• Current homepage subheadline: [paste subheadline]
• Top 3 competitors: [Competitor A], [Competitor B], [Competitor C]
• What we actually do differently: [your honest answer, even if it's rough]

Do the following, in order:

1. Tell me, in one sentence, what a first-time visitor would think we do based on the current copy alone.
2. Flag every word or phrase in the current headline/subheadline that could appear on a competitor's site unchanged. Be specific.
3. Identify the single biggest gap between what we actually do differently and what the copy currently says.
4. Write 3 alternative positioning statements using the format: "For [ICP], [Company] is the [category] that [unique mechanism], unlike [alternative], which [limitation]."
5. Rank the 3 by how defensible they are: how hard it would be for a competitor to say the same thing tomorrow.

Don't soften the critique. I'd rather know it's weak now than find out from a churned deal.`,
        tip: "Paste your actual homepage copy, not a paraphrase. The model can only catch genericness if it can read the real words.",
      },
      {
        title: "Messaging Pillar & Value Prop Generator",
        best: "ChatGPT",
        useCase:
          "Turn a rough positioning statement into the 3-5 pillars that show up on your homepage, in your deck, and on sales calls.",
        prompt: `You are a brand messaging strategist building the messaging framework for [Company Name].

Context:
• Positioning statement: [paste from the teardown above, or write your best current version]
• ICP and their top 3 pains, in their words: [pain 1], [pain 2], [pain 3]
• Proof points we have (metrics, case studies, credentials): [list them, even rough numbers]
• Tone: [e.g., "dry, confident, no jargon," or paste 2-3 lines of copy you like]

Build a messaging framework with:

1. One positioning statement (1 sentence)
2. 3-5 messaging pillars, each with: a pillar name (3-5 words), a one-sentence explanation, and the proof point that backs it up
3. For each pillar, one "sounds like" example: an actual sentence of copy, not a description of the pillar
4. A "do not say" list of 8-10 words or phrases that are the generic version of what we're trying to say

Output this as a table I can drop into a brand doc, not prose.`,
        tip: 'Use actual customer quotes or support tickets for the "in their words" pains. Paraphrased pain points always come out more generic than real ones.',
      },
      {
        title: "Competitive Positioning Matrix",
        best: "Perplexity + ChatGPT",
        useCase:
          "Build an honest comparison of how you stack up against named competitors before writing a comparison page or battlecard.",
        prompt: `Step 1 (run in Perplexity, once per competitor):

Research [Competitor Name], a company selling [category] to [ICP]. Find and summarize, with sources:

1. Their current homepage headline and positioning claim
2. Their pricing model and starting price, if public
3. Any recent (last 6 months) product launches, repositioning, or messaging changes
4. Public reviews (G2, Capterra) mentioning specific complaints. Quote the pattern, not one outlier.
5. What they appear to NOT do or explicitly avoid, based on their site and reviews

Step 2 (run in ChatGPT):

You are a competitive positioning analyst. Here's research on [Competitor A], [Competitor B], [Competitor C]: [paste Perplexity outputs]. And here's our positioning: [paste from Prompt 1].

Build a comparison matrix with rows for: core promise, ICP fit, pricing model, biggest public complaint, and the one thing they can't credibly claim. Then write a 3-sentence "so what": what should we lean into given this landscape, and what should we avoid claiming because a competitor already owns it.`,
        tip: "Run the research step before every comparison page or battlecard refresh. Competitor claims go stale fast, and a stale claim in a battlecard gets your rep corrected in the room.",
      },
      {
        title: "Tagline & CTA Generator",
        best: "ChatGPT",
        useCase: "Generate on-brand tagline and CTA options once positioning is locked.",
        prompt: `You are a copywriter generating tagline options for [Company Name].

Positioning statement: [paste]
Brand voice, in 3 words: [e.g., "dry, sharp, specific"]
Banned words: [paste your forbidden words list, e.g., synergy, leverage, unlock, seamless, world-class, cutting-edge]

Generate 15 tagline options, 3-7 words each, split into 3 buckets of 5:

1. Literal: states what we do plainly, no cleverness
2. Sharp: has an edge or point of view, safe to say on a sales call
3. Bold: takes a real risk, might not survive a committee, but sticks in your head

For each option, note which ICP pain or pillar it's pulling from. Flag any option a competitor in [industry] could use unchanged. I want those flagged, not filtered out before I see them.`,
        tip: "Ask for the risky bucket on purpose. The safe ones are what you'll probably ship, but the bold ones surface the one idea worth stealing.",
      },
    ],
  },
  {
    name: "Blogs, Content & SEO",
    tagline: "Content that ranks and reads like someone with an opinion wrote it.",
    prompts: [
      {
        title: "SEO Topic Cluster Generator",
        best: "ChatGPT + Perplexity",
        useCase:
          "Go from one seed keyword to a full pillar-and-cluster content plan instead of a random list of blog ideas.",
        prompt: `You are an SEO content strategist building a topic cluster for [Company Name], targeting [ICP] searching for [seed topic/keyword].

Context:
• What we sell: [1-line description]
• Seed keyword/topic: [keyword]
• Competitors already ranking for this: [list 2-3 if known]
• Content we already have on this topic: [list existing URLs/titles, or "none"]

Build:

1. One pillar page topic (the broad, high-volume page everything links to)
2. 8-12 cluster topics, each targeting a distinct search intent (informational, comparison, "how to," "vs," "best tools for")
3. For each cluster topic: the likely search intent, the title we'd use, and one specific angle a generic AI-written article on this topic would miss
4. An internal linking plan: which cluster pages link to which

Flag any topic where we don't have enough to say that's different from what's already ranking. Cut it rather than publish filler.`,
        tip: "Search for what competitors already rank for on the seed keyword first. Otherwise the model is guessing what's already been said.",
      },
      {
        title: "Blog Outline from Keyword + Search Intent",
        best: "ChatGPT or Gemini",
        useCase:
          "Structure a specific article so it answers the intent behind the search, not just the topic.",
        prompt: `You are a content strategist outlining an article targeting the keyword "[keyword]" for [ICP].

Infer search intent first: is someone searching this term to learn a concept, compare tools, solve an urgent problem, or get validation for a decision they've already made? State the intent explicitly before you outline.

Then build:

1. A working title (under 60 characters, no clickbait)
2. A meta description (under 155 characters)
3. A full H2/H3 outline, with a one-line note under each heading on what it needs to prove or answer, not just what it covers
4. The 2-3 places in the article where we need a real example, number, or screenshot instead of a generic explanation
5. One FAQ block (3-4 questions), phrased the way people actually type into ChatGPT or Google, not formal phrasing

Do not write the full article yet. Outline only.`,
        tip: "Keep outline and draft as separate prompts. It stops the model from locking into a generic structure before you've checked the intent call.",
      },
      {
        title: "Full Blog Draft in Brand Voice",
        best: "Claude",
        useCase:
          "Turn an approved outline into a draft that doesn't need a full rewrite to sound like a person wrote it.",
        prompt: `You are writing a blog article for [Company Name] in our voice. Voice notes: [paste 3-5 lines of your brand voice guide, e.g., "short sentences, contractions, specific numbers over vague claims, dry humor, no corporate jargon"].

Banned words: [paste banned words list]

Approved outline: [paste outline from the previous prompt]
An example of an article we think nails our voice, for calibration: [paste 300-500 words of an existing piece you like]

Write the full article, 1,200-1,800 words, following the outline exactly. Every claim needs to be either a specific number, a named example, or clearly flagged as an opinion. No unsupported generalizations like "many companies struggle with this." If you don't have a real example for a section, write [NEEDS EXAMPLE] instead of making one up.

After the draft, list every sentence you're not confident is factually accurate, so we can fact-check before publishing.`,
        tip: "The [NEEDS EXAMPLE] instruction is the most important line in this prompt. It stops the model from quietly inventing stats and case studies to fill gaps.",
      },
      {
        title: "Content Repurposing Engine",
        best: "ChatGPT or Claude",
        useCase:
          "Turn one long-form asset (webinar, podcast, article) into a week of content without it reading like a chopped-up summary.",
        prompt: `You are a content repurposing strategist. Here is a long-form asset: [paste transcript/article/webinar notes]

Break it into:

1. 5 LinkedIn posts, each built around one specific idea from the source (not a summary of the whole thing), written in [voice notes]
2. 1 X/Twitter thread (6-8 tweets) covering the most contrarian or surprising point
3. 3 carousel/slide concepts (slide-by-slide text only, no design), for the 3 most visual or step-based ideas
4. 1 newsletter segment (150-200 words) pulling the most tactical, "steal this" piece
5. 2 sales enablement one-liners a rep could drop into a cold email referencing this content

For each piece, note which specific paragraph or timestamp in the source it came from, so we can verify nothing got misrepresented.`,
        tip: "Paste the raw transcript, not your summary. Your summary already smoothed out the specific detail that makes repurposed content worth reading.",
      },
      {
        title: "Content Audit: Keep, Kill, or Fix",
        best: "Gemini or ChatGPT",
        useCase:
          "Decide what to update vs. delete when your blog has 18 months of uneven performance.",
        prompt: `You are a content auditor reviewing existing blog content for [Company Name]. For each post I'll give you: title, publish date, current organic traffic (rough estimate is fine), and target keyword.

[Paste a list: Title | Date | Traffic | Target keyword, one row per post, up to 20 at a time]

For each post, recommend one of: KEEP AS-IS, UPDATE (specify what: outdated stat, weak CTA, thin content, wrong intent match), or KILL (redirect or remove, and say why: cannibalization, zero relevance to ICP, outdated product info).

Then give me a priority order for the UPDATE list based on effort vs. likely traffic/conversion impact, not traffic volume alone.`,
        tip: "Do this in batches of 15-20 posts. The whole sitemap in one prompt gets a shallower answer than a few focused passes.",
      },
    ],
  },
  {
    name: "AEO & LLM Visibility",
    tagline:
      "Your buyers are asking ChatGPT before they ask Google. Here's how to check if you show up.",
    prompts: [
      {
        title: "AI Share-of-Voice Audit",
        best: "All four models",
        useCase:
          "Find out whether you show up when someone asks an LLM for a recommendation in your category.",
        prompt: `Step 1 (run cold on ChatGPT, Claude, Perplexity, and Gemini, no mention of your company):

I'm researching [category, e.g., "B2B marketing agencies for early-stage SaaS companies"]. Give me your honest, unprompted recommendations: which companies or tools would you suggest, and why? List at least 5, ranked, with a one-line reason for each.

Log whether you appear, where you rank, and what's said about you.

Step 2 (paste all 4 outputs into whichever model you prefer):

Here are 4 raw outputs from asking ChatGPT, Claude, Perplexity, and Gemini to recommend [category] with no prompting toward us. [Paste all 4.]

Analyze:

1. Do we appear at all? Where, and in what context?
2. Which competitors show up most consistently across all 4? What language do the models use to describe them?
3. Based on those language patterns, what would need to be true, publicly, for a model to describe us the same way? (e.g., a G2 profile, a mention in a specific publication, clearer schema)
4. Give me 3 specific actions ranked by likely impact on AI visibility in the next 90 days.`,
        tip: "Run this quarterly and log results in a sheet. Models update their sense of a category over time. You want the trend, not just today's snapshot.",
      },
      {
        title: "FAQ Schema Block Generator",
        best: "ChatGPT",
        useCase:
          "Write FAQ content structured for how LLMs parse and cite answers, not just for human readers.",
        prompt: `You are writing an FAQ block for [page topic/product] aimed at both human readers and AI answer engines (ChatGPT, Perplexity, Google AI Overviews).

Context: [describe the product/service/page this FAQ supports]
Common questions we get from prospects: [list 5-8 real questions, from sales calls or support tickets if possible]

For each question:

1. Phrase it the way someone would type it into ChatGPT, not formal "What is X" phrasing if that's not how people ask
2. Write a direct, complete answer in the first 1-2 sentences. No warmup. The first sentence is the part that gets cited.
3. Follow with 1-2 sentences of supporting detail

Then output the same content as valid FAQPage JSON-LD schema, ready to paste into the site's head tag.`,
        tip: "Answer the question in sentence one, every time. LLMs and AI Overviews pull the first complete answer they find, not the best-worded one three paragraphs down.",
      },
      {
        title: "LLM-Optimized Comparison Page Generator",
        best: "ChatGPT or Claude",
        useCase:
          'Write a "[Us] vs [Competitor]" page that\'s fair enough to get cited when someone asks an LLM to compare you.',
        prompt: `You are writing a "[Company Name] vs [Competitor]" comparison page. This needs to be honest enough that an AI model or a skeptical buyer would trust it, not a disguised sales pitch.

Context:
• What we do well: [list, specific]
• What we don't do, or aren't a fit for: [be honest]
• What the competitor does well: [list, specific, no strawmanning]
• Where the competitor is stronger: [at least one honest point]
• Our ICP vs their likely ICP: [describe both]

Structure:

1. A one-paragraph honest summary of both companies
2. A comparison table with factual categories (pricing model, ICP fit, support model), not vague ones like "quality"
3. A "choose us if" section (3-4 specific scenarios)
4. A "choose them if" section (2-3 specific scenarios, real ones, not weak strawmen)
5. An FAQ block answering the 3 questions someone would ask an AI before choosing between the two

If any section requires dishonesty to make us look better, flag it instead of writing it.`,
        tip: 'The "choose them if" section is what most agencies skip. It\'s also the section that makes LLMs, and buyers, trust the rest of the page enough to reference it.',
      },
    ],
  },
  {
    name: "Social Media & LinkedIn",
    tagline: "Content calendars with substance. Posts that sound like a person, not a brand account.",
    prompts: [
      {
        title: "Monthly LinkedIn Content Calendar",
        best: "ChatGPT",
        useCase:
          "Plan a month of founder or company LinkedIn content around things that actually happened, not abstract pillars.",
        prompt: `You are a LinkedIn content strategist building a 4-week content calendar for [Founder Name / Company Name], a [role] at [company], targeting [ICP/persona].

Context:
• Content pillars: [e.g., "positioning teardowns, outcome case studies, tech-fluent build-in-public posts"]
• Recent wins, projects, or observations to pull from: [list 8-10 raw, unpolished bullet points, real things that happened this month]
• Posting cadence: [e.g., 3x/week]
• Voice: [voice notes/banned words]

Build a calendar with 12 posts. For each: the pillar it belongs to, a working hook (first line only, this determines whether anyone stops scrolling), the core idea in one sentence, and which raw input it's built from.

Do not write full posts yet. Flag any week where the raw inputs are too thin to support 3 different posts. Two with substance beats three with filler.`,
        tip: 'Feed it raw, unpolished observations, not "topics." There\'s a canyon between "write about positioning" and "our teardown call this week found the same hero headline on 4 client sites in a row."',
      },
      {
        title: "Founder Voice Calibration",
        best: "Claude",
        useCase:
          "Get AI-written posts that sound like the founder, not like a brand account with a first name on it.",
        prompt: `You are calibrating to [Founder Name]'s writing voice for LinkedIn ghostwriting. Here are 5 posts they've written or approved: [paste 5 real examples, unedited]

Analyze and describe:

1. Sentence length pattern (short and punchy vs. longer builds)
2. Where they use humor, and what kind (self-deprecating, observational, dry, none)
3. How they open posts (question, bold claim, specific scene, data point)
4. How they close posts (call to action, open question, no CTA at all)
5. Words and phrases they repeat, and words they'd never use
6. How specific they get with numbers and examples vs. generalizing

Then write a 6th post in their calibrated voice on this topic: [topic/raw input]. After the draft, tell me which of the 5 reference posts it's most stylistically similar to and why.`,
        tip: "Re-run this calibration every quarter with fresh examples. A founder's voice drifts as their thinking evolves, and a stale calibration produces posts that sound like last quarter's version of them.",
      },
      {
        title: "LinkedIn Post from a Raw Idea",
        best: "ChatGPT or Claude",
        useCase:
          "Turn a messy 30-second thought into a publishable post without losing what made it interesting.",
        prompt: `Here's a raw, unedited thought I had, typed fast or transcribed from a voice note: [paste raw text, don't clean it up first]

Turn this into a LinkedIn post in [voice notes / paste calibration from the previous prompt]. Keep every specific detail, number, or example from the raw version. Don't generalize them. The hook (first 1-2 lines) needs to work without the "see more" click, so lead with the most specific or surprising part, not a scene-setter.

Give me 2 versions: one under 100 words, one around 200 words with a supporting example added. Tell me which you'd post and why.`,
        tip: "Paste the raw, ungroomed version. Cleaning it up yourself first is exactly how the detail that made the thought worth having disappears.",
      },
      {
        title: "Company Page Content Calendar",
        best: "ChatGPT or Gemini",
        useCase: "Fill a company LinkedIn or X calendar without it turning into a press release feed.",
        prompt: `You are planning [Company Name]'s company LinkedIn page for the next 4 weeks. Company page content builds category authority, not personality. This is distinct from founder personal posts.

Context: [ICP], [content pillars], [recent company news/milestones/client results, list 5-6]

Plan 8-10 posts split across: 1) results/proof (a real number or outcome), 2) point of view (an opinion on the category, backed by something specific), 3) behind-the-scenes (how we actually did something, process-level detail), 4) curated/reactive (a response to something happening in the industry this week).

For each post: pillar, hook line, format (single image, carousel, text-only, video), and the proof point or specific detail it's built from. Flag any post that's purely promotional with no information in it. Cut those before they make the calendar.`,
        tip: 'The "cut purely promotional" instruction is load-bearing. Without it, AI-generated calendars fill up with announcement posts because they\'re easiest to write, not because they perform.',
      },
    ],
  },
  {
    name: "Email, Newsletter & Subscriber Growth",
    tagline: "A list that grows on its own and a newsletter people open on purpose.",
    prompts: [
      {
        title: "Weekly Newsletter Issue Generator",
        best: "ChatGPT",
        useCase: "Draft a recurring newsletter issue from raw material, without it becoming a link roundup.",
        prompt: `You are drafting this week's issue of [Newsletter Name], a weekly newsletter for [ICP] about [topic]. Our format: one tactic, one industry observation, one "steal this" item. Five minutes total read time. We do NOT do link roundups.

This week's raw material:
• The tactic we tried or saw this week: [describe, with any numbers/results]
• Something happening in [industry] worth noting: [1-2 sentences]
• Something worth stealing (a template, example, screenshot idea): [describe]

Voice: [voice notes/banned words]

Write the full issue: [This week's big idea] (2-3 sentences), [One thing to try] (the tactic, exact steps, what it costs in time), [What's happening] (3 sentences max), [Steal this] (concrete, specific). Total under 500 words. Subject line under 50 characters, states the value directly, no teaser. "5 tips" and "you won't want to miss" style subject lines are banned.`,
        tip: "Ban teaser subject lines by name. Without that instruction, models default to curiosity-bait that clashes with a direct brand voice.",
      },
      {
        title: "Welcome / Nurture Sequence Generator",
        best: "ChatGPT or Claude",
        useCase: "Build the 5-email sequence a new subscriber or lead gets in their first two weeks.",
        prompt: `You are building a 5-email welcome/nurture sequence for new [subscribers/leads] who just [signed up for the newsletter / downloaded X / booked an audit], targeting [ICP].

Context: What's the ONE thing we want them to believe by email 5? [state it, e.g., "that we understand B2B positioning better than their current agency"]
What we have to prove it: [case studies, content, results]

For each of the 5 emails: the goal of that specific email (not "provide value," the actual belief or action it's building toward), the subject line, and a full draft (150-250 words). The sequence builds progressively: email 1 sets expectations, emails 2-4 each prove one specific thing, email 5 makes a soft ask (reply, book a call) without pressure.

Flag if any email is just "here's our content" with no standalone value. Rewrite it before showing it to me.`,
        tip: "State the specific belief you want by email 5 upfront. It stops the sequence from becoming five unconnected \"we're good at this\" messages.",
      },
      {
        title: "Lead Magnet Ideation",
        best: "ChatGPT",
        useCase: "Come up with lead magnet ideas your ICP will trade an email for, not another ebook nobody opens.",
        prompt: `You are a lead generation strategist brainstorming lead magnets for [Company Name], targeting [ICP] who cares most about [top pain point].

Context: here's what's already out there in [industry] as lead magnets: [list 3-5 competitor lead magnets you've seen, or "unknown"]

Generate 10 lead magnet concepts. For each: the format (calculator, template, audit, checklist, mini-course, swipe file), the specific promise (what they get in the first 2 minutes of using it), estimated build time, and how easy it would be for a competitor to copy once it's live.

Rank the top 3 by (promise strength + low build effort + hard to copy), not novelty alone. For the top 3, write the landing page headline and one sentence of supporting copy.`,
        tip: 'Score for "hard to copy" explicitly. Most lead magnet brainstorms produce generic ideas (checklist, ebook, template) that every competitor already has a version of.',
      },
      {
        title: "Win-Back / Re-Engagement Sequence",
        best: "ChatGPT",
        useCase: "Win back subscribers or leads who've gone quiet. No guilt-tripping, no fake urgency.",
        prompt: `You are writing a 2-email win-back sequence for [subscribers/leads] who haven't [opened an email / engaged / responded] in [90+ days], targeting [ICP].

Tone: acknowledge the silence directly. Don't pretend it didn't happen. No "we miss you" sentimentality.

Email 1: A useful, standalone piece of value (a specific insight, template, or observation) with a low-friction way to say "keep sending me this" or opt out cleanly.
Email 2 (only if no response): A direct, short email asking if this is still relevant to them. Frame it as respecting their inbox, not chasing an open rate.

Write both in full, under 150 words each. Include a one-click unsubscribe note in email 2 without it reading as passive-aggressive.`,
        tip: 'Naming the silence directly ("you haven\'t opened in 90 days") outperforms the emotional plea. The reader knows what\'s going on. Naming it reads as respect.',
      },
      {
        title: "Cold Email Subject Line + Opener Bank",
        best: "ChatGPT",
        useCase: "Generate subject lines and openers tied to a specific trigger, not generic personalization.",
        prompt: `You are writing cold email subject lines and openers for outbound to [ICP], triggered by [specific signal: recent funding, new hire, product launch, etc.]

Context: what we noticed about them: [describe, 1-2 sentences, real and specific]
What we'd want to say next: [the value prop or ask]

Generate 8 subject line options (under 6 words each, no "quick question" or "following up," each referencing the trigger or their business) and 5 opener lines (first sentence of the email, referencing the specific signal, no "I hope this finds you well").

Pair the best subject + opener combos and tell me which 2 pairings you'd A/B test first, and what that test would actually tell us.`,
        tip: 'Ban "quick question" and "I hope this finds you well" by name. Models default to these phrases every time unless you explicitly block them.',
      },
    ],
  },
  {
    name: "Demand Gen & Outbound",
    tagline: "Pipeline from a specific reason to reach out, not volume for its own sake.",
    prompts: [
      {
        title: "Cold Email Sequence Generator",
        best: "ChatGPT or Claude",
        useCase: "Build a 5-step sequence where each email has a different job, not the same pitch reworded five times.",
        prompt: `You are building a 5-step cold email sequence for outbound to [ICP], selling [product/service].

Context: primary pain point: [pain], proof we have: [case study/number], typical objection: [objection]

Build 5 emails, spaced [3-4 business days apart], each with a distinct job:
Email 1: Specific observation + value hint (under 60 words)
Email 2: Proof, one specific result, named or anonymized (under 80 words)
Email 3: Reframe the problem in a way they might not have considered (under 80 words)
Email 4: Handle the likely objection directly, without being asked (under 60 words)
Email 5: Breakup. Direct, no guilt, door stays open (under 40 words)

For each: subject line, full copy, and the one specific personalization field that needs to be filled per-recipient (not just the first name field).

Flag any email that could go to a totally different ICP unchanged. That means it's a template wearing a first name, not a personalized message.`,
        tip: "Read each email back and ask: would it embarrass me if I knew this went to 500 people unchanged? That's the only check that matters.",
      },
      {
        title: "ICP Account Research + Personalization",
        best: "Any LLM",
        useCase: "Generate a specific, real first line for outbound at scale, without it collapsing into a formula.",
        prompt: `You are researching a company for personalized outbound. Here's what's public about them: [paste LinkedIn company page description, recent posts, job listings, or news, whatever's available]

Our ICP fit criteria: [describe]
What we sell and why it'd matter to them: [describe]

From the research, identify: 1) one specific, recent, verifiable fact about this company (not "they're growing," something dated and named), 2) how that fact connects to a problem we solve, 3) one sentence that references the fact the way a person who actually read about them would write it, not someone filling a personalization template.

If the research doesn't contain anything specific enough to personalize from, say so. Don't invent a connection that isn't there.`,
        tip: 'Built to run per-account in a Clay or Apollo workflow. The "say so if there\'s nothing" instruction is what keeps a 200-row workflow from quietly degrading into fake personalization by row 40.',
      },
      {
        title: "ABM Account Dossier Generator",
        best: "Perplexity + ChatGPT",
        useCase: "Build a one-page account dossier before an ABM sequence or a big sales call.",
        prompt: `You are building an account dossier for [Target Account Name], a target account in our ABM program. Here's what's publicly available: [paste website copy, recent LinkedIn posts, news, job postings, funding info]

Build a one-page dossier:

1. Company snapshot (size, stage, what they do, who they sell to)
2. 3 signals that suggest they're a good fit right now. Not generic firmographic fit, but timing signals: recent hire, recent raise, product launch, stated priority.
3. Likely buying committee (roles, not names, based on company size/stage)
4. The specific angle we'd lead with for this account, and why it's different from our default pitch
5. 2 open questions we can't answer from public info, that we should ask on the first call

One page. If the public information is too thin for a section, write "insufficient public data." Don't guess.`,
        tip: '"Insufficient public data" is better than a plausible-sounding guess. A rep walking into a call on a fabricated signal does more damage than a rep with an honest gap.',
      },
      {
        title: "Sales Enablement One-Pager Generator",
        best: "Claude",
        useCase: "Turn scattered proof points into a one-pager sales can reference mid-call.",
        prompt: `You are writing a sales one-pager for [Product/Service] aimed at [buyer persona] evaluating us against [main competitor/alternative, or "building in-house"].

Context: top 3 outcomes we drive: [list with numbers], top 3 objections we hear: [list], what makes us structurally different (not "better service," structurally): [describe]

Build a one-pager: headline (the outcome, not the feature), 3 proof points (each: the number, the context, one sentence on why it's credible), objection handling (objection stated plainly, then our actual answer, not a deflection), and a clear next step.

Total copy under 300 words. This needs to work as a leave-behind a rep glances at mid-call, not something someone reads cover to cover later.`,
        tip: 'State objections plainly. Don\'t soften them into "some people wonder about X." Reps trust a battlecard more when it doesn\'t flinch from the pushback they\'re hearing.',
      },
    ],
  },
  {
    name: "Paid Ads",
    tagline: "Ad copy built for the intent behind the click, not a reformatted homepage.",
    prompts: [
      {
        title: "Google Search Ads Copy Generator",
        best: "ChatGPT",
        useCase: "Generate ad copy variants mapped to search intent, not keyword-stuffed headlines.",
        prompt: `You are writing Google Search ad copy for the keyword "[keyword]", targeting [ICP]. Landing page: [describe or paste URL content]

Search intent for this keyword: [state it: comparison, solution-aware, problem-aware, brand]

Write 5 headline variants (30 characters max each) and 3 description variants (90 characters max each). Pair each headline with a description logically (state which go together). Every headline must match the search intent. No "Best [Category] Software" headlines that could run on any keyword in this account.

Tell me which headline/description combo you'd test first and state the hypothesis: what does that test prove? (CTR driven by urgency vs. specificity, for example.) Not "test everything."`,
        tip: "Force a stated hypothesis per A/B test. Otherwise testing becomes an excuse to avoid deciding. You want a guess on the table, same as a strategist would commit to.",
      },
      {
        title: "LinkedIn Ad Creative + Audience Brief",
        best: "ChatGPT",
        useCase: "Generate creative concepts and an audience brief together, since one without the other usually misses.",
        prompt: `You are building a LinkedIn ad campaign brief for [Campaign Goal, e.g., "book audit calls," "download report"], targeting [ICP].

Context: budget: [amount], the one action we want: [action], proof to support the claim: [numbers/case study]

Build:

1. Audience brief: job titles, company size/industry filters, and 1-2 LinkedIn-specific targeting ideas (group membership, follower of a competitor page, etc.)
2. 3 ad creative concepts, each with: format (single image, carousel, document/PDF ad), the hook (first line, the stop-scroll), full copy (under 150 words), and CTA
3. For each concept: the specific reason it'd work for THIS audience, not a generic "this format does well" note

Flag any concept that's the homepage headline reformatted for LinkedIn. A hero is for visitors who already clicked. An ad is for someone who hasn't stopped scrolling yet. Different job, different copy.`,
        tip: "That homepage-vs-ad distinction is the number one failure mode in LinkedIn ads. If the creative could double as your website hero, it's not sharp enough for a feed.",
      },
    ],
  },
  {
    name: "Conversion & Landing Pages",
    tagline: "Pages that convert the traffic you're already paying for.",
    prompts: [
      {
        title: "Landing Page Copy Generator",
        best: "ChatGPT or Claude",
        useCase: "Go from campaign brief to a full page draft that matches the ad or email that sent the traffic.",
        prompt: `You are writing landing page copy. Traffic lands here from [source: a specific ad, email, or organic search for a keyword]. The visitor already saw this message before arriving: [paste the ad copy, email subject, or search query]

Context: offer: [describe], ICP: [describe], proof: [case studies/numbers], objections to preempt: [list]

Write the full page: headline (echoes the source message's promise, continuity not repetition), subheadline, 3-4 supporting sections (what they get, proof, objection handling), and one CTA repeated at top and bottom, worded identically both times.

Total copy under 400 words. This page has one job. Don't let it wander into brand storytelling.`,
        tip: '"Echoes, doesn\'t repeat" fixes the most common landing page miss: a headline that doesn\'t match what the visitor just clicked on. Even a small gap reads as a bait-and-switch.',
      },
      {
        title: "CRO Audit Prompt",
        best: "ChatGPT or Gemini",
        useCase: 'Get a prioritized list of conversion fixes, not a vague "improve clarity" critique.',
        prompt: `You are a CRO specialist auditing this landing page for [Company Name]. Traffic source: [source]. Conversion goal: [goal]. Page copy and structure: [paste full page copy, section by section]

Audit against: clarity of the value prop within 5 seconds, CTA friction (visibility, wording, number of steps), proof placement (is proof near the ask, or buried?), objection handling (are the 2-3 obvious objections addressed before the ask?), and mobile-specific issues for long pages.

Give me 8-12 specific changes, ranked by (estimated impact divided by effort to implement). For each: current state, specific change, and why you'd expect it to move the number. Not just "improves clarity."`,
        tip: 'Rank by impact-over-effort, not impact alone. Without that constraint, most audits produce a list of everything that could theoretically be better, with no signal on what to fix first.',
      },
      {
        title: "Pricing Page Copy Generator",
        best: "ChatGPT or Claude",
        useCase:
          'Write pricing page copy that reduces "contact us" friction and pre-answers the questions that stall deals.',
        prompt: `You are writing pricing page copy for [Company Name], selling [product/service] to [ICP] at [price points/tiers].

Context: the 3 questions prospects always ask before buying: [list], the objection that kills deals most often at this stage: [describe]

Write: tier names and one-sentence positioning for each (who it's for, not just features), a comparison table (features/limits per tier, factual, not persuasive), an FAQ answering the 3 questions directly in the first sentence of each answer, and one line of copy addressing the deal-killing objection before it comes up.

If a tier's value can't be justified without a sales call, flag that tier specifically. Don't paper over the gap with vaguer copy.`,
        tip: 'That flag is useful even if you don\'t fix the page right away. It tells you which tier your sales team will keep fielding "why does this cost this much" on.',
      },
    ],
  },
  {
    name: "Analytics & Reporting",
    tagline: "Reports that say what happened and what to do about it. Not a dashboard screenshot with no story.",
    prompts: [
      {
        title: "Monthly Report Narrative Generator",
        best: "Gemini or ChatGPT",
        useCase: "Turn a spreadsheet of numbers into the narrative a client or exec actually wants.",
        prompt: `You are writing the narrative summary for [Company Name]'s monthly marketing report. Raw data: [paste key metrics: traffic, MQLs, pipeline, spend, this month vs. last month]

Write a narrative, not a data dump:

1. One sentence: did the number that matters most (name it, e.g., pipeline generated) go up or down, and by how much?
2. The single biggest driver. One specific campaign, channel, or event. Not "overall performance."
3. One thing that underperformed and what we're doing about it. No metric mentioned without a "so what."
4. Next month's one priority, stated as a specific bet, not a vague goal.

Under 250 words. If a metric moved and we don't know why, say so instead of inventing a plausible-sounding explanation.`,
        tip: 'The "say we don\'t know" instruction is easy to skip and important to keep. Without it, reports fill up with confident explanations for noise.',
      },
      {
        title: "Campaign Postmortem / Retro Prompt",
        best: "ChatGPT or Claude",
        useCase: "Run a structured retro on a finished campaign. Get an honest read, not a rationalization of sunk effort.",
        prompt: `You are running a postmortem for [Campaign Name], which ran [dates] with a goal of [goal] and a result of [actual result].

Context: what we planned: [describe], what we actually did (including anything that changed mid-campaign): [describe], the numbers: [paste]

Structure:

1. Plan vs. reality: where did execution diverge, and was the divergence a good call or a mistake given what we knew at the time?
2. The single biggest lever that moved the result, up or down
3. One thing we'd do exactly the same
4. One thing we'd change, specific enough that someone could act on it without a follow-up question
5. Whether this campaign type is worth repeating at all, given the effort it took

Say "this wasn't worth the effort" if the numbers support it. The point is to stop doing things that don't work, not to justify the time already spent.`,
        tip: 'A retro that concludes "let\'s do more of everything" means nobody was asked to take a side. Push for the uncomfortable call. That\'s where the useful lesson is.',
      },
    ],
  },
];
